#!/usr/bin/env node
"use strict";
const path = require("path");
const { execSync } = require("child_process");

function requirePeer(name) {
  try {
    return require(name);
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") throw e;
    const pkgDir = path.resolve(__dirname, "..");
    console.error(`[qcobjects-cli] Installing missing peer dependency: ${name}`);
    execSync(`npm install --legacy-peer-deps "${name}@>=2.5.0"`, {
      cwd: pkgDir,
      stdio: "inherit",
    });
    return require(name);
  }
}

requirePeer("qcobjects");

const entryMap = {
  "qcobjects-cli": "../public/cjs/qcobjects-cli",
  "qcobjects": "../public/cjs/qcobjects-cli",
  "qco": "../public/cjs/qcobjects-cli",
  "qcobjects-server": "../public/cjs/qcobjects-http2-server",
  "qcobjects-http2-server": "../public/cjs/qcobjects-http2-server",
  "qcobjects-shell": "../public/cjs/qcobjects-shell",
  "qcobjects-createcert": "../public/cjs/qcobjects-createcert",
  "qcobjects-gae-server": "../public/cjs/qcobjects-gae-http-server",
  "qcobjects-http-server": "../public/cjs/qcobjects-http-server",
  "qcobjects-collab": "../public/cjs/qcobjects-collab",
};

const binName = path.basename(process.argv[1], ".js");
const entry = entryMap[binName] || "../public/cjs/qcobjects-cli";

require(entry);
