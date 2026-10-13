/*
Sourcemap helpers for the bundled declaration file.

tsc emits index.d.ts.map covering only the declarations it generated from .ts
sources. The public type surface is injected afterwards from
src/types/global/index.d.ts, a .d.ts input, which tsc maps nothing to — left
alone, the 46 injected types would be the only declarations in the bundle with
no go-to-definition.

Since the published bundle is a single file, that region matters as much as the
rest. These helpers append mappings for it without disturbing the ones tsc
already produced: the injected block is appended after every line tsc mapped, so
existing generated lines never shift.
*/

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const CHAR_TO_INT = new Map([...B64].map((char, index) => [char, index]));

function encodeVlq(value) {
  let vlq = value < 0 ? (-value << 1) | 1 : value << 1;
  let out = '';
  do {
    let digit = vlq & 31;
    vlq >>>= 5;
    if (vlq > 0) digit |= 32;
    out += B64[digit];
  } while (vlq > 0);
  return out;
}

function decodeVlq(text, state) {
  let result = 0;
  let shift = 0;
  let continuation;

  do {
    if (state.pos >= text.length) {
      throw new Error('Ran off the end of a VLQ field while decoding mappings');
    }
    const digit = CHAR_TO_INT.get(text[state.pos++]);
    if (digit === undefined) {
      throw new Error(`Invalid base64 digit in mappings at ${state.pos - 1}`);
    }
    continuation = digit & 32;
    result += (digit & 31) << shift;
    shift += 5;
  } while (continuation);

  const negative = result & 1;
  result >>= 1;
  return negative ? (result === 0 ? -0x80000000 : -result) : result;
}

/**
 * Decode mappings into per-generated-line arrays of absolute segments.
 * Segments are [genColumn, sourceIndex, sourceLine, sourceColumn] or
 * [genColumn] for a generated line with no mapping.
 */
function decodeMappings(mappings) {
  const lines = [];
  const state = {
    sourceIndex: 0,
    sourceLine: 0,
    sourceColumn: 0,
  };

  for (const lineText of mappings.split(';')) {
    const segments = [];
    let genColumn = 0;

    if (lineText.length > 0) {
      for (const segmentText of lineText.split(',')) {
        state.pos = 0;
        genColumn += decodeVlq(segmentText, state);
        if (segmentText.length === 1) {
          segments.push({ genColumn });
          continue;
        }
        state.sourceIndex += decodeVlq(segmentText, state);
        state.sourceLine += decodeVlq(segmentText, state);
        state.sourceColumn += decodeVlq(segmentText, state);
        segments.push({
          genColumn,
          sourceIndex: state.sourceIndex,
          sourceLine: state.sourceLine,
          sourceColumn: state.sourceColumn,
        });
      }
    }

    lines.push({ genColumn, segments });
  }

  return { lines, state };
}

/** Re-encode absolute segments back into a mappings string. */
function encodeMappings(lines) {
  const state = { sourceIndex: 0, sourceLine: 0, sourceColumn: 0 };

  return lines
    .map(({ segments }) => {
      let prevGenColumn = 0;
      return segments
        .map((segment) => {
          let out = encodeVlq(segment.genColumn - prevGenColumn);
          prevGenColumn = segment.genColumn;
          if (segment.sourceIndex === undefined) return out;

          out += encodeVlq(segment.sourceIndex - state.sourceIndex);
          out += encodeVlq(segment.sourceLine - state.sourceLine);
          out += encodeVlq(segment.sourceColumn - state.sourceColumn);
          state.sourceIndex = segment.sourceIndex;
          state.sourceLine = segment.sourceLine;
          state.sourceColumn = segment.sourceColumn;
          return out;
        })
        .join(',');
    })
    .join(';');
}

/**
 * Append mappings for the injected block.
 *
 * @param {object} mapJson parsed index.d.ts.map
 * @param {string} sourceRelativePath path recorded in `sources`, e.g. ../../src/types/global/index.d.ts
 * @param {Array<{genLine:number, genCol:number, srcLine:number, srcCol:number}>} entries
 *        genLine/genCol are zero-based and absolute within the bundle
 * @param {number} mappedThrough highest generated line already carrying a mapping
 */
function appendMappings(mapJson, sourceRelativePath, entries, mappedThrough) {
  let sourceIndex = mapJson.sources.indexOf(sourceRelativePath);
  if (sourceIndex === -1) {
    sourceIndex = mapJson.sources.length;
    mapJson.sources.push(sourceRelativePath);
  }

  const { lines } = decodeMappings(mapJson.mappings);

  const byLine = new Map();
  for (const entry of entries) {
    if (entry.genLine <= mappedThrough) continue;
    if (!byLine.has(entry.genLine)) byLine.set(entry.genLine, []);
    byLine.get(entry.genLine).push({
      genColumn: entry.genCol,
      sourceIndex,
      sourceLine: entry.srcLine,
      sourceColumn: entry.srcCol,
    });
  }

  for (let line = 0; line <= mappedThrough; line++) {
    if (!lines[line]) lines[line] = { segments: [] };
  }

  for (const [line, segments] of [...byLine.entries()].sort((a, b) => a[0] - b[0])) {
    segments.sort((a, b) => a.genColumn - b.genColumn);
    const existing = lines[line];
    lines[line] = {
      segments: existing ? [...existing.segments, ...segments] : segments,
    };
  }

  mapJson.mappings = encodeMappings(lines);
  return mapJson;
}

module.exports = { appendMappings, decodeMappings, encodeMappings };
