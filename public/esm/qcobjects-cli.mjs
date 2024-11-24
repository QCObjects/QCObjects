#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/commander/lib/error.js
var require_error = __commonJS({
  "node_modules/commander/lib/error.js"(exports) {
    "use strict";
    var CommanderError = class extends Error {
      static {
        __name(this, "CommanderError");
      }
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @constructor
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError = class extends CommanderError {
      static {
        __name(this, "InvalidArgumentError");
      }
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       * @constructor
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports.CommanderError = CommanderError;
    exports.InvalidArgumentError = InvalidArgumentError;
  }
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "node_modules/commander/lib/argument.js"(exports) {
    "use strict";
    var { InvalidArgumentError } = require_error();
    var Argument = class {
      static {
        __name(this, "Argument");
      }
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @api private
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {any} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    __name(humanReadableArgName, "humanReadableArgName");
    exports.Argument = Argument;
    exports.humanReadableArgName = humanReadableArgName;
  }
});

// node_modules/commander/lib/help.js
var require_help = __commonJS({
  "node_modules/commander/lib/help.js"(exports) {
    "use strict";
    var { humanReadableArgName } = require_argument();
    var Help = class {
      static {
        __name(this, "Help");
      }
      constructor() {
        this.helpWidth = void 0;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        if (cmd._hasImplicitHelpCommand()) {
          const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);
          const helpCommand = cmd.createCommand(helpName).helpOption(false);
          helpCommand.description(cmd._helpCommandDescription);
          if (helpArgs) helpCommand.arguments(helpArgs);
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns number
       */
      compareOptions(a, b) {
        const getSortKey = /* @__PURE__ */ __name((option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        }, "getSortKey");
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag);
        const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
        if (showShortHelpFlag || showLongHelpFlag) {
          let helpOption;
          if (!showShortHelpFlag) {
            helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription);
          } else if (!showLongHelpFlag) {
            helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription);
          } else {
            helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription);
          }
          visibleOptions.push(helpOption);
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
          const visibleOptions = parentCmd.options.filter((option) => !option.hidden);
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd._args.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd._args.find((argument) => argument.description)) {
          return cmd._args;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd._args.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let parentCmdNames = "";
        for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
          parentCmdNames = parentCmd.name() + " " + parentCmdNames;
        }
        return parentCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2;
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
          }
          return term;
        }
        __name(formatItem, "formatItem");
        function formatList(textArray) {
          return textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));
        }
        __name(formatList, "formatList");
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([helper.wrap(commandDescription, helpWidth, 0), ""]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
        });
        if (argumentList.length > 0) {
          output = output.concat(["Arguments:", formatList(argumentList), ""]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option));
        });
        if (optionList.length > 0) {
          output = output.concat(["Options:", formatList(optionList), ""]);
        }
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(helper.optionTerm(option), helper.optionDescription(option));
          });
          if (globalOptionList.length > 0) {
            output = output.concat(["Global Options:", formatList(globalOptionList), ""]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(helper.subcommandTerm(cmd2), helper.subcommandDescription(cmd2));
        });
        if (commandList.length > 0) {
          output = output.concat(["Commands:", formatList(commandList), ""]);
        }
        return output.join("\n");
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
      wrap(str, width, indent, minColumnWidth = 40) {
        const indents = " \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF";
        const manualIndent = new RegExp(`[\\n][${indents}]+`);
        if (str.match(manualIndent)) return str;
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str;
        const leadingStr = str.slice(0, indent);
        const columnText = str.slice(indent).replace("\r\n", "\n");
        const indentString = " ".repeat(indent);
        const zeroWidthSpace = "\u200B";
        const breaks = `\\s${zeroWidthSpace}`;
        const regex = new RegExp(`
|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`, "g");
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i) => {
          if (line === "\n") return "";
          return (i > 0 ? indentString : "") + line.trimEnd();
        }).join("\n");
      }
    };
    exports.Help = Help;
  }
});

// node_modules/commander/lib/option.js
var require_option = __commonJS({
  "node_modules/commander/lib/option.js"(exports) {
    "use strict";
    var { InvalidArgumentError } = require_error();
    var Option = class {
      static {
        __name(this, "Option");
      }
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {any} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {any} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {string | string[]} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {Object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @api private
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       * @api private
       */
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @api private
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @api private
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      static {
        __name(this, "DualOptions");
      }
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {any} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    __name(camelcase, "camelcase");
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = void 0;
      }
      return { shortFlag, longFlag };
    }
    __name(splitOptionFlags, "splitOptionFlags");
    exports.Option = Option;
    exports.splitOptionFlags = splitOptionFlags;
    exports.DualOptions = DualOptions;
  }
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "node_modules/commander/lib/suggestSimilar.js"(exports) {
    "use strict";
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance) return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    __name(editDistance, "editDistance");
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    __name(suggestSimilar, "suggestSimilar");
    exports.suggestSimilar = suggestSimilar;
  }
});

// node_modules/commander/lib/command.js
var require_command = __commonJS({
  "node_modules/commander/lib/command.js"(exports) {
    "use strict";
    var EventEmitter = __require("events").EventEmitter;
    var childProcess = __require("child_process");
    var path5 = __require("path");
    var fs3 = __require("fs");
    var process2 = __require("process");
    var { Argument, humanReadableArgName } = require_argument();
    var { CommanderError } = require_error();
    var { Help } = require_help();
    var { Option, splitOptionFlags, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command = class _Command extends EventEmitter {
      static {
        __name(this, "Command");
      }
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        this._args = [];
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._outputConfiguration = {
          writeOut: /* @__PURE__ */ __name((str) => process2.stdout.write(str), "writeOut"),
          writeErr: /* @__PURE__ */ __name((str) => process2.stderr.write(str), "writeErr"),
          getOutHelpWidth: /* @__PURE__ */ __name(() => process2.stdout.isTTY ? process2.stdout.columns : void 0, "getOutHelpWidth"),
          getErrHelpWidth: /* @__PURE__ */ __name(() => process2.stderr.isTTY ? process2.stderr.columns : void 0, "getErrHelpWidth"),
          outputError: /* @__PURE__ */ __name((str, write) => write(str), "outputError")
        };
        this._hidden = false;
        this._hasHelpOption = true;
        this._helpFlags = "-h, --help";
        this._helpDescription = "display help for command";
        this._helpShortFlag = "-h";
        this._helpLongFlag = "--help";
        this._addImplicitHelpCommand = void 0;
        this._helpCommandName = "help";
        this._helpCommandnameAndArgs = "help [command]";
        this._helpCommandDescription = "display help for command";
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._hasHelpOption = sourceCommand._hasHelpOption;
        this._helpFlags = sourceCommand._helpFlags;
        this._helpDescription = sourceCommand._helpDescription;
        this._helpShortFlag = sourceCommand._helpShortFlag;
        this._helpLongFlag = sourceCommand._helpLongFlag;
        this._helpCommandName = sourceCommand._helpCommandName;
        this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs;
        this._helpCommandDescription = sourceCommand._helpCommandDescription;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {Object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this.commands.push(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {boolean|string} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {Object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this.commands.push(cmd);
        cmd.parent = this;
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {Function|*} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this._args.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
        }
        this._args.push(argument);
        return this;
      }
      /**
       * Override default decision whether to add implicit help command.
       *
       *    addHelpCommand() // force on
       *    addHelpCommand(false); // force off
       *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
       *
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(enableOrNameAndArgs, description) {
        if (enableOrNameAndArgs === false) {
          this._addImplicitHelpCommand = false;
        } else {
          this._addImplicitHelpCommand = true;
          if (typeof enableOrNameAndArgs === "string") {
            this._helpCommandName = enableOrNameAndArgs.split(" ")[0];
            this._helpCommandnameAndArgs = enableOrNameAndArgs;
          }
          this._helpCommandDescription = description || this._helpCommandDescription;
        }
        return this;
      }
      /**
       * @return {boolean}
       * @api private
       */
      _hasImplicitHelpCommand() {
        if (this._addImplicitHelpCommand === void 0) {
          return this.commands.length && !this._actionHandler && !this._findCommand("help");
        }
        return this._addImplicitHelpCommand;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @api private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = /* @__PURE__ */ __name((args) => {
          const expectedArgsCount = this._args.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        }, "listener");
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option(flags, description);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(name, option.defaultValue === void 0 ? true : option.defaultValue, "default");
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        this.options.push(option);
        const handleOptionValue = /* @__PURE__ */ __name((val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            try {
              val = option.parseArg(val, oldValue);
            } catch (err) {
              if (err.code === "commander.invalidArgument") {
                const message = `${invalidValueMessage} ${err.message}`;
                this.error(message, { exitCode: err.exitCode, code: err.code });
              }
              throw err;
            }
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        }, "handleOptionValue");
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @api private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option) {
          throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = /* @__PURE__ */ __name((val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          }, "fn");
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description` and optional
       * coercion `fn`.
       *
       * The `flags` string contains the short and/or long flags,
       * separated by comma, a pipe or space. The following are all valid
       * all will output this way when `--help` is used.
       *
       *     "-p, --pepper"
       *     "-p|--pepper"
       *     "-p --pepper"
       *
       * @example
       * // simple boolean defaulting to undefined
       * program.option('-p, --pepper', 'add pepper');
       *
       * program.pepper
       * // => undefined
       *
       * --pepper
       * program.pepper
       * // => true
       *
       * // simple boolean defaulting to true (unless non-negated option is also defined)
       * program.option('-C, --no-cheese', 'remove cheese');
       *
       * program.cheese
       * // => true
       *
       * --no-cheese
       * program.cheese
       * // => false
       *
       * // required argument
       * program.option('-C, --chdir <path>', 'change the working directory');
       *
       * --chdir /tmp
       * program.chdir
       * // => "/tmp"
       *
       * // optional argument
       * program.option('-c, --cheese [type]', 'add cheese [marble]');
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {Function|*} [fn] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, fn, defaultValue) {
        return this._optionEx({}, flags, description, fn, defaultValue);
      }
      /**
      * Add a required option which must have a value after parsing. This usually means
      * the option must be specified on the command line. (Otherwise the same as .option().)
      *
      * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
      *
      * @param {string} flags
      * @param {string} [description]
      * @param {Function|*} [fn] - custom option processing function or default value
      * @param {*} [defaultValue]
      * @return {Command} `this` command for chaining
      */
      requiredOption(flags, description, fn, defaultValue) {
        return this._optionEx({ mandatory: true }, flags, description, fn, defaultValue);
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
       * for unknown options.
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
       * for excess arguments.
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {Boolean} [positional=true]
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {Boolean} [passThrough=true]
       * for unknown options.
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
          throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");
        }
        return this;
      }
      /**
        * Whether to store option values as properties on command object,
        * or store separately (specify false). In both cases the option values can be accessed using .opts().
        *
        * @param {boolean} [storeAsProperties=true]
        * @return {Command} `this` command for chaining
        */
      storeOptionsAsProperties(storeAsProperties = true) {
        this._storeOptionsAsProperties = !!storeAsProperties;
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {Object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {Object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
        * Store option value and where the value came from.
        *
        * @param {string} key
        * @param {Object} value
        * @param {string} source - expected values are default/config/env/cli/implied
        * @return {Command} `this` command for chaining
        */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
        * Get source of option value.
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
        * Get source of option value. See also .optsWithGlobals().
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
      getOptionValueSourceWithGlobals(key) {
        let source;
        getCommandAndParents(this).forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @api private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0) {
          argv = process2.argv;
          if (process2.versions && process2.versions.electron) {
            parseOptions.from = "electron";
          }
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
        }
        if (!this._name && this._scriptPath) this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * program.parse(process.argv);
       * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * await program.parseAsync(process.argv);
       * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {Object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Execute a sub-command executable.
       *
       * @api private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path5.resolve(baseDir, baseName);
          if (fs3.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path5.extname(baseName))) return void 0;
          const foundExt = sourceExt.find((ext) => fs3.existsSync(`${localBin}${ext}`));
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        __name(findFile, "findFile");
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs3.realpathSync(this._scriptPath);
          } catch (err) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path5.resolve(path5.dirname(resolvedScriptPath), executableDir);
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path5.basename(this._scriptPath, path5.extname(this._scriptPath));
            if (legacyName !== this._name) {
              localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path5.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        if (!exitCallback) {
          proc.on("close", process2.exit.bind(process2));
        } else {
          proc.on("close", () => {
            exitCallback(new CommanderError(process2.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
          });
        }
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
            const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
            throw new Error(executableMissing);
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError(1, "commander.executeSubCommandAsync", "(error)");
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @api private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        let hookResult;
        hookResult = this._chainOrCallSubCommandHook(hookResult, subCommand, "preSubcommand");
        hookResult = this._chainOrCall(hookResult, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return hookResult;
      }
      /**
       * Check this.args against expected this._args.
       *
       * @api private
       */
      _checkNumberOfArguments() {
        this._args.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this._args.length > 0 && this._args[this._args.length - 1].variadic) {
          return;
        }
        if (this.args.length > this._args.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this._args and save as this.processedArgs!
       *
       * @api private
       */
      _processArguments() {
        const myParseArg = /* @__PURE__ */ __name((argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            try {
              parsedValue = argument.parseArg(value, previous);
            } catch (err) {
              if (err.code === "commander.invalidArgument") {
                const message = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'. ${err.message}`;
                this.error(message, { exitCode: err.exitCode, code: err.code });
              }
              throw err;
            }
          }
          return parsedValue;
        }, "myParseArg");
        this._checkNumberOfArguments();
        const processedArgs = [];
        this._args.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {Promise|undefined} promise
       * @param {Function} fn
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {Promise|undefined} promise
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        getCommandAndParents(this).reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {Promise|undefined} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @api private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
          if (operands.length === 1) {
            this.help();
          }
          return this._dispatchSubcommand(operands[1], [], [this._helpLongFlag]);
        }
        if (this._defaultCommandName) {
          outputHelpIfRequested(this, unknown);
          return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        outputHelpIfRequested(this, parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = /* @__PURE__ */ __name(() => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        }, "checkForUnknownOptions");
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let actionResult;
          actionResult = this._chainOrCallHooks(actionResult, "preAction");
          actionResult = this._chainOrCall(actionResult, () => this._actionHandler(this.processedArgs));
          if (this.parent) {
            actionResult = this._chainOrCall(actionResult, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          actionResult = this._chainOrCallHooks(actionResult, "postAction");
          return actionResult;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @api private
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @api private
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForMissingMandatoryOptions() {
        for (let cmd = this; cmd; cmd = cmd.parent) {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        }
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @api private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter(
          (option) => {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0) {
              return false;
            }
            return this.getOptionValueSource(optionKey) !== "default";
          }
        );
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForConflictingOptions() {
        for (let cmd = this; cmd; cmd = cmd.parent) {
          cmd._checkForConflictingLocalOptions();
        }
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {String[]} argv
       * @return {{operands: String[], unknown: String[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        __name(maybeOption, "maybeOption");
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {Object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {Object}
       */
      optsWithGlobals() {
        return getCommandAndParents(this).reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {Object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(`${message}
`, this._outputConfiguration.writeErr);
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @api private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(this.getOptionValueSource(optionKey))) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @api private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = /* @__PURE__ */ __name((optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        }, "hasCustomOptionValue");
        this.options.filter((option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option)).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @api private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @api private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @api private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @api private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = /* @__PURE__ */ __name((option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find((target) => target.negate && optionKey === target.attributeName());
          const positiveOption = this.options.find((target) => !target.negate && optionKey === target.attributeName());
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        }, "findBestOptionFromValue");
        const getErrorMessage = /* @__PURE__ */ __name((option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        }, "getErrorMessage");
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @api private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @api private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this._args.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @api private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Set the program version to `str`.
       *
       * This method auto-registers the "-V, --version" flag
       * which will print the version number when passed.
       *
       * You can optionally supply the  flags and description to override the defaults.
       *
       * @param {string} str
       * @param {string} [flags]
       * @param {string} [description]
       * @return {this | string} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this.options.push(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {Object} [argsDescription]
       * @return {string|Command}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0) return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {string|Command}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name) throw new Error("Command alias can't be the same as its name");
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {string[]|Command}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {String|Command}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args = this._args.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._hasHelpOption ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this._args.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path5.basename(filename, path5.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {string|Command}
       */
      executableDir(path6) {
        if (path6 === void 0) return this._executableDir;
        this._executableDir = path6;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === void 0) {
          helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
      /**
       * @api private
       */
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = /* @__PURE__ */ __name((arg) => this._outputConfiguration.writeErr(arg), "write");
        } else {
          write = /* @__PURE__ */ __name((arg) => this._outputConfiguration.writeOut(arg), "write");
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const context = this._getHelpContext(contextOptions);
        getCommandAndParents(this).reverse().forEach((command) => command.emit("beforeAllHelp", context));
        this.emit("beforeHelp", context);
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        context.write(helpInformation);
        this.emit(this._helpLongFlag);
        this.emit("afterHelp", context);
        getCommandAndParents(this).forEach((command) => command.emit("afterAllHelp", context));
      }
      /**
       * You can pass in flags and a description to override the help
       * flags and help description for your command. Pass in false to
       * disable the built-in help option.
       *
       * @param {string | boolean} [flags]
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          this._hasHelpOption = flags;
          return this;
        }
        this._helpFlags = flags || this._helpFlags;
        this._helpDescription = description || this._helpDescription;
        const helpFlags = splitOptionFlags(this._helpFlags);
        this._helpShortFlag = helpFlags.shortFlag;
        this._helpLongFlag = helpFlags.longFlag;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process2.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {string | Function} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
    };
    function outputHelpIfRequested(cmd, args) {
      const helpOption = cmd._hasHelpOption && args.find((arg) => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
      if (helpOption) {
        cmd.outputHelp();
        cmd._exit(0, "commander.helpDisplayed", "(outputHelp)");
      }
    }
    __name(outputHelpIfRequested, "outputHelpIfRequested");
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    __name(incrementNodeInspectorPort, "incrementNodeInspectorPort");
    function getCommandAndParents(startCommand) {
      const result = [];
      for (let command = startCommand; command; command = command.parent) {
        result.push(command);
      }
      return result;
    }
    __name(getCommandAndParents, "getCommandAndParents");
    exports.Command = Command;
  }
});

// node_modules/commander/index.js
var require_commander = __commonJS({
  "node_modules/commander/index.js"(exports, module) {
    "use strict";
    var { Argument } = require_argument();
    var { Command } = require_command();
    var { CommanderError, InvalidArgumentError } = require_error();
    var { Help } = require_help();
    var { Option } = require_option();
    exports = module.exports = new Command();
    exports.program = exports;
    exports.Argument = Argument;
    exports.Command = Command;
    exports.CommanderError = CommanderError;
    exports.Help = Help;
    exports.InvalidArgumentError = InvalidArgumentError;
    exports.InvalidOptionArgumentError = InvalidArgumentError;
    exports.Option = Option;
  }
});

// src/org.quickcorp.qcobjects.defaultsettings.ts
var org_quickcorp_qcobjects_defaultsettings_exports = {};
__export(org_quickcorp_qcobjects_defaultsettings_exports, {
  __get_version__: () => __get_version__,
  __get_version_string__: () => __get_version_string__
});
__require("qcobjects");
var { CONFIG, global, logger, _Crypt, findPackageNodePath, Export } = __require("qcobjects");
var __get_version__ = /* @__PURE__ */ __name(() => {
  const path5 = __require("path");
  const absolutePath3 = path5.resolve(__dirname, "./");
  const package_config2 = __require(path5.resolve(process.cwd(), "package.json"));
  const qcobjects_pkg_config = __require("qcobjects/package.json");
  const qcobjects_sdk_pkg_config = __require("qcobjects-sdk/package.json");
  return {
    "qcobjects": qcobjects_pkg_config.version,
    "sdk": qcobjects_sdk_pkg_config.version,
    "cli": package_config2.version
  };
}, "__get_version__");
var __get_version_string__ = /* @__PURE__ */ __name(() => {
  const version = __get_version__();
  return "QCObjects: v" + version.qcobjects + ", SDK: v" + version.sdk + ", CLI: v" + version.cli;
}, "__get_version_string__");
Export(__get_version__);
Export(__get_version_string__);
var __load_default_settings__ = /* @__PURE__ */ __name(() => {
  CONFIG.set("documentRootFileIndex", "index.html");
  CONFIG.set("projectPath", `${process.cwd()}/`);
  CONFIG.set("useConfigService", false);
  CONFIG.set("documentRoot", "./");
  CONFIG.set("serverPortHTTP", 80);
  CONFIG.set("serverPortHTTPS", 443);
  CONFIG.set("private-key-pem", "localhost-privkey.pem");
  CONFIG.set("private-cert-pem", "localhost-cert.pem");
  CONFIG.set("allowHTTP1", true);
  CONFIG.set("useTemplate", false);
  CONFIG.set("domain", "localhost");
  const setDevMode = /* @__PURE__ */ __name((devmode) => {
    if (typeof devmode !== "undefined") {
      switch (true) {
        case devmode == "debug":
          logger.debugEnabled = true;
          logger.warnEnabled = true;
          logger.infoEnabled = true;
          break;
        case devmode == "warn":
          logger.debugEnabled = false;
          logger.warnEnabled = true;
          logger.infoEnabled = true;
          break;
        case devmode == "info":
          logger.debugEnabled = false;
          logger.warnEnabled = false;
          logger.infoEnabled = true;
          break;
        default:
          logger.debugEnabled = false;
          logger.warnEnabled = false;
          logger.infoEnabled = false;
          break;
      }
    } else {
      logger.debugEnabled = false;
      logger.warnEnabled = false;
      logger.infoEnabled = false;
    }
  }, "setDevMode");
  try {
    var _config = __require(CONFIG.get("projectPath") + "config.json");
    logger.debug("Loading settings from your config.json");
    const _secretKey = Object.hasOwn(_config, "domain") ? _config["domain"] : "_secret_";
    if (Object.hasOwn(_config, "__encoded__")) {
      _config = JSON.parse(_Crypt.decrypt(_config.__encoded__, _secretKey));
    }
    for (var k in _config) {
      CONFIG.set(k, _config[k]);
    }
    setDevMode(CONFIG.get("devmode", ""));
    if (typeof CONFIG.get("backend") !== "undefined") {
      global.set("backendAvailable", true);
      if (typeof CONFIG.get("basePath") !== "undefined") {
        logger.debug(`Changing the current directory: ${process.cwd()}`);
        try {
          process.chdir(CONFIG.get("basePath"));
          logger.debug(`New directory: ${process.cwd()}`);
        } catch (err) {
          logger.warn(`It was impossible to change the current chdir: ${err}`);
        }
      }
    }
  } catch (e) {
    logger.debug(e);
    logger.debug("Something went wrong trying to load config.json file in your project");
  }
  (async function() {
    const path5 = __require("path");
    const projectPath = CONFIG.get("projectPath", `${process.cwd()}/`);
    const loadDefaultRoutes = /* @__PURE__ */ __name(async () => {
      return await new Promise((resolve, reject) => {
        const sdkPath = path5.resolve(findPackageNodePath("qcobjects-sdk"), "qcobjects-sdk");
        const qcobjectsPath = path5.resolve(findPackageNodePath("qcobjects"), "qcobjects");
        let backend = CONFIG.get("backend");
        if (typeof backend === "undefined") {
          backend = {};
        }
        if (typeof backend.routes === "undefined") {
          backend.routes = [];
        }
        backend.routes = backend.routes.concat([
          {
            "name": "QCObjects.js",
            "description": "Redirection of QCObjects.js",
            "path": "^/QCObjects.js$",
            "microservice": "com.qcobjects.backend.microservice.static",
            "redirect_to": path5.resolve(qcobjectsPath, "src", "QCObjects.js"),
            "responseHeaders": {},
            "cors": {
              "allow_origins": "*"
            }
          },
          {
            "name": "QCObjects-SDK.js",
            "description": "Redirection of QCObjects SDK",
            "path": "^/js/packages/QCObjects-SDK.js$",
            "microservice": "com.qcobjects.backend.microservice.static",
            "redirect_to": path5.resolve(sdkPath, "src/QCObjects-SDK.js"),
            "responseHeaders": {},
            "cors": {
              "allow_origins": "*"
            }
          },
          {
            "name": "QCObjects-SDK Components",
            "description": "Redirection of QCObjects SDK",
            "path": "^/qcobjects-sdk/(.*)$",
            "microservice": "com.qcobjects.backend.microservice.static",
            "redirect_to": path5.resolve(sdkPath, "$1"),
            "responseHeaders": {},
            "cors": {
              "allow_origins": "*"
            }
          }
        ]);
        CONFIG.set("backend", backend);
        resolve();
      });
    }, "loadDefaultRoutes");
    await loadDefaultRoutes();
  })().then(() => logger.info("Default routes loaded")).catch((e) => {
    logger.warn(`An error ocurred loading default settings: ${e}`);
  });
  (function() {
    const path5 = __require("path");
    const fs3 = __require("fs");
    const projectPath = CONFIG.get("projectPath", `${process.cwd()}/`);
    logger.debug(`CONFIG.projectPath is set to ${projectPath}`);
    const findPath = /* @__PURE__ */ __name((p) => {
      const packagePath = path5.resolve(findPackageNodePath(p), p);
      return packagePath;
    }, "findPath");
    const getPackageJSON = /* @__PURE__ */ __name((p) => {
      let _json;
      try {
        const packagePath = findPath(p);
        if (typeof packagePath !== "undefined") {
          _json = JSON.parse(fs3.readFileSync(path5.resolve(`${packagePath}`, "./package.json")).toString());
        } else {
          _json = {};
        }
      } catch (e) {
        logger.debug(`It was impossible to get the package.json from ${p}: ${e}`);
        _json = {};
      }
      return _json;
    }, "getPackageJSON");
    const hasKeyword = /* @__PURE__ */ (() => {
      let keywords = {};
      return (p, keyword) => {
        if (typeof keywords === "undefined") {
          keywords = {};
        }
        try {
          if (typeof keywords[p] === "undefined") {
            keywords[p] = getPackageJSON(p).keywords;
          }
        } catch (e) {
          throw Error(`Something went wrong when trying to get the keywords of ${p}`);
        }
        return typeof keywords[p] !== "undefined" && keywords[p].includes(keyword);
      };
    })();
    const setBackendValue = /* @__PURE__ */ __name((name, value) => {
      const backend = CONFIG.get("backend", {});
      if (typeof value !== "undefined") {
        backend[name] = value;
      }
      CONFIG.set("backend", backend);
    }, "setBackendValue");
    const dependencies = /* @__PURE__ */ (() => {
      let deps = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(fs3.readFileSync(path5.resolve(`${projectPath}`, "./package.json")).toString()).dependencies);
          setBackendValue("dependencies", deps);
        }
        return deps;
      };
    })();
    const devDependencies = /* @__PURE__ */ (() => {
      let deps = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(fs3.readFileSync(path5.resolve(`${projectPath}`, "./package.json")).toString()).devDependencies);
          setBackendValue("devDependencies", deps);
        }
        return deps;
      };
    })();
    const loadLibs = /* @__PURE__ */ __name(() => {
      let _ret_;
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_libs", false)) {
        const libs = dependencies().filter((p) => hasKeyword(p, "qcobjects-lib"));
        setBackendValue("libs", libs);
        if (libs.length > 0) {
          logger.debug(`Plugin Libs found: ${libs.join(",")}`);
          _ret_ = Promise.all(libs.map((p) => {
            return __require(findPath(p));
          })).then(() => logger.info("Libs loaded"));
        } else {
          logger.debug("No Plugin Libs found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load libs, set autodiscover_libs to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadLibs");
    const loadHandlers = /* @__PURE__ */ __name(() => {
      let _ret_;
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_handlers", false)) {
        const handlers = dependencies().filter((p) => hasKeyword(p, "qcobjects-handler"));
        setBackendValue("handlers", handlers);
        if (handlers.length > 0) {
          logger.debug(`Plugin Handlers found: ${handlers.join(",")}`);
          _ret_ = Promise.all(handlers.map((p) => {
            return __require(findPath(p));
          })).then(() => logger.info("Handlers loaded"));
        } else {
          logger.debug("No Plugin Handlers found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load handlers, set autodiscover_handlers to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadHandlers");
    const loadCommands = /* @__PURE__ */ __name(() => {
      let _ret_;
      logger.debug(`Looking for custom commands as dependencies in: ${projectPath}/package.json`);
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
        const commands = dependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("commands", commands);
        if (commands.length > 0) {
          logger.debug(`Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map((p) => {
            return __require(findPath(p));
          })).then(() => logger.info("Commands loaded"));
        } else {
          logger.debug("No Plugin Commands found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadCommands");
    const loadDevCommands = /* @__PURE__ */ __name(() => {
      let _ret_;
      logger.debug(`Looking for custom commands as dev dependencies in: ${projectPath}/package.json`);
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
        const commands = devDependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("devCommands", commands);
        if (commands.length > 0) {
          logger.debug(`Dev Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map((p) => {
            return __require(findPath(p));
          })).then(() => logger.info("Commands loaded"));
        } else {
          logger.debug("No Plugin Commands found in dev dependencies.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadDevCommands");
    if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_libs", false) || CONFIG.get("autodiscover_handlers", false) || CONFIG.get("autodiscover_commands", false)) {
      logger.info("Auto discover is enabled");
    } else if (!CONFIG.get("autodiscover", false)) {
      logger.info("Auto discover is disabled");
      logger.debug("To load all dependencies, set autodiscover to true in your config.json");
    } else {
      logger.info("Auto discover is disabled");
    }
    try {
      logger.debug("Loading Libs...");
      loadLibs().catch((e) => {
        logger.warn(`An error ocurred loading libs: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load libs: ${e.message}`);
    }
    try {
      logger.debug("Loading Handlers...");
      loadHandlers().catch((e) => {
        logger.warn(`An error ocurred loading handlers: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load handler: ${e.message}`);
    }
    try {
      logger.debug("Loading Commands...");
      loadCommands().catch((e) => {
        logger.warn(`An error ocurred loading commands: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load commands: ${e.message}`);
    }
    try {
      logger.debug("Loading Dev Commands...");
      loadDevCommands().catch((e) => {
        logger.warn(`An error ocurred loading dev commands: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load Dev commands: ${e.message}`);
    }
    try {
      const commands = CONFIG.get("backend", { commands: [] }).commands || [];
      const devCommands = CONFIG.get("backend", { devCommands: [] }).devCommands || [];
      setBackendValue("plugins", commands.concat(devCommands));
    } catch (e) {
      throw Error(`Something went wrong trying to load plugins list: ${e.message}`);
    }
    logger.info("Dependencies loaded");
    process.once("SIGTERM", () => {
      console.log("\x1B[33m%s\x1B[0m", "Bye bye!");
      process.exit();
    });
  })();
}, "__load_default_settings__");
global.__load_default_settings__ = __load_default_settings__;
global.__load_default_settings__();
var cleanCache = /* @__PURE__ */ __name(() => {
  Object.keys(__require.cache).forEach((key) => {
    delete __require.cache[key];
  });
}, "cleanCache");
var __reset_settings__ = /* @__PURE__ */ __name(() => {
  cleanCache();
  global.__load_default_settings__();
}, "__reset_settings__");
global.__reset_settings__ = __reset_settings__;

// src/org.qcobjects.enterprise.commands.ts
import { execSync } from "node:child_process";
var { Package, InheritClass, CONFIG: CONFIG2, logger: logger2 } = __require("qcobjects");
var license = CONFIG2.get("enterprise-license", "1234");
var email = CONFIG2.get("enterprise-email", "a@b.com");
var QCObjectsEnterprise = class extends InheritClass {
  static {
    __name(this, "QCObjectsEnterprise");
  }
  install() {
    const instance = this;
    return instance.installEnterprise(license, email);
  }
  upgrade(switchCommander) {
    const instance = this;
    const readline = __require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    var emailQuestion = /* @__PURE__ */ __name(function() {
      rl.question(`
  [NOTE: No information will be sent to a server until I got your consent]

  Please tell me your e-Mail (\u{1F48C}):
  `, (email2) => {
        if (email2 !== "") {
          var phoneNumberQuestion = /* @__PURE__ */ __name(function() {
            rl.question("Please tell me your phone number (\u{1F919}): \n", (phonenumber) => {
              if (phonenumber !== "") {
                rl.question(`
  Please select one of the following options (type a number):

  1.- \u{1F640} This is your first interaction \u{1F60D} with QCObjects Enterprise Edition \u{1F3E2},
  you want to send your email and phone number to one of our executives to process your
  inquiry, pay the license (when aplies) and receive a new fresh license number
  that will free up to you the most advanced features for large companies

  2.- \u2714 Your assigned executive \u{1F9D1} has given to you a new fresh QCObjects Enterprise Edition License Number
  and you want to enter it to follow up with the next steps.

  3.- \u{1F3C3} You want to quit this form, as you got here accidentally
  (You should think about it. It's not a coincidence, It's destiny \u{1F600}).

  Please enter the number of the option and press [enter]: `, (interaction_option) => {
                  logger2.infoEnabled = true;
                  switch (interaction_option) {
                    case "1":
                      switchCommander.register(email2, phonenumber).then(function() {
                        logger2.info(`\u{1F44F} Congrats! You have been successfully registered to the cloud! \u{1F44F}
  One of our executives will be in touch with you as soon as possible to give you the next steps
  to get a new License Number and start using QCObjects Entrprise Edition!

  (In the meantime, you can continue using all the features of the QCObjects Community Edition)
  `);
                        rl.close();
                      }).catch(() => {
                        rl.close();
                      });
                      break;
                    case "2":
                      rl.stdoutMuted = true;
                      rl._writeToOutput = /* @__PURE__ */ __name(function _writeToOutput(stringToWrite) {
                        if (rl.stdoutMuted)
                          rl.output.write("*");
                        else
                          rl.output.write(stringToWrite);
                      }, "_writeToOutput");
                      rl.question("Please tell me the number of license that your executive has given to you: \n", (license2) => {
                        rl.stdoutMuted = false;
                        instance.installEnterprise(license2, email2);
                        rl.close();
                      });
                      break;
                    default:
                      logger2.info("\u{1F937} You can continue to use QCObjects Community Edition, see you! \u{1F64B} ");
                      rl.close();
                      break;
                  }
                });
              } else {
                console.log(`You need to enter a Phone Number if you want to be contacted.
  If you want to quit, press Ctrl-C.
  `);
                phoneNumberQuestion();
              }
            });
          }, "phoneNumberQuestion");
          phoneNumberQuestion();
        } else {
          console.log(`You need to enter a real e-Mail adress if you want to be contacted.
  If you want to quit, press Ctrl-C.
  `);
          emailQuestion();
        }
      });
    }, "emailQuestion");
    emailQuestion();
  }
  installEnterprise(license2, email2) {
    const asterisk = "*";
    logger2.info(`Your entered license number is ${asterisk.repeat(license2.length)} and the email that you have entered is ${email2}`);
    logger2.info("Now, I'm installing QCObjects Enterprise Edition in your computer...");
    const cmdDownloadGit = `npm i --force -g git+https://license:${license2}@software.qcobjects.io/qcobjects-enterprise/qcobjects-enterprise.git`;
    execSync(cmdDownloadGit);
    const stdout = execSync("qcobjects --version");
    if (stdout.lastIndexOf("Enterprise Edition") !== -1) {
      logger2.info("\u{1F44F} Congrats! Now you have installed QCObjects Entrprise Edition! \u{1F44F}");
      logger2.info(`You can test it using:
> qcobjects --version

To find more help, type the command:

> qcobjects --help

Enjoy!
`);
    } else {
      console.log("\u{1F926} Something went wrong \u{1F926} when trying to update your license to QCObjects Enterprise Edition");
      console.log("Ask your executive to help");
    }
  }
};
Package("org.qcobjects.enterprise.commands", [
  QCObjectsEnterprise
]);

// src/org.quickcorp.qcobjects.api.client_services.ts
var { Package: Package2, Service, logger: logger3 } = __require("qcobjects");
var QuickCorpCloud = class extends Service {
  static {
    __name(this, "QuickCorpCloud");
  }
  constructor({
    name = "quickcorp_cloud",
    external = true,
    useHTTP2 = true,
    cached = false,
    method = "post",
    headers = {
      "origin": "localhost",
      "content-type": "application/json"
    },
    basePath = "https://cloud.quickcorp.org/",
    url = "",
    withCredentials = false
  }) {
    super({
      name,
      external,
      useHTTP2,
      cached,
      method,
      headers,
      basePath,
      url,
      withCredentials
    });
  }
  _new_(o) {
    this.headers["authorization"] = "Basic token";
    this.url = this.basePath + o.apiMethod;
    this.data = o.data;
  }
  done(service, standardResponse) {
    logger3.debug(standardResponse);
  }
  fail(e) {
    logger3.debug(e);
  }
};
Package2("org.quickcorp.qcobjects.api.client_services", [
  QuickCorpCloud
]);

// src/com.qcobjects.cli.commands.version.ts
var fs = __require("fs");
var path = __require("path");
var { exec, execSync: execSync2 } = __require("child_process");
var { Package: Package3, InheritClass: InheritClass2, logger: logger4 } = __require("qcobjects");
var CommandHandler = class extends InheritClass2 {
  static {
    __name(this, "CommandHandler");
  }
  constructor({ switchCommander }) {
    super({ switchCommander });
    const commandHandler = this;
    this.choiceOption = {
      v_major(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major: major + 1, minor, patch }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_minor(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major, minor: minor + 1, patch }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_patch(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major, minor, patch: patch + 1 }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_sync(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        var commandHandler2 = this;
        commandHandler2.switchCommander.shellCommands([
          "echo $(git describe)"
        ]).then(function(response) {
          const versionString = response[0].split("-")[0].slice(1).replace("\n", "");
          console.log(versionString);
          const versionSuffix = commandHandler2.parseVersionSuffix(versionString);
          const versionObject = commandHandler2.parseVersionString(versionString);
          const major = parseInt(versionObject.major);
          const minor = parseInt(versionObject.minor);
          const patch = parseInt(versionObject.patch);
          const newVersion = commandHandler2.buildNewVersionString({ major, minor, patch }, versionSuffix);
          commandHandler2.saveNewVersionFile(filename, newVersion);
          var commitMsg = options.commitMsg || `Synced Version v${newVersion}`;
          commandHandler2.switchCommander.shellCommands(
            [
              "git fetch --tags -f",
              `git add . && git commit -am "${commitMsg}"`,
              "git fetch origin --tags",
              "git tag -ln",
              `npm version "${newVersion}" --allow-same-version -m "${commitMsg}"`,
              "git push && git push --tags"
            ]
          ).then(function(response2) {
            console.log(response2);
          });
        });
      },
      v_changelog() {
        const commandHandler2 = this;
        commandHandler2.switchCommander.shellCommands(
          [
            "git tag -ln"
          ]
        ).then(function(response) {
          var versionTags = response[0].split("\n").map((tag) => tag.split(" ").unique()).unique().map(
            (tag) => {
              return {
                "version": tag[0],
                "major": tag[0].split(".")[0],
                "minor": tag[0].split(".")[0] + "." + tag[0].split(".")[1],
                "description": tag.slice(1).join(" ").trim()
              };
            }
          );
          var minorVersionTags = versionTags.filter((tag) => tag.version !== "").map((tag) => tag.version.split(".")[0] + "." + tag.version.split(".")[1]).unique();
          var history = minorVersionTags.map((minor) => {
            return {
              "major": minor.split(".")[0],
              "minor": minor,
              "history": "\n	- " + versionTags.filter((tag) => tag.minor === minor).map(
                function(tag) {
                  return tag.description;
                }
              ).filter((desc) => !desc.startsWith(minor.slice(1))).sort().unique().join("\n	- ")
            };
          }).map((hist) => {
            return `## ${hist.major} -> ${hist.minor}
` + hist.history;
          }).join("\n");
          const subtitle = "This is an automatic Changelog history of versions generated using the command: **qcobjects v-changelog > CHANGELOG.md**";
          console.log("# Changelog \n\n" + subtitle + "\n\n" + history);
        });
      }
    };
    switchCommander.program.command("v-major [filename]").option("--git, --sync-git", "Sync with Git").option("--npm, --sync-npm", "Sync with NPM").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Upgrade to a new major version").action(function(args, options) {
      commandHandler.choiceOption.v_major.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-minor [filename]").option("--git, --sync-git", "Sync with Git").option("--npm, --sync-npm", "Sync with NPM").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Upgrade to a new minor version").action(function(args, options) {
      commandHandler.choiceOption.v_minor.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-patch [filename]").option("--git, --sync-git", "Sync with Git").option("--npm, --sync-npm", "Sync with NPM").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Upgrade to a new patch version").action(function(args, options) {
      commandHandler.choiceOption.v_patch.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-sync [filename]").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Sync the version of NPM with version of GIT").action(function(args, options) {
      commandHandler.choiceOption.v_sync.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-changelog").description("Semantic Versioning: Shows a changelog using Semantic Versioning").action(function(args, options) {
      commandHandler.choiceOption.v_changelog.call(commandHandler, args, options);
    });
  }
  syncGit(versionString, commitMsg, syncNpm = false) {
    let _commands_ = [];
    if (syncNpm) {
      _commands_ = _commands_.concat(
        [
          "git fetch --tags -f",
          `npm version "${versionString}" -m "${commitMsg}"`
        ]
      );
    }
    _commands_ = _commands_.concat(
      [
        `git add . && git commit -am "${commitMsg}"`,
        "git fetch origin --tags",
        "git tag -ln"
      ]
    );
    if (!syncNpm) {
      _commands_ = _commands_.concat(
        [
          `git tag -a "v${versionString}" -m "${commitMsg}"`
        ]
      );
    }
    _commands_ = _commands_.concat(
      [
        "git push && git push --tags"
      ]
    );
    this.switchCommander.shellCommands(_commands_).then(function(response) {
      logger4.info("Synced to Git");
      logger4.debug(response);
    }).catch(function(e) {
      logger4.info("Something went wrong trying to sync to git");
      logger4.debug(e);
    });
  }
  parseVersionString(versionString) {
    versionString = versionString.replace("\n", "");
    const regexpVer = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    const versionObject = { ...versionString.match(regexpVer)?.groups };
    return versionObject;
  }
  getVersionStringFromFile(filename) {
    let versionString;
    try {
      versionString = fs.readFileSync(filename).toString().replace("\n", "");
    } catch (e) {
      versionString = "0.0.1";
    }
    return versionString;
  }
  buildNewSemVersionString({ major, minor, patch }) {
    return `${major}.${minor}.${patch}`;
  }
  parseVersionSuffix(versionString) {
    versionString = versionString.replace("\n", "");
    const versionObject = this.parseVersionString(versionString);
    const semVersionString = this.buildNewSemVersionString(versionObject);
    return versionString.replace(semVersionString, "");
  }
  buildNewVersionString({ major, minor, patch }, suffix) {
    const semVersionString = this.buildNewSemVersionString({ major, minor, patch });
    return `${semVersionString}${suffix}`;
  }
  saveNewVersionFile(filename, versionString) {
    fs.writeFileSync(filename, versionString);
  }
};
Package3("com.qcobjects.cli.commands.version", [
  CommandHandler
]);

// src/com.qcobjects.cli.commands.jira.client_services.ts
var { Package: Package4, Service: Service2, logger: logger5 } = __require("qcobjects");
var JiraCloud = class extends Service2 {
  static {
    __name(this, "JiraCloud");
  }
  constructor({
    name = "jira_cloud",
    external = true,
    useHTTP2 = true,
    cached = false,
    method = "POST",
    headers = {
      "accept": "application/json",
      "content-type": "application/json"
    },
    basePath = "",
    url = "",
    withCredentials = false
  }) {
    super({
      name,
      external,
      useHTTP2,
      cached,
      method,
      headers,
      basePath,
      url,
      withCredentials
    });
    var o = this;
    this.domain = `${o.domain}`;
    this.basePath = `https://${this.domain}/`;
    this.username_password = `${o.username}:${o.password}`;
    this.headers["authorization"] = `Basic ${Buffer.from(this.username_password).toString("base64")}`;
    this.url = this.basePath + o.apiMethod;
    this.data = o.data;
  }
  done(service, standardResponse) {
    logger5.debug(standardResponse);
  }
  fail(e) {
    logger5.debug(e);
  }
};
Package4("com.qcobjects.cli.commands.jira.client_services", [
  JiraCloud
]);

// src/com.qcobjects.cli.commands.jira.ts
var path2 = __require("path");
var absolutePath = path2.resolve(__dirname, "./");
var {
  exec: exec2,
  execSync: execSync3
} = __require("child_process");
var { Package: Package5, InheritClass: InheritClass3, _DataStringify, New, CONFIG: CONFIG3, logger: logger6, serviceLoader } = __require("qcobjects");
var CommandHandler2 = class extends InheritClass3 {
  static {
    __name(this, "CommandHandler");
  }
  constructor({
    switchCommander
  }) {
    super({ switchCommander });
    this.choiceOption = {
      issues: /* @__PURE__ */ __name(function() {
        this.getIssueList().then(function(response) {
          console.log(_DataStringify(response));
        }).catch((e) => {
          console.log(e);
          process.exit(1);
        });
      }, "issues")
    };
    const commandHandler = this;
    switchCommander.program.command("jira <subcommand>").option("-u, --from-user [username]", "User name").option("-fp,--from-project <projectName>", "Project name").option("-p, --pwd <password>", "Password").option("-f, --format <format>", "Format (json, table)").description(`Jira Integration:
                            Sub-Commands can be:
                                issues: To get the issues list from JIRA
        `).action(function(subcommand, options) {
      if (commandHandler.choiceOption.hasOwnProperty.call(commandHandler.choiceOption, subcommand)) {
        commandHandler.choiceOption[subcommand].call(commandHandler, subcommand, options);
      } else {
        console.error(`Sub-Command (jira ${subcommand}... ) is not available`);
        process.exit(1);
      }
    });
  }
  getIssueList() {
    return new Promise(function(resolve, reject) {
      logger6.info("I'm going to get the issue list from the jira cloud...");
      const jira_config = CONFIG3.get("jira", null);
      if (jira_config !== null) {
        const jira_username = jira_config.username;
        const jira_password = jira_config.auth_token;
        const jira_project = jira_config.project;
        const jira_domain = jira_config.domain;
        const jira_issue_fields = ["id", "key", "summary", "timetracking"];
        const cloudClient = New(JiraCloud, {
          domain: `${jira_domain}`,
          username: `${jira_username}`,
          password: `${jira_password}`,
          apiMethod: "rest/api/latest/search",
          data: {
            "jql": `project = ${jira_project}`,
            "startAt": 0,
            "maxResults": 5e3,
            "fields": jira_issue_fields
          }
        });
        try {
        } catch (e) {
          console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
          reject(e);
        }
      } else {
        console.error("\u{1F926} Something went wrong \u{1F926} You need to set the jira config settings");
        reject(new Error("\u{1F926} Something went wrong \u{1F926} You need to set the jira config settings"));
      }
    });
  }
};
Package5("com.qcobjects.cli.commands.jira", [
  CommandHandler2
]);

// src/org.quickcorp.qcobjects.cli.ts
var fs2 = __require("fs");
var path3 = __require("path");
var templatePwaPath = path3.resolve(__dirname, "./templates/pwa/") + "/";
var { exec: exec3, execSync: execSync4 } = __require("child_process");
__require("qcobjects");
var { CONFIG: CONFIG4, findPackageNodePath: findPackageNodePath2, logger: logger7, Package: Package6, InheritClass: InheritClass4, New: New2, serviceLoader: serviceLoader2, global: global2, Service: Service3, Component } = __require("qcobjects");
CONFIG4.set("node_modules_path", "./node_modules/");
CONFIG4.set("qcobjectsnewapp_path", CONFIG4.get("node_modules_path") + "/qcobjectsnewapp");
var getPluginCommandsList = /* @__PURE__ */ __name(() => {
  return global2.ClassesList.filter((c) => c.packageName.startsWith("com.qcobjects.cli.commands.")).filter((p) => p.classFactory.name.endsWith("CommandHandler"));
}, "getPluginCommandsList");
var SwitchCommander = class extends InheritClass4 {
  static {
    __name(this, "SwitchCommander");
  }
  choiceOption = {
    generateSw: /* @__PURE__ */ __name((_appName, options) => {
      const dirPrefix = options.dir;
      const switchCommander = this;
      const appName = typeof _appName === "undefined" || _appName === true ? "MyAppName" : _appName;
      switchCommander.generateServiceWorker(appName, dirPrefix).catch((e) => {
        logger7.warn(`An error ocurred while creating service worker: ${e}`);
      });
    }, "generateSw"),
    create: /* @__PURE__ */ __name((_appName, options) => {
      const version = __get_version__();
      const switchCommander = this;
      const appName = typeof _appName === "undefined" || _appName === true ? "MyAppName" : _appName;
      let appTemplateName;
      if (options.createAmp) {
        appTemplateName = "qcobjects-ecommerce-amp";
      } else if (options.createPwa) {
        appTemplateName = "qcobjectsnewapp";
      } else if (options.createPhp) {
        appTemplateName = "qcobjectsnewphp";
      } else if (options.createCustom) {
        appTemplateName = options.createCustom;
      } else {
        appTemplateName = "qcobjectsnewapp";
      }
      CONFIG4.set("qcobjectsnewapp_path", CONFIG4.get("node_modules_path") + "/" + appTemplateName);
      const _package_json_template_fname = path3.resolve(CONFIG4.get("qcobjectsnewapp_path", "qcobjectsnewapp"), "./package.json");
      const createAppCommand = "npm init -y";
      const _package_json_file = path3.resolve(CONFIG4.get("projectPath"), "./package.json");
      logger7.debug("_package_json_file: " + _package_json_file);
      logger7.debug(createAppCommand);
      exec3(createAppCommand, (err) => {
        if (err) {
          throw Error(err.message);
          process.exit(1);
          return;
        }
        exec3(`npm i --save-dev ${appTemplateName}`, () => {
          const _package_json_template_file = __require(_package_json_template_fname);
          _package_json_template_file.name = appName;
          _package_json_template_file.version = "1.0.0";
          _package_json_template_file.repository = {};
          fs2.writeFileSync(_package_json_file, JSON.stringify(_package_json_template_file, null, 4));
          logger7.info("Good! App Templates was installed!");
          console.log(`Starting to copy files from app template ${appTemplateName} to your project...`);
          switchCommander.copyTemplate(path3.resolve(findPackageNodePath2(appTemplateName), appTemplateName), path3.resolve(CONFIG4.get("projectPath"), "./")).then(() => {
            exec3("npm uninstall " + appTemplateName + " --save && npm cache verify", (err2) => {
              if (err2) {
                throw Error(err2.message);
                process.exit(1);
                return;
              }
              execSync4("npm install --save-dev qcobjects-cli ");
            });
            exec3("npm cache verify && npm i ", (err2) => {
              if (err2) {
                throw Error(err2.message);
                process.exit(1);
                return;
              }
              logger7.info("Good! Your application is done. You can play with QCObjects now!");
              logger7.info("I will create the SSL certificates now. It may take some time...");
              exec3("qcobjects-createcert", () => {
                logger7.info("Test certificates generated");
                const githubService = New2(Service3);
                githubService.url = "https://raw.githubusercontent.com/QuickCorp/QCObjects/main/.gitignore";
                githubService.headers = {
                  Accept: "application/vnd.github+json",
                  "X-GitHub-Api-Version": "2022-11-28",
                  "User-Agent": "qcobjects-cli"
                };
                githubService.done = () => {
                };
                serviceLoader2(githubService).then(({ service }) => {
                  fs2.writeFileSync(path3.resolve(CONFIG4.get("projectPath"), "./.gitignore"), service.template);
                  try {
                    execSync4("git init");
                    logger7.debug("Git initialized.");
                  } catch (e) {
                    logger7.debug("Could not initialize git.");
                  }
                });
              }).stdout.on("data", function(data) {
                console.log(data);
              });
            }).stdout.on("data", function(data) {
              console.log(data);
            });
          }).catch((e) => {
            console.log(e);
          });
        }).stdout.on("data", function(data) {
          console.log(data);
        });
      }).stdout.on("data", function() {
        console.log("App generation started...");
      });
    }, "create"),
    publish(_appName, _options) {
      logger7.debug("publish is not yet implemented");
    },
    upgradeToEnterprise(_appName, _options) {
      const switchCommander = this;
      QCObjectsEnterprise.upgrade(switchCommander);
    }
  };
  constructor() {
    super();
    this.program = require_commander();
  }
  shellCommands(_shell_commands) {
    return new Promise(function(resolve_all, reject_all) {
      var _promises_set = _shell_commands.map(
        function(shell_command) {
          return new Promise(
            function(resolve, reject) {
              logger7.debug(shell_command);
              exec3(shell_command, (err, stdout, stderr) => {
                if (!err) {
                  resolve(stdout);
                } else {
                  logger7.debug(`[FAILED]: ${shell_command}`);
                  logger7.debug(`${stderr}`);
                  reject(stderr);
                }
              }).stdout.on("data", function(data) {
                logger7.info(data);
              });
            }
          ).catch((e) => reject_all(e));
        }
      );
    }).catch((e) => console.log(e));
  }
  fileListRecursive(dir) {
    var instance = this;
    return fs2.statSync(dir).isDirectory() ? Array.prototype.concat(...fs2.readdirSync(dir).map((f) => instance.fileListRecursive(path3.join(dir, f)))).filter((f) => {
      return !f.startsWith(".git") && f.lastIndexOf(".DS_Store") == -1;
    }) : dir;
  }
  register(email2, phonenumber) {
    return new Promise(function(resolve, reject) {
      logger7.info("I'm going to register your profile on the cloud...");
      const cloudClient = New2(QuickCorpCloud, {
        apiMethod: "register",
        data: { email: email2, phonenumber }
      });
      try {
      } catch (e) {
        console.log("\u{1F926} Something went wrong \u{1F926} when trying to register you in the cloud");
        reject(e);
      }
    });
  }
  generateServiceWorker(appName, dirPrefix = "./") {
    const writeContent = /* @__PURE__ */ __name((component) => {
      const parsedText = component.parseTemplate(component.template);
      logger7.debug("Starting to write the sw file...");
      fs2.writeFile(`${dirPrefix}/sw.js`, parsedText, (err) => {
        if (err) {
          throw Error(err);
        }
        logger7.info("Service Worker Generated");
        console.log("");
        console.log("Now simply put:");
        console.log("CONFIG.set('serviceWorkerURI','/sw.js');");
        console.log(" In your init.js file ");
        console.log("");
        console.log("To start your app in a local server ");
        console.log("Execute the command: ");
        console.log("> qcobjects launch <appname>");
        console.log("");
      });
    }, "writeContent");
    class ServiceWorkerComponent extends Component {
      static {
        __name(this, "ServiceWorkerComponent");
      }
      cached = false;
      templateURI = "sw.js";
      basePath = templatePwaPath;
      name = "sw";
      tplsource = "default";
      template = "";
      constructor({ name, data }) {
        super({ name, data });
      }
      done({ request, component }) {
        super.done({ request, component });
        writeContent(component);
      }
    }
    return new Promise(() => {
      var filelist = ["/"].concat(this.fileListRecursive(`${dirPrefix}`));
      if (typeof dirPrefix !== "undefined" && dirPrefix !== "./" && dirPrefix !== ".") {
        filelist = filelist.map((f) => f.replace(new RegExp(`${dirPrefix}/`), ""));
      }
      filelist = filelist.filter(function(fl) {
        return fl !== "sw.js" && !fl.startsWith("node_modules/");
      });
      filelist = filelist.filter((fname) => !fname.endsWith(".pem"));
      filelist = filelist.filter((fname) => !fname.endsWith(".sh"));
      filelist = filelist.filter((fname) => !new RegExp("^package(.*).json$").test(fname));
      filelist = filelist.filter((fname) => !fname.startsWith("."));
      var fileListString = '\n	"' + filelist.join('",\n	"') + '"';
      const component = new ServiceWorkerComponent({
        name: "sw",
        data: {
          appName,
          appVersion: "1.0.0",
          filelist: fileListString
        }
      });
      setTimeout(() => {
        component.done({ request: null, component });
      }, 1e3);
    });
  }
  copyTemplate(source, dest) {
    return new Promise((resolve, reject) => {
      const copyDir = /* @__PURE__ */ __name((source2, dest2, exclude) => {
        source2 = path3.resolve(source2);
        dest2 = path3.resolve(dest2);
        const dname = path3.basename(source2);
        const dirExcluded = exclude.includes(dname);
        const isDir = /* @__PURE__ */ __name((d) => {
          return fs2.existsSync(d) && fs2.statSync(d).isDirectory() ? true : false;
        }, "isDir");
        const isFile = /* @__PURE__ */ __name((d) => {
          return fs2.existsSync(d) && fs2.statSync(d).isFile() ? true : false;
        }, "isFile");
        if (isDir(source2) && !dirExcluded) {
          fs2.mkdirSync(dest2, { recursive: true });
          const paths = fs2.readdirSync(source2, { withFileTypes: true });
          const dirs = paths.filter((d) => d.isDirectory());
          const files = paths.filter((f) => f.isFile());
          ((paths2, dirs2, files2, exclude2) => {
            files2.map((f) => {
              const sourceFile = path3.resolve(source2, f.name);
              const destFile = path3.resolve(dest2, f.name);
              const fileExcluded = exclude2.includes(f.name);
              if (isFile(sourceFile) && !fileExcluded) {
                logger7.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2.join(",")}...`);
                fs2.copyFileSync(sourceFile, destFile);
                logger7.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2.join(",")}...DONE!`);
              }
            });
            dirs2.map((d) => {
              const sourceDir = path3.resolve(source2, d.name);
              const destDir = path3.resolve(dest2, d.name);
              copyDir(sourceDir, destDir, exclude2);
            });
          })(paths, dirs, files, exclude);
        }
      }, "copyDir");
      try {
        const exclude = [
          "package.json",
          "node_modules",
          ".DS_Store"
        ];
        logger7.info(`[create] Copying files from ${source} to ${dest} excluding ${exclude.join(",")}...`);
        copyDir(source, dest, typeof exclude !== "undefined" ? exclude : []);
        resolve();
      } catch (e) {
        logger7.warn(`Something went wrong trying to publish static files: ${e.message}`);
        reject(e);
      }
    });
  }
  initCommand() {
    const switchCommander = this;
    if (process.argv.length > 1) {
      logger7.debug("Installing Commands...");
      switchCommander.program.version(__get_version_string__());
      switchCommander.program.command("create <appname>").description("Creates an app with <appname>").option("--pwa, --create-pwa", "Creates the progressive web app assets").option("--amp, --create-amp", "Creates the accelerated mobile pages assets").option("--php, --create-php", "Creates the PWA PHP assets").option("--custom, --create-custom <templateappname>", "Creates an App from any NPM package template").option("--tests, --create-tests", "Creates the test suite").action(function(args, options) {
        switchCommander.choiceOption.create.call(switchCommander, args, options);
      });
      try {
        logger7.debug("Loading Plugin Commands...");
        const importPluginCommands = /* @__PURE__ */ __name(function(switchCommander2) {
          return getPluginCommandsList().map((pluginCommand) => {
            try {
              logger7.debug(`Loading plugin ${pluginCommand.packageName}`);
              const classFactory = pluginCommand.classFactory;
              pluginCommand.plugin = new classFactory({ switchCommander: switchCommander2 });
            } catch (e) {
              throw Error(`Something went wrong loading ${pluginCommand.packageName}`);
            }
            return pluginCommand;
          });
        }, "importPluginCommands");
        importPluginCommands(switchCommander);
      } catch (e) {
        throw Error(`Something went wrong loading plugins: ${e.message}`);
      }
      switchCommander.program.command("publish <appname>").description("Publishes an app with <appname>").option("--pwa, --create-pwa", "Publishes the progressive web app assets").option("--amp, --create-amp", "Publishes the accelerated mobile pages assets").option("--php, --create-php", "Creates the PWA PHP assets").option("--custom, --create-custom", "Creates an App from any NPM package template").option("--tests, --create-tests", "Publishes the test suite").action((args, options) => {
        switchCommander.choiceOption.publish.bind(switchCommander)(args, options);
      });
      switchCommander.program.command("upgrade-to-enterprise").description("Upgrades to QCObjects Enterprise Edition").action(function(args, options) {
        switchCommander.choiceOption.upgradeToEnterprise.call(switchCommander, args, options);
      });
      switchCommander.program.command("generate-sw <appname>").option("-d, --dir <dirPrefix> ", "creates the service worker in a specific dir <dirPrefix>").description("Generates the service worker <appname>").action(function(args, options) {
        switchCommander.choiceOption.generateSw.call(switchCommander, args, options);
      });
      switchCommander.program.command("launch <appname>").description("Launches the application").action(function() {
        logger7.info("Launching...");
        setTimeout(() => {
          logger7.info("Go to the browser and open https://localhost ");
          logger7.info("Press Ctrl-C to stop serving ");
          exec3("qcobjects-server", () => {
          }).stdout.on("data", function(data) {
            console.log(data);
          });
        }, 5e3);
      });
      switchCommander.program.on("--help", function() {
        console.log("");
        console.log("Use:");
        console.log("  $ qcobjects-cli [command] --help");
        console.log("  For detailed information of a command ");
        console.log("");
        process.exit(0);
      });
      switchCommander.program.on("command:*", function() {
        console.error("Invalid command: %s\nSee --help for a list of available commands.", switchCommander.program.args.join(" "));
        process.exit(1);
      });
      switchCommander.program.parse(process.argv);
    } else {
      console.log("");
      console.log("Use:");
      console.log("  $ qcobjects-cli [command] --help");
      console.log("  For detailed information of a command ");
      console.log("");
      process.exit(0);
    }
  }
};
Package6("org.quickcorp.qcobjects.cli", [
  SwitchCommander
]);
global2.SwitchCommander = SwitchCommander;

// src/qcobjects-cli.ts
var path4 = __require("path");
var absolutePath2 = path4.resolve(__dirname, "./");
var templatePath = path4.resolve(__dirname, "./templates/apps/") + "/";
var package_config = __require(path4.resolve(process.cwd(), "package.json"));
var { logger: logger8, InheritClass: InheritClass5 } = __require("qcobjects");
logger8.debugEnabled = false;
var welcometo = "Welcome to \n";
var instructions = `
Community Edition
=================

This edition has the most of features that you can use for free but if you want to

Upgrade to \u{1F3E2} Enterprise Edition,
type the command:

> qcobjects upgrade-to-enterprise
`;
var logo = ` .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r
d88P" "Y88bd88P  Y88bd88P" "Y88b888       Y8P                888            \r
888     888888    888888     888888                          888            \r
888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r
888     888888       888     888888 "88b "888d8P  Y8bd88P"   888   88K      \r
888 Y8b 888888    888888     888888  888  88888888888888     888   "Y8888b. \r
Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r
 "Y888888"  "Y8888P"  "Y88888P" 88888P"   888 "Y8888  "Y8888P "Y888 88888P' \r
       Y8b                                888                               \r
                                         d88P                               \r
                                       888P"   `;
if (process.argv.length < 3 || process.argv[2] === "create") {
  console.log(welcometo);
  console.log(logo);
  console.log(instructions);
}
logger8.debugEnabled = false;
logger8.warnEnabled = false;
logger8.infoEnabled = false;
var Main = class extends InheritClass5 {
  static {
    __name(this, "Main");
  }
  constructor() {
    super();
    const main = this;
    const switchCommander = new SwitchCommander();
    switchCommander.initCommand();
    logger8.debug("initialized");
  }
};
var __main__ = new Main();
var qcobjects_cli_default = __main__;
export {
  Main,
  qcobjects_cli_default as default,
  org_quickcorp_qcobjects_defaultsettings_exports as defaultSettings
};
//# sourceMappingURL=qcobjects-cli.mjs.map
