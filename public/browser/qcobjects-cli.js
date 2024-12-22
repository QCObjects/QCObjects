#!/usr/bin/env node
"use strict";
var global = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/qcobjects/public/cjs/QCObjects.cjs
  var require_QCObjects = __commonJS({
    "node_modules/qcobjects/public/cjs/QCObjects.cjs"(exports, module) {
      "use strict";
      var __create = Object.create;
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __getProtoOf = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
      var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
        return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
      }, "__init"), "__esm");
      var __commonJS2 = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require2() {
        return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      }, "__require"), "__commonJS");
      var __export2 = /* @__PURE__ */ __name((target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      }, "__export");
      var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      }, "__copyProps");
      var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
        mod
      )), "__toESM");
      var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
      var require_assign = __commonJS2({
        "src/assign.ts"() {
          "use strict";
          if (typeof Object.assign !== "function") {
            Object.defineProperty(Object, "assign", {
              // eslint-disable-next-line no-unused-vars
              value: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function assign(target, varArgs) {
                "use strict";
                if (target === null) {
                  throw new TypeError("Cannot convert undefined or null to object");
                }
                const to = Object(target);
                for (let index = 1; index < arguments.length; index++) {
                  const nextSource = arguments[index];
                  if (nextSource !== null) {
                    for (const nextKey in nextSource) {
                      if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                      }
                    }
                  }
                }
                return to;
              }, "assign"), "assign"),
              writable: true,
              configurable: true
            });
          }
        }
      });
      var __is_raw_class__;
      var init_is_raw_class = __esm({
        "src/is_raw_class.ts"() {
          "use strict";
          __is_raw_class__ = /* @__PURE__ */ __name2(function(o_c) {
            return !!(typeof o_c === "function" && o_c.toString().startsWith("class"));
          }, "__is_raw_class__");
        }
      });
      var ObjectName;
      var init_ObjectName = __esm({
        "src/ObjectName.ts"() {
          "use strict";
          ObjectName = /* @__PURE__ */ __name2(function(o) {
            let ret = "";
            if (typeof o === "function" && Object.hasOwn(o, "name") && o.name !== "") {
              ret = o.name;
            } else if (typeof o !== "undefined" && typeof o.constructor === "function" && o.constructor.name !== "") {
              ret = o.constructor.name;
            } else if (typeof o !== "undefined" && typeof o.constructor === "object") {
              ret = o.constructor.toString().replace(/\[(.*?)\]/g, "$1").split(" ").slice(1).join("");
            }
            return ret;
          }, "ObjectName");
        }
      });
      var __getType__;
      var init_getType = __esm({
        "src/getType.ts"() {
          "use strict";
          init_is_raw_class();
          init_ObjectName();
          __getType__ = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function __getType__2(o_c) {
            let _ret_ = "";
            switch (true) {
              case (typeof o_c === "object" && (!!o_c.constructor && !!o_c.constructor.name) && o_c.constructor.name !== ""):
                _ret_ = o_c.constructor.name;
                break;
              case (typeof o_c === "function" && !!o_c.name):
                _ret_ = o_c.name;
                break;
              case (__is_raw_class__(o_c) && !!o_c.name):
                _ret_ = o_c.name;
                break;
              case (!!o_c && !!o_c.__classType && o_c.__classType !== ""):
                _ret_ = o_c.__classType;
                break;
              case (!!o_c && !!o_c.__definition && !!o_c.__definition.__classType && o_c.__definition.__classType !== ""):
                _ret_ = o_c.__definition.__classType;
                break;
              default:
                _ret_ = ObjectName(o_c);
                break;
            }
            return _ret_;
          }, "__getType__2"), "__getType__");
        }
      });
      var __make_global__;
      var init_make_global = __esm({
        "src/make_global.ts"() {
          "use strict";
          init_top();
          __make_global__ = /* @__PURE__ */ __name2(function(f) {
            if (!!f && !!f.name) {
              if (typeof _top !== "undefined" && typeof f !== "undefined" && _top !== null && !Object.hasOwn(_top, f.name)) {
                set(f.name, f);
              } else if (typeof global !== "undefined") {
                global[f.name] = f;
              } else if (typeof globalThis !== "undefined") {
                globalThis[f.name] = f;
              }
            }
          }, "__make_global__");
        }
      });
      var _QC_CLASSES;
      var _QC_PACKAGES;
      var _QC_PACKAGES_IMPORTED;
      var _QC_READY_LISTENERS;
      var __register_class__;
      var get_QC_CLASS;
      var _get_packages_names;
      var getPackagesNamesList;
      var getPackagesList;
      var getClassesList;
      var getClassesNamesList;
      var set_QC_PACKAGE;
      var init_PrimaryCollections = __esm({
        "src/PrimaryCollections.ts"() {
          "use strict";
          init_getType();
          init_make_global();
          _QC_CLASSES = {};
          _QC_PACKAGES = {};
          _QC_PACKAGES_IMPORTED = [];
          _QC_READY_LISTENERS = [];
          __register_class__ = /* @__PURE__ */ __name2(function(_class_, __namespace) {
            const __classType = __getType__(_class_);
            let name = _class_.name || __classType;
            if (name.toLowerCase() === "function") {
              name = __classType;
            }
            if (typeof _class_.__definition === "undefined") {
              _class_.__definition = {};
            }
            _class_.__definition.__classType = __classType;
            if (typeof __namespace !== "undefined") {
              _class_.__definition.__namespace = __namespace;
            }
            _QC_CLASSES[name] = _class_;
            __make_global__(_class_);
            return _QC_CLASSES[name];
          }, "__register_class__");
          get_QC_CLASS = /* @__PURE__ */ __name2((name) => {
            return _QC_CLASSES[name];
          }, "get_QC_CLASS");
          _get_packages_names = /* @__PURE__ */ __name2(function(_packages) {
            let _keys = [];
            for (const _k of Object.keys(_packages)) {
              if (typeof _packages[_k] !== "undefined" && typeof _packages[_k] !== "function" && Object.hasOwn(_packages[_k], "length") && _packages[_k].length > 0) {
                _keys.push(_k);
                _keys = _keys.concat(_get_packages_names(_packages[_k]));
              }
            }
            return _keys;
          }, "_get_packages_names");
          getPackagesNamesList = /* @__PURE__ */ __name2(() => {
            return _get_packages_names(_QC_PACKAGES);
          }, "getPackagesNamesList");
          getPackagesList = /* @__PURE__ */ __name2(() => {
            return [...getPackagesNamesList()].map((packagename) => {
              const _classesList = _QC_PACKAGES[packagename];
              let _ret_ = void 0;
              if (_classesList) {
                _ret_ = {
                  packageName: packagename,
                  classesList: _classesList.filter(function() {
                    return true;
                  })
                };
              }
              return _ret_;
            }).filter(function(_p) {
              return typeof _p !== "undefined";
            });
          }, "getPackagesList");
          getClassesList = /* @__PURE__ */ __name2(() => {
            let _classesList = [];
            [...getPackagesList()].forEach(function(_package_element) {
              _classesList = _classesList.concat(_package_element.classesList.map(
                (_class_element) => {
                  return {
                    packageName: _package_element.packageName,
                    className: `${_package_element.packageName}.${__getType__(_class_element)}`,
                    classFactory: _class_element
                  };
                }
              ));
              return _package_element;
            });
            return _classesList;
          }, "getClassesList");
          getClassesNamesList = /* @__PURE__ */ __name2(() => {
            return [...getClassesList()].map((_class_element) => {
              return _class_element.className;
            });
          }, "getClassesNamesList");
          set_QC_PACKAGE = /* @__PURE__ */ __name2((packageName, _qc_packages) => {
            _QC_PACKAGES[packageName] = _qc_packages;
          }, "set_QC_PACKAGE");
        }
      });
      var Export2;
      var init_Export = __esm({
        "src/Export.ts"() {
          "use strict";
          init_make_global();
          Export2 = /* @__PURE__ */ __name2(function(f) {
            return __make_global__(f);
          }, "Export");
          Export2.prototype.toString = function() {
            return "Export(function or symbol) { [QCObjects native code] }";
          };
        }
      });
      async function _import_(name) {
        logger9.debug(`Importing ${name}...`);
        function isPackage(name2) {
          logger9.debug(`Validating if ${name2} is a package name...`);
          return !name2.startsWith(".") && !name2.startsWith("/") && !name2.includes("/");
        }
        __name(isPackage, "isPackage");
        __name2(isPackage, "isPackage");
        try {
          const hasExtension = /\.[^/\\]+$/.test(name);
          if (!hasExtension && !isPackage(name)) {
            logger9.debug(`${name} does not have an extension and is not a package. Adding js extension.`);
            name += ".js";
          }
          const m = await import(name);
          return m;
        } catch (error) {
          logger9.warn(`Failed to load module: ${error}`);
        }
      }
      __name(_import_, "_import_");
      var init_import = __esm({
        "src/_import_.ts"() {
          "use strict";
          init_Logger();
          __name2(_import_, "_import_");
        }
      });
      var isDeno;
      var isBrowser;
      var isNodeCommonJS;
      var deno_require;
      var _require_;
      var is_phonegap;
      var init_platform = __esm({
        "src/platform.ts"() {
          "use strict";
          init_import();
          init_Logger();
          isDeno = typeof window !== "undefined" && "Deno" in window;
          isBrowser = typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self && !isDeno;
          isNodeCommonJS = typeof module !== "undefined";
          deno_require = /* @__PURE__ */ __name2((name) => {
          }, "deno_require");
          _require_ = /* @__PURE__ */ __name2((name) => {
            return isDeno ? deno_require(name) : ((name2) => {
              let r;
              try {
                (async () => {
                  r = await _import_(name2);
                })().then((m) => {
                  r = m && m.default || m;
                }).catch((e) => {
                  logger9.warn(`An error ocurred: ${e}`);
                });
              } catch (e) {
                logger9.debug(`An error ocurred importing module. ${e}`);
                r = { export: {} };
              }
              return r;
            })(name);
          }, "_require_");
          is_phonegap = /* @__PURE__ */ function() {
            return typeof cordova !== "undefined";
          }();
        }
      });
      var Logger;
      var logger9;
      var init_Logger = __esm({
        "src/Logger.ts"() {
          "use strict";
          init_Export();
          init_platform();
          Logger = class {
            static {
              __name(this, "Logger");
            }
            static {
              __name2(this, "Logger");
            }
            debugEnabled = true;
            infoEnabled = true;
            warnEnabled = true;
            debug(message) {
              if (this.debugEnabled) {
                console.log("\x1B[35m%s\x1B[0m", `[DEBUG][${performance.now().toLocaleString()}] ${message}`);
              }
            }
            info(message) {
              let color;
              if (this.infoEnabled) {
                if (isBrowser) {
                  color = "\x1B[103m%s\x1B[0m";
                } else {
                  color = "\x1B[33m%s\x1B[0m";
                }
                console.info(color, `[INFO][${performance.now().toLocaleString()}] ${message}`);
              }
            }
            warn(message) {
              if (this.warnEnabled) {
                console.warn("\x1B[31m%s\x1B[0m", `[WARN][${performance.now().toLocaleString()}] ${message}`);
              }
            }
          };
          logger9 = new Logger();
          Export2(logger9);
        }
      });
      var _Cast;
      var _CastProps;
      var init_Cast = __esm({
        "src/Cast.ts"() {
          "use strict";
          init_Logger();
          _Cast = /* @__PURE__ */ __name2(function(obj_source, obj_dest) {
            for (const v in obj_source) {
              if (typeof obj_source[v] !== "undefined") {
                try {
                  obj_dest[v] = obj_source[v];
                } catch (e) {
                  logger9.debug(`An error ocurred: ${e}.`);
                  logger9.warn(`Unable to cast ${(typeof obj_source).toString()}.${typeof v.toString()} to ${(typeof obj_dest).toString()}.${typeof v.toString()}`);
                }
              }
            }
            return obj_dest;
          }, "_Cast");
          _CastProps = /* @__PURE__ */ __name2(function(obj_source, obj_dest, _ignoreError = true) {
            for (const v in obj_source) {
              if (typeof obj_source[v] !== "undefined" && typeof obj_source[v] !== "function") {
                try {
                  obj_dest[v] = obj_source[v];
                } catch (e) {
                  if (!_ignoreError) {
                    logger9.debug(`An error ocurred: ${e}.`);
                  }
                }
              } else if (typeof obj_source[v] === "function") {
                try {
                  obj_dest[v] = obj_source[v].bind(obj_dest);
                } catch (e) {
                  logger9.warn(e);
                }
              }
            }
            return obj_dest;
          }, "_CastProps");
        }
      });
      var _DOMCreateElement;
      var ComplexTypeCall;
      var _DOMCreateComplexElement;
      var init_DOMCreateElement = __esm({
        "src/DOMCreateElement.ts"() {
          "use strict";
          init_platform();
          _DOMCreateElement = /* @__PURE__ */ __name2(function(elementName, props, children) {
            let _ret_;
            if (isBrowser) {
              _ret_ = _DOMCreateComplexElement(elementName, props, children);
            } else {
              _ret_ = {};
            }
            return _ret_;
          }, "_DOMCreateElement");
          ComplexTypeCall = /* @__PURE__ */ __name2((_type, { props, children }) => {
            return _type({ props, children });
          }, "ComplexTypeCall");
          _DOMCreateComplexElement = /* @__PURE__ */ __name2((_type, props, children) => {
            if (typeof _type !== "string") {
              return ComplexTypeCall(_type, { props, children });
            }
            const element = document.createElement(_type);
            if (props) {
              Object.entries(props).forEach(([key, value]) => {
                if (typeof value === "string" || typeof value === "number") {
                  element.setAttribute(key, value.toString());
                } else if (typeof value === "function" && key.toLowerCase().startsWith("on")) {
                  element.addEventListener(key.slice(2).toLowerCase(), value.bind(element));
                }
              });
            }
            if (Array.isArray(children)) {
              children.filter((child) => child instanceof Node).forEach((child) => {
                element.appendChild(child);
              });
            } else if (children instanceof Node) {
              element.appendChild(children);
            } else if (typeof children === "string") {
              element.innerHTML = children;
            }
            return element;
          }, "_DOMCreateComplexElement");
        }
      });
      var __instanceID;
      var IncrementInstanceID;
      var init_IncrementInstanceID = __esm({
        "src/IncrementInstanceID.ts"() {
          "use strict";
          __instanceID = 0;
          IncrementInstanceID = /* @__PURE__ */ __name2(() => {
            __instanceID = typeof __instanceID === "undefined" || __instanceID === null ? 0 : __instanceID + 1;
          }, "IncrementInstanceID");
        }
      });
      var _protected_code_;
      var _methods_;
      var init_introspection = __esm({
        "src/introspection.ts"() {
          "use strict";
          _protected_code_ = /* @__PURE__ */ __name2(function(_) {
            const __oldtoString = typeof _.prototype !== "undefined" ? _.prototype.toString : function() {
              return "";
            };
            if (typeof _.prototype !== "undefined") {
              _.prototype.toString = function() {
                const _protected_symbols = [
                  "__qcobjects__",
                  "__qcobjects_sdk__",
                  "__loaded__",
                  "ComplexStorageCache",
                  "css",
                  "append",
                  "attachIn",
                  "debug",
                  "info",
                  "warn",
                  "QC_Append",
                  "set",
                  "get",
                  "done",
                  "componentDone",
                  "_new_",
                  "__new__",
                  "Class",
                  "ClassFactory",
                  "New",
                  "Export",
                  "Package",
                  "Import",
                  "subelements",
                  "componentLoader",
                  "buildComponents",
                  "Controller",
                  "View",
                  "VO",
                  "Service",
                  "serviceLoader",
                  "JSONService",
                  "ConfigService",
                  "SourceJS",
                  "SourceCSS",
                  "ArrayList",
                  "ArrayCollection",
                  "Effect",
                  "Timer",
                  "sum",
                  "avg",
                  "table",
                  "max",
                  "min",
                  "range",
                  "matrix",
                  "matrix2d",
                  "matrix3d",
                  "unique",
                  "uniqueId",
                  "shortCode",
                  "NamespaceRef"
                ];
                let _ret_;
                if (_protected_symbols.includes(this.name)) {
                  _ret_ = this.name + "{ [QCObjects native code] }";
                } else {
                  _ret_ = __oldtoString.call(this);
                }
                return _ret_;
              };
            }
          }, "_protected_code_");
          _protected_code_(Function);
          _methods_ = /* @__PURE__ */ __name2(function(_) {
            const _m = [];
            for (const i in _) {
              if ((typeof _[i]).toLowerCase() === "function") {
                _m.push(_[i]);
              }
            }
            return _m;
          }, "_methods_");
        }
      });
      var Package7;
      var init_Package = __esm({
        "src/Package.ts"() {
          "use strict";
          init_is_raw_class();
          init_PrimaryCollections();
          Package7 = /* @__PURE__ */ __name2((namespace, classes = []) => {
            if (Object.hasOwn(_QC_PACKAGES, namespace) && typeof _QC_PACKAGES[namespace] !== "undefined" && typeof _QC_PACKAGES[namespace] !== "string" && Object.hasOwn(_QC_PACKAGES[namespace], "length") && _QC_PACKAGES[namespace].length > 0 && typeof classes !== "undefined" && Object.hasOwn(classes, "length") && classes.length > 0) {
              classes.forEach((_class_) => {
                __register_class__(_class_, namespace);
              });
              set_QC_PACKAGE(namespace, _QC_PACKAGES[namespace].concat(classes));
            } else if (typeof classes !== "undefined" && typeof classes !== "undefined" && Object.hasOwn(classes, "length") && classes.length > 0) {
              classes.forEach((_class_) => {
                __register_class__(_class_, namespace);
              });
              set_QC_PACKAGE(namespace, classes);
            } else if (__is_raw_class__(classes)) {
              if (typeof classes.__definition === "undefined") {
                classes.__definition = {};
              }
              classes.__definition.__namespace = namespace;
              classes.__namespace = namespace;
              __register_class__(classes, namespace);
              set_QC_PACKAGE(namespace, [classes]);
            } else {
              throw new Error(`An error ocurred. It was not possible to add classes to ${namespace}.`);
            }
            return Object.hasOwn(_QC_PACKAGES, namespace) ? _QC_PACKAGES[namespace] : [];
          }, "Package");
        }
      });
      var InheritClass6;
      var init_InheritClass = __esm({
        "src/InheritClass.ts"() {
          "use strict";
          init_Logger();
          init_IncrementInstanceID();
          init_Cast();
          init_DOMCreateElement();
          init_getType();
          init_introspection();
          init_is_a();
          init_platform();
          init_PrimaryCollections();
          init_Package();
          InheritClass6 = class {
            static {
              __name(this, "InheritClass");
            }
            static {
              __name2(this, "InheritClass");
            }
            __definition;
            _body;
            get body() {
              return this._body;
            }
            set body(value) {
              this._body = value;
            }
            childs;
            __instanceID;
            constructor(_o_) {
              if (typeof _o_ !== "undefined" && typeof _o_.__definition !== "undefined") {
                this.__definition = {
                  ..._o_.__definition
                };
              }
              const self2 = this;
              if (typeof _o_ !== "undefined" && _o_ !== null) {
                Object.keys(_o_).filter(function(k) {
                  return isNaN(k) && !["__instanceID", "__classType", "__definition"].includes(k);
                }).forEach(function(key) {
                  if (typeof self2[key] === "function") {
                    self2[key] = _o_[key].bind(self2);
                  } else {
                    self2[key] = _o_[key];
                  }
                });
              }
              IncrementInstanceID();
              if (!self2.__instanceID) {
                Object.defineProperty(self2, "__instanceID", {
                  value: __instanceID,
                  writable: false
                });
              }
              if (typeof self2.__definition !== "undefined") {
                Object.keys(self2.__definition).filter(function(k) {
                  return isNaN(k) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
                }).forEach(function(key) {
                  if (typeof self2.__definition[key] === "function") {
                    self2[key] = self2.__definition[key].bind(self2);
                  } else {
                    self2[key] = self2.__definition[key];
                  }
                });
              }
              _methods_(_QC_CLASSES[self2.__classType]).map(function(m) {
                self2[m.name] = m.bind(self2);
                return m;
              });
              _methods_(self2.__definition).map(function(m) {
                self2[m.name] = m.bind(self2);
                return m;
              });
              if (self2.body) {
                if (typeof self2.__definition === "undefined" || !Object.hasOwn(self2.__definition, "body") || typeof self2.__definition.body === "undefined") {
                  try {
                    if (isBrowser) {
                      self2.body = _DOMCreateElement(self2.__definition.__classType);
                    } else {
                      self2.body = {};
                    }
                  } catch (e) {
                    logger9.debug(`An error ocurred: ${e}.`);
                    self2.body = {};
                  }
                } else if (Object.hasOwn(self2.__definition, "body")) {
                  self2.body = self2.__definition.body;
                }
              }
              try {
                self2.__new__.call(self2, _o_);
                if (typeof self2 === "object" && Object.hasOwn(self2, "_new_") && typeof self2._new_.isCalled === "undefined") {
                  try {
                    self2._new_(_o_);
                    self2._new_.isCalled = true;
                  } catch (e) {
                    logger9.warn(`${self2.__classType}._new_() failed with error: ${e}`);
                  }
                }
              } catch (e) {
                logger9.warn(e);
              }
            }
            static get __classType() {
              return Object.getPrototypeOf(this.constructor).name;
            }
            get __classType() {
              return this.constructor.name;
            }
            static hierarchy(__class__) {
              const __classType = /* @__PURE__ */ __name2(function(o_c) {
                return Object.hasOwn(o_c, "__classType") ? o_c.__classType : __getType__.call(__class__, o_c);
              }, "__classType");
              const __hierarchy__proto__ = /* @__PURE__ */ __name2((c) => {
                return typeof c !== "undefined" && typeof c.__proto__ !== "undefined" && c.__proto__ !== null ? (__classType(c) !== "" ? [__classType(c)] : []).concat(__hierarchy__proto__(c.__proto__)) : [];
              }, "__hierarchy__proto__");
              if (typeof __class__ === "undefined" || __class__ === null) {
                __class__ = this;
              }
              let __hierarchy = [];
              __hierarchy.push(__classType(__class__));
              __hierarchy = __hierarchy.concat(__hierarchy__proto__(__class__.__proto__));
              return __hierarchy;
            }
            __namespace;
            __new__(_o_) {
              _CastProps(_o_, this);
            }
            // eslint-disable-next-line no-unused-vars
            _new_(_o_) {
            }
            static getParentClass() {
              return Object.getPrototypeOf(this.prototype.constructor);
            }
            getParentClass() {
              return this.constructor.getParentClass();
            }
            static getClass() {
              return Object.getPrototypeOf(this.constructor);
            }
            getClass() {
              return this.constructor.getClass();
            }
            css(_css) {
              if (typeof this.body !== "undefined" && typeof this?.body !== "string" && typeof this?.body?.style !== "undefined") {
                logger9.debug("body style");
                if (this.body) {
                  this.body.style = _Cast(_css, this?.body?.style);
                }
              }
              return typeof this.body !== "string" ? this?.body?.style : {};
            }
            hierarchy() {
              const __instance__ = this;
              return this.constructor.hierarchy(__instance__);
            }
            append(_child) {
              const child = _child || this.body;
              logger9.debug("append: start");
              if (is_a(child, "Component")) {
                logger9.debug("append: child is a Component");
                logger9.debug(`appending the body of ${child.name}`);
              }
              if (typeof this.body !== "undefined") {
                logger9.debug("append element");
                if (arguments.length > 0) {
                  logger9.debug("append to element");
                  if (typeof this.body !== "string") {
                    if (typeof this.body?.append !== "undefined") {
                      this?.body?.append(child);
                    } else {
                      throw Error("body.append is undefined. That means the body is not well formed.");
                    }
                  } else {
                    this.append(child);
                  }
                  if (typeof this.childs === "undefined") {
                    this.childs = [];
                  }
                  this.childs.push(child);
                } else {
                  if (isBrowser) {
                    logger9.debug("append to body");
                    document.body.append(child);
                  }
                }
              }
            }
            attachIn(tag) {
              if (isBrowser) {
                const tags = document.subelements(tag);
                for (let i = 0, j = tags.length; i < j; i++) {
                  tags[i].append(this);
                }
              } else {
                throw new Error("attachIn not yet implemented for non browser platforms");
              }
            }
          };
          Package7("com.qcobjects", [InheritClass6]);
        }
      });
      var isQCObjects_Object;
      var isQCObjects_Class;
      var init_isQCObjects = __esm({
        "src/isQCObjects.ts"() {
          "use strict";
          init_InheritClass();
          isQCObjects_Object = /* @__PURE__ */ __name2(function(_) {
            return !!(typeof _ === "object" && Object.hasOwn(_, "__classType") && !!_.__instanceID && Object.hasOwn(_, "__definition") && typeof _.__definition !== "undefined") || _ instanceof InheritClass6;
          }, "isQCObjects_Object");
          isQCObjects_Class = /* @__PURE__ */ __name2(function(_) {
            return !!(typeof _ === "function" && !_.__instanceID && !!_.__definition && typeof _.__definition !== "undefined" && !!_.__definition.__classType) || _.prototype instanceof InheritClass6;
          }, "isQCObjects_Class");
        }
      });
      var is_a;
      var init_is_a = __esm({
        "src/is_a.ts"() {
          "use strict";
          init_getType();
          init_isQCObjects();
          init_ObjectName();
          is_a = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function is_a2(obj, typeName) {
            return !!(typeof obj !== "undefined" && obj !== null && ((isQCObjects_Class(obj) || isQCObjects_Object(obj)) && obj.hierarchy().includes(typeName) || __getType__(obj) === typeName || ObjectName(obj) === typeName || typeof obj === typeName));
          }, "is_a2"), "is_a");
        }
      });
      var __is__forbidden_name__;
      var init_is_forbidden_name = __esm({
        "src/is_forbidden_name.ts"() {
          "use strict";
          __is__forbidden_name__ = /* @__PURE__ */ __name2(function(name) {
            return ["__proto__", "prototype", "Object", "Map", "defineProperty", "indexOf", "toString", "__instanceID", "function", "Function"].indexOf(name) !== -1;
          }, "__is__forbidden_name__");
        }
      });
      var _LegacyCopy;
      var init_LegacyCopy = __esm({
        "src/LegacyCopy.ts"() {
          "use strict";
          init_is_raw_class();
          _LegacyCopy = /* @__PURE__ */ __name2(function(obj, _ignore) {
            let _value_;
            switch (true) {
              case typeof obj === "string":
                _value_ = obj;
                break;
              case typeof obj === "number":
                _value_ = obj;
                break;
              case typeof obj === "object":
                _value_ = [{ ...Object.keys(obj).filter((k) => !_ignore?.includes(k)) }].map((k) => {
                  return { [k]: obj[k] };
                }).reduce((p, c) => Object.assign(p, c));
                break;
              case typeof obj === "function":
                _value_ = obj.bind({});
                break;
              case __is_raw_class__(obj):
                _value_ = class extends obj {
                  static {
                    __name(this, "_value_");
                  }
                  static {
                    __name2(this, "_value_");
                  }
                };
                break;
              default:
                break;
            }
            return _value_;
          }, "_LegacyCopy");
        }
      });
      var Class;
      var init_Class = __esm({
        "src/Class.ts"() {
          "use strict";
          init_PrimaryCollections();
          init_Cast();
          init_DOMCreateElement();
          init_getType();
          init_IncrementInstanceID();
          init_introspection();
          init_is_a();
          init_is_forbidden_name();
          init_LegacyCopy();
          init_Logger();
          init_platform();
          init_top();
          Class = /* @__PURE__ */ __name2((name, _type, _definition) => {
            const _types_ = {};
            let type, definition;
            switch (true) {
              case (!name && !_type && !_definition):
                return class {
                };
              case (!!name && !_type && !_definition):
                type = class {
                  static {
                    __name(this, "type");
                  }
                  static {
                    __name2(this, "type");
                  }
                };
                definition = {};
                break;
              case (!!name && !_type && !!_definition):
                type = class {
                  static {
                    __name(this, "type");
                  }
                  static {
                    __name2(this, "type");
                  }
                };
                definition = _definition;
                break;
              case (!!name && !!_type && !!_definition):
                type = _type;
                definition = _definition;
                break;
              default:
                return class {
                };
            }
            if (typeof name !== "string") {
              throw new Error("Class name must be a string");
            }
            if (typeof type !== "function") {
              throw new Error("Class type must be a function or class");
            }
            if (__is__forbidden_name__(name)) {
              throw new Error(`${name} is not an allowed word in the name of a class`);
            }
            if (typeof type.__definition === "object" && type.__definition && Object.keys(type.__definition).length !== 0) {
              definition.__definition = Object.assign(_LegacyCopy(type.__definition, ["name"]), type);
            }
            _types_[type.name] = type;
            if (typeof definition === "undefined" || definition === null) {
              definition = {};
            } else {
              definition = { ...definition };
            }
            if (typeof definition.__instanceID !== "undefined") {
              delete definition.__instanceID;
            }
            _QC_CLASSES[name] = class extends _types_[type.name] {
              __instanceID;
              __namespace;
              __definition = {
                ...definition
              };
              childs;
              _body;
              get body() {
                return this._body;
              }
              set body(value) {
                this._body = value;
              }
              static get __classType() {
                return Object.getPrototypeOf(this.constructor).name;
              }
              get __classType() {
                return this.constructor.name;
              }
              static hierarchy(__class__) {
                const __classType = /* @__PURE__ */ __name2(function(o_c) {
                  return Object.hasOwn(o_c, "__classType") ? o_c.__classType : __getType__.call(__class__, o_c);
                }, "__classType");
                const __hierarchy__proto__ = /* @__PURE__ */ __name2((c) => {
                  return typeof c !== "undefined" && typeof c.__proto__ !== "undefined" && c.__proto__ !== null ? (__classType(c) !== "" ? [__classType(c)] : []).concat(__hierarchy__proto__(c.__proto__)) : [];
                }, "__hierarchy__proto__");
                if (typeof __class__ === "undefined" || __class__ === null) {
                  __class__ = this;
                }
                let __hierarchy = [];
                __hierarchy.push(__classType(__class__));
                __hierarchy = __hierarchy.concat(__hierarchy__proto__(__class__.__proto__));
                return __hierarchy;
              }
              static getParentClass() {
                return Object.getPrototypeOf(this.prototype.constructor);
              }
              constructor(_o_) {
                super(_o_ || {});
                const self2 = this;
                IncrementInstanceID();
                if (!self2.__instanceID) {
                  Object.defineProperty(self2, "__instanceID", {
                    value: __instanceID,
                    writable: false
                  });
                }
                if (typeof self2.__definition !== "undefined") {
                  Object.keys(self2.__definition).filter(function(k) {
                    return isNaN(k) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
                  }).forEach(function(key) {
                    if (typeof self2.__definition[key] === "function") {
                      self2[key] = self2.__definition[key].bind(self2);
                    } else {
                      self2[key] = self2.__definition[key];
                    }
                  });
                }
                _methods_(_QC_CLASSES[self2.__classType]).map(function(m) {
                  self2[m.name] = m.bind(self2);
                  return m;
                });
                _methods_(self2.__definition).map(function(m) {
                  self2[m.name] = m.bind(self2);
                  return m;
                });
                if (self2.body) {
                  if (typeof self2.__definition === "undefined" || !Object.hasOwn(self2.__definition, "body") || typeof self2.__definition.body === "undefined") {
                    try {
                      if (isBrowser) {
                        self2.body = _DOMCreateElement(self2.__definition.__classType);
                      } else {
                        self2.body = {};
                      }
                    } catch (e) {
                      logger9.debug(`An error ocurred: ${e}.`);
                      self2.body = {};
                    }
                  } else if (Object.hasOwn(self2.__definition, "body")) {
                    self2.body = self2.__definition.body;
                  }
                }
                try {
                  if (typeof self2.__new__ === "function") {
                    self2.__new__.call(self2, _o_);
                  } else if (typeof super.__new__ === "function") {
                    self2.__new__ = super.__new__.bind(self2);
                    self2.__new__.call(self2, _o_);
                  }
                  if (typeof self2 === "object" && Object.hasOwn(self2, "_new_") && typeof self2._new_.isCalled === "undefined") {
                    try {
                      self2._new_(_o_);
                      self2._new_.isCalled = true;
                    } catch (e) {
                      logger9.warn(`${self2.__classType}._new_() failed with error: ${e}`);
                    }
                  }
                } catch (e) {
                  logger9.warn(e);
                }
              }
              __new__(_o_) {
                _CastProps(_o_, this);
              }
              // eslint-disable-next-line no-unused-vars
              _new_(_o_) {
              }
              getClass() {
                return Object.getPrototypeOf(this.constructor);
              }
              css(_css) {
                if (typeof this.body !== "undefined" && typeof this?.body !== "string" && typeof this?.body?.style !== "undefined") {
                  logger9.debug("body style");
                  if (this.body) {
                    this.body.style = _Cast(_css, this?.body?.style);
                  }
                }
                return typeof this.body !== "string" ? this?.body?.style : {};
              }
              hierarchy() {
                const __instance__ = this;
                return this.getClass()?.hierarchy(__instance__);
              }
              append(_child) {
                const child = _child || this.body;
                logger9.debug("append: start");
                if (is_a(child, "Component")) {
                  logger9.debug("append: child is a Component");
                  logger9.debug(`appending the body of ${child.name}`);
                }
                if (typeof this.body !== "undefined") {
                  logger9.debug("append element");
                  if (arguments.length > 0) {
                    logger9.debug("append to element");
                    if (typeof this.body !== "string") {
                      if (typeof this.body?.append !== "undefined") {
                        this?.body?.append(child);
                      } else {
                        throw Error("body.append is undefined. That means the body is not well formed.");
                      }
                    } else {
                      this.append(child);
                    }
                    if (typeof this.childs === "undefined") {
                      this.childs = [];
                    }
                    this.childs.push(child);
                  } else {
                    if (isBrowser) {
                      logger9.debug("append to body");
                      document.body.append(child);
                    }
                  }
                }
              }
              attachIn(tag) {
                if (isBrowser) {
                  const tags = document.subelements(tag);
                  for (let i = 0, j = tags.length; i < j; i++) {
                    tags[i].append(this);
                  }
                } else {
                  throw new Error("attachIn not yet implemented for non browser platforms");
                }
              }
            };
            _QC_CLASSES[name] = _CastProps(definition, _QC_CLASSES[name]);
            _QC_CLASSES[name].__definition = definition;
            _QC_CLASSES[name].__definition.__classType = name;
            _top[name] = _QC_CLASSES[name];
            return _QC_CLASSES[name];
          }, "Class");
          if (typeof Class.prototype !== "undefined") {
            Class.prototype.toString = function() {
              return "Class(name, type, definition) { [QCObjects native code] }";
            };
          }
        }
      });
      var ClassFactory;
      var init_ClassFactory = __esm({
        "src/ClassFactory.ts"() {
          "use strict";
          init_is_raw_class();
          init_PrimaryCollections();
          ClassFactory = /* @__PURE__ */ __name2((className) => {
            let _classFactory;
            if (typeof className === "undefined" || className === null) {
              throw Error("You need to pass a parameter {className}");
            }
            if (className !== null && className.indexOf(".") !== -1) {
              const packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
              const _className = className.split(".").slice(-1).join("");
              const _package = _QC_PACKAGES[packageName] || [];
              const packageClasses = _package.filter((classFactory) => {
                return __is_raw_class__(classFactory);
              }).reverse();
              if (packageClasses.length > 0) {
                _classFactory = packageClasses[0];
              } else {
                throw Error(`Class ${_className} not found. Found classes: ${JSON.stringify(packageClasses)} in package ${packageName}`);
              }
            } else if (className !== null) {
              _classFactory = get_QC_CLASS(className);
              if (typeof _classFactory === "undefined") {
                throw new Error(`${className} is undefined.`);
              }
            } else {
              throw Error(`className is null. Unable to retrieve the class factory.
 Not found in: 
 ${Object.keys(_QC_CLASSES).join("\n")}`);
            }
            return _classFactory;
          }, "ClassFactory");
        }
      });
      var Base64;
      var init_Base64 = __esm({
        "src/Base64.ts"() {
          "use strict";
          Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode(e) {
              let t = "";
              let n, r, i, s, o, u, a;
              let f = 0;
              e = Base64._utf8_encode(e);
              while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                  u = a = 64;
                } else if (isNaN(i)) {
                  a = 64;
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
              }
              return t;
            },
            decode(e) {
              let t = "";
              let n, r, i;
              let s, o, u, a;
              let f = 0;
              e = e.replace(/[^A-Za-z0-9+/=]/g, "");
              while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u !== 64) {
                  t = t + String.fromCharCode(r);
                }
                if (a !== 64) {
                  t = t + String.fromCharCode(i);
                }
              }
              t = Base64._utf8_decode(t);
              return t;
            },
            _utf8_encode(e) {
              e = e.replace(/rn/g, "n");
              let t = "";
              for (let n = 0; n < e.length; n++) {
                const r = e.charCodeAt(n);
                if (r < 128) {
                  t += String.fromCharCode(r);
                } else if (r > 127 && r < 2048) {
                  t += String.fromCharCode(r >> 6 | 192);
                  t += String.fromCharCode(r & 63 | 128);
                } else {
                  t += String.fromCharCode(r >> 12 | 224);
                  t += String.fromCharCode(r >> 6 & 63 | 128);
                  t += String.fromCharCode(r & 63 | 128);
                }
              }
              return t;
            },
            _utf8_decode(e) {
              let t = "";
              let n = 0;
              let r = 0;
              let c2 = 0;
              let c3;
              while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                  t += String.fromCharCode(r);
                  n++;
                } else if (r > 191 && r < 224) {
                  c2 = e.charCodeAt(n + 1);
                  t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                  n += 2;
                } else {
                  c2 = e.charCodeAt(n + 1);
                  c3 = e.charCodeAt(n + 2);
                  t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                  n += 3;
                }
              }
              return t;
            }
          };
        }
      });
      var _basePath_;
      var setBasePath;
      var init_basePath = __esm({
        "src/basePath.ts"() {
          "use strict";
          init_Logger();
          init_platform();
          _basePath_ = function() {
            let _basePath = "";
            if (isBrowser) {
              const baseURI = document.baseURI.split("?")[0].split("/");
              baseURI.pop();
              _basePath = baseURI.join("/") + "/";
            } else {
              let process2;
              try {
                process2 = _require_("process");
              } catch (e) {
                logger9.debug(`An error ocurred: ${e}.`);
              }
              if (typeof process2 !== "undefined") {
                _basePath = `${process2.cwd()}/`;
              } else {
                _basePath = "";
              }
            }
            return _basePath;
          }();
          setBasePath = /* @__PURE__ */ __name2((value) => {
            _basePath_ = value;
          }, "setBasePath");
        }
      });
      var _DataStringify2;
      var init_DataStringify = __esm({
        "src/DataStringify.ts"() {
          "use strict";
          init_LegacyCopy();
          _DataStringify2 = /* @__PURE__ */ __name2(function(data) {
            const getCircularReplacer = /* @__PURE__ */ __name2(function() {
              const seen = /* @__PURE__ */ new WeakSet();
              let _level = 0;
              return function(key, value) {
                if (typeof value === "object" && value !== null) {
                  if (seen.has(value)) {
                    _level += 1;
                    return _level <= 3 ? _LegacyCopy(value) : null;
                  }
                  seen.add(value);
                }
                return value;
              };
            }, "getCircularReplacer");
            return JSON.stringify(data, getCircularReplacer());
          }, "_DataStringify");
        }
      });
      var _domain_;
      var init_domain = __esm({
        "src/domain.ts"() {
          "use strict";
          _domain_ = typeof location !== "undefined" && location.hostname !== "" ? location.hostname : "localhost";
        }
      });
      var New3;
      var init_New = __esm({
        "src/New.ts"() {
          "use strict";
          New3 = /* @__PURE__ */ __name2(function(__class__, args = {}) {
            args = arguments.length > 1 ? args : {};
            return typeof __class__ === "undefined" ? new Object() : new __class__(args);
          }, "New");
          New3.prototype.toString = function() {
            return "New(QCObjectsClassName, args) { [QCObjects native code] }";
          };
        }
      });
      var _secretKey;
      var init_secretKey = __esm({
        "src/secretKey.ts"() {
          "use strict";
          init_platform();
          _secretKey = isBrowser ? location.host : "secret";
        }
      });
      var _Crypt2;
      var _CryptObject;
      var _DecryptObject;
      var init_Crypt = __esm({
        "src/Crypt.ts"() {
          "use strict";
          init_Base64();
          init_DataStringify();
          init_InheritClass();
          init_Package();
          init_secretKey();
          _Crypt2 = class __Crypt extends InheritClass6 {
            static {
              __name(this, "__Crypt");
            }
            static {
              __name2(this, "_Crypt");
            }
            string = "";
            key = "";
            // eslint-disable-next-line no-unused-vars
            encrypt(_string_, key) {
              throw new Error("Method not implemented.");
            }
            // eslint-disable-next-line no-unused-vars
            decrypt(_string_, key) {
              throw new Error("Method not implemented.");
            }
            last_string = "";
            last_key = "";
            construct = false;
            _new_(o) {
              const string = o.string;
              let key = Object.hasOwn(o, "key") ? o.key : "";
              this.__new__(o);
              key = key === "" ? this.__instanceID.toString() : key;
              this.last_key = key;
              this.last_string = string;
              this.construct = true;
            }
            _encrypt() {
              const string = this.string;
              const key = this.key;
              let result = "";
              let char;
              let keychar;
              for (let i = 0; i < string.length; i++) {
                char = string.substr(i, 1);
                keychar = key.substr(i % key.length - 1, 1);
                char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
                result += char;
              }
              this.last_string = Base64.encode(result);
              return this.last_string;
            }
            _decrypt() {
              let string = this.string;
              const key = this.key;
              let result = "";
              let char;
              let keychar;
              string = Base64.decode(string);
              for (let i = 0; i < string.length; i++) {
                char = string.substr(i, 1);
                keychar = key.substr(i % key.length - 1, 1);
                char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
                result += char;
              }
              this.last_string = result;
              return this.last_string;
            }
            static encrypt(string, key) {
              const crypt = new __Crypt({
                string,
                key: key !== "" ? key : "12345678ABC"
              });
              return crypt._encrypt();
            }
            static decrypt(string, key) {
              const crypt = new __Crypt({
                string,
                key: key !== "" ? key : "12345678ABC"
              });
              return crypt._decrypt();
            }
          };
          _CryptObject = /* @__PURE__ */ __name2(function(o) {
            return _Crypt2.encrypt(_DataStringify2(o), _secretKey);
          }, "_CryptObject");
          _DecryptObject = /* @__PURE__ */ __name2(function(s) {
            return s === "" ? {} : JSON.parse(_Crypt2.decrypt(s, _secretKey));
          }, "_DecryptObject");
          Package7("com.qcobjects", [_Crypt2]);
        }
      });
      var ConfigSettings;
      var init_ConfigSettings = __esm({
        "src/ConfigSettings.ts"() {
          "use strict";
          init_basePath();
          init_InheritClass();
          init_Package();
          ConfigSettings = class _ConfigSettings extends InheritClass6 {
            static {
              __name(this, "_ConfigSettings");
            }
            static {
              __name2(this, "ConfigSettings");
            }
            _CONFIG = {
              "relativeImportPath": "",
              "remoteImportsPath": "",
              "remoteSDKPath": "https://sdk.qcobjects.dev/",
              "asynchronousImportsLoad": false,
              "removePackageScriptAfterLoading": true,
              "componentsBasePath": "",
              "delayForReady": 0,
              "preserveComponentBodyTag": false,
              "useConfigService": false,
              "routingWay": "hash",
              "useSDK": true,
              "useLocalSDK": false,
              "basePath": _basePath_
            };
            static _instance;
            _CONFIG_ENC = "";
            set(name, value) {
              this._CONFIG[name] = value;
            }
            get(name, _defaultValue) {
              return this._CONFIG[name] || _defaultValue;
            }
            static get instance() {
              if (typeof _ConfigSettings._instance === "undefined") {
                _ConfigSettings._instance = new _ConfigSettings();
              }
              return _ConfigSettings._instance;
            }
          };
          Package7("com.qcobjects", [ConfigSettings]);
        }
      });
      var CONFIG5;
      var init_CONFIG = __esm({
        "src/CONFIG.ts"() {
          "use strict";
          init_basePath();
          init_Cast();
          init_Crypt();
          init_DataStringify();
          init_Logger();
          init_Processor();
          init_secretKey();
          init_Package();
          init_InheritClass();
          init_ConfigSettings();
          CONFIG5 = class _CONFIG extends InheritClass6 {
            static {
              __name(this, "_CONFIG");
            }
            static {
              __name2(this, "CONFIG");
            }
            get _CONFIG_ENC() {
              return ConfigSettings.instance._CONFIG_ENC;
            }
            get _CONFIG() {
              return ConfigSettings.instance._CONFIG;
            }
            set(name, value) {
              logger9.debug(`CONFIG.set  ${name}: ${value}`);
              if (name === "basePath") {
                setBasePath(value);
              }
              let _conf;
              try {
                _conf = function(config) {
                  if (config._CONFIG_ENC === null) {
                    config._CONFIG_ENC = _Crypt2.encrypt(_DataStringify2({}), _secretKey);
                  }
                  const _protectedEnc = config._CONFIG_ENC.valueOf();
                  const _protectedConf = config._CONFIG?.valueOf();
                  return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
                }(ConfigSettings.instance);
              } catch (e) {
                _conf = {};
                console.error(e);
                logger9.debug("failed to encrypt config");
              }
              _conf[name] = value;
              ConfigSettings.instance._CONFIG_ENC = _CryptObject(_conf);
              ConfigSettings.instance.set(name, value);
            }
            get(name, _default) {
              let _value;
              try {
                const _conf = function(config) {
                  if (config._CONFIG_ENC === null) {
                    config._CONFIG_ENC = _Crypt2.encrypt(_DataStringify2({}), _secretKey);
                  }
                  const _protectedEnc = config._CONFIG_ENC.valueOf();
                  const _protectedConf = config._CONFIG.valueOf();
                  return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
                }(ConfigSettings.instance);
                if (typeof _conf[name] !== "undefined") {
                  _value = _conf[name];
                }
              } catch (e) {
                console.error(e);
                logger9.debug("Something wrong when trying to get CONFIG values");
                logger9.debug("No config value for: " + name);
                _value = _default;
              }
              return GlobalProcessor.processObject(_value) || _default;
            }
            static _instance;
            static get instance() {
              if (typeof _CONFIG._instance === "undefined") {
                _CONFIG._instance = new _CONFIG();
              }
              return _CONFIG._instance;
            }
            static set(name, value) {
              _CONFIG.instance.set(name, value);
            }
            static get(name, value) {
              return _CONFIG.instance.get(name, value);
            }
          };
          Package7("com.qcobjects", [CONFIG5]);
        }
      });
      var Processor;
      var GlobalProcessor;
      var init_Processor = __esm({
        "src/Processor.ts"() {
          "use strict";
          init_CONFIG();
          init_InheritClass();
          init_New();
          init_top();
          init_Package();
          Processor = class _Processor extends InheritClass6 {
            static {
              __name(this, "_Processor");
            }
            static {
              __name2(this, "Processor");
            }
            static _instance;
            constructor({ component, processors }) {
              super({ component });
              if (typeof processors !== "undefined") {
                this.processors = Object.assign(processors, _Processor.instance.processors);
              }
            }
            processors = {
              "config"(component, arg) {
                return CONFIG5.get(arg, "");
              },
              "ENV"(component, arg) {
                return typeof process !== "undefined" ? process.env[arg] : "";
              },
              "global"(component, arg) {
                return typeof _top !== "undefined" ? _top[arg] : "";
              }
            };
            static get instance() {
              if (typeof _Processor._instance === "undefined") {
                _Processor._instance = new _Processor({ component: null });
              }
              return _Processor._instance;
            }
            setProcessor(_proc_) {
              if (typeof _proc_ === "function" && _proc_.name !== "") {
                this.processors[_proc_.name] = _proc_;
              }
            }
            component;
            execute(component, processorName, args) {
              const processorHandler = typeof component !== "undefined" && component !== null ? component.processorHandler : this;
              return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]);
            }
            process(template, component = null) {
              const processorHandler = component !== null ? component.processorHandler : New3(_Processor, { component: null });
              if (typeof template === "string") {
                Object.keys(processorHandler.processors).map((funcName) => {
                  return [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
                    function(procesorMatch) {
                      const match0 = `$${funcName}(${procesorMatch[1]})`;
                      template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
                      return procesorMatch;
                    }
                  );
                });
              }
              return template;
            }
            processObject(obj, component = null) {
              let __instance__ = component === null ? this : component.processorHandler;
              if (typeof __instance__ === "undefined") {
                __instance__ = new _Processor({ component });
              }
              if (typeof obj === "object") {
                Object.keys(obj).map(
                  (_k) => {
                    if (typeof obj[_k] === "object" && !Object.hasOwn(obj[_k], "call")) {
                      obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component);
                    } else if (typeof obj[_k] === "string") {
                      obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component);
                    }
                    return _k;
                  }
                );
              } else if (typeof obj === "string") {
                obj = __instance__.process.bind(__instance__)(obj, component);
              }
              return obj;
            }
          };
          GlobalProcessor = Processor.instance;
          Package7("com.qcobjects", [Processor]);
        }
      });
      var __routing_params__;
      var __valid_routings__;
      var __valid_routing_way__;
      var init_routings = __esm({
        "src/routings.ts"() {
          "use strict";
          __routing_params__ = /* @__PURE__ */ __name2(function(routing, routingPath) {
            const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
            return {
              ...[...routingPath.matchAll(new RegExp(standardRoutingPath, "g"))][0].groups
            };
          }, "__routing_params__");
          __valid_routings__ = /* @__PURE__ */ __name2(function(routings, routingPath) {
            return routings.filter(function(routing) {
              const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
              return new RegExp(standardRoutingPath, "g").test(routingPath);
            }).reverse();
          }, "__valid_routings__");
          __valid_routing_way__ = /* @__PURE__ */ __name2(function(validRoutingWays, routingWay) {
            return validRoutingWays.includes(routingWay);
          }, "__valid_routing_way__");
        }
      });
      function asyncLoad(callback, args) {
        class AsyncCallback {
          static {
            __name(this, "AsyncCallback");
          }
          static {
            __name2(this, "AsyncCallback");
          }
          func;
          args;
          constructor(callback2, args2 = []) {
            this.func = callback2;
            this.args = args2;
          }
          dispatch() {
            this.func.apply(this, ...args, this);
          }
        }
        _asyncLoad.push(new AsyncCallback(callback, args));
        return AsyncCallback;
      }
      __name(asyncLoad, "asyncLoad");
      var _asyncLoad;
      var _fireAsyncLoad;
      var init_asyncLoad = __esm({
        "src/asyncLoad.ts"() {
          "use strict";
          init_Export();
          init_platform();
          init_top();
          _asyncLoad = [];
          __name2(asyncLoad, "asyncLoad");
          _fireAsyncLoad = /* @__PURE__ */ __name2(function() {
            if (isBrowser) {
              document.addEventListener("readystatechange", () => {
                if (document.readyState === "complete") {
                  _asyncLoad.map(function(fc) {
                    fc.dispatch.call(fc);
                  });
                }
              });
            } else if (typeof _top.global !== "undefined") {
              _asyncLoad.map(function(fc) {
                fc.dispatch.call(fc);
              });
            }
          }, "_fireAsyncLoad");
          Export2(asyncLoad);
        }
      });
      var ComplexStorageCache;
      var init_ComplexStorageCache = __esm({
        "src/ComplexStorageCache.ts"() {
          "use strict";
          init_Base64();
          init_DataStringify();
          init_Logger();
          ComplexStorageCache = class {
            static {
              __name(this, "ComplexStorageCache");
            }
            static {
              __name2(this, "ComplexStorageCache");
            }
            constructor(params) {
              let load, alternate;
              const object = params.index;
              if (typeof object !== "undefined") {
                load = params.load;
                alternate = params.alternate;
                const cachedObjectID = this.getID(object);
                const cachedResponse = localStorage.getItem(cachedObjectID);
                if (this.isEmpty(cachedResponse)) {
                  const cachedNewResponse = load.call(null, {
                    cachedObjectID,
                    cachedResponse,
                    "cache": this
                  });
                  this.save(object, cachedNewResponse);
                  logger9.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID));
                } else {
                  alternate.call(null, {
                    cachedObjectID,
                    cachedResponse,
                    "cache": this
                  });
                  logger9.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID));
                }
              } else {
                throw new Error("ComplexStorageCache: index is undefined");
              }
              return this;
            }
            getItem(cachedObjectID) {
              const retrievedObject = localStorage.getItem(cachedObjectID);
              if (!this.isEmpty(retrievedObject)) {
                return JSON.parse(retrievedObject);
              } else {
                return null;
              }
            }
            setItem(cachedObjectID, value) {
              localStorage.setItem(cachedObjectID, _DataStringify2(value));
            }
            isEmpty(object) {
              let r = false;
              switch (true) {
                case typeof object === "undefined":
                case (typeof object === "string" && object === ""):
                case (typeof object === "string" && object === "undefined"):
                case (typeof object === "number" && object === 0):
                case object === null:
                  r = true;
                  break;
                default:
                  r = false;
              }
              return r;
            }
            getID(object) {
              let cachedObjectID;
              if (typeof object !== "undefined") {
                cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify2(object).replace(/\{|\}|,/g, "_"));
              }
              return cachedObjectID;
            }
            save(object, cachedNewResponse) {
              const cachedObjectID = this.getID(object);
              logger9.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID));
              this.setItem(cachedObjectID, cachedNewResponse);
            }
            getCached(object) {
              const cachedObjectID = this.getID(object);
              return this.getItem(cachedObjectID);
            }
            clear() {
              Object.keys(localStorage).filter(function(k) {
                return k.startsWith("cachedObject_");
              }).map(function(c) {
                localStorage.removeItem(c);
                return c;
              });
            }
          };
        }
      });
      var serviceLoader3;
      var init_serviceLoader = __esm({
        "src/serviceLoader.ts"() {
          "use strict";
          init_asyncLoad();
          init_ComplexStorageCache();
          init_DataStringify();
          init_Logger();
          init_platform();
          init_top();
          serviceLoader3 = /* @__PURE__ */ __name2(function(service, _async = false) {
            const _serviceLoaderInBrowser = /* @__PURE__ */ __name2(function(service2) {
              var _promise = new Promise(
                function(resolve, reject) {
                  logger9.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify2(service2.data)).replace("{{URL}}", service2.url));
                  const xhr = new XMLHttpRequest();
                  xhr.withCredentials = service2.withCredentials;
                  const xhrasync = true;
                  xhr.open(service2.method, service2.url, xhrasync);
                  for (const header in service2.headers) {
                    try {
                      if (typeof service2.headers[header] !== "function") {
                        xhr.setRequestHeader(header, service2.headers[header]);
                      }
                    } catch (e) {
                      logger9.debug("Something went wrong when assign the header " + header);
                      logger9.debug(`An error ocurred: ${e}`);
                    }
                  }
                  xhr.onload = function() {
                    if (xhr.status === 200) {
                      const response = xhr.responseText;
                      logger9.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify2(response)));
                      logger9.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service2.name));
                      service2.template = response;
                      if (service2.cached && typeof cache !== "undefined") {
                        cache.save(service2.name, service2.template);
                      }
                      if (typeof service2.done === "function") {
                        var standardResponse = {
                          "request": xhr,
                          service: service2
                        };
                        service2.done.call(service2, standardResponse);
                        resolve.call(_promise, standardResponse);
                      }
                    } else {
                      if (typeof service2.fail === "function") {
                        var standardResponse = {
                          "request": xhr,
                          service: service2
                        };
                        service2.fail.call(service2, standardResponse);
                        reject.call(_promise, standardResponse);
                      }
                    }
                  };
                  const _directLoad = /* @__PURE__ */ __name2(function() {
                    logger9.debug("SENDING THE NORMAL REQUEST  ");
                    try {
                      xhr.send(_DataStringify2(service2.data));
                    } catch (e) {
                      logger9.debug("SOMETHING WRONG WITH REQUEST  ");
                      logger9.debug(`An error ocurred: ${e}`);
                      reject.call(_promise, {
                        request: xhr,
                        service: service2
                      });
                    }
                  }, "_directLoad");
                  if (service2.cached) {
                    var cache = new ComplexStorageCache({
                      index: service2.data,
                      load() {
                        _directLoad.call(this);
                      },
                      alternate(cacheController) {
                        if (service2.method === "GET") {
                          service2.template = cacheController.cache.getCached(service2.name);
                          if (typeof service2.done === "function") {
                            const standardResponse = {
                              "request": xhr,
                              service: service2
                            };
                            service2.done.call(service2, standardResponse);
                            resolve.call(_promise, standardResponse);
                          }
                        } else {
                          _directLoad();
                        }
                      }
                    });
                    _top.lastCache = cache;
                  } else {
                    _directLoad();
                  }
                  return xhr;
                }
              );
              return _promise;
            }, "_serviceLoaderInBrowser");
            const _serviceLoaderInNode = /* @__PURE__ */ __name2(function(service2) {
              var _promise = new Promise(
                function(resolve, reject) {
                  if (typeof URL === "undefined") {
                    global.URL = _require_("url").URL;
                    const URL2 = global.URL;
                  }
                  const serviceURL = new URL(service2.url);
                  var req;
                  service2.useHTTP2 = Object.hasOwn(service2, "useHTTP2") && service2.useHTTP2;
                  const captureEvents = /* @__PURE__ */ __name2(function(req2) {
                    logger9.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify2(service2.data)).replace("{{URL}}", service2.url));
                    let dataXML;
                    const standardResponse = {
                      "http2Client": client,
                      "request": req2,
                      service: service2,
                      "responseHeaders": null
                    };
                    if (typeof service2.data === "object" && service2.data !== null) {
                      if (service2.useHTTP2) {
                        try {
                          logger9.debug("Sending data...");
                          const buffer = new Buffer(_DataStringify2(service2.data));
                          req2.write(buffer);
                        } catch (e) {
                          logger9.debug("It was not possible to send any data");
                          logger9.debug(`An error ocurred: ${e}`);
                        }
                      }
                    }
                    dataXML = "";
                    req2.on("response", (responseHeaders) => {
                      logger9.debug("receiving response...");
                      standardResponse.responseHeaders = responseHeaders;
                      dataXML = "";
                    });
                    req2.on("data", (chunk) => {
                      logger9.debug("receiving data...");
                      dataXML += "" + chunk.toString();
                      service2.template = dataXML;
                    });
                    if (service2.useHTTP2) {
                      req2.resume();
                    }
                    req2.on("end", () => {
                      logger9.debug("ending call...");
                      service2.template = dataXML;
                      if (Object.hasOwn(service2, "useHTTP2") && service2.useHTTP2) {
                        client.destroy();
                      } else {
                        req2.destroy();
                      }
                      service2.done.call(service2, standardResponse);
                      resolve.call(_promise, standardResponse);
                    });
                    if (service2.useHTTP2) {
                      req2.end();
                    }
                  }, "captureEvents");
                  try {
                    let requestOptions;
                    if (service2.useHTTP2) {
                      logger9.debug("using http2");
                      const http2 = _require_("http2");
                      var client = http2.connect(serviceURL.origin);
                      requestOptions = Object.assign({
                        ":method": service2.method,
                        ":path": serviceURL.pathname
                      }, service2.options);
                      requestOptions = Object.assign(requestOptions, service2.headers);
                      req = client.request(requestOptions);
                      req.setEncoding("utf8");
                      captureEvents(req);
                    } else {
                      if (serviceURL.protocol === "http:") {
                        const http = _require_("http");
                        const request = http.request;
                        requestOptions = Object.assign({
                          "url": service2.url,
                          headers: service2.headers
                        }, service2.options);
                        req = request(service2.url);
                        captureEvents(req);
                      } else if (serviceURL.protocol === "https:") {
                        const https = _require_("https");
                        requestOptions = Object.assign({
                          hostname: serviceURL.hostname,
                          port: serviceURL.port,
                          path: serviceURL.pathname,
                          method: service2.method,
                          headers: service2.headers
                        }, service2.options);
                        const _req_ = https.request(requestOptions, function(req2) {
                          captureEvents(req2);
                        });
                        _req_.end();
                      } else {
                        const e = "Protocol not supported: " + serviceURL.protocol;
                        logger9.debug(e);
                        throw new Error(e);
                      }
                    }
                  } catch (e) {
                    logger9.debug(e);
                    service2.fail.call(service2, e);
                    reject.call(_promise, e);
                  }
                }
              ).catch((e) => {
                logger9.debug(`Something happened when trying to call the service: ${service2.name}. Error: ${e}`);
                service2.fail.call(service2, e);
              });
              return _promise;
            }, "_serviceLoaderInNode");
            const _serviceLoaderMockup = /* @__PURE__ */ __name2(function(service2) {
              var _promise = new Promise(
                function(resolve) {
                  logger9.debug(`Calling mockup service ${service2.name} ...`);
                  const standardResponse = {
                    "request": null,
                    service: service2,
                    "responseHeaders": service2.responseHeaders
                  };
                  if (typeof service2.mockup === "function") {
                    service2.mockup.call(service2, standardResponse);
                  } else {
                    service2.done.call(service2, standardResponse);
                  }
                  resolve.call(_promise, standardResponse);
                }
              );
              return _promise;
            }, "_serviceLoaderMockup");
            const _serviceLoaderLocal = /* @__PURE__ */ __name2(function(service2) {
              var _promise = new Promise(
                function(resolve) {
                  logger9.debug(`Calling local service ${service2.name} ...`);
                  const standardResponse = {
                    "request": null,
                    service: service2,
                    "responseHeaders": service2.responseHeaders
                  };
                  if (typeof service2.local === "function") {
                    service2.local.call(service2, standardResponse);
                  } else {
                    service2.done.call(service2, standardResponse);
                  }
                  resolve.call(_promise, standardResponse);
                }
              );
              return _promise;
            }, "_serviceLoaderLocal");
            let _ret_;
            switch (service.kind) {
              case "rest":
                if (isBrowser) {
                  if (typeof _async !== "undefined" && _async) {
                    _ret_ = asyncLoad(_serviceLoaderInBrowser, [service, _async]);
                  } else {
                    _ret_ = _serviceLoaderInBrowser(service);
                  }
                } else {
                  _ret_ = _serviceLoaderInNode(service);
                }
                break;
              case "mockup":
                _ret_ = _serviceLoaderMockup(service);
                break;
              case "local":
                _ret_ = _serviceLoaderLocal(service);
                break;
              default:
                logger9.debug(`The value of the kind property of the service ${service.name} is not valid`);
                _ret_ = Promise.resolve();
                break;
            }
            return _ret_;
          }, "serviceLoader");
        }
      });
      var _tag_filter_;
      var init_tag_filter = __esm({
        "src/tag_filter.ts"() {
          "use strict";
          _tag_filter_ = "quick-component:not([loaded]),component:not([loaded])";
        }
      });
      var componentLoader;
      var init_componentLoader = __esm({
        "src/componentLoader.ts"() {
          "use strict";
          init_asyncLoad();
          init_ComplexStorageCache();
          init_DataStringify();
          init_Logger();
          init_platform();
          init_top();
          componentLoader = /* @__PURE__ */ __name2(function(component, _async) {
            let __promise__;
            const _componentLoaderInBrowser = /* @__PURE__ */ __name2(function(component2) {
              __promise__ = new Promise(function(resolve, reject) {
                const _promise = component2.__promise__;
                const container = Object.hasOwn(component2, "container") && typeof component2.container !== "undefined" && component2.container !== null ? component2.container : component2.body;
                if (container !== null) {
                  const _feedComponent_ = /* @__PURE__ */ __name2(function(component3) {
                    component3.feedComponent();
                    const standardResponse = {
                      "request": xhr,
                      component: component3
                    };
                    resolve.call(_promise, standardResponse);
                  }, "_feedComponent_");
                  logger9.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify2(component2.data)).replace("{{URL}}", component2.url));
                  const _componentLoaded = /* @__PURE__ */ __name2(function() {
                    const successStatus = is_file ? 0 : 200;
                    if (xhr.status === successStatus) {
                      const response = xhr.responseText;
                      logger9.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify2(response)));
                      logger9.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component2.name));
                      component2.template = response;
                      if (component2.cached && typeof cache !== "undefined") {
                        cache.save(component2.name, component2.template);
                      }
                      _feedComponent_(component2);
                    } else {
                      const standardResponse = {
                        "request": xhr,
                        component: component2
                      };
                      reject.call(_promise, standardResponse);
                    }
                  }, "_componentLoaded");
                  if (typeof component2.template === "string" && component2.template !== "") {
                    _feedComponent_(component2);
                  } else {
                    var is_file = !!component2.url.startsWith("file:");
                    var xhr = new XMLHttpRequest();
                    if (!is_file) {
                      try {
                        logger9.debug("Calling the url of component in async mode.");
                        xhr.open(component2.method, component2.url, true);
                      } catch (e) {
                        logger9.debug(`An error ocurred: ${e}.`);
                        logger9.debug("Last try has failed... The component cannot be loaded.");
                      }
                    } else {
                      if ("fetch" in _top) {
                        logger9.debug("I can use fetch...");
                        logger9.debug("It is a file to be loaded, so I will try to use fetch");
                        fetch(component2.url).then((response) => {
                          logger9.debug("I got a response from fetch, so I'll feed the component");
                          response.text().then((text) => {
                            component2.template = text;
                            _feedComponent_(component2);
                          }).catch((e) => {
                            throw new Error(`An error ocurred: ${e}`);
                          });
                        }).catch((e) => {
                          throw new Error(`An error ocurred: ${e}`);
                        });
                      }
                    }
                    if (!is_phonegap && !is_file) {
                      xhr.setRequestHeader("Content-Type", "text/html");
                    }
                    if (!is_file) {
                      xhr.onload = _componentLoaded;
                    }
                    const _directLoad = /* @__PURE__ */ __name2(function(is_file2) {
                      is_file2 = !(typeof is_file2 === "undefined" || !is_file2);
                      logger9.debug("SENDING THE NORMAL REQUEST  ");
                      if (is_file2) {
                        if (!("fetch" in _top)) {
                          logger9.debug("I have to try to load the file using xhr...  ");
                          xhr.send(null);
                          if (xhr.status === XMLHttpRequest.DONE) {
                            _componentLoaded();
                          }
                        }
                      } else {
                        logger9.debug("Trying to send the data to the component...  ");
                        xhr.send(_DataStringify2(component2.data));
                      }
                    }, "_directLoad");
                    if (component2.cached && !is_file) {
                      logger9.debug("USING CACHE FOR COMPONENT: " + component2.name);
                      var cache = new ComplexStorageCache({
                        index: component2.cacheIndex,
                        load() {
                          _directLoad.call(this, is_file);
                        },
                        alternate(cacheController) {
                          if (component2.method === "GET") {
                            component2.template = cacheController.cache.getCached(component2.cacheIndex);
                            _feedComponent_.call(this, component2);
                          } else {
                            _directLoad.call(this, is_file);
                          }
                        }
                      });
                      _top.lastCache = cache;
                    } else {
                      logger9.debug("NOT USING CACHE FOR COMPONENT: " + component2.name);
                      _directLoad(is_file);
                    }
                  }
                } else {
                  logger9.debug("CONTAINER DOESNT EXIST");
                }
              });
              __promise__.then(function(standardResponse) {
                return component2.__done__().then(function() {
                  let _ret_2;
                  if (typeof component2.done === "function") {
                    _ret_2 = component2.done.call(component2, standardResponse);
                  }
                  return Promise.resolve(_ret_2);
                });
              }, function(standardResponse) {
                if (typeof component2.fail === "function") {
                  component2.fail.call(component2, standardResponse).catch((e) => {
                    throw new Error(`${e}`);
                  });
                }
                return Promise.reject(new Error("An error ocurred"));
              }).catch(function(e) {
                logger9.debug("Something wrong loading the component");
                throw new Error(`An error ocurred: ${e}`);
              });
              return __promise__;
            }, "_componentLoaderInBrowser");
            const _componentLoaderInNode = /* @__PURE__ */ __name2(function(component2) {
              __promise__ = new Promise(function(resolve, reject) {
                const _promise = __promise__;
                const _feedComponent_ = /* @__PURE__ */ __name2(function(component3) {
                  component3.feedComponent().catch((e) => {
                    throw new Error(`An error ocurred trying to feed the component: ${component3.name}. Error: ${e}`);
                  });
                  const standardResponse = {
                    "request": null,
                    component: component3
                  };
                  resolve.call(_promise, standardResponse);
                }, "_feedComponent_");
                logger9.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify2(component2.data)).replace("{{URL}}", component2.url));
                const _componentLoaded = /* @__PURE__ */ __name2(function(err, responseText) {
                  if (!err) {
                    const response = responseText.toString();
                    logger9.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify2(response)));
                    logger9.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component2.name));
                    component2.template = response;
                    if (component2.cached && typeof cache !== "undefined") {
                      cache.save(component2.name, component2.template);
                    }
                    _feedComponent_(component2);
                  } else {
                    const standardResponse = {
                      "request": null,
                      component: component2
                    };
                    reject.call(_promise, standardResponse);
                  }
                }, "_componentLoaded");
                if (typeof component2.template === "string" && component2.template !== "") {
                  _feedComponent_(component2);
                } else {
                  logger9.debug("Loading the component as a local file in server...");
                  const _directLoad = /* @__PURE__ */ __name2(function() {
                    const { readFile } = __require("node:fs");
                    logger9.debug("SENDING THE NORMAL REQUEST  ");
                    readFile(component2.url, _componentLoaded);
                  }, "_directLoad");
                  if (component2.cached) {
                    logger9.debug("USING CACHE FOR COMPONENT: " + component2.name);
                    var cache = new ComplexStorageCache({
                      index: component2.cacheIndex,
                      load() {
                        _directLoad();
                      },
                      alternate(cacheController) {
                        if (component2.method === "GET") {
                          component2.template = cacheController.cache.getCached(component2.cacheIndex);
                          _feedComponent_.call(this, component2);
                        } else {
                          _directLoad.call(this);
                        }
                      }
                    });
                    _top.lastCache = cache;
                  } else {
                    logger9.debug("NOT USING CACHE FOR COMPONENT: " + component2.name);
                    _directLoad();
                  }
                }
              });
              __promise__.then(function(standardResponse) {
                return component2.__done__().then(function() {
                  let _ret_2;
                  if (typeof component2.done === "function") {
                    _ret_2 = component2.done.call(component2, standardResponse);
                  }
                  return Promise.resolve(_ret_2);
                });
              }, function(standardResponse) {
                if (typeof component2.fail === "function") {
                  component2.fail.call(component2, standardResponse).catch((e) => {
                    throw new Error(`An error ocurred: ${e}`);
                  });
                }
                return Promise.reject(new Error("An error ocurred."));
              }).catch(function(e) {
                logger9.debug(`Something wrong loading the component: ${e}`);
              });
              return __promise__;
            }, "_componentLoaderInNode");
            let _ret_;
            if (isBrowser) {
              if (typeof _async !== "undefined" && _async) {
                _ret_ = asyncLoad(_componentLoaderInBrowser, [component, _async]);
              } else {
                _ret_ = _componentLoaderInBrowser(component);
              }
            } else {
              _ret_ = _componentLoaderInNode(component);
            }
            return _ret_;
          }, "componentLoader");
        }
      });
      var Component2;
      var init_Component = __esm({
        "src/Component.ts"() {
          "use strict";
          init_Base64();
          init_basePath();
          init_Cast();
          init_ClassFactory();
          init_ComponentFactory();
          init_DataStringify();
          init_domain();
          init_DOMCreateElement();
          init_getType();
          init_InheritClass();
          init_introspection();
          init_is_a();
          init_isQCObjects();
          init_Logger();
          init_New();
          init_Package();
          init_platform();
          init_Processor();
          init_routings();
          init_top();
          init_CONFIG();
          init_serviceLoader();
          init_tag_filter();
          init_componentLoader();
          Component2 = class _Component extends InheritClass6 {
            static {
              __name(this, "_Component");
            }
            static {
              __name2(this, "Component");
            }
            static shadowed = false;
            static cached = true;
            name;
            templateURI;
            url;
            tplsource;
            tplextension;
            template;
            validRoutingWays = ["pathname", "hash", "search"];
            basePath = _basePath_;
            domain = _domain_;
            templateHandler = "DefaultTemplateHandler";
            processorHandler;
            routingWay = null;
            routingNodes = [];
            routings = [];
            routingPath = "";
            routingPaths = [];
            _componentHelpers = [];
            subcomponents = [];
            splashScreenComponent = void 0;
            controller = void 0;
            routingController = void 0;
            view = void 0;
            effect = void 0;
            effectClass;
            method = "GET";
            cached = true;
            __promise__ = null;
            data;
            __namespace = void 0;
            _parsedAssignmentText;
            __shadowRoot;
            _serviceClassName = null;
            enableServiceClass = true;
            serviceInstance;
            serviceData;
            shadowed = false;
            container;
            innerHTML;
            reload;
            static subcomponents;
            assignRoutingParams = true;
            responseTo;
            static responseTo;
            constructor({
              __parent__,
              templateURI = "",
              template,
              tplsource = "default",
              tplextension,
              url = "",
              name = "",
              method = "GET",
              data = {},
              reload = false,
              shadowed = false,
              cached = true,
              enableServiceClass,
              assignRoutingParams = true,
              _body = _DOMCreateElement("div"),
              __promise__ = null,
              __shadowRoot,
              body,
              shadowRoot,
              splashScreenComponent,
              controller,
              view
            }) {
              if (arguments.length < 1) {
                throw Error("No arguments in component. You must at least give one argument.");
              }
              super({
                __parent__,
                templateURI,
                template,
                tplsource,
                tplextension,
                url,
                name,
                method,
                data,
                reload,
                shadowed,
                cached,
                enableServiceClass,
                assignRoutingParams,
                _body,
                __promise__,
                __shadowRoot,
                body,
                shadowRoot,
                splashScreenComponent,
                controller,
                view
              });
              const self2 = this;
              if (typeof name !== "undefined") {
                self2.name = name;
              }
              if (typeof self2.name === "undefined" && typeof name === "undefined") {
                logger9.warn("A name is not defined for " + __getType__(self2));
              }
              self2.routingWay = CONFIG5.get("routingWay");
              self2.processorHandler = new Processor({
                component: self2
              });
              self2.data = typeof self2.data === "undefined" || self2.data === null ? {} : self2.data;
              self2.data = Object.assign(self2.data, self2.dataAttributes);
              self2.createServiceInstance().then(() => {
                if (typeof self2.__new__ === "function") {
                  self2.__new__(self2);
                }
                self2._generateRoutingPaths(self2.body).then(function() {
                  self2._reroute_().then(function() {
                    return self2.rebuild().then(function() {
                      logger9.info(`Component._new_ The component ${self2.name} was built successfully!`);
                    }).catch(function(standardResponse) {
                      logger9.warn(`Component._new_ Something went wrong building the component ${self2.name}`);
                      console.error(`Component._new_ Something went wrong building the component ${self2.name}`, standardResponse);
                    });
                  }).catch((e) => {
                    throw Error(`Unexpected error ${e}`);
                  });
                }).catch((e) => {
                  throw Error(`Unexpected error ${e}`);
                });
              }).catch((e) => {
                throw Error(`Unexpected error. ${e}`);
              });
            }
            set cacheIndex(value) {
              logger9.debug("[cacheIndex] This property is readonly");
            }
            get cacheIndex() {
              const self2 = this;
              const __routing_path__ = _DataStringify2(self2.routingPath);
              return Base64.encode(self2.name + __routing_path__);
            }
            set parsedAssignmentText(value) {
              logger9.debug("[parsedAssignmentText] This property is readonly");
            }
            get parsedAssignmentText() {
              const self2 = this;
              self2._parsedAssignmentText = self2.parseTemplate(self2.template);
              if (typeof self2._parsedAssignmentText === "undefined") {
                throw Error(`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
              }
              return self2._parsedAssignmentText;
            }
            set shadowRoot(value) {
              const self2 = this;
              if (typeof self2.__shadowRoot === "undefined") {
                self2.__shadowRoot = value;
              } else {
                logger9.debug("[shadowRoot] This property can only be assigned once!");
              }
            }
            get shadowRoot() {
              const self2 = this;
              return self2.__shadowRoot;
            }
            set routingSelected(value) {
              logger9.debug("[routingSelected] This is a read-only property of the component");
            }
            get routingSelected() {
              const self2 = this;
              return __valid_routings__(self2.routings, self2.routingPath);
            }
            set routingParams(value) {
              logger9.debug("[routingParams] This is a read-only property of the component");
            }
            get routingParams() {
              const component = this;
              return [{}].concat(component.routingSelected.map(function(routing) {
                return __routing_params__(routing, component.routingPath);
              })).reduce(function(accumulator, colData) {
                return Object.assign(accumulator, colData);
              });
            }
            set serviceClassName(_serviceClassName) {
              this._serviceClassName = _serviceClassName;
            }
            get serviceClassName() {
              let _serviceClassName = "";
              if (isBrowser) {
                _serviceClassName = this.body.getAttribute("serviceClass") !== null ? this.body.getAttribute("serviceClass") : this._serviceClassName;
              } else {
                _serviceClassName = this._serviceClassName;
              }
              return _serviceClassName;
            }
            get responseToData() {
              let _response_to_data_ = false;
              if (isBrowser) {
                const responseToAttr = this.body.getAttribute("response-to");
                _response_to_data_ = responseToAttr === "data" || this.responseTo === "data";
              } else {
                _response_to_data_ = this.responseTo === "data";
              }
              return _response_to_data_;
            }
            get responseToTemplate() {
              let _response_to_template_ = false;
              if (isBrowser) {
                const responseToAttr = this.body.getAttribute("response-to");
                _response_to_template_ = responseToAttr === "template" || this.responseTo === "template";
              } else {
                _response_to_template_ = this.responseTo === "template";
              }
              return _response_to_template_;
            }
            createServiceInstance() {
              const component = this;
              let data = this.data;
              let __serviceClass;
              const __classDefinition = component.getClass().__definition;
              const _serviceClassName = component.serviceClassName;
              return new Promise(function(resolve, reject) {
                const __enable_service_class__ = component.enableServiceClass;
                let _response_to_data_ = component.responseToData;
                let _response_to_template_ = component.responseToTemplate;
                if (__enable_service_class__ && _serviceClassName !== null) {
                  __serviceClass = ClassFactory(_serviceClassName);
                }
                if (!_response_to_data_ && __classDefinition && Object.hasOwn(__classDefinition, "responseTo")) {
                  _response_to_data_ = __classDefinition.responseTo === "data";
                } else if (!_response_to_data_ && Object.hasOwn(ClassFactory("Component"), "responseTo")) {
                  _response_to_data_ = ClassFactory("Component").responseTo === "data";
                }
                if (!_response_to_template_ && __classDefinition && Object.hasOwn(__classDefinition, "responseTo")) {
                  _response_to_template_ = __classDefinition.responseTo === "template";
                } else if (!_response_to_template_ && Object.hasOwn(ClassFactory("Component"), "responseTo")) {
                  _response_to_template_ = ClassFactory("Component").responseTo === "template";
                }
                if (typeof __serviceClass !== "undefined" && (typeof __enable_service_class__ !== "undefined" && __enable_service_class__ === true) && (_response_to_data_ || _response_to_template_)) {
                  logger9.info("Loading service " + _serviceClassName);
                  const serviceInstance = New3(__serviceClass, {
                    data
                  });
                  serviceLoader3(serviceInstance)?.then(function({
                    service
                  }) {
                    let serviceResponse;
                    if (typeof service.JSONresponse !== "undefined" && service.JSONresponse !== null) {
                      serviceResponse = service.JSONresponse;
                    } else {
                      serviceResponse = service.template;
                    }
                    if (_response_to_data_) {
                      if (typeof data === "object" && typeof serviceResponse === "object") {
                        data = Object.assign(data, serviceResponse);
                      } else {
                        data = serviceResponse;
                      }
                      component.data = data;
                    }
                    component.serviceInstance = serviceInstance;
                    component.serviceData = data;
                    if (_response_to_template_) {
                      component.template = serviceResponse;
                    }
                    resolve(serviceResponse);
                  }, function(rejectedResponse) {
                    logger9.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
                    reject(rejectedResponse);
                  }).catch(function(e) {
                    logger9.debug("Something went wroing while trying to load the service " + _serviceClassName);
                    throw Error(`Error loading ${_serviceClassName} for ${component.name}. Detail: ${e}`);
                  });
                } else {
                  resolve(null);
                }
              });
            }
            _bindroute_() {
              const _component_ = this;
              if (!_component_._bindroute_.loaded) {
                if (isBrowser) {
                  _component_.hostElements("a").map(function(a) {
                    a.oldclick = a.onclick;
                    a.onclick = function(e) {
                      let _ret_ = true;
                      if (!_top.global.get("routingPaths")) {
                        _top.global.set("routingPaths", []);
                      }
                      const routingWay = CONFIG5.get("routingWay");
                      const routingPath = e.target[routingWay];
                      if (_top.global.get("routingPaths").includes(routingPath) && e.target[routingWay] !== location[routingWay] && e.target.href !== document.location.href) {
                        logger9.debug("A ROUTING WAS FOUND: " + routingPath);
                        window.history.pushState({
                          href: e.target.href
                        }, e?.target?.href, e.target.href);
                        _Component.route().catch((e2) => {
                          throw Error(`Unexpected error: ${e2}`);
                        });
                        _ret_ = false;
                      } else {
                        logger9.debug("NO ROUTING FOUND FOR: " + routingPath);
                      }
                      if (typeof e.target.oldclick !== "undefined" && typeof e.target.oldclick === "function") {
                        e.target.oldclick.call(e.target, e);
                      }
                      return _ret_;
                    };
                    return null;
                  });
                } else {
                }
                _component_._bindroute_.loaded = true;
              } else {
                logger9.debug(`Routes already bound to popstate events for ${_component_.name}`);
              }
            }
            done(standardResponse) {
              const _ret_ = new Promise((resolve) => {
                if (typeof standardResponse !== "undefined") {
                  const { request, component } = standardResponse;
                  resolve({ request, component });
                } else {
                  resolve({ request: void 0, component: void 0 });
                }
              });
              return _ret_;
            }
            createControllerInstance() {
              let _Controller;
              if (isBrowser) {
                if (typeof this.body === "undefined") {
                  throw new Error("The component has no body");
                }
                var controllerName = this.body.getAttribute("controllerClass");
                if (!controllerName) {
                  controllerName = "Controller";
                }
                _Controller = ClassFactory(controllerName);
                if (typeof _Controller !== "undefined") {
                  this.controller = New3(_Controller, {
                    component: this
                  });
                }
              }
              return new Promise((resolve, reject) => {
                if (isBrowser) {
                  if (typeof _Controller !== "undefined" && typeof this.controller !== "undefined") {
                    if (typeof this.controller.done === "function") {
                      try {
                        this.controller.done.call(this.controller);
                      } catch (e) {
                        throw Error(e);
                      }
                    } else {
                      logger9.debug(`${controllerName} does not have a done() method.`);
                      reject(new Error(`${controllerName} does not have a done() method.`));
                    }
                    if (typeof this.controller.createRoutingController === "function") {
                      this.controller.createRoutingController.call(this.controller);
                    } else {
                      logger9.debug(`${controllerName} does not have a createRoutingController() method.`);
                    }
                  }
                }
                resolve({ component: this, controller: this.controller });
              });
            }
            createEffectInstance() {
              const _component_ = this;
              return new Promise(function(resolve) {
                if (isBrowser) {
                  const effectClassName = _component_.body?.getAttribute("effectClass");
                  let applyEffectTo = _component_.body?.getAttribute("apply-effect-to");
                  applyEffectTo = applyEffectTo !== null ? applyEffectTo : "load";
                  if (effectClassName !== null && applyEffectTo === "observe") {
                    _component_.applyObserveTransitionEffect(effectClassName);
                  } else if (effectClassName !== null && applyEffectTo === "load") {
                    _component_.applyTransitionEffect(effectClassName);
                  }
                }
                resolve({ component: _component_, effect: _component_.effect });
              });
            }
            createViewInstance() {
              const _component_ = this;
              return new Promise(function(resolve) {
                const viewName = isBrowser ? _component_.body.getAttribute("viewClass") : null;
                if (viewName !== null) {
                  const _View = ClassFactory(viewName);
                  if (typeof _View !== "undefined") {
                    _component_.view = New3(_View, {
                      component: _component_
                    });
                    if (Object.hasOwn(_component_.view, "done") && typeof _component_.view?.done === "function") {
                      _component_.view?.done.call(_component_.view);
                    }
                  }
                }
                resolve({ component: _component_, view: _component_.view });
              });
            }
            __done__() {
              const _component_ = this;
              const componentDone = /* @__PURE__ */ __name2(function() {
                if (typeof _component_ === "undefined") {
                  throw new Error("componentDone() has lost its context");
                }
                if (typeof _component_.body === "undefined") {
                  throw new Error("The component has no body");
                }
                (async () => {
                  await _component_.createViewInstance();
                  await _component_.createControllerInstance();
                  await _component_.createEffectInstance();
                })().catch((e) => {
                  throw new Error(`Unknown error ${e}.`);
                });
                logger9.debug(`Trying to run component helpers for ${_component_.name}...`);
                try {
                  _component_.runComponentHelpers();
                  logger9.debug(`Component helpers for ${_component_.name} executed.`);
                } catch (e) {
                  logger9.debug(`Component helpers for ${_component_.name} could not be executed.`);
                  throw Error(e);
                }
                _component_.subcomponents = _component_.__buildSubComponents__();
                _component_._bindroute_();
                if (isBrowser) {
                  _component_.body.setAttribute("loaded", "true");
                }
              }, "componentDone");
              return new Promise(function(resolve, reject) {
                try {
                  resolve(componentDone.call(_component_));
                } catch (e) {
                  reject(new Error(e));
                }
              });
            }
            hostElements(tagFilter) {
              const _component_ = this;
              let elementList = [];
              if (isBrowser) {
                elementList = _component_.shadowed && typeof _component_.shadowRoot !== "undefined" ? _component_.shadowRoot.subelements(tagFilter) : _component_.body.subelements(tagFilter);
              }
              return elementList;
            }
            get subtags() {
              const _component_ = this;
              const tagFilter = _tag_filter_;
              return _component_.hostElements(tagFilter);
            }
            get bodyAttributes() {
              const _component_ = this;
              const c = _component_.body;
              return isBrowser ? [...c.getAttributeNames()].map((a) => {
                return { [a]: c.getAttribute(a) };
              }).reduce((accumulator, colData) => {
                return Object.assign(accumulator, colData);
              }) : {};
            }
            get dataAttributes() {
              const _component_ = this;
              const c = _component_.body;
              return isBrowser ? [{}].concat([...c.getAttributeNames()].filter((n) => n.startsWith("data-")).map((a) => {
                return { [a.split("-")[1]]: c.getAttribute(a) };
              })).reduce((accumulator, colData) => {
                return Object.assign(accumulator, colData);
              }) : {};
            }
            __buildSubComponents__(rebuildObjects = false) {
              const _component_ = this;
              let elementList = _component_.subtags;
              if (!rebuildObjects) {
                elementList = elementList.filter((t) => t.getAttribute("loaded") !== "true");
              }
              if (typeof _component_ !== "undefined" || _component_.subcomponents.length < 1) {
                _component_.subcomponents = _buildComponentsFromElements_(elementList, _component_);
              }
              return _component_.subcomponents;
            }
            fail(standardResponse) {
              const _ret_ = new Promise((resolve, reject) => {
                if (typeof standardResponse !== "undefined") {
                  const { error, component } = standardResponse;
                  resolve({ error, component });
                } else {
                  reject(new Error(" Unknown error."));
                }
              });
              return _ret_;
            }
            set(key, value) {
              this[key] = value;
            }
            get(key, _defaultValue) {
              return this[key] || _defaultValue;
            }
            feedComponent() {
              const _component_ = this;
              logger9.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
              const _feedComponent_InBrowser = /* @__PURE__ */ __name2(function(_component_2) {
                if (typeof _component_2.container === "undefined" && typeof _component_2.body === "undefined") {
                  logger9.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_2.name));
                  return;
                }
                const container = typeof _component_2.container === "undefined" || _component_2.container === null ? _component_2.body : _component_2.container;
                const parsedAssignmentText = _component_2.parsedAssignmentText;
                _component_2.innerHTML = parsedAssignmentText;
                if (_component_2.shadowed) {
                  logger9.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_2.name));
                  logger9.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                  const tmp_shadowContainer = _DOMCreateElement("div");
                  container.subelements("[slot]").map(
                    (c) => {
                      if (c.parentElement === container) {
                        tmp_shadowContainer.appendChild(c);
                      }
                      return c;
                    }
                  );
                  logger9.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                  const shadowContainer = _DOMCreateElement("div");
                  shadowContainer.classList.add("shadowHost");
                  try {
                    _component_2.shadowRoot = shadowContainer.attachShadow({
                      mode: "open"
                    });
                  } catch (e) {
                    logger9.debug(`An error ocurred: ${e}.`);
                    try {
                      logger9.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_2.name));
                      _component_2.shadowRoot = shadowContainer.shadowRoot;
                    } catch (e2) {
                      logger9.debug(`An error ocurred: ${e2}.`);
                      logger9.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_2.name));
                    }
                  }
                  if (typeof _component_2.shadowRoot !== "undefined" && _component_2.shadowRoot !== null) {
                    if (_component_2.reload) {
                      logger9.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                      if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                        shadowContainer.shadowRoot.innerHTML = _component_2.innerHTML;
                      }
                    } else {
                      tmp_shadowContainer.innerHTML = _component_2.parseTemplate(tmp_shadowContainer.innerHTML);
                      logger9.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
                      if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                        shadowContainer.shadowRoot.innerHTML += _component_2.innerHTML;
                      }
                    }
                    logger9.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
                    shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
                    logger9.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_2.name));
                    const qs = container.querySelector(".shadowHost");
                    if (!(typeof qs !== "undefined" && qs !== null)) {
                      container.appendChild(shadowContainer);
                    } else {
                      logger9.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_2.name));
                      if (_component_2.shadowRoot !== null && shadowContainer.shadowRoot !== null) {
                        _component_2.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
                      }
                    }
                  } else {
                    logger9.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_2.name));
                  }
                } else {
                  if (_component_2.reload) {
                    logger9.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                    container.innerHTML = _component_2.innerHTML;
                  } else if (container && _component_2) {
                    logger9.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
                    container.innerHTML += _component_2.innerHTML;
                  } else {
                    logger9.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_2.name));
                  }
                }
              }, "_feedComponent_InBrowser");
              const _feedComponent_InNode = /* @__PURE__ */ __name2(function(_component_2) {
                const parsedAssignmentText = _component_2.parsedAssignmentText;
                _component_2.innerHTML = parsedAssignmentText;
              }, "_feedComponent_InNode");
              let _ret_;
              if (!is_a(_component_, "Component")) {
                logger9.warn("Trying to feed a non component object");
                return Promise.reject(new Error(`Trying to feed a non component object ${typeof _component_}`));
              }
              return new Promise((resolve, reject) => {
                if (isBrowser) {
                  try {
                    _ret_ = _feedComponent_InBrowser(_component_);
                    resolve(_ret_);
                  } catch (e) {
                    reject(new Error(e));
                  }
                } else {
                  try {
                    _ret_ = _feedComponent_InNode(_component_);
                    resolve(_ret_);
                  } catch (e) {
                    reject(new Error(e));
                  }
                }
              });
            }
            rebuild() {
              const _component = this;
              var _promise = new Promise(function(resolve, reject) {
                if (typeof _component === "undefined" || _component === null) {
                  reject(new Error("Component is undefined"));
                }
                if (isQCObjects_Object(_component) && is_a(_component, "Component")) {
                  switch (true) {
                    case _component.get("tplsource") === "none":
                      logger9.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                      var standardResponse = {
                        request: void 0,
                        component: _component
                      };
                      _component.__done__().then(function() {
                        if (typeof _component.done === "function") {
                          _component.done.call(_component, standardResponse).catch((e) => {
                            logger9.debug(`It was an error while calling done() in ${_component.name}: ${e}`);
                          });
                        }
                        resolve.call(_promise, standardResponse);
                      }, function() {
                        reject.call(_promise, standardResponse);
                      });
                      break;
                    case _component.get("tplsource") === "inline":
                      logger9.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                      (async (_component2) => {
                        await _component2.feedComponent.bind(_component2)();
                      })(_component).catch((e) => {
                        logger9.debug(`It was not possible to feed the component ${_component.name}: ${e}`);
                      });
                      var standardResponse = {
                        request: void 0,
                        component: _component
                      };
                      _component.__done__().then(async () => {
                        if (typeof _component.done === "function") {
                          await _component.done(standardResponse);
                        }
                        resolve.call(_promise, standardResponse);
                      }, function() {
                        reject.call(_promise, standardResponse);
                      });
                      break;
                    case (_component.get("tplsource") === "default" && _component.get("templateURI") !== ""):
                      _component.set("url", _component.get("basePath") + _component.get("templateURI"));
                      componentLoader(_component, false)?.then(
                        function(standardResponse2) {
                          resolve.call(_promise, standardResponse2);
                        },
                        function(standardResponse2) {
                          reject.call(_promise, standardResponse2);
                        }
                      );
                      break;
                    case (_component.get("tplsource") === "external" && _component.get("templateURI") !== ""):
                      _component.set("url", _component.get("templateURI"));
                      componentLoader(_component, false).then(
                        function(standardResponse2) {
                          resolve.call(_promise, standardResponse2);
                        },
                        function(standardResponse2) {
                          reject.call(_promise, standardResponse2);
                        }
                      );
                      break;
                    case (_component.get("tplsource") === "default" && _component.get("templateURI", "") === ""):
                      logger9.debug(`Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                      reject.call(_promise, `Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                      break;
                    default:
                      logger9.debug("Component " + _component.name + " will not be rebuilt because no templateURI is present");
                      reject.call(_promise, {
                        request: null,
                        component: _component
                      });
                      break;
                  }
                }
              });
              return _promise;
            }
            Cast(oClass) {
              const o = _methods_(oClass).map((m) => m.name.replace(/bound /g, "")).map((m) => {
                return {
                  [m]: oClass[m].bind(this)
                };
              }).reduce((c, p) => Object.assign(c, p), {});
              return _Cast(this, o);
            }
            route() {
              return this.constructor.route();
            }
            static route() {
              const componentClass = this;
              let _route_promise_;
              const isValidInstance = !!(isQCObjects_Object(componentClass) && is_a(componentClass, "Component"));
              const __route__ = /* @__PURE__ */ __name2(function(componentList) {
                const _componentNames_ = [];
                const _promises_ = componentList.filter(function(rc) {
                  return typeof rc !== "undefined";
                }).map(function(rc) {
                  if (typeof rc.name !== "undefined") {
                    _componentNames_.push(rc.name);
                  } else {
                    throw new Error(__getType__(rc) + " does not have a name");
                  }
                  return new Promise(function(resolve, reject) {
                    if (typeof rc !== "undefined" && !!rc._reroute_) {
                      rc._reroute_().then(function() {
                        rc.reload = true;
                        rc.rebuild().then(() => {
                          resolve();
                        }).catch((e) => {
                          logger9.debug(`Error ${e}`);
                        });
                        return;
                      }).then(function() {
                        if (Object.hasOwn(rc, "subcomponents") && typeof rc.subcomponents !== "undefined" && rc.subcomponents.length > 0) {
                          logger9.debug("LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: " + rc.name);
                          return __route__.call(rc, rc.subcomponents);
                        } else {
                          logger9.debug("No subcomponents to look for routings in: " + rc.name);
                          if (rc.subtags.length > 0) {
                            rc.subcomponents = rc.__buildSubComponents__(true);
                          }
                          resolve();
                        }
                      }).catch((e) => {
                        logger9.debug(`Error: ${e}`);
                      });
                    } else if (typeof rc !== "undefined") {
                      reject(new Error("Component " + rc.name + " is not an instance of Component"));
                    }
                    return;
                  });
                });
                return Promise.all(_promises_).then(function() {
                  logger9.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
                }).catch(function(err) {
                  logger9.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
                });
              }, "__route__");
              if (isValidInstance || !!componentsStack) {
                if (isValidInstance) {
                  logger9.debug("loading routings for instance " + componentClass.name);
                }
                _route_promise_ = __route__.call(componentClass, isValidInstance ? componentClass.subcomponents : componentsStack);
              } else {
                logger9.debug("An undetermined result expected if load routings. So will not be loaded this time.");
                throw Error("There is no valid instance and no components stack available to apply rountings");
              }
              return _route_promise_;
            }
            fullscreen() {
              if (isBrowser) {
                const elem = this.body;
                if (elem.requestFullscreen) {
                  elem.requestFullscreen().catch((e) => {
                    throw new Error(`An error ocurred when requesting fullscreen: ${e}`);
                  });
                } else if (elem.mozRequestFullScreen) {
                  elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                  elem.msRequestFullscreen();
                }
              } else {
              }
            }
            closefullscreen() {
              if (isBrowser) {
                if (document.exitFullscreen) {
                  document.exitFullscreen().catch((e) => {
                    throw new Error(`An error ocurred when trying to exit fullscrenn ${e}.`);
                  });
                } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
                }
              } else {
              }
            }
            _generateRoutingPaths(componentBody) {
              const component = this;
              return new Promise(function(resolve) {
                if (isBrowser) {
                  if (__valid_routing_way__(component.validRoutingWays, component.routingWay || "")) {
                    if (typeof componentBody !== "undefined") {
                      component.innerHTML = componentBody?.innerHTML;
                      component.routingNodes = componentBody?.subelements("routing");
                      component.routings = [];
                      component.routingNodes.map((routingNode) => {
                        const attributeNames = routingNode.getAttributeNames();
                        const routing = {};
                        attributeNames.map((attributeName, a) => {
                          routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
                          return attributeName;
                        });
                        component.routings.push(routing);
                        if (!component.routingPaths) {
                          component.routingPaths = [];
                        }
                        if (!component.routingPaths.includes(routing.path)) {
                          component.routingPaths.push(routing.path);
                        }
                        if (!_top.global.get("routingPaths")) {
                          _top.global.set("routingPaths", []);
                        }
                        if (!_top.global.get("routingPaths").includes(routing.path)) {
                          _top.global.get("routingPaths").push(routing.path);
                        }
                        return routingNode;
                      });
                    }
                  }
                } else {
                }
                resolve();
              });
            }
            parseTemplate(template) {
              const _self = this;
              let _parsedAssignmentText;
              const value = template;
              if (Object.hasOwn(_self, "templateHandler")) {
                const templateHandlerName = _self.templateHandler;
                logger9.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
                const templateHandlerClass = ClassFactory(templateHandlerName);
                const templateInstance = New3(templateHandlerClass, {
                  component: _self,
                  template: value
                });
                templateInstance.component = _self;
                let selfData = _self.data;
                if (Object.hasOwn(_self, "assignRoutingParams") && _self.assignRoutingParams) {
                  try {
                    selfData = Object.assign(selfData, _self.routingParams);
                  } catch (e) {
                    logger9.debug(`An error ocurred: ${e}.`);
                    logger9.debug("[parseTemplate] it was not possible to assign the routing params to the template");
                  }
                }
                _parsedAssignmentText = templateInstance.assign(selfData);
              } else {
                logger9.debug(`[Component][${this.name}][parseTemplate] No value for templateHandler. Using raw content...`);
                _parsedAssignmentText = value;
              }
              return _parsedAssignmentText;
            }
            _reroute_() {
              const rc = this;
              return new Promise(function(resolve) {
                if (isBrowser) {
                  if (__valid_routing_way__(rc.validRoutingWays, rc.routingWay || "")) {
                    rc.routingPath = location[rc.routingWay];
                    rc.routingSelected.map((routing) => {
                      const componentURI = ComponentURI({
                        "COMPONENTS_BASE_PATH": CONFIG5.get("componentsBasePath"),
                        "COMPONENT_NAME": routing.name.toString(),
                        "TPLEXTENSION": Object.hasOwn(routing, "tplextension") ? routing.tplextension || "" : rc.tplextension,
                        "TPL_SOURCE": "default"
                        /* here is always default in order to get the right uri */
                      });
                      rc.templateURI = componentURI;
                      return routing;
                    });
                    if (rc.routingSelected.length > 0) {
                      rc.template = "";
                      if (typeof rc.body !== "undefined" && rc.body !== null) {
                        rc.body.innerHTML = "";
                      }
                    }
                  }
                }
                resolve(rc);
              });
            }
            lazyLoadImages() {
              if (isBrowser) {
                const component = this;
                const _componentRoot = component.componentRoot;
                if (typeof _componentRoot !== "undefined" && _componentRoot !== null) {
                  const _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
                  const _lazyLoadImages = /* @__PURE__ */ __name2(function(image) {
                    image.setAttribute("src", image.getAttribute("lazy-src")?.toString());
                    image.onload = () => {
                      image.removeAttribute("lazy-src");
                    };
                  }, "_lazyLoadImages");
                  if ("IntersectionObserver" in window) {
                    const observer = new IntersectionObserver((items, observer2) => {
                      items.forEach((item) => {
                        if (item.isIntersecting) {
                          _lazyLoadImages(item.target);
                          observer2.unobserve(item.target);
                        }
                      });
                    });
                    _imgLazyLoaded.map(function(img) {
                      return observer.observe(img);
                    });
                  } else {
                    _imgLazyLoaded.map(_lazyLoadImages);
                  }
                }
              } else {
              }
              return null;
            }
            applyTransitionEffect(effectClassName) {
              const _Effect = ClassFactory(effectClassName);
              if (typeof _Effect === "undefined") {
                throw Error(`${effectClassName} not found.`);
              }
              if (typeof _Effect !== "undefined" && is_a(_Effect, "TransitionEffect")) {
                this.effect = New3(_Effect, {
                  component: this
                });
                this.effect?.apply(this.effect?.defaultParams);
              } else {
                logger9.debug(`${effectClassName} is ${__getType__(_Effect)} but is not a TransitionEffect`);
              }
            }
            applyObserveTransitionEffect(effectClassName) {
              if (isBrowser) {
                const component = this;
                const _componentRoot = component.componentRoot;
                const _applyEffect_ = /* @__PURE__ */ __name2(function() {
                  component.applyTransitionEffect(effectClassName);
                }, "_applyEffect_");
                if ("IntersectionObserver" in window) {
                  const observer = new IntersectionObserver((items, observer2) => {
                    items.forEach((item) => {
                      if (item.isIntersecting) {
                        _applyEffect_();
                        observer2.unobserve(item.target);
                      }
                    });
                  });
                  observer.observe(_componentRoot);
                } else {
                  _applyEffect_();
                }
              } else {
              }
            }
            get componentRoot() {
              return this.shadowed ? this.shadowRoot : this.body;
            }
            scrollIntoHash() {
              if (isBrowser) {
                const component = this;
                if (document.location.hash !== "") {
                  const _componentRoot = component.componentRoot;
                  (_componentRoot?.subelements(document.location.hash)).map(
                    (element) => {
                      if (typeof element.scrollIntoView === "function") {
                        element.scrollIntoView(
                          CONFIG5.get("scrollIntoHash", {
                            behavior: "auto",
                            block: "top",
                            inline: "top"
                          })
                        );
                      }
                      return element;
                    }
                  );
                }
              } else {
              }
            }
            i18n_translate() {
              if (isBrowser) {
                if (CONFIG5.get("use_i18n")) {
                  const component = this;
                  const _componentRoot = component.componentRoot;
                  const lang1 = CONFIG5.get("lang", "en");
                  const lang2 = navigator.language.slice(0, 2);
                  const i18n = _top.global.get("i18n");
                  if (lang1 !== lang2 && (typeof i18n === "object" && Object.hasOwn(i18n, "messages"))) {
                    const callback_i18n = /* @__PURE__ */ __name2(() => {
                      return new Promise(function(resolve) {
                        const messages = i18n.messages.filter(function(message) {
                          return Object.hasOwn(message, lang1) && Object.hasOwn(message, lang2);
                        });
                        (_componentRoot?.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component")).map((element) => {
                          messages.map(function(message) {
                            let _innerHTML = element.innerHTML;
                            _innerHTML = _innerHTML?.replace(new RegExp(`${message[lang1]}`, "g"), message[lang2]);
                            element.innerHTML = _innerHTML;
                            return null;
                          });
                          return element;
                        });
                        resolve();
                      });
                    }, "callback_i18n");
                    callback_i18n.call(component).then(function() {
                      logger9.debug("i18n loaded for component: " + component.name);
                    }).catch((e) => {
                      throw new Error(`An error ocurred when parsing i18n: ${e}.`);
                    });
                  }
                }
              } else {
              }
            }
            addComponentHelper(componentHelper) {
              const component = this;
              component._componentHelpers.push(componentHelper);
            }
            runComponentHelpers() {
              if (isBrowser) {
                const component = this;
                let __component_helpers__ = [];
                __component_helpers__.push(component.i18n_translate.bind(component));
                __component_helpers__.push(component.scrollIntoHash.bind(component));
                __component_helpers__.push(component.lazyLoadImages.bind(component));
                __component_helpers__ = __component_helpers__.concat(component._componentHelpers);
                __component_helpers__.map(
                  (_component_helper_) => {
                    logger9.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
                    _component_helper_();
                    return _component_helper_;
                  }
                );
              } else {
              }
            }
          };
          Package7("com.qcobjects", [
            Component2
          ]);
          _methods_(ClassFactory("Component")).map((__c__) => {
            _protected_code_(__c__);
            return __c__;
          });
        }
      });
      var ComponentURI;
      var _buildComponentFromElement_;
      var _buildComponentsFromElements_;
      var buildComponents;
      var init_ComponentFactory = __esm({
        "src/ComponentFactory.ts"() {
          "use strict";
          init_Class();
          init_ClassFactory();
          init_Component();
          init_CONFIG();
          init_DOMCreateElement();
          init_getType();
          init_Logger();
          init_New();
          init_Package();
          init_platform();
          init_tag_filter();
          ComponentURI = /* @__PURE__ */ __name2(({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }) => {
            const templateURI = TPL_SOURCE === "default" ? `${COMPONENTS_BASE_PATH}${COMPONENT_NAME}.${TPLEXTENSION}` : "";
            return templateURI;
          }, "ComponentURI");
          _buildComponentFromElement_ = /* @__PURE__ */ __name2(function(element, __parent__) {
            const __shadowed_not_set = element.getAttribute("shadowed") === null;
            const __tplsource_attr_not_set = element.getAttribute("template-source") === null;
            const shadowed = element.getAttribute("shadowed") === "true";
            const __cached_not_set = element.getAttribute("cached") === null;
            const cached = element.getAttribute("cached") === "true";
            let tplextension = typeof CONFIG5.get("tplextension") !== "undefined" ? CONFIG5.get("tplextension") : "html";
            tplextension = element.getAttribute("tplextension") !== null ? element.getAttribute("tplextension") : tplextension;
            let _componentName = element.getAttribute("name");
            const _componentClassName = element.getAttribute("componentClass") !== null ? element.getAttribute("componentClass") : "Component";
            const __componentClassName = CONFIG5.get("preserveComponentBodyTag") ? _componentName !== null ? "com.qcobjects.components." + _componentName + ".ComponentBody" : "com.qcobjects.components.ComponentBody" : _componentClassName;
            _componentName = _componentName !== null ? _componentName : ClassFactory(__componentClassName) && typeof ClassFactory(__componentClassName).name !== "undefined" ? ClassFactory(__componentClassName).name : "";
            const __classDefinition = ClassFactory(__componentClassName);
            const __tplsource_prop_set = !!(__componentClassName !== "Component" && (typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string" && __classDefinition.tplsource !== ""));
            const tplsource = __tplsource_attr_not_set && __tplsource_prop_set ? __classDefinition.tplsource : __tplsource_attr_not_set ? "default" : element.getAttribute("template-source");
            logger9.debug(`template source for  ${_componentName} is ${tplsource} `);
            logger9.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);
            const componentURI = ComponentURI({
              "COMPONENTS_BASE_PATH": CONFIG5.get("componentsBasePath"),
              "COMPONENT_NAME": _componentName,
              "TPLEXTENSION": tplextension,
              "TPL_SOURCE": tplsource
            });
            if (CONFIG5.get("preserveComponentBodyTag")) {
              Package7(_componentName !== "" ? "com.qcobjects.components." + _componentName : "com.qcobjects.components", [
                Class("ComponentBody", Component2, {
                  name: _componentName,
                  tplsource,
                  tplextension,
                  reload: true
                })
              ]);
            }
            const __create_component_instance_ = /* @__PURE__ */ __name2(function() {
              const __shadowed = __shadowed_not_set ? __classDefinition && __classDefinition.shadowed || Component2.shadowed : shadowed;
              const __definition = {
                __parent__,
                name: _componentName,
                cached: __cached_not_set ? Component2.cached : cached,
                shadowed: __shadowed,
                tplextension,
                body: CONFIG5.get("preserveComponentBodyTag") ? _DOMCreateElement("componentBody") : element,
                templateURI: componentURI,
                tplsource
              };
              if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
                delete __definition.name;
              }
              if (componentURI === "") {
                delete __definition.templateURI;
              }
              const newComponent2 = New3(__classDefinition, __definition);
              if (CONFIG5.get("preserveComponentBodyTag")) {
                if (typeof newComponent2 !== "undefined") {
                  element.append(newComponent2.body);
                }
              }
              return newComponent2;
            }, "__create_component_instance_");
            const newComponent = __create_component_instance_();
            return newComponent;
          }, "_buildComponentFromElement_");
          _buildComponentsFromElements_ = /* @__PURE__ */ __name2(function(elements, __parent__) {
            let componentsBuiltWith = [];
            if (isBrowser) {
              componentsBuiltWith = elements.map(
                function(element) {
                  return _buildComponentFromElement_(element, __parent__);
                }
              );
            } else {
              logger9.debug("[_buildComponentsFromElements_] not implemented for Non-Browser environments");
            }
            return componentsBuiltWith;
          }, "_buildComponentsFromElements_");
          buildComponents = /* @__PURE__ */ __name2((element) => {
            const tagFilter = _tag_filter_;
            const elements = element.subelements(tagFilter);
            return _buildComponentsFromElements_(elements, null);
          }, "buildComponents");
        }
      });
      var Service4;
      var JSONService;
      var ConfigService;
      var init_Service = __esm({
        "src/Service.ts"() {
          "use strict";
          init_basePath();
          init_Crypt();
          init_domain();
          init_InheritClass();
          init_Logger();
          init_Package();
          init_secretKey();
          init_CONFIG();
          Service4 = class extends InheritClass6 {
            static {
              __name(this, "Service");
            }
            static {
              __name2(this, "Service");
            }
            options;
            withCredentials;
            useHTTP2;
            // eslint-disable-next-line no-unused-vars
            mockup({ request, service }) {
              throw new Error("Method not implemented.");
            }
            name;
            responseHeaders;
            // eslint-disable-next-line no-unused-vars
            local({ request, service }) {
              throw new Error("Method not implemented.");
            }
            kind = "rest";
            /* it can be rest, mockup, local */
            domain = _domain_;
            basePath = _basePath_;
            url = "";
            method = "GET";
            data = {};
            reload = false;
            cached = false;
            headers;
            template;
            // eslint-disable-next-line no-unused-vars
            done({ request, service }) {
              throw new Error("Method not implemented.");
            }
            // eslint-disable-next-line no-unused-vars
            fail(...args) {
              throw new Error("Method not implemented.");
            }
            set(name, value) {
              this[name] = value;
            }
            get(name, _default) {
              return this[name] || _default;
            }
          };
          JSONService = class extends Service4 {
            static {
              __name(this, "JSONService");
            }
            static {
              __name2(this, "JSONService");
            }
            method = "GET";
            cached = false;
            headers = {
              "Content-Type": "application/json",
              "charset": "utf-8"
            };
            JSONresponse = void 0;
            done(result) {
              logger9.debug("***** RECEIVED RESPONSE:");
              logger9.debug(result.service.template);
              this.JSONresponse = JSON.parse(result.service.template);
            }
          };
          ConfigService = class extends JSONService {
            static {
              __name(this, "ConfigService");
            }
            static {
              __name2(this, "ConfigService");
            }
            method = "GET";
            cached = false;
            configFileName = "config.json";
            headers = {
              "Content-Type": "application/json",
              "charset": "utf-8"
            };
            configLoaded() {
              throw Error("Method not implemented.");
            }
            JSONresponse = void 0;
            done(result) {
              logger9.debug("***** CONFIG LOADED:");
              logger9.debug(result.service.template);
              this.JSONresponse = JSON.parse(result.service.template);
              if (Object.hasOwn(this.JSONresponse, "__encoded__")) {
                const decodedValue = _Crypt2.decrypt(this.JSONresponse?.__encoded__, _secretKey);
                this.JSONresponse = JSON.parse(decodedValue);
              }
              const jsonResponse = this.JSONresponse;
              Object.keys(jsonResponse).map((k) => {
                CONFIG5.set(k, jsonResponse[k]);
                return k;
              });
              this.configLoaded().catch((e) => {
                throw new Error(`An error ocurred: ${e}`);
              });
            }
            fail() {
              this.configLoaded().catch((e) => {
                throw new Error(`An error ocurred: ${e}`);
              });
            }
            constructor() {
              super();
              this.set("url", `${this.get("basePath")}${this.get("configFileName")}`);
            }
          };
          Package7("com.qcobjects.api", [
            Service4
          ]);
          Package7("com.qcobjects.api.services", [
            JSONService
          ]);
          Package7("com.qcobjects.api.config", [
            ConfigService
          ]);
        }
      });
      var GlobalSettings;
      var init_globalSettings = __esm({
        "src/globalSettings.ts"() {
          "use strict";
          init_CONFIG();
          init_InheritClass();
          init_Logger();
          init_Package();
          init_platform();
          init_serviceLoader();
          init_top();
          init_Service();
          GlobalSettings = class _GlobalSettings extends InheritClass6 {
            static {
              __name(this, "_GlobalSettings");
            }
            static {
              __name2(this, "GlobalSettings");
            }
            static __start__() {
              return _GlobalSettings.instance.__start__();
            }
            _GLOBAL = {};
            static _instance;
            static get instance() {
              if (typeof _GlobalSettings._instance === "undefined") {
                _GlobalSettings._instance = new _GlobalSettings();
              }
              return _GlobalSettings._instance;
            }
            _logger = new Logger();
            get logger() {
              return this._logger;
            }
            set logger(value) {
              this._logger = value;
            }
            set(name, value) {
              this._GLOBAL[name] = value;
            }
            get(name, _default) {
              let _value;
              if (typeof this._GLOBAL[name] !== "undefined") {
                _value = this._GLOBAL[name];
              } else if (typeof _default !== "undefined") {
                _value = _default;
              }
              return _value;
            }
            __start__() {
              const __load__serviceWorker = /* @__PURE__ */ __name2(function() {
                let _promise;
                if (isBrowser) {
                  _promise = new Promise(function(resolve, reject) {
                    if ("serviceWorker" in navigator && typeof CONFIG5.get("serviceWorkerURI") !== "undefined") {
                      CONFIG5.set("serviceWorkerScope", CONFIG5.get("serviceWorkerScope") ? CONFIG5.get("serviceWorkerScope") : "/");
                      navigator.serviceWorker.register(CONFIG5.get("serviceWorkerURI"), {
                        scope: CONFIG5.get("serviceWorkerScope")
                      }).then(function(registration) {
                        logger9.debug("Service Worker Registered");
                        resolve.call(_promise, registration);
                      }, function(registration) {
                        logger9.debug("Error registering Service Worker");
                        reject.call(_promise, registration);
                      });
                      navigator.serviceWorker.ready.then(function(registration) {
                        logger9.debug("Service Worker Ready");
                        resolve.call(_promise, registration);
                      }, function(registration) {
                        logger9.debug("Error loading Service Worker");
                        reject.call(_promise, registration);
                      });
                    }
                  });
                } else {
                  _promise = Promise.resolve();
                }
                return _promise;
              }, "__load__serviceWorker");
              const _buildComponents = /* @__PURE__ */ __name2(function() {
                return new Promise((resolve) => {
                  if (isBrowser) {
                    logger9.debug("Starting to building components");
                    try {
                      buildComponentsStack();
                    } catch (e) {
                      throw Error(`Something went wrong trying to start components tree: ${e.message}`);
                    }
                    logger9.debug("Initializing the service worker");
                    __load__serviceWorker.call(_top).catch(function(e) {
                      logger9.debug(`error loading the service worker ${e}`);
                    });
                  }
                  resolve();
                });
              }, "_buildComponents");
              return new Promise((resolve) => {
                logger9.debug("Starting to load the config settings...");
                if (CONFIG5.get("useConfigService", false)) {
                  logger9.debug("Loading settings using local configuration file...");
                  setConfigService(new ConfigService());
                  configService.configLoaded = _buildComponents;
                  serviceLoader3(configService)?.then((standardResponse) => {
                    resolve(standardResponse);
                  })?.catch((e) => {
                    throw new Error(`An error ocurred while trying to load ${configService.url}: ${e}`);
                  });
                } else {
                  logger9.debug("Starting to load the components...");
                  _buildComponents.call(this).then(() => {
                    resolve({});
                  }).catch((e) => {
                    throw new Error(`An error ocurred while trying to build the components stack. ${e}`);
                  });
                }
              });
            }
          };
          Package7("com.qcobjects", [
            GlobalSettings
          ]);
        }
      });
      var top_exports = {};
      __export2(top_exports, {
        _top: /* @__PURE__ */ __name(() => _top, "_top"),
        buildComponentsStack: /* @__PURE__ */ __name(() => buildComponentsStack, "buildComponentsStack"),
        componentsStack: /* @__PURE__ */ __name(() => componentsStack, "componentsStack"),
        configService: /* @__PURE__ */ __name(() => configService, "configService"),
        get: /* @__PURE__ */ __name(() => get, "get"),
        resetTop: /* @__PURE__ */ __name(() => resetTop, "resetTop"),
        set: /* @__PURE__ */ __name(() => set, "set"),
        setConfigService: /* @__PURE__ */ __name(() => setConfigService, "setConfigService")
      });
      var _top;
      var componentsStack;
      var resetTop;
      var buildComponentsStack;
      var configService;
      var setConfigService;
      var set;
      var get;
      var _define_props;
      var init_top = __esm({
        "src/top.ts"() {
          "use strict";
          init_ComponentFactory();
          init_Cast();
          init_globalSettings();
          init_Class();
          init_ClassFactory();
          init_Export();
          init_platform();
          init_PrimaryCollections();
          init_Logger();
          _top = typeof module !== "undefined" && typeof module.exports !== "undefined" && module.exports || typeof global !== "undefined" && global || typeof globalThis !== "undefined" && globalThis || typeof window !== "undefined" && window || typeof self !== "undefined" && self !== null && self || void 0;
          _top.lastCache = void 0;
          componentsStack = [];
          resetTop = /* @__PURE__ */ __name2(() => {
            const globalSettings = GlobalSettings.instance;
            _top = _CastProps(globalSettings, _top, true);
          }, "resetTop");
          buildComponentsStack = /* @__PURE__ */ __name2(() => {
            componentsStack = buildComponents(document);
          }, "buildComponentsStack");
          setConfigService = /* @__PURE__ */ __name2((_configService) => {
            _top.global.configService = _configService;
            configService = _configService;
          }, "setConfigService");
          set = /* @__PURE__ */ __name2((name, value) => {
            _top[name] = value;
          }, "set");
          get = /* @__PURE__ */ __name2((name, _defaultValue) => {
            return _top[name] || _defaultValue;
          }, "get");
          resetTop();
          _define_props = /* @__PURE__ */ __name2(function(_top2) {
            if (!Object.hasOwn(_top2, "PackagesList")) {
              Object.defineProperty(_top2, "PackagesList", {
                // eslint-disable-next-line no-unused-vars
                set: /* @__PURE__ */ __name2((value) => {
                  logger9.debug("PackagesList is readonly");
                }, "set"),
                get: /* @__PURE__ */ __name2(() => {
                  return getPackagesList();
                }, "get")
              });
            }
            if (!Object.hasOwn(_top2, "PackagesNameList")) {
              Object.defineProperty(_top2, "PackagesNameList", {
                // eslint-disable-next-line no-unused-vars
                set: /* @__PURE__ */ __name2((val) => {
                  logger9.debug("PackagesNameList is readonly");
                }, "set"),
                get: /* @__PURE__ */ __name2(() => {
                  return getPackagesNamesList();
                }, "get")
              });
            }
            if (!Object.hasOwn(_top2, "ClassesList")) {
              Object.defineProperty(_top2, "ClassesList", {
                // eslint-disable-next-line no-unused-vars
                set: /* @__PURE__ */ __name2((value) => {
                  logger9.debug("ClassesList is readonly");
                }, "set"),
                get: /* @__PURE__ */ __name2(() => {
                  return getClassesList();
                }, "get")
              });
            }
            if (!Object.hasOwn(_top2, "ClassesNameList")) {
              Object.defineProperty(_top2, "ClassesNameList", {
                // eslint-disable-next-line no-unused-vars
                set(value) {
                  logger9.debug("ClassesNameList is readonly");
                },
                get: /* @__PURE__ */ __name2(() => {
                  return getClassesNamesList();
                }, "get")
              });
            }
          }, "_define_props");
          if (isBrowser) {
            Class("GLOBAL", _QC_CLASSES.global);
            Export2(ClassFactory("GLOBAL"));
          }
          if (isBrowser && typeof window !== "undefined") {
            set("global", window);
          } else if (isBrowser && typeof globalThis !== "undefined") {
            set("global", globalThis);
          }
          _define_props(_top);
        }
      });
      var supportsPassive;
      var captureFalseTouch;
      var init_captureFalseTouch = __esm({
        "src/captureFalseTouch.ts"() {
          "use strict";
          init_Logger();
          init_platform();
          supportsPassive = false;
          captureFalseTouch = /* @__PURE__ */ __name2(() => {
            return supportsPassive ? {
              passive: true
            } : false;
          }, "captureFalseTouch");
          if (isBrowser) {
            try {
              const opts = Object.defineProperty({}, "passive", {
                get() {
                  supportsPassive = true;
                  return supportsPassive;
                }
              });
              window.addEventListener("testPassive", null, opts);
              window.removeEventListener("testPassive", null, opts);
            } catch (e) {
              logger9.debug(`An error ocurred: ${e}.`);
              supportsPassive = false;
            }
          } else {
            supportsPassive = false;
          }
        }
      });
      var range;
      var init_range = __esm({
        "src/range.ts"() {
          "use strict";
          init_introspection();
          range = /* @__PURE__ */ __name2(function(start, stop = 0, step = 1) {
            if (stop === 0 || typeof stop === "undefined") {
              stop = start;
              start = 0;
            }
            return Array.from({
              length: (stop - start) / step + 1
            }, function(_, i) {
              return start + i * step;
            });
          }, "range");
          _protected_code_(range);
        }
      });
      var setDefaultProcessors;
      var init_defaultProcessors = __esm({
        "src/defaultProcessors.ts"() {
          "use strict";
          init_Logger();
          init_Processor();
          init_top();
          init_range();
          setDefaultProcessors = /* @__PURE__ */ __name2(() => {
            (function(_top2) {
              const mapper = /* @__PURE__ */ __name2((componentInstance, componentName, valueName) => {
                if (typeof componentInstance === "undefined" || componentInstance === null) {
                  throw Error(`mapper.${componentName}.${valueName} does not have a component instance or it is null.`);
                }
                const globalValue = _top2.global.get(valueName);
                const componentValue = componentInstance.get(valueName);
                const dataValue = componentInstance.data[valueName];
                const list = typeof dataValue !== "undefined" ? dataValue : typeof componentValue !== "undefined" ? componentValue : globalValue;
                let listItems = "";
                if (typeof list !== "undefined" && typeof list.map !== "undefined") {
                  listItems = list.map(function(element) {
                    const dataItems = [...Object.keys(element)].map((k) => ` data-${k}="${typeof element[k] !== "undefined" && element[k] !== null ? element[k].toString() : ""}"`).join("");
                    return `<quick-component name="${componentName}" ${dataItems} ></quick-component>`;
                  }).join("");
                } else {
                  logger9.debug(`${componentName}.${valueName} does not have a map property`);
                }
                return listItems;
              }, "mapper");
              GlobalProcessor.setProcessor(mapper);
              const layout = /* @__PURE__ */ __name2(function(componentInstance, layoutname, cssfile) {
                const layout_portrait = `
              /* CSS Document for Mobile Imports */
              @import url("${cssfile}") (orientation:portrait);
              @import url("${cssfile}") (max-width:460px);
              @import url("${cssfile}") (aspect-ratio: 9/16);
              @import url("${cssfile}") (aspect-ratio: 10/16);
              @import url("${cssfile}") (aspect-ratio: 5/8);
              @import url("${cssfile}") (aspect-ratio: 3/4);
              @import url("${cssfile}") (aspect-ratio: 2/3);
              `;
                const layout_landscape = `
              @import url("${cssfile}") (orientation:landscape) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 16/9) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 16/10) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 8/5) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 4/3) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 3/2) and (min-width:460px);
              `;
                const layout_code = {
                  "landscape": layout_landscape,
                  "portrait": layout_portrait
                };
                return Object.hasOwn(layout_code, layoutname) ? layout_code[layoutname] : "";
              }, "layout");
              GlobalProcessor.setProcessor(layout);
              const component = /* @__PURE__ */ __name2((componentInstance, name, componentClass, ...args) => {
                const arg = [...args].map(function(a) {
                  return {
                    [a.split("=")[0]]: a.split("=")[1]
                  };
                }).reduce(function(k1, k2) {
                  return Object.assign(k1, k2);
                });
                const attrs = [...Object.keys(arg)].map(function(a) {
                  return `${a}=${arg[a]}`;
                }).join(" ");
                return `<component name="${name}" componentClass="${componentClass}" ${attrs}></component>`;
              }, "component");
              GlobalProcessor.setProcessor(component);
              const quick_component = /* @__PURE__ */ __name2((componentInstance, name, componentClass, ...args) => {
                const arg = [...args].map(function(a) {
                  return {
                    [a.split("=")[0]]: a.split("=")[1]
                  };
                }).reduce(function(k1, k2) {
                  return Object.assign(k1, k2);
                });
                const attrs = [...Object.keys(arg)].map(function(a) {
                  return `${a}=${arg[a]}`;
                }).join(" ");
                return `<quick-component name="${name}" componentClass="${componentClass}" ${attrs}></quick-component>`;
              }, "quick_component");
              GlobalProcessor.setProcessor(quick_component);
              const repeat = /* @__PURE__ */ __name2((componentInstance, length, text) => {
                return range(length).map(
                  function(index) {
                    return text.replace("{{index}}", index.toString());
                  }
                ).join("");
              }, "repeat");
              GlobalProcessor.setProcessor(repeat);
            })(_top);
          }, "setDefaultProcessors");
        }
      });
      var findPackageNodePath3;
      var init_findPackageNodePath = __esm({
        "src/findPackageNodePath.ts"() {
          "use strict";
          init_CONFIG();
          init_Export();
          init_Logger();
          init_platform();
          findPackageNodePath3 = /* @__PURE__ */ __name2(function(packagename) {
            let sdkPath = null;
            if (!isBrowser) {
              const fs3 = __require("fs");
              try {
                let sdkPaths = [
                  `${CONFIG5.get("projectPath")}${CONFIG5.get("relativeImportPath")}`,
                  `${CONFIG5.get("basePath")}${CONFIG5.get("relativeImportPath")}`,
                  `${CONFIG5.get("projectPath")}`,
                  `${CONFIG5.get("basePath")}`,
                  `${CONFIG5.get("relativeImportPath")}`,
                  `${process.cwd()}${CONFIG5.get("relativeImportPath")}`,
                  `${process.cwd()}/node_modules/` + packagename,
                  `${process.cwd()}/node_modules`,
                  `${process.cwd()}`,
                  "node_modules",
                  "./",
                  ""
                ].concat(module.paths);
                sdkPaths = sdkPaths.filter((p) => {
                  return fs3.existsSync(p + "/" + packagename);
                });
                if (sdkPaths.length > 0) {
                  sdkPath = sdkPaths[0];
                  logger9.info(packagename + " is Installed.");
                } else {
                  sdkPath = "";
                  logger9.info(`${packagename} is not in a standard path.`);
                }
              } catch (e) {
                console.log(e);
              }
            }
            return sdkPath;
          }, "findPackageNodePath");
          Export2(findPackageNodePath3);
        }
      });
      var Import;
      var init_Import = __esm({
        "src/Import.ts"() {
          "use strict";
          init_basePath();
          init_CONFIG();
          init_DataStringify();
          init_DOMCreateElement();
          init_findPackageNodePath();
          init_Logger();
          init_platform();
          init_PrimaryCollections();
          Import = /* @__PURE__ */ __name2(function(packagename, ready2, external) {
            if (external !== void 0) {
              logger9.debug(`[Import] Setting external=${external.toString()} resource to import: ${packagename}`);
            }
            if (external) {
              logger9.debug(`[Import] Registering external resource to import: ${packagename}`);
            } else {
              logger9.debug(`[Import] Registering local resource to import: ${packagename}`);
            }
            let _promise_import_;
            if (isBrowser) {
              _promise_import_ = new Promise(function(resolve, reject) {
                const allPackagesImported = /* @__PURE__ */ __name2(function() {
                  let ret = false;
                  let cp = 0;
                  for (const p in _QC_PACKAGES) {
                    cp++;
                  }
                  if (cp < _QC_PACKAGES_IMPORTED.length) {
                    ret = false;
                  } else {
                    ret = true;
                  }
                  return ret;
                }, "allPackagesImported");
                const readyImported = /* @__PURE__ */ __name2(function(e) {
                  _QC_PACKAGES_IMPORTED.push(ready2);
                  if (allPackagesImported()) {
                    _QC_PACKAGES_IMPORTED.map((_imported_) => {
                      return _QC_READY_LISTENERS.push(_imported_);
                    });
                  }
                  if (isBrowser && CONFIG5.get("removePackageScriptAfterLoading")) {
                    e.target.remove();
                  }
                  resolve.call(_promise_import_, {
                    "_imported_": e.target,
                    "_package_name_": packagename
                  });
                }, "readyImported");
                if (!Object.hasOwn(_QC_PACKAGES, packagename)) {
                  const s1 = _DOMCreateElement("script");
                  s1.type = CONFIG5.get("sourceType", "text/javascript");
                  s1.async = !!CONFIG5.get("asynchronousImportsLoad");
                  s1.onreadystatechange = function() {
                    if (s1.readyState === "complete") {
                      readyImported(s1);
                    }
                  };
                  s1.onload = readyImported;
                  s1.onerror = function(e) {
                    logger9.debug(`An error ocurred: ${e}.`);
                    reject.call(_promise_import_, {
                      "_imported_": s1,
                      "_package_name_": packagename
                    });
                  };
                  s1.src = external ? CONFIG5.get("remoteImportsPath") + packagename + ".js" : _basePath_ + CONFIG5.get("relativeImportPath") + packagename + ".js";
                  document.getElementsByTagName("head")[0].appendChild(s1);
                }
              });
              _promise_import_.catch(function() {
                logger9.debug("Import: Error loading a package ");
              });
            } else {
              _promise_import_ = new Promise(function(resolve, reject) {
                try {
                  const standardNodePath = findPackageNodePath3(packagename);
                  let packageAbsoluteName = "";
                  if (standardNodePath !== null) {
                    packageAbsoluteName = standardNodePath + "/" + packagename;
                  } else {
                    const jsNodePath = findPackageNodePath3(packagename + ".js");
                    if (jsNodePath !== null) {
                      packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
                    } else {
                      packageAbsoluteName = _basePath_ + CONFIG5.get("relativeImportPath") + packagename;
                    }
                  }
                  try {
                    resolve.call(_promise_import_, {
                      "_imported_": _require_(`${packageAbsoluteName}`),
                      "_package_name_": packagename
                    });
                  } catch (e) {
                    reject.call(_promise_import_, {
                      "_imported_": null,
                      "_package_name_": packagename,
                      "error": e
                    });
                  }
                } catch (e) {
                  reject.call(_promise_import_, {
                    "_imported_": null,
                    "_package_name_": packagename,
                    "error": e
                  });
                }
              }).catch(function(e) {
                logger9.debug("Something happened when importing " + packagename);
                console.warn(e);
              });
            }
            _promise_import_.catch(function(e) {
              logger9.warn(_DataStringify2(e));
            });
            return _promise_import_;
          }, "Import");
          Import.prototype.toString = function() {
            return "Import(packagename,ready,external) { [QCObjects native code] }";
          };
        }
      });
      var __to_number;
      var init_mathFunctions = __esm({
        "src/mathFunctions.ts"() {
          "use strict";
          __to_number = /* @__PURE__ */ __name2(function(value) {
            return isNaN(value) ? new Number(0) : new Number(value);
          }, "__to_number");
        }
      });
      var NamespaceRef;
      var init_NamespaceRef = __esm({
        "src/NamespaceRef.ts"() {
          "use strict";
          init_isQCObjects();
          init_Package();
          NamespaceRef = /* @__PURE__ */ __name2(function(namespace) {
            const packageInstance = Package7(namespace) || [];
            const classes = packageInstance.filter((c) => isQCObjects_Class(c)).map((c) => {
              return {
                [c.__definition.__classType]: c
              };
            }).reduce((a, b) => {
              return Object.assign(a, b);
            });
            return namespace.split(".").map((c) => {
              return {
                [c]: classes
              };
            }).reverse().reduce((a, b) => {
              b[Object.keys(b).join(".")] = a;
              return b;
            });
          }, "NamespaceRef");
        }
      });
      var Ready;
      var ready;
      var _Ready;
      var init_Ready = __esm({
        "src/Ready.ts"() {
          "use strict";
          init_CONFIG();
          init_platform();
          init_PrimaryCollections();
          init_top();
          Ready = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function Ready2(e) {
            if (isBrowser) {
              _QC_READY_LISTENERS.push(e.bind(window));
            } else if (typeof global !== "undefined") {
              _QC_READY_LISTENERS.push(e.bind(global));
            }
          }, "Ready2"), "Ready");
          ready = Ready;
          _Ready = /* @__PURE__ */ __name2(function(e) {
            const _execReady = /* @__PURE__ */ __name2(function() {
              _QC_READY_LISTENERS.map(function(_ready_listener_, _r) {
                if (typeof _ready_listener_ === "function") {
                  _ready_listener_();
                  _QC_READY_LISTENERS.splice(_r, 1);
                }
              });
            }, "_execReady");
            if (CONFIG5.get("delayForReady") > 0) {
              if (isBrowser) {
                setTimeout(_execReady.bind(window), CONFIG5.get("delayForReady"));
              } else if (typeof global !== "undefined") {
                setTimeout(_execReady.bind(global), CONFIG5.get("delayForReady"));
              }
            } else {
              _execReady.call(_top);
            }
          }, "_Ready");
        }
      });
      var ArrayList;
      var ArrayCollection;
      var init_ArrayCollection = __esm({
        "src/ArrayCollection.ts"() {
          "use strict";
          init_ClassFactory();
          init_Logger();
          init_New();
          init_mathFunctions();
          ArrayList = class extends Array {
            static {
              __name(this, "ArrayList");
            }
            static {
              __name2(this, "ArrayList");
            }
            prototype;
            unique() {
              return this.filter(function(value, index, self2) {
                return self2.indexOf(value) === index;
              });
            }
            table() {
              console.table(this);
            }
            sum() {
              return this.reduce((prev, current) => {
                return __to_number(prev) + __to_number(current);
              }, 0);
            }
            avg() {
              return this.length < 1 ? 0 : this.reduce((prev, current) => {
                return (__to_number(prev) + __to_number(current)) / 2;
              });
            }
            min() {
              return this.reduce((prev, current) => {
                return __to_number(prev) <= __to_number(current) ? prev : current;
              }, Infinity);
            }
            max() {
              return this.reduce((prev, current) => {
                return __to_number(prev) >= __to_number(current) ? prev : current;
              }, 0);
            }
            sortBy(propName, sortAsc) {
              const sort_function = sortAsc ? function(prev, current) {
                return current[propName] < prev[propName] ? 1 : -1;
              } : function(prev, current) {
                return current[propName] > prev[propName] ? 1 : -1;
              };
              return this.sort(sort_function);
            }
            matrix(length, fillValue) {
              const x_func = /* @__PURE__ */ __name2(() => {
                return fillValue;
              }, "x_func");
              return Array.from({
                length
              }, x_func);
            }
            matrix2d(length, fillValue) {
              const y_func = /* @__PURE__ */ __name2(function() {
                return fillValue;
              }, "y_func");
              const x_func = /* @__PURE__ */ __name2(function() {
                return Array.from({
                  length
                }, y_func);
              }, "x_func");
              return Array.from({
                length
              }, x_func);
            }
            matrix3d(length, fillValue) {
              const y_func = /* @__PURE__ */ __name2(function() {
                return Array.from({
                  length
                }, function() {
                  return fillValue;
                });
              }, "y_func");
              const x_func = /* @__PURE__ */ __name2(function() {
                return Array.from({
                  length
                }, y_func);
              }, "x_func");
              return Array.from({
                length
              }, x_func);
            }
          };
          ArrayCollection = class {
            static {
              __name(this, "ArrayCollection");
            }
            static {
              __name2(this, "ArrayCollection");
            }
            source = New3(ArrayList, []);
            changed(prop, value) {
              logger9.debug("VALUE CHANGED");
              logger9.debug(prop);
              logger9.debug(value);
            }
            push(value) {
              const self2 = this;
              logger9.debug("VALUE ADDED");
              logger9.debug(value);
              self2.source.push(value);
            }
            pop() {
              const self2 = this;
              logger9.debug("VALUE POPPED");
              self2.source.pop();
            }
            _new_(source) {
              const self2 = this;
              let _index = 0;
              self2.source = New3(ClassFactory("ArrayList"), source);
              for (const _k in self2.source) {
                if (!isNaN(_k)) {
                  logger9.debug("binding " + _k.toString());
                  (function(_pname) {
                    Object.defineProperty(self2, _pname, {
                      set(value) {
                        logger9.debug("setting " + _pname + "=" + value);
                        self2.source[_pname] = value;
                        self2.changed(_pname, value);
                      },
                      get() {
                        return self2.source[_pname];
                      }
                    });
                  })(_k);
                  _index++;
                }
              }
              self2.source.length = _index;
              Object.defineProperty(self2, "length", {
                get() {
                  return self2.source.length;
                }
              });
            }
          };
        }
      });
      var TagElements;
      var Tag;
      var init_Tag = __esm({
        "src/Tag.ts"() {
          "use strict";
          init_ClassFactory();
          init_New();
          init_Package();
          init_platform();
          init_ArrayCollection();
          TagElements = class extends ArrayList {
            static {
              __name(this, "TagElements");
            }
            static {
              __name2(this, "TagElements");
            }
            show() {
              this.map(function(element) {
                return element.style.opacity = 1;
              });
            }
            hide() {
              this.map(function(element) {
                return element.style.opacity = 0;
              });
            }
            effect(...args) {
              const effectArguments = [...args].slice(1);
              const effectClassName = args[0];
              let effectClass = void 0;
              if ((typeof effectClassName).toLowerCase() === "string") {
                effectClass = ClassFactory(effectClassName);
              }
              this.map(function(element) {
                return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
              });
            }
            findElements(elementName) {
              const _o = New3(ClassFactory("TagElements"));
              if (isBrowser) {
                for (const _k in this) {
                  if (typeof _k === "number" && typeof this[_k] !== "function" && Object.hasOwn(this[_k], "subelements")) {
                    _o.push(this[_k].subelements(elementName));
                  }
                }
              } else {
              }
              return _o;
            }
          };
          Tag = /* @__PURE__ */ __name2(function(tagname, innerHTML) {
            const _o = New3(TagElements);
            if (isBrowser) {
              const o = document.subelements(tagname);
              const addedKeys = [];
              for (let _i = 0; _i < o.length; _i++) {
                if (typeof innerHTML !== "undefined" && Object.hasOwn(o[_i], "innerHTML")) {
                  o[_i].innerHTML = innerHTML;
                }
                if (addedKeys.indexOf(_i) < 0) {
                  _o.push(o[_i]);
                  addedKeys.push(_i);
                }
              }
            } else {
            }
            return _o;
          }, "Tag");
          Package7("com.qcobjects", [
            TagElements,
            Tag
          ]);
        }
      });
      var shortCode;
      var init_shortCode = __esm({
        "src/shortCode.ts"() {
          "use strict";
          init_Crypt();
          shortCode = /* @__PURE__ */ __name2(function() {
            const length = 1e3;
            const code1 = _Crypt2.encrypt((Math.random() * length).toString().replace(".", ""), (/* @__PURE__ */ new Date()).getTime().toString());
            const code2 = _Crypt2.encrypt((Math.random() * length).toString().replace(".", ""), new Date((/* @__PURE__ */ new Date()).getTime() - 1e3 * 1e3).getTime().toString());
            const shortCode2 = [...code2].map((o1, index) => {
              return [...code1][index] === o1 ? null : o1;
            }).filter((c) => c !== null).join("");
            return shortCode2;
          }, "shortCode");
        }
      });
      var _super_;
      var init_super = __esm({
        "src/super.ts"() {
          "use strict";
          init_ClassFactory();
          _super_ = /* @__PURE__ */ __name2(function(className, classMethodName) {
            return ClassFactory(className)[classMethodName];
          }, "_super_");
          _super_.prototype.toString = function() {
            return "_super_(className,classMethodName,params) { [QCObjects native code] }";
          };
        }
      });
      var waitUntil;
      var init_waitUntil = __esm({
        "src/waitUntil.ts"() {
          "use strict";
          init_Logger();
          waitUntil = /* @__PURE__ */ __name2(function(func, exp) {
            const _waitUntil = /* @__PURE__ */ __name2(function(func2, exp2) {
              const maxWaitCycles = 2e3;
              let _w = 0;
              var _t = setInterval(function() {
                if (exp2()) {
                  clearInterval(_t);
                  func2();
                  logger9.debug("Ejecuting " + func2.name + " after wait");
                } else {
                  if (_w < maxWaitCycles) {
                    _w += 1;
                    logger9.debug("WAIT UNTIL " + func2.name + " is true, " + _w.toString() + " cycles");
                  } else {
                    logger9.debug("Max execution time for " + func2.name + " expression until true");
                    clearInterval(_t);
                  }
                }
              }, 1);
            }, "_waitUntil");
            setTimeout(function() {
              _waitUntil(func, exp);
            }, 1);
          }, "waitUntil");
        }
      });
      var subelements;
      var init_subelements = __esm({
        "src/subelements.ts"() {
          "use strict";
          subelements = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function subelements2(query) {
            const _self = this;
            return [..._self.querySelectorAll(query)];
          }, "subelements2"), "subelements");
        }
      });
      function loadSDK() {
        if (CONFIG5.get("useSDK")) {
          (function() {
            const remoteImportsPath = CONFIG5.get("remoteImportsPath");
            const external = !CONFIG5.get("useLocalSDK");
            CONFIG5.set("remoteImportsPath", CONFIG5.get("remoteSDKPath"));
            let tryImportingSDK = false;
            let sdkName = "QCObjects-SDK";
            if (isBrowser) {
              tryImportingSDK = true;
            } else {
              const sdkPath = findPackageNodePath3("qcobjects-sdk");
              if (sdkPath !== null) {
                sdkName = "qcobjects-sdk";
                tryImportingSDK = true;
              } else if (sdkPath !== "") {
                sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
                tryImportingSDK = true;
              } else {
                tryImportingSDK = false;
              }
            }
            if (tryImportingSDK) {
              logger9.info("Importing SDK... " + sdkName);
              if (isNodeCommonJS && typeof __require !== "undefined") {
                const sdk = _require_("qcobjects-sdk");
                if (sdk) {
                  logger9.debug("QCObjects SDK was loaded OK.");
                } else {
                  logger9.debug("QCObjects SDK could not be imported.");
                }
              } else {
                Import(sdkName, function() {
                  if (external) {
                    logger9.debug("QCObjects-SDK.js loaded from remote location");
                  } else {
                    logger9.debug("QCObjects-SDK.js loaded from local");
                  }
                  CONFIG5.set("remoteImportsPath", remoteImportsPath);
                }, external)?.catch((e) => {
                  throw new Error(`An error ocurred when trying to import: ${e}`);
                });
              }
            } else {
              logger9.debug("SDK has not been imported as it is not available at the moment");
            }
          })();
        }
      }
      __name(loadSDK, "loadSDK");
      var loadSDK_default;
      var init_loadSDK = __esm({
        "src/loadSDK.ts"() {
          "use strict";
          init_CONFIG();
          init_findPackageNodePath();
          init_Import();
          init_Logger();
          init_platform();
          __name2(loadSDK, "loadSDK");
          loadSDK_default = loadSDK;
        }
      });
      var require_MainProcess = __commonJS2({
        "src/MainProcess.ts"() {
          "use strict";
          init_top();
          init_asyncLoad();
          init_captureFalseTouch();
          init_Cast();
          init_Class();
          init_ClassFactory();
          init_Component();
          init_ComponentFactory();
          init_componentLoader();
          init_CONFIG();
          init_DataStringify();
          init_defaultProcessors();
          init_Export();
          init_Import();
          init_introspection();
          init_isQCObjects();
          init_Logger();
          init_mathFunctions();
          init_NamespaceRef();
          init_New();
          init_ObjectName();
          init_Package();
          init_platform();
          init_Ready();
          init_serviceLoader();
          init_Tag();
          init_Processor();
          init_is_a();
          init_getType();
          init_shortCode();
          init_DOMCreateElement();
          init_ComplexStorageCache();
          init_super();
          init_waitUntil();
          init_subelements();
          init_globalSettings();
          init_loadSDK();
          init_range();
          (/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function __qcobjects__(_top2) {
            if (typeof Object.defineProperty !== "undefined" && typeof _top2 !== "undefined") {
              try {
                Object.defineProperty(_top2, "__qcobjects__", {
                  enumerable: true,
                  configurable: false,
                  writable: false,
                  value: __qcobjects__
                });
              } catch (e) {
                logger9.debug(`An error ocurred: ${e}`);
                if (typeof _top2.__qcobjects__ !== "undefined") {
                  _top2.__qcobjects__.loaded = true;
                }
              }
            }
            if (typeof _top2.__qcobjects__.loaded === "undefined") {
              _top2.__qcobjects__.loaded = true;
              if (isBrowser) {
                Element.prototype.subelements = subelements;
                Document.prototype.subelements = subelements;
                HTMLElement.prototype.subelements = subelements;
                if (typeof ShadowRoot !== "undefined") {
                  ShadowRoot.prototype.subelements = subelements;
                }
              }
              logger9.debugEnabled = false;
              logger9.infoEnabled = true;
              if (isBrowser) {
                Element.prototype.find = function(tag) {
                  const _self = this;
                  const _oo = [];
                  const _tags = document.subelements(tag);
                  _tags.map((_tt, _t) => {
                    if (typeof _tags[_t] !== "undefined" && _tags[_t].parentNode.tagName === _self.parentNode.tagName) {
                      _oo.push(_Cast(_tt, new Object()));
                    }
                    return _tt;
                  });
                  return _oo;
                };
              }
              if (isBrowser) {
                Element.prototype.append = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function QC_Append(child) {
                  if (isQCObjects_Object(child) || typeof child.body !== "undefined") {
                    this.appendChild(child.body);
                  } else {
                    this.appendChild(child);
                  }
                }, "QC_Append"), "QC_Append");
                Element.prototype.render = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function QC_Render(content) {
                  const _self = this;
                  const _appendVDOM = /* @__PURE__ */ __name2((_self2, content2) => {
                    if (typeof document.implementation.createHTMLDocument !== "undefined") {
                      const doc = document.implementation.createHTMLDocument("");
                      doc.body.innerHTML = content2;
                      doc.body.subelements("*").map((element) => {
                        return _self2.append(element);
                      });
                    }
                  }, "_appendVDOM");
                  if (typeof this.innerHTML !== "undefined") {
                    try {
                      this.innerHTML += content;
                    } catch (e) {
                      logger9.debug(`An error ocurred: ${e}`);
                      _appendVDOM(_self, content);
                    }
                  } else {
                    _appendVDOM(_self, content);
                  }
                }, "QC_Render"), "QC_Render");
              }
              Export2(waitUntil);
              Export2(_super_);
              Export2(ComplexStorageCache);
              Export2(ClassFactory);
              Export2(_DOMCreateElement);
              Export2(shortCode);
              Export2(__getType__);
              Export2(is_a);
              Package7("com.qcobjects", [Processor]);
              if (isBrowser) {
                Element.prototype.Cast = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function QC_Cast(_o) {
                  const _self = this;
                  return _Cast(_self, _o);
                }, "QC_Cast"), "QC_Cast");
              }
              if (isBrowser) {
                window.onload = _Ready;
                if (is_phonegap) {
                  document.addEventListener("deviceready", _Ready, captureFalseTouch);
                }
              } else {
                global.onload = _Ready;
              }
              if (isBrowser) {
                window.addEventListener("popstate", function(popStateEvent) {
                  popStateEvent.stopImmediatePropagation();
                  popStateEvent.stopPropagation();
                  Component2.route().catch((e) => {
                    throw new Error(`An error ocurred when trying to load initial routes. ${e}`);
                  });
                });
              }
              Export2(serviceLoader3);
              Export2(componentLoader);
              Export2(ComponentURI);
              Export2(ObjectName);
              Export2(_DataStringify2);
              Export2(isQCObjects_Class);
              Export2(isQCObjects_Object);
              Export2(NamespaceRef);
              Array.prototype.unique = function() {
                return this.filter(function(value, index, self2) {
                  return self2.indexOf(value) === index;
                });
              };
              Array.unique = function(a) {
                return a.unique();
              };
              _protected_code_(Array.unique);
              _protected_code_(Array.prototype.unique);
              Array.prototype.table = function() {
                console.table(this);
              };
              Array.table = function(a) {
                a.table();
                return;
              };
              _protected_code_(Array.table);
              _protected_code_(Array.prototype.table);
              Array.prototype.sum = function() {
                return this.reduce(function(prev, current) {
                  return __to_number(prev) + __to_number(current);
                }, 0);
              };
              Array.sum = function(a) {
                return a.sum();
              };
              _protected_code_(Array.sum);
              _protected_code_(Array.prototype.sum);
              Array.prototype.avg = function() {
                return this.length < 1 ? 0 : this.reduce(function(prev, current) {
                  return (__to_number(prev) + __to_number(current)) / 2;
                });
              };
              Array.avg = function(a) {
                return a.avg();
              };
              _protected_code_(Array.avg);
              _protected_code_(Array.prototype.avg);
              Array.prototype.min = function() {
                return this.reduce(function(prev, current) {
                  return __to_number(prev) <= __to_number(current) ? prev : current;
                }, Infinity);
              };
              Array.min = function(a) {
                return a.min();
              };
              _protected_code_(Array.min);
              _protected_code_(Array.prototype.min);
              Array.prototype.max = function() {
                return this.reduce(function(prev, current) {
                  return __to_number(prev) >= __to_number(current) ? prev : current;
                }, 0);
              };
              Array.max = function(a) {
                return a.max();
              };
              _protected_code_(Array.max);
              _protected_code_(Array.prototype.max);
              Array.prototype.sortBy = function(propName, sortAsc = true) {
                const sort_function = sortAsc ? function(prev, current) {
                  return current[propName] < prev[propName] ? 1 : -1;
                } : function(prev, current) {
                  return current[propName] > prev[propName] ? 1 : -1;
                };
                return this.sort(sort_function);
              };
              Array.sortBy = function(a, propName, sortAsc = true) {
                return a.sortBy(propName, sortAsc);
              };
              _protected_code_(Array.sortBy);
              _protected_code_(Array.prototype.sortBy);
              Array.prototype.matrix = function(_length, _fillValue = 0) {
                const x_func = /* @__PURE__ */ __name2(function(x = void 0) {
                  return _fillValue;
                }, "x_func");
                return Array.from({
                  length: _length
                }, x_func);
              };
              Array.matrix = function(a, _length, _fillValue = 0) {
                return a.matrix(_length, _fillValue);
              };
              _protected_code_(Array.matrix);
              _protected_code_(Array.prototype.matrix);
              Array.prototype.matrix2d = function(_length, _fillValue = 0) {
                const y_func = /* @__PURE__ */ __name2(function(y) {
                  return _fillValue;
                }, "y_func");
                const x_func = /* @__PURE__ */ __name2(function(x) {
                  return Array.from({
                    length: _length
                  }, y_func);
                }, "x_func");
                return Array.from({
                  length: _length
                }, x_func);
              };
              Array.matrix2d = function(a, _length, _fillValue = 0) {
                return a.matrix2d(_length, _fillValue);
              };
              _protected_code_(Array.matrix2d);
              _protected_code_(Array.prototype.matrix2d);
              Array.prototype.matrix3d = function(_length, _fillValue = 0) {
                const y_func = /* @__PURE__ */ __name2(function(y) {
                  return Array.from({
                    length: _length
                  }, function() {
                    return _fillValue;
                  });
                }, "y_func");
                const x_func = /* @__PURE__ */ __name2(function(x) {
                  return Array.from({
                    length: _length
                  }, y_func);
                }, "x_func");
                return Array.from({
                  length: _length
                }, x_func);
              };
              Array.matrix3d = function(a, _length, _fillValue = 0) {
                return a.matrix3d(_length, _fillValue);
              };
              _protected_code_(Array.matrix3d);
              _protected_code_(Array.prototype.matrix3d);
              String.prototype.list = function() {
                const __instance = this;
                return range(0, __instance.length - 1).map(function(i) {
                  return __instance[i];
                });
              };
              _protected_code_(String.prototype.list);
              setDefaultProcessors();
              Ready(function() {
                if (!CONFIG5.get("useSDK")) {
                  GlobalSettings.__start__().catch((e) => {
                    throw Error(e);
                  });
                }
              });
              Export2(Export2);
              Export2(Import);
              Export2(Package7);
              Export2(Class);
              Export2(New3);
              Export2(Tag);
              Export2(Ready);
              Export2(ready);
              Export2(isBrowser);
              Export2(_methods_);
              Export2(GlobalSettings);
              loadSDK_default();
              if (isBrowser) {
                asyncLoad(function() {
                  Ready(function() {
                    (function(_top3) {
                      let ticking = false;
                      const scrollHeight = Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.offsetHeight,
                        document.body.clientHeight,
                        document.documentElement.clientHeight
                      );
                      const scrollWidth = Math.max(
                        document.body.scrollWidth,
                        document.documentElement.scrollWidth,
                        document.body.offsetWidth,
                        document.documentElement.offsetWidth,
                        document.body.clientWidth,
                        document.documentElement.clientWidth
                      );
                      function scrollDispatcher(event) {
                        const percentY = Math.round(_top3.scrollY * 100 / scrollHeight);
                        const percentX = Math.round(_top3.scrollX * 100 / scrollWidth);
                        const scrollPercentEventEvent = new CustomEvent("scrollpercent", {
                          detail: {
                            percentX,
                            percentY
                          }
                        });
                        event.target.dispatchEvent(scrollPercentEventEvent);
                        let secondaryEventName = "defaultscroll";
                        const __valid_scrolls__ = [0, 5, 10, 25, 50, 75, 90, 95, 100];
                        __valid_scrolls__.filter(function(p) {
                          return p === percentY;
                        }).map(function(pY) {
                          secondaryEventName = "percentY" + percentY.toString();
                          const secondaryCustomEvent = new CustomEvent(secondaryEventName, {
                            detail: {
                              percentX,
                              percentY
                            }
                          });
                          event.target.dispatchEvent(secondaryCustomEvent);
                          return pY;
                        });
                      }
                      __name(scrollDispatcher, "scrollDispatcher");
                      __name2(scrollDispatcher, "scrollDispatcher");
                      document.addEventListener("scroll", function(event) {
                        if (!ticking) {
                          requestAnimationFrame(function() {
                            scrollDispatcher(event);
                            ticking = false;
                          });
                          ticking = true;
                        }
                      });
                    })(_top2);
                  });
                }, []);
              }
              if (!isBrowser) {
                if (typeof _top2.global !== "undefined" && Object.hasOwn(_top2.global, "_fireAsyncLoad")) {
                  _fireAsyncLoad.call(_top2);
                }
                if (typeof _top2.global !== "undefined" && Object.hasOwn(_top2.global, "onload")) {
                  _top2.global.onload.call(_top2);
                }
              }
              (function(isBrowser2) {
                const __freeze__ = /* @__PURE__ */ __name2(function() {
                  Object.freeze(Object.prototype);
                  Object.freeze(Object);
                }, "__freeze__");
                if (isBrowser2 && CONFIG5.get("secureObjects", false)) {
                  Ready(function() {
                    __freeze__();
                  });
                } else if (CONFIG5.get("secureObjects", false)) {
                  __freeze__();
                }
              })(isBrowser);
            }
          }, "__qcobjects__"), "__qcobjects__"))(_top);
        }
      });
      var qcobjects_exports = {};
      __export2(qcobjects_exports, {
        ArrayCollection: /* @__PURE__ */ __name(() => ArrayCollection, "ArrayCollection"),
        ArrayList: /* @__PURE__ */ __name(() => ArrayList, "ArrayList"),
        AssignPolyfill: /* @__PURE__ */ __name(() => AssignPolyfill, "AssignPolyfill"),
        BackendMicroservice: /* @__PURE__ */ __name(() => BackendMicroservice, "BackendMicroservice"),
        CONFIG: /* @__PURE__ */ __name(() => CONFIG5, "CONFIG"),
        Class: /* @__PURE__ */ __name(() => Class, "Class"),
        ClassFactory: /* @__PURE__ */ __name(() => ClassFactory, "ClassFactory"),
        ComplexStorageCache: /* @__PURE__ */ __name(() => ComplexStorageCache, "ComplexStorageCache"),
        Component: /* @__PURE__ */ __name(() => Component2, "Component"),
        ComponentURI: /* @__PURE__ */ __name(() => ComponentURI, "ComponentURI"),
        ConfigService: /* @__PURE__ */ __name(() => ConfigService, "ConfigService"),
        Controller: /* @__PURE__ */ __name(() => Controller, "Controller"),
        DDO: /* @__PURE__ */ __name(() => DDO, "DDO"),
        DefaultTemplateHandler: /* @__PURE__ */ __name(() => DefaultTemplateHandler, "DefaultTemplateHandler"),
        Effect: /* @__PURE__ */ __name(() => Effect, "Effect"),
        Export: /* @__PURE__ */ __name(() => Export2, "Export"),
        GlobalSettings: /* @__PURE__ */ __name(() => GlobalSettings, "GlobalSettings"),
        Import: /* @__PURE__ */ __name(() => Import, "Import"),
        InheritClass: /* @__PURE__ */ __name(() => InheritClass6, "InheritClass"),
        JSONService: /* @__PURE__ */ __name(() => JSONService, "JSONService"),
        Logger: /* @__PURE__ */ __name(() => Logger, "Logger"),
        NamespaceRef: /* @__PURE__ */ __name(() => NamespaceRef, "NamespaceRef"),
        New: /* @__PURE__ */ __name(() => New3, "New"),
        ObjectName: /* @__PURE__ */ __name(() => ObjectName, "ObjectName"),
        Package: /* @__PURE__ */ __name(() => Package7, "Package"),
        Processor: /* @__PURE__ */ __name(() => Processor, "Processor"),
        Ready: /* @__PURE__ */ __name(() => Ready, "Ready"),
        RegisterClass: /* @__PURE__ */ __name(() => RegisterClass, "RegisterClass"),
        RegisterWidget: /* @__PURE__ */ __name(() => RegisterWidget, "RegisterWidget"),
        RegisterWidgets: /* @__PURE__ */ __name(() => RegisterWidgets, "RegisterWidgets"),
        Service: /* @__PURE__ */ __name(() => Service4, "Service"),
        SourceCSS: /* @__PURE__ */ __name(() => SourceCSS, "SourceCSS"),
        SourceJS: /* @__PURE__ */ __name(() => SourceJS, "SourceJS"),
        Tag: /* @__PURE__ */ __name(() => Tag, "Tag"),
        TagElements: /* @__PURE__ */ __name(() => TagElements, "TagElements"),
        Timer: /* @__PURE__ */ __name(() => Timer, "Timer"),
        Toggle: /* @__PURE__ */ __name(() => Toggle, "Toggle"),
        TransitionEffect: /* @__PURE__ */ __name(() => TransitionEffect, "TransitionEffect"),
        VO: /* @__PURE__ */ __name(() => VO, "VO"),
        View: /* @__PURE__ */ __name(() => View, "View"),
        _Cast: /* @__PURE__ */ __name(() => _Cast, "_Cast"),
        _CastProps: /* @__PURE__ */ __name(() => _CastProps, "_CastProps"),
        _ComponentWidget_: /* @__PURE__ */ __name(() => _ComponentWidget_, "_ComponentWidget_"),
        _Crypt: /* @__PURE__ */ __name(() => _Crypt2, "_Crypt"),
        _DOMCreateElement: /* @__PURE__ */ __name(() => _DOMCreateElement, "_DOMCreateElement"),
        _DataStringify: /* @__PURE__ */ __name(() => _DataStringify2, "_DataStringify"),
        _LegacyCopy: /* @__PURE__ */ __name(() => _LegacyCopy, "_LegacyCopy"),
        _QC_CLASSES: /* @__PURE__ */ __name(() => _QC_CLASSES, "_QC_CLASSES"),
        _QC_PACKAGES: /* @__PURE__ */ __name(() => _QC_PACKAGES, "_QC_PACKAGES"),
        _QC_PACKAGES_IMPORTED: /* @__PURE__ */ __name(() => _QC_PACKAGES_IMPORTED, "_QC_PACKAGES_IMPORTED"),
        _QC_READY_LISTENERS: /* @__PURE__ */ __name(() => _QC_READY_LISTENERS, "_QC_READY_LISTENERS"),
        _Ready: /* @__PURE__ */ __name(() => _Ready, "_Ready"),
        __getType__: /* @__PURE__ */ __name(() => __getType__, "__getType__"),
        __instanceID: /* @__PURE__ */ __name(() => __instanceID, "__instanceID"),
        __is_raw_class__: /* @__PURE__ */ __name(() => __is_raw_class__, "__is_raw_class__"),
        __make_global__: /* @__PURE__ */ __name(() => __make_global__, "__make_global__"),
        __to_number: /* @__PURE__ */ __name(() => __to_number, "__to_number"),
        __top__: /* @__PURE__ */ __name(() => top_exports, "__top__"),
        _buildComponentsFromElements_: /* @__PURE__ */ __name(() => _buildComponentsFromElements_, "_buildComponentsFromElements_"),
        _fireAsyncLoad: /* @__PURE__ */ __name(() => _fireAsyncLoad, "_fireAsyncLoad"),
        _methods_: /* @__PURE__ */ __name(() => _methods_, "_methods_"),
        _protected_code_: /* @__PURE__ */ __name(() => _protected_code_, "_protected_code_"),
        _require_: /* @__PURE__ */ __name(() => _require_, "_require_"),
        _super_: /* @__PURE__ */ __name(() => _super_, "_super_"),
        _tag_filter_: /* @__PURE__ */ __name(() => _tag_filter_, "_tag_filter_"),
        _top: /* @__PURE__ */ __name(() => _top, "_top"),
        asyncLoad: /* @__PURE__ */ __name(() => asyncLoad, "asyncLoad"),
        captureFalseTouch: /* @__PURE__ */ __name(() => captureFalseTouch, "captureFalseTouch"),
        componentLoader: /* @__PURE__ */ __name(() => componentLoader, "componentLoader"),
        default: /* @__PURE__ */ __name(() => qcobjects_default, "default"),
        findPackageNodePath: /* @__PURE__ */ __name(() => findPackageNodePath3, "findPackageNodePath"),
        get: /* @__PURE__ */ __name(() => get, "get"),
        getDocumentLayout: /* @__PURE__ */ __name(() => getDocumentLayout, "getDocumentLayout"),
        global: /* @__PURE__ */ __name(() => _top, "global"),
        isBrowser: /* @__PURE__ */ __name(() => isBrowser, "isBrowser"),
        isNodeCommonJS: /* @__PURE__ */ __name(() => isNodeCommonJS, "isNodeCommonJS"),
        isQCObjects_Class: /* @__PURE__ */ __name(() => isQCObjects_Class, "isQCObjects_Class"),
        isQCObjects_Object: /* @__PURE__ */ __name(() => isQCObjects_Object, "isQCObjects_Object"),
        is_a: /* @__PURE__ */ __name(() => is_a, "is_a"),
        is_phonegap: /* @__PURE__ */ __name(() => is_phonegap, "is_phonegap"),
        logger: /* @__PURE__ */ __name(() => logger9, "logger"),
        qcobjects: /* @__PURE__ */ __name(() => qcobjects, "qcobjects"),
        range: /* @__PURE__ */ __name(() => range, "range"),
        ready: /* @__PURE__ */ __name(() => ready, "ready"),
        resetTop: /* @__PURE__ */ __name(() => resetTop, "resetTop"),
        serviceLoader: /* @__PURE__ */ __name(() => serviceLoader3, "serviceLoader"),
        set: /* @__PURE__ */ __name(() => set, "set"),
        setDefaultProcessors: /* @__PURE__ */ __name(() => setDefaultProcessors, "setDefaultProcessors"),
        shortCode: /* @__PURE__ */ __name(() => shortCode, "shortCode"),
        subelements: /* @__PURE__ */ __name(() => subelements, "subelements"),
        waitUntil: /* @__PURE__ */ __name(() => waitUntil, "waitUntil")
      });
      module.exports = __toCommonJS2(qcobjects_exports);
      var AssignPolyfill = __toESM(require_assign());
      init_top();
      var qcobjects = __toESM(require_MainProcess());
      init_top();
      init_PrimaryCollections();
      init_DataStringify();
      init_DOMCreateElement();
      init_introspection();
      init_Logger();
      init_platform();
      init_subelements();
      init_is_raw_class();
      init_LegacyCopy();
      init_asyncLoad();
      init_IncrementInstanceID();
      init_ObjectName();
      init_getType();
      init_is_a();
      init_ComplexStorageCache();
      init_waitUntil();
      init_Cast();
      init_isQCObjects();
      init_Package();
      init_ClassFactory();
      init_Export();
      init_Class();
      init_InheritClass();
      init_super();
      init_shortCode();
      init_Processor();
      init_New();
      init_Ready();
      init_captureFalseTouch();
      init_serviceLoader();
      init_componentLoader();
      init_ComponentFactory();
      init_NamespaceRef();
      init_defaultProcessors();
      init_Tag();
      init_Import();
      init_basePath();
      init_DataStringify();
      init_domain();
      init_InheritClass();
      init_Logger();
      init_Package();
      var BackendMicroservice = class extends InheritClass6 {
        static {
          __name(this, "BackendMicroservice");
        }
        static {
          __name2(this, "BackendMicroservice");
        }
        stream;
        route;
        headers;
        request;
        constructor({
          domain = _domain_,
          basePath = _basePath_,
          body = null,
          stream = null,
          request = null
        }) {
          super({
            domain,
            basePath,
            body,
            stream,
            request
          });
          logger9.debug("Initializing BackendMicroservice...");
          const microservice = this;
          if (typeof this.body === "undefined") {
            this.body = null;
          }
          if (typeof body !== "undefined") {
            this.body = body;
          }
          this.cors();
          microservice.stream = stream;
          stream?.on("data", (data) => {
            const requestMethod2 = request?.method.toLowerCase();
            const supportedMethods2 = {
              "post": microservice.post.bind(microservice)
            };
            if (Object.hasOwn(supportedMethods2, requestMethod2)) {
              supportedMethods2[requestMethod2].call(microservice, data);
            }
          });
          const requestMethod = request?.method.toLowerCase();
          const supportedMethods = {
            "get": microservice.get.bind(microservice),
            "head": microservice.head.bind(microservice),
            "put": microservice.put.bind(microservice),
            "delete": microservice.delete.bind(microservice),
            "connect": microservice.connect.bind(microservice),
            "options": microservice.options.bind(microservice),
            "trace": microservice.trace.bind(microservice),
            "patch": microservice.patch.bind(microservice)
          };
          if (Object.hasOwn(supportedMethods, requestMethod)) {
            supportedMethods[requestMethod].call(microservice);
          }
        }
        cors() {
          if (this.route.cors) {
            logger9.debug("Validating CORS...");
            const {
              allow_origins,
              allow_credentials,
              allow_methods,
              allow_headers
            } = this.route.cors;
            const microservice = this;
            if (typeof microservice.headers !== "object") {
              microservice.headers = {};
            }
            if (typeof microservice.route.responseHeaders !== "object") {
              microservice.route.responseHeaders = {};
            }
            if (typeof allow_origins !== "undefined") {
              logger9.debug("CORS: allow_origins available. Validating origins...");
              if (allow_origins === "*" || typeof microservice.request.headers.origin === "undefined" || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
                logger9.debug("CORS: Adding header Access-Control-Allow-Origin=*");
                microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
              } else {
                logger9.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
                logger9.debug("CORS: Forcing to finish the response...");
                this.body = {};
                try {
                  this.done();
                } catch (e) {
                  logger9.debug(`It was not possible to finish the call to the microservice: ${e}`);
                }
              }
            } else {
              logger9.debug("CORS: no allow_origins available. Allowing all origins...");
              logger9.debug("CORS: Adding header Access-Control-Allow-Origin=*");
              microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
            }
            if (typeof allow_credentials !== "undefined") {
              logger9.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
              microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
            } else {
              logger9.debug("CORS: No allow_credentials present. Allowing all credentials.");
              microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
            }
            if (typeof allow_methods !== "undefined") {
              logger9.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
              microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
            } else {
              logger9.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
              microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
            }
            if (typeof allow_headers !== "undefined") {
              logger9.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
              microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
            } else {
              logger9.debug("CORS: No allow_headers present. Allowing all headers...");
              microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
            }
          } else {
            logger9.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
          }
        }
        head(formData) {
          logger9.debug(`[BackendMicroservice.head] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        get(formData) {
          logger9.debug(`[BackendMicroservice.get] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        post(formData) {
          logger9.debug(`[BackendMicroservice.post] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        put(formData) {
          logger9.debug(`[BackendMicroservice.put] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        delete(formData) {
          logger9.debug(`[BackendMicroservice.delete] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        connect(formData) {
          logger9.debug(`[BackendMicroservice.connect] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        options(formData) {
          logger9.debug(`[BackendMicroservice.options] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        trace(formData) {
          logger9.debug(`[BackendMicroservice.trace] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        patch(formData) {
          logger9.debug(`[BackendMicroservice.patch] Data received: ${_DataStringify2(formData)}`);
          this.done();
        }
        finishWithBody(stream) {
          try {
            logger9.debug("[BackendMicroservice.finishWithBody] Ending the stream...");
            logger9.debug(`[BackendMicroservice.finishWithBody] type of body is: ${typeof this.body}`);
            if (typeof this.body !== "string") {
              this.body = _DataStringify2(this.body);
            }
            logger9.debug(`[BackendMicroservice.finishWithBody] 
 body: ${this.body} `);
            stream?.write(this.body);
            stream?.end();
            logger9.debug("[BackendMicroservice.finishWithBody] Stream ended.");
          } catch (e) {
            logger9.debug(`[BackendMicroservice.finishWithBody] Something went wrong ending the stream: ${e}`);
          }
        }
        done() {
          logger9.debug("[BackendMicroservice.done] Finalizing the response...");
          const microservice = this;
          const stream = microservice.stream;
          try {
            logger9.debug("[BackendMicroservice.done] Sending response headers...");
            if (microservice.route.responseHeaders) {
              logger9.debug(`[BackendMicroservice.done] Response headers present: ${Object.keys(microservice.route.responseHeaders).join(",")}`);
              stream.respond(microservice.route.responseHeaders);
            } else {
              throw Error("[BackendMicroservice.done] No headers present.");
            }
          } catch (e) {
            logger9.debug(`[BackendMicroservice.done] Something went wrong sending response headers: ${e}`);
          }
          if (microservice.body !== null) {
            try {
              logger9.debug("[BackendMicroservice.done] A body of message is present. Finalizing the response...");
              microservice.finishWithBody.call(microservice, stream);
            } catch (e) {
              logger9.debug(`[BackendMicroservice.done] Something went wrong finalizing the response: ${e}`);
            }
          } else {
            logger9.debug("[BackendMicroservice.done] No body present. Ending stream...");
            stream.end();
          }
        }
      };
      Package7("com.qcobjects.api", [
        BackendMicroservice
      ]);
      init_Component();
      init_Crypt();
      init_Logger();
      init_Processor();
      init_make_global();
      init_PrimaryCollections();
      var RegisterClass = /* @__PURE__ */ __name2(function(_class_, __namespace) {
        return __register_class__(_class_, __namespace);
      }, "RegisterClass");
      __make_global__(RegisterClass);
      var DefaultTemplateHandler = class {
        static {
          __name(this, "DefaultTemplateHandler");
        }
        static {
          __name2(this, "DefaultTemplateHandler");
        }
        template = "";
        __definition = {};
        static __definition = {};
        component;
        constructor({ component, template }) {
          this.component = component;
          this.template = template;
        }
        assign(data) {
          const templateInstance = this;
          if (typeof templateInstance.component === "undefined") {
            throw new Error("DefaultTemplateHandler.assign: component is undefined");
          }
          if (typeof templateInstance.component.processorHandler === "undefined") {
            throw new Error("DefaultTemplateHandler.assign: component.processorHandler is undefined");
          }
          const processorHandler = templateInstance.component.processorHandler;
          processorHandler.component = templateInstance.component;
          let parsedAssignmentText = typeof templateInstance.template !== "undefined" ? templateInstance.template : "";
          if (typeof data === "object") {
            [...Object.keys(data)].map((k) => {
              let _value = data[k];
              if (typeof _value === "string" || typeof _value === "number" || !isNaN(_value)) {
                try {
                  _value = GlobalProcessor.processObject.bind(processorHandler).call(processorHandler, _value, templateInstance.component);
                  parsedAssignmentText = parsedAssignmentText.replace(new RegExp(`{{${k}}}`, "g"), _value);
                } catch (e) {
                  logger9.warn(`${templateInstance.component.name} could not parse processors.`);
                  throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
                }
              }
              return k;
            });
          } else {
            logger9.debug(`${templateInstance.component.name}.data is not an object`);
          }
          try {
            parsedAssignmentText = GlobalProcessor.processObject.call(processorHandler, parsedAssignmentText, templateInstance.component);
          } catch (e) {
            logger9.warn(`${templateInstance.component.name} could not parse processors.`);
            throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
          }
          return parsedAssignmentText;
        }
      };
      RegisterClass(DefaultTemplateHandler, "com.qcobjects");
      init_basePath();
      init_Cast();
      init_domain();
      init_DOMCreateElement();
      init_InheritClass();
      init_Package();
      init_Logger();
      var SourceJS = class extends InheritClass6 {
        static {
          __name(this, "SourceJS");
        }
        static {
          __name2(this, "SourceJS");
        }
        domain = _domain_;
        basePath = _basePath_;
        type = "text/javascript";
        containerTag = "body";
        url = "";
        data = {};
        async = false;
        external = false;
        constructor(o) {
          super(o);
          this.body = _DOMCreateElement("script");
        }
        set(name, value) {
          this[name] = value;
        }
        get(name, _default) {
          return this[name] || _default;
        }
        status = false;
        done() {
        }
        fail() {
        }
        rebuild() {
          const context = this;
          try {
            document.getElementsByTagName(context.containerTag)[0].appendChild(
              function(s, url, context2) {
                s.type = context2.type;
                s.src = url;
                s.crossOrigin = Object.hasOwn(context2, "crossOrigin") ? context2.crossOrigin : "anonymous";
                s.async = context2.async;
                s.onreadystatechange = function() {
                  if (this.readyState === "complete") {
                    context2.done.call(context2);
                  }
                };
                s.onload = function(e) {
                  context2.status = true;
                  context2.done.call(context2, e);
                };
                s.onerror = function(e) {
                  context2.status = false;
                  context2.fail.call(context2, e);
                };
                context2.body = s;
                return s;
              }.call(
                this,
                _DOMCreateElement("script"),
                this.external ? this.url : this.basePath + this.url,
                context
              )
            );
          } catch (e) {
            context.status = false;
            logger9.debug(`An error ocurred: ${e}`);
            context.fail();
          }
        }
        Cast(o) {
          return _Cast(this, o);
        }
        _new_(properties) {
          this.__new__(properties);
          this.rebuild();
        }
      };
      Package7("com.qcobjects", [SourceJS]);
      init_basePath();
      init_Cast();
      init_domain();
      init_DOMCreateElement();
      init_InheritClass();
      init_platform();
      init_Package();
      var SourceCSS = class extends InheritClass6 {
        static {
          __name(this, "SourceCSS");
        }
        static {
          __name2(this, "SourceCSS");
        }
        domain = _domain_;
        basePath = _basePath_;
        url = "";
        data = {};
        async = false;
        external = false;
        constructor(o) {
          super(o);
          this.body = _DOMCreateElement("link");
        }
        fail() {
          throw new Error("Method not implemented.");
        }
        Cast(o) {
          return _Cast(this, o);
        }
        set(name, value) {
          this[name] = value;
        }
        get(name, _default) {
          return this[name] || _default;
        }
        done() {
        }
        rebuild() {
          const context = this;
          if (isBrowser) {
            window.document.getElementsByTagName("head")[0].appendChild(
              function(s, url, context2) {
                s.type = "text/css";
                s.rel = "stylesheet";
                s.href = url;
                s.crossOrigin = "anonymous";
                s.onreadystatechange = function() {
                  if (this.readyState === "complete") {
                    context2.done.call(context2);
                  }
                };
                s.onload = context2.done;
                context2.body = s;
                return s;
              }.call(
                this,
                _DOMCreateElement("link"),
                this.external ? this.url : this.basePath + this.url,
                context
              )
            );
          }
        }
      };
      Package7("com.qcobjects", [SourceCSS]);
      init_globalSettings();
      init_DOMCreateElement();
      init_Export();
      init_introspection();
      init_platform();
      var QCObjectsWidgetNode = class {
        static {
          __name(this, "QCObjectsWidgetNode");
        }
        static {
          __name2(this, "QCObjectsWidgetNode");
        }
        writingSuggestions;
        currentCSSZoom;
        ariaColIndexText;
        ariaRowIndexText;
        accessKey;
        accessKeyLabel;
        autocapitalize;
        dir;
        draggable;
        hidden;
        inert;
        innerText;
        lang;
        offsetHeight;
        offsetLeft;
        offsetParent;
        offsetTop;
        offsetWidth;
        outerText;
        popover;
        spellcheck;
        title;
        translate;
        attachInternals() {
          throw new Error("Method not implemented.");
        }
        click() {
          throw new Error("Method not implemented.");
        }
        hidePopover() {
          throw new Error("Method not implemented.");
        }
        showPopover() {
          throw new Error("Method not implemented.");
        }
        togglePopover(force) {
          throw new Error("Method not implemented.");
        }
        addEventListener(type, listener, options) {
          throw new Error("Method not implemented.");
        }
        removeEventListener(type, listener, options) {
          throw new Error("Method not implemented.");
        }
        attributes;
        classList;
        className;
        clientHeight;
        clientLeft;
        clientTop;
        clientWidth;
        id;
        innerHTML;
        localName;
        namespaceURI;
        onfullscreenchange;
        onfullscreenerror;
        outerHTML;
        ownerDocument;
        part;
        prefix;
        scrollHeight;
        scrollLeft;
        scrollTop;
        scrollWidth;
        shadowRoot;
        slot;
        tagName;
        attachShadow(init) {
          throw new Error("Method not implemented.");
        }
        checkVisibility(options) {
          throw new Error("Method not implemented.");
        }
        closest(selectors) {
          throw new Error("Method not implemented.");
        }
        computedStyleMap() {
          throw new Error("Method not implemented.");
        }
        getAttribute(qualifiedName) {
          throw new Error("Method not implemented.");
        }
        getAttributeNS(namespace, localName) {
          throw new Error("Method not implemented.");
        }
        getAttributeNames() {
          throw new Error("Method not implemented.");
        }
        getAttributeNode(qualifiedName) {
          throw new Error("Method not implemented.");
        }
        getAttributeNodeNS(namespace, localName) {
          throw new Error("Method not implemented.");
        }
        getBoundingClientRect() {
          throw new Error("Method not implemented.");
        }
        getClientRects() {
          throw new Error("Method not implemented.");
        }
        getElementsByClassName(classNames) {
          throw new Error("Method not implemented.");
        }
        getElementsByTagName(qualifiedName) {
          throw new Error("Method not implemented.");
        }
        getElementsByTagNameNS(namespace, localName) {
          throw new Error("Method not implemented.");
        }
        getHTML(options) {
          throw new Error("Method not implemented.");
        }
        hasAttribute(qualifiedName) {
          throw new Error("Method not implemented.");
        }
        hasAttributeNS(namespace, localName) {
          throw new Error("Method not implemented.");
        }
        hasAttributes() {
          throw new Error("Method not implemented.");
        }
        hasPointerCapture(pointerId) {
          throw new Error("Method not implemented.");
        }
        insertAdjacentElement(where, element) {
          throw new Error("Method not implemented.");
        }
        insertAdjacentHTML(position, string) {
          throw new Error("Method not implemented.");
        }
        insertAdjacentText(where, data) {
          throw new Error("Method not implemented.");
        }
        matches(selectors) {
          throw new Error("Method not implemented.");
        }
        releasePointerCapture(pointerId) {
          throw new Error("Method not implemented.");
        }
        removeAttribute(qualifiedName) {
          throw new Error("Method not implemented.");
        }
        removeAttributeNS(namespace, localName) {
          throw new Error("Method not implemented.");
        }
        removeAttributeNode(attr) {
          throw new Error("Method not implemented.");
        }
        requestFullscreen(options) {
          throw new Error("Method not implemented.");
        }
        requestPointerLock(options) {
          throw new Error("Method not implemented.");
        }
        scroll(x, y) {
          throw new Error("Method not implemented.");
        }
        scrollBy(x, y) {
          throw new Error("Method not implemented.");
        }
        scrollIntoView(arg) {
          throw new Error("Method not implemented.");
        }
        scrollTo(x, y) {
          throw new Error("Method not implemented.");
        }
        setAttribute(qualifiedName, value) {
          throw new Error("Method not implemented.");
        }
        setAttributeNS(namespace, qualifiedName, value) {
          throw new Error("Method not implemented.");
        }
        setAttributeNode(attr) {
          throw new Error("Method not implemented.");
        }
        setAttributeNodeNS(attr) {
          throw new Error("Method not implemented.");
        }
        setHTMLUnsafe(html) {
          throw new Error("Method not implemented.");
        }
        setPointerCapture(pointerId) {
          throw new Error("Method not implemented.");
        }
        toggleAttribute(qualifiedName, force) {
          throw new Error("Method not implemented.");
        }
        webkitMatchesSelector(selectors) {
          throw new Error("Method not implemented.");
        }
        baseURI;
        childNodes;
        firstChild;
        isConnected;
        lastChild;
        nextSibling;
        nodeName;
        nodeType;
        nodeValue;
        parentElement;
        parentNode;
        previousSibling;
        textContent;
        appendChild(node) {
          throw new Error("Method not implemented.");
        }
        cloneNode(deep) {
          throw new Error("Method not implemented.");
        }
        compareDocumentPosition(other) {
          throw new Error("Method not implemented.");
        }
        contains(other) {
          throw new Error("Method not implemented.");
        }
        getRootNode(options) {
          throw new Error("Method not implemented.");
        }
        hasChildNodes() {
          throw new Error("Method not implemented.");
        }
        insertBefore(node, child) {
          throw new Error("Method not implemented.");
        }
        isDefaultNamespace(namespace) {
          throw new Error("Method not implemented.");
        }
        isEqualNode(otherNode) {
          throw new Error("Method not implemented.");
        }
        isSameNode(otherNode) {
          throw new Error("Method not implemented.");
        }
        lookupNamespaceURI(prefix) {
          throw new Error("Method not implemented.");
        }
        lookupPrefix(namespace) {
          throw new Error("Method not implemented.");
        }
        normalize() {
          throw new Error("Method not implemented.");
        }
        removeChild(child) {
          throw new Error("Method not implemented.");
        }
        replaceChild(node, child) {
          throw new Error("Method not implemented.");
        }
        ELEMENT_NODE;
        ATTRIBUTE_NODE;
        TEXT_NODE;
        CDATA_SECTION_NODE;
        ENTITY_REFERENCE_NODE;
        ENTITY_NODE;
        PROCESSING_INSTRUCTION_NODE;
        COMMENT_NODE;
        DOCUMENT_NODE;
        DOCUMENT_TYPE_NODE;
        DOCUMENT_FRAGMENT_NODE;
        NOTATION_NODE;
        DOCUMENT_POSITION_DISCONNECTED;
        DOCUMENT_POSITION_PRECEDING;
        DOCUMENT_POSITION_FOLLOWING;
        DOCUMENT_POSITION_CONTAINS;
        DOCUMENT_POSITION_CONTAINED_BY;
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
        dispatchEvent(event) {
          throw new Error("Method not implemented.");
        }
        ariaAtomic;
        ariaAutoComplete;
        ariaBrailleLabel;
        ariaBrailleRoleDescription;
        ariaBusy;
        ariaChecked;
        ariaColCount;
        ariaColIndex;
        ariaColSpan;
        ariaCurrent;
        ariaDescription;
        ariaDisabled;
        ariaExpanded;
        ariaHasPopup;
        ariaHidden;
        ariaInvalid;
        ariaKeyShortcuts;
        ariaLabel;
        ariaLevel;
        ariaLive;
        ariaModal;
        ariaMultiLine;
        ariaMultiSelectable;
        ariaOrientation;
        ariaPlaceholder;
        ariaPosInSet;
        ariaPressed;
        ariaReadOnly;
        ariaRequired;
        ariaRoleDescription;
        ariaRowCount;
        ariaRowIndex;
        ariaRowSpan;
        ariaSelected;
        ariaSetSize;
        ariaSort;
        ariaValueMax;
        ariaValueMin;
        ariaValueNow;
        ariaValueText;
        role;
        animate(keyframes, options) {
          throw new Error("Method not implemented.");
        }
        getAnimations(options) {
          throw new Error("Method not implemented.");
        }
        after(...nodes) {
          throw new Error("Method not implemented.");
        }
        before(...nodes) {
          throw new Error("Method not implemented.");
        }
        remove() {
          throw new Error("Method not implemented.");
        }
        replaceWith(...nodes) {
          throw new Error("Method not implemented.");
        }
        nextElementSibling;
        previousElementSibling;
        childElementCount;
        children;
        firstElementChild;
        lastElementChild;
        append(...nodes) {
          throw new Error("Method not implemented.");
        }
        prepend(...nodes) {
          throw new Error("Method not implemented.");
        }
        querySelector(selectors) {
          throw new Error("Method not implemented.");
        }
        querySelectorAll(selectors) {
          throw new Error("Method not implemented.");
        }
        replaceChildren(...nodes) {
          throw new Error("Method not implemented.");
        }
        assignedSlot;
        attributeStyleMap;
        style;
        contentEditable;
        enterKeyHint;
        inputMode;
        isContentEditable;
        onabort;
        onanimationcancel;
        onanimationend;
        onanimationiteration;
        onanimationstart;
        onauxclick;
        onbeforeinput;
        onbeforetoggle;
        onblur;
        oncancel;
        oncanplay;
        oncanplaythrough;
        onchange;
        onclick;
        onclose;
        oncontextlost;
        oncontextmenu;
        oncontextrestored;
        oncopy;
        oncuechange;
        oncut;
        ondblclick;
        ondrag;
        ondragend;
        ondragenter;
        ondragleave;
        ondragover;
        ondragstart;
        ondrop;
        ondurationchange;
        onemptied;
        onended;
        onerror;
        onfocus;
        onformdata;
        ongotpointercapture;
        oninput;
        oninvalid;
        onkeydown;
        onkeypress;
        onkeyup;
        onload;
        onloadeddata;
        onloadedmetadata;
        onloadstart;
        onlostpointercapture;
        onmousedown;
        onmouseenter;
        onmouseleave;
        onmousemove;
        onmouseout;
        onmouseover;
        onmouseup;
        onpaste;
        onpause;
        onplay;
        onplaying;
        onpointercancel;
        onpointerdown;
        onpointerenter;
        onpointerleave;
        onpointermove;
        onpointerout;
        onpointerover;
        onpointerup;
        onprogress;
        onratechange;
        onreset;
        onresize;
        onscroll;
        onscrollend;
        onsecuritypolicyviolation;
        onseeked;
        onseeking;
        onselect;
        onselectionchange;
        onselectstart;
        onslotchange;
        onstalled;
        onsubmit;
        onsuspend;
        ontimeupdate;
        ontoggle;
        ontouchcancel;
        ontouchend;
        ontouchmove;
        ontouchstart;
        ontransitioncancel;
        ontransitionend;
        ontransitionrun;
        ontransitionstart;
        onvolumechange;
        onwaiting;
        onwebkitanimationend;
        onwebkitanimationiteration;
        onwebkitanimationstart;
        onwebkittransitionend;
        onwheel;
        autofocus;
        dataset;
        nonce;
        tabIndex;
        blur() {
          throw new Error("Method not implemented.");
        }
        focus(options) {
          throw new Error("Method not implemented.");
        }
      };
      var _ComponentWidget_;
      if (isBrowser) {
        _ComponentWidget_ = class _ComponentWidget_ extends HTMLElement {
          static {
            __name(this, "_ComponentWidget_");
          }
          static {
            __name2(this, "_ComponentWidget_");
          }
          constructor() {
            super();
            const componentWidget = this;
            const componentName = componentWidget.nodeName.toLowerCase();
            const componentBody = _DOMCreateElement("quick-component");
            const __enabled__atributes__ = componentWidget.getAttributeNames();
            componentBody.setAttribute("name", componentName);
            if (!componentWidget.hasAttribute("shadowed")) {
              componentBody.setAttribute("shadowed", "true");
            }
            __enabled__atributes__.forEach((attributeName) => {
              if (componentWidget.hasAttribute(attributeName)) {
                componentBody.setAttribute(attributeName, componentWidget?.getAttribute(attributeName));
                componentWidget.removeAttribute(attributeName);
              }
            });
            const data_attributenames = componentWidget.getAttributeNames().filter(function(a) {
              return a.startsWith("data-");
            }).map(function(a) {
              return a.split("-")[1];
            });
            data_attributenames.forEach(function(_attribute_name_) {
              componentBody.setAttribute("data-" + _attribute_name_, componentWidget?.getAttribute("data-" + _attribute_name_));
              componentWidget.removeAttribute("data-" + _attribute_name_);
            });
            [...componentWidget.children].forEach((element) => {
              componentBody.appendChild(element.cloneNode(true));
              element.remove();
            });
            componentWidget.append(componentBody);
          }
        };
      } else {
        _ComponentWidget_ = class _ComponentWidget_ extends QCObjectsWidgetNode {
          static {
            __name(this, "_ComponentWidget_");
          }
          static {
            __name2(this, "_ComponentWidget_");
          }
          constructor() {
            super();
            throw new Error("Class not implemented.");
          }
        };
      }
      Export2(_ComponentWidget_);
      var RegisterWidget = /* @__PURE__ */ __name2(function(widgetName) {
        if (isBrowser) {
          customElements.define(widgetName, class extends _ComponentWidget_ {
          });
        } else {
          throw new Error("RegisterWidget is not implemented for non browser ecosystems yet.");
        }
      }, "RegisterWidget");
      var RegisterWidgets = /* @__PURE__ */ __name2(function(...args) {
        const widgetList = [...args];
        widgetList.filter(function(widgetName) {
          return typeof widgetName === "string";
        }).map(function(widgetName) {
          return RegisterWidget(widgetName);
        });
      }, "RegisterWidgets");
      _protected_code_(RegisterWidget);
      _protected_code_(RegisterWidgets);
      Export2(RegisterWidget);
      Export2(RegisterWidgets);
      init_CONFIG();
      init_ClassFactory();
      init_getType();
      init_InheritClass();
      init_Logger();
      init_New();
      init_Package();
      init_platform();
      var Controller = class extends InheritClass6 {
        static {
          __name(this, "Controller");
        }
        static {
          __name2(this, "Controller");
        }
        component;
        dependencies = [];
        constructor({
          component,
          dependencies
        }) {
          super({ component, dependencies });
          this.component = component;
          this.dependencies = dependencies;
          if (typeof this.component === "undefined" || this.component === null) {
            throw Error(`${__getType__(this)} must be called with a component`);
          }
        }
        // eslint-disable-next-line no-unused-vars
        fail(...args) {
          throw new Error("Method not implemented.");
        }
        routingSelectedAttr(attrName) {
          return this.component?.routingSelected.map((r) => {
            return r[attrName];
          }).filter(function(v) {
            return v;
          }).pop();
        }
        isTouchable() {
          return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        }
        onpress(subelementSelector, handler) {
          if (isBrowser) {
            try {
              if (this.isTouchable()) {
                (this.component?.componentRoot?.subelements(subelementSelector))[0].addEventListener("touchstart", handler, {
                  passive: true
                });
              } else {
                (this.component?.componentRoot?.subelements(subelementSelector))[0].addEventListener("click", handler, {
                  passive: true
                });
              }
            } catch (e) {
              logger9.debug(`An error ocurred: ${e}.`);
              logger9.debug("No button to assign press event");
            }
          }
        }
        createRoutingController() {
          const controller = this;
          const component = controller.component;
          const controllerName = controller.routingSelectedAttr("controllerclass");
          if (typeof controllerName !== "undefined") {
            const _Controller2 = ClassFactory(controllerName);
            if (typeof _Controller2 !== "undefined" && component !== null) {
              component.routingController = New3(_Controller2, {
                component
              });
              if (typeof component.routingController !== "undefined" && Object.hasOwn(component.routingController, "done") && typeof component.routingController.done === "function") {
                component.routingController.done.call(component.routingController);
              }
            }
          }
        }
        done() {
        }
      };
      Package7("com.qcobjects.controllers", [
        Controller
      ]);
      init_getType();
      init_InheritClass();
      init_Package();
      var View = class extends InheritClass6 {
        static {
          __name(this, "View");
        }
        static {
          __name2(this, "View");
        }
        constructor({ component = void 0, dependencies = [] }) {
          super({ component, dependencies });
          if (typeof this.component === "undefined" || this.component === "null") {
            throw Error(`${__getType__(this)} must be called with a component`);
          }
        }
      };
      Package7("com.qcobjects.views", [
        View
      ]);
      init_Service();
      init_InheritClass();
      init_Package();
      var VO = class extends InheritClass6 {
        static {
          __name(this, "VO");
        }
        static {
          __name2(this, "VO");
        }
      };
      Package7("com.qcobjects.valueObjects", [
        VO
      ]);
      init_InheritClass();
      init_Package();
      init_introspection();
      init_ClassFactory();
      var Effect = class extends InheritClass6 {
        static {
          __name(this, "Effect");
        }
        static {
          __name2(this, "Effect");
        }
        // eslint-disable-next-line no-unused-vars
        done(...args) {
          throw new Error("Method not implemented.");
        }
        // eslint-disable-next-line no-unused-vars
        apply(...args) {
          throw new Error("Method not implemented.");
        }
        duration = 1e3;
        animate({
          timing,
          draw,
          duration
        }) {
          const _self = this;
          const start = performance.now();
          requestAnimationFrame(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            const progress = timing(timeFraction);
            draw(Math.round(progress * 100));
            if (timeFraction < 1) {
              requestAnimationFrame(animate);
            } else {
              if (typeof _self !== "undefined" && _self !== null && Object.hasOwn(_self, "done") && (typeof _self.done).toLowerCase() === "function") {
                _self.done.call(_self);
              }
            }
          }, "animate"), "animate"));
        }
      };
      Package7("com.qcobjects.effects.base", [
        Effect
      ]);
      _methods_(ClassFactory("Effect")).map((__c__) => {
        _protected_code_(__c__);
        return __c__;
      });
      init_Logger();
      init_Package();
      init_ClassFactory();
      var TransitionEffect = class extends Effect {
        static {
          __name(this, "TransitionEffect");
        }
        static {
          __name2(this, "TransitionEffect");
        }
        duration = 385;
        defaultParams = {
          alphaFrom: 0,
          alphaTo: 1,
          angleFrom: 180,
          angleTo: 0,
          radiusFrom: 0,
          radiusTo: 30,
          scaleFrom: 0,
          scaleTo: 1
        };
        fitToHeight = false;
        fitToWidth = false;
        component;
        effects;
        apply({
          alphaFrom,
          alphaTo,
          angleFrom,
          angleTo,
          radiusFrom,
          radiusTo,
          scaleFrom,
          scaleTo
        }) {
          const _transition_ = this;
          logger9.info("EXECUTING TransitionEffect  ");
          const componentRoot = _transition_.component.componentRoot;
          if (typeof componentRoot !== "undefined" && componentRoot !== null) {
            if (_transition_.fitToHeight) {
              componentRoot.height = typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null ? componentRoot.offsetParent?.scrollHeight : componentRoot.getBoundingClientRect().height;
            }
            if (_transition_.fitToWidth) {
              componentRoot.width = typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null ? componentRoot.offsetParent?.scrollWidth : componentRoot.getBoundingClientRect().width;
            }
            if (_transition_.component.shadowed) {
              componentRoot.host.style.display = "block";
            } else {
              componentRoot.style.display = "block";
            }
            _transition_.effects.map((effectClassName) => {
              const __effectClass__ = ClassFactory(effectClassName);
              const effectObj = new __effectClass__({});
              const effectClassMethod = effectObj.apply.bind(_transition_);
              const componentHost = _transition_.component.shadowed ? componentRoot.host : componentRoot;
              const effectParams = {
                alphaFrom,
                alphaTo,
                angleFrom,
                angleTo,
                radiusFrom,
                radiusTo,
                scaleFrom,
                scaleTo
              };
              effectClassMethod(componentHost, ...Object.values(effectParams));
              return effectClassName;
            });
          }
        }
      };
      Package7("com.qcobjects.effects.transitions.base", [
        TransitionEffect
      ]);
      init_InheritClass();
      init_Package();
      var Timer = class extends InheritClass6 {
        static {
          __name(this, "Timer");
        }
        static {
          __name2(this, "Timer");
        }
        duration = 1e3;
        alive = true;
        thread({
          timing,
          intervalInterceptor,
          duration
        }) {
          const timer = this;
          const start = performance.now();
          requestAnimationFrame(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function thread(time) {
            const elapsed = time - start;
            let timeFraction = elapsed / duration;
            if (timeFraction > 1) timeFraction = 1;
            const progress = timing(timeFraction, elapsed);
            intervalInterceptor(Math.round(progress * 100));
            if ((timeFraction < 1 || duration === -1) && timer.alive) {
              requestAnimationFrame(thread);
            }
          }, "thread"), "thread"));
        }
      };
      Package7("com.qcobjects.timing", [
        Timer
      ]);
      init_tag_filter();
      init_range();
      init_ArrayCollection();
      init_Export();
      init_InheritClass();
      init_Logger();
      init_ObjectName();
      var DDO = class extends InheritClass6 {
        static {
          __name(this, "DDO");
        }
        static {
          __name2(this, "DDO");
        }
        constructor({
          instance,
          name,
          fget,
          fset,
          value
        }) {
          super({
            instance,
            name,
            fget,
            fset,
            value
          });
          this._new_({
            instance,
            name,
            fget,
            fset,
            value
          });
        }
        _new_({
          instance,
          name,
          fget,
          fset
        }) {
          const ddoInstance = this;
          var name = typeof name === "undefined" ? ObjectName(ddoInstance) : name;
          Object.defineProperty(instance, name, {
            set(val) {
              const _value = val;
              logger9.debug("value changed " + name);
              let ret;
              if (typeof fset !== "undefined" && typeof fset === "function") {
                ret = fset(_value);
              } else {
                ret = _value;
              }
              instance["_" + name] = ret;
            },
            get() {
              const _value = instance["_" + name];
              logger9.debug("returning value " + name);
              const is_ddo = /* @__PURE__ */ __name2((v) => {
                if (typeof v === "object" && Object.hasOwn(v, "value")) {
                  return v.value;
                }
                return v;
              }, "is_ddo");
              let ret;
              if (typeof fget !== "undefined" && typeof fget === "function") {
                ret = fget(is_ddo(_value));
              } else {
                ret = is_ddo(_value);
              }
              return ret;
            }
          });
        }
      };
      Export2(DDO);
      init_InheritClass();
      init_Logger();
      init_Package();
      var Toggle = class extends InheritClass6 {
        static {
          __name(this, "Toggle");
        }
        static {
          __name2(this, "Toggle");
        }
        _toggle = false;
        _inverse = true;
        _positive = null;
        _negative = null;
        _dispatched = null;
        _args = {};
        constructor(positive, negative, args) {
          super({ positive, negative, args });
          this._new_({ positive, negative, args });
        }
        changeToggle() {
          this._toggle = !this._toggle;
        }
        _new_({
          positive,
          negative,
          args
        }) {
          this._positive = positive;
          this._negative = negative;
          this._args = args;
        }
        fire() {
          const toggle = this;
          var _promise = new Promise(function(resolve, reject) {
            if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
              if (toggle._inverse) {
                toggle._dispatched = toggle._toggle ? toggle._negative.bind(toggle) : toggle._positive.bind(toggle);
              } else {
                toggle._dispatched = toggle._toggle ? toggle._positive.bind(toggle) : toggle._negative.bind(toggle);
              }
              toggle._dispatched?.call(toggle, toggle._args);
              resolve.call(_promise, toggle);
            } else {
              logger9.debug("Toggle functions are not declared");
              reject.call(_promise, toggle);
            }
            return toggle;
          }).then(function(toggle2) {
            toggle2.changeToggle();
            return toggle2;
          }).catch(function(e) {
            logger9.debug(e.toString());
            return toggle;
          }).finally(() => {
            return toggle;
          });
          return _promise;
        }
      };
      Package7("com.qcobjects.tools.essentials", [
        Toggle
      ]);
      init_findPackageNodePath();
      var getDocumentLayout = /* @__PURE__ */ __name2(function() {
        const h = /* @__PURE__ */ __name2((w, h2) => {
          return w > h2 ? "landscape" : null;
        }, "h");
        const v = /* @__PURE__ */ __name2((w, h2) => {
          return h2 > w ? "portrait" : null;
        }, "v");
        const square = /* @__PURE__ */ __name2((w, h2) => {
          return w === h2 ? "square" : null;
        }, "square");
        return [
          h(document.documentElement.clientWidth, document.documentElement.clientHeight),
          v(document.documentElement.clientWidth, document.documentElement.clientHeight),
          square(document.documentElement.clientWidth, document.documentElement.clientHeight)
        ].filter((e) => e !== null).pop();
      }, "getDocumentLayout");
      init_mathFunctions();
      init_top();
      init_make_global();
      init_top();
      var qcobjects_default = {};
    }
  });

  // node_modules/qcobjects/package.json
  var require_package = __commonJS({
    "node_modules/qcobjects/package.json"(exports, module) {
      module.exports = {
        name: "qcobjects",
        version: "2.5.124-beta",
        description: "QCObjects is an Open-source framework that empowers full-stack developers to make micro-services and micro-frontends into an N-Tier architecture.",
        main: "public/cjs/QCObjects.cjs",
        module: "public/esm/QCObjects.mjs",
        browser: "public/browser/QCObjects.js",
        type: "commonjs",
        types: "public/types/index.d.ts",
        exports: {
          ".": {
            types: "./public/types/index.d.ts",
            require: "./public/cjs/QCObjects.cjs",
            import: "./public/esm/QCObjects.mjs"
          },
          "./types/*": "./types/*",
          "./package.json": "./package.json",
          "./tsconfig.json": "./tsconfig.json",
          "./tsconfig.d.json": "./tsconfig.d.json",
          "./tsconfig.jasmine.json": "./tsconfig.jasmine.json"
        },
        license: "LGPL-3.0",
        scripts: {
          build: "npm run build:ts-types && npm run build:ts && npm run build:browser",
          postbuild: "node ./postbuild.js",
          "build:ts": "npm test && npx tsc",
          "build:ts-types": "npx tsc --project tsconfig.d.json",
          "build:browser": "npm run build:esbuild",
          "build:esbuild": "node ./build-esbuild.js",
          start: "qcobjects-shell",
          "test:ts-types": "npx tsc --project ./tsconfig.jasmine.json ",
          "test:jasmine": "npm run test:ts-types && npx ts-node --project ./tsconfig.jasmine.json ./node_modules/jasmine/bin/jasmine",
          test: "(npm run lint && npm run test:jasmine)",
          lint: "(npx -y eslint@latest src/**/*.ts --fix )",
          preversion: "npm cache verify && npm test",
          sync: "git add . && git commit -am ",
          postversion: "git push && git push --tags",
          "v-patch": "qcobjects v-patch",
          "v-minor": "qcobjects v-minor",
          "v-major": "qcobjects v-major",
          qcobjects: "qcobjects",
          cli: "qcobjects",
          prepare: `node -e "if(!require('fs').existsSync('.git')){process.exit(0)}" || npx -y husky install`,
          "cli:help": "qcobjects --help",
          tree: "tree -d --gitignore",
          "generate-readme-pdf": '(npx -y markdown-pdf --paper-format "Letter" -o README.pdf README.md && npx markdown-pdf --paper-format "Letter" -o README-es.pdf README-es.md) && npm uninstall markdown-pdf'
        },
        repository: {
          type: "git",
          url: "git+https://github.com/QuickGroup/QCObjects.git"
        },
        keywords: [
          "qcobjects",
          "cobjects",
          "learn javascript",
          "javascript",
          "learn to code",
          "qco",
          "ROUTING",
          "TOOLBAR",
          "MEDIA",
          "IMAGE",
          "LAYOUT",
          "BUTTON",
          "server",
          "view",
          "mvvm",
          "node",
          "quickcorp",
          "javascript",
          "pure",
          "mvc",
          "objects",
          "microfrontend",
          "micro-frontend",
          "architecture",
          "component",
          "components",
          "pure",
          "framework",
          "javascript-framework",
          "mvc-pattern",
          "demo",
          "html",
          "first-timers-only",
          "microfrontends",
          "microservices",
          "microfrontend",
          "component-architecture",
          "cli",
          "tool",
          "nodejs",
          "cloud",
          "multicloud",
          "multi-cloud",
          "aws",
          "server",
          "digitalocean",
          "hosting",
          "architecture",
          "n-tier",
          "multitier",
          "multi-tier"
        ],
        author: "Jean Machuca <correojean@gmail.com>",
        bugs: {
          url: "https://github.com/QuickGroup/QCObjects/issues"
        },
        homepage: "https://qcobjects.com",
        devDependencies: {
          "@eslint/eslintrc": "^3.1.0",
          "@eslint/js": "^9.13.0",
          "@types/jasmine": "^5.1.4",
          "@types/node": "^22.8.1",
          "@typescript-eslint/eslint-plugin": "^5.58.0",
          "@typescript-eslint/parser": "^5.58.0",
          esbuild: "^0.24.0",
          "esbuild-plugin-alias": "^0.2.1",
          eslint: "^8.57.1",
          "eslint-config-prettier": "^8.10.0",
          "eslint-config-semistandard": "^17.0.0",
          "eslint-config-standard": "^17.1.0",
          "eslint-plugin-import": "^2.27.5",
          "eslint-plugin-n": "^15.7.0",
          "eslint-plugin-promise": "^6.1.1",
          globals: "^15.11.0",
          hint: "^2.0.0",
          install: "^0.13.0",
          jasmine: "^3.99.0",
          "ts-node": "^10.9.2",
          typescript: "^5.7.2",
          "typescript-eslint": "^8.18.1"
        },
        engines: {
          npm: ">=10",
          node: ">=22"
        }
      };
    }
  });

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

  // src/qcobjects-cli.ts
  var qcobjects_cli_exports = {};
  __export(qcobjects_cli_exports, {
    Main: () => Main,
    default: () => qcobjects_cli_default,
    defaultSettings: () => org_quickcorp_qcobjects_defaultsettings_exports
  });

  // src/org.quickcorp.qcobjects.defaultsettings.ts
  var org_quickcorp_qcobjects_defaultsettings_exports = {};
  __export(org_quickcorp_qcobjects_defaultsettings_exports, {
    __get_version__: () => __get_version__,
    __get_version_string__: () => __get_version_string__
  });
  require_QCObjects();
  var { CONFIG, global: global2, logger, _Crypt, findPackageNodePath, Export } = require_QCObjects();
  var __get_version__ = /* @__PURE__ */ __name(() => {
    const path5 = __require("path");
    const absolutePath3 = path5.resolve(__dirname, "./");
    const package_config2 = __require(path5.resolve(process.cwd(), "package.json"));
    const qcobjects_pkg_config = require_package();
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
        global2.set("backendAvailable", true);
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
  global2.__load_default_settings__ = __load_default_settings__;
  global2.__load_default_settings__();
  var cleanCache = /* @__PURE__ */ __name(() => {
    Object.keys(__require.cache).forEach((key) => {
      delete __require.cache[key];
    });
  }, "cleanCache");
  var __reset_settings__ = /* @__PURE__ */ __name(() => {
    cleanCache();
    global2.__load_default_settings__();
  }, "__reset_settings__");
  global2.__reset_settings__ = __reset_settings__;

  // src/org.qcobjects.enterprise.commands.ts
  var import_node_child_process = __require("node:child_process");
  var { Package, InheritClass, CONFIG: CONFIG2, logger: logger2 } = require_QCObjects();
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
      (0, import_node_child_process.execSync)(cmdDownloadGit);
      const stdout = (0, import_node_child_process.execSync)("qcobjects --version");
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
  var { Package: Package2, Service, logger: logger3 } = require_QCObjects();
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
  var { Package: Package3, InheritClass: InheritClass2, logger: logger4 } = require_QCObjects();
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
  var { Package: Package4, Service: Service2, logger: logger5 } = require_QCObjects();
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
  var { Package: Package5, InheritClass: InheritClass3, _DataStringify, New, CONFIG: CONFIG3, logger: logger6, serviceLoader } = require_QCObjects();
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
  require_QCObjects();
  var { CONFIG: CONFIG4, findPackageNodePath: findPackageNodePath2, logger: logger7, Package: Package6, InheritClass: InheritClass4, New: New2, serviceLoader: serviceLoader2, global: global3, Service: Service3, Component } = require_QCObjects();
  CONFIG4.set("node_modules_path", "./node_modules/");
  CONFIG4.set("qcobjectsnewapp_path", CONFIG4.get("node_modules_path") + "/qcobjectsnewapp");
  var getPluginCommandsList = /* @__PURE__ */ __name(() => {
    return global3.ClassesList.filter((c) => c.packageName.startsWith("com.qcobjects.cli.commands.")).filter((p) => p.classFactory.name.endsWith("CommandHandler"));
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
        const parsedText = component.parsedAssignmentText;
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
          this.data = data;
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
  global3.SwitchCommander = SwitchCommander;

  // src/qcobjects-cli.ts
  var path4 = __require("path");
  var absolutePath2 = path4.resolve(__dirname, "./");
  var templatePath = path4.resolve(__dirname, "./templates/apps/") + "/";
  var package_config = __require(path4.resolve(process.cwd(), "package.json"));
  var { logger: logger8, InheritClass: InheritClass5 } = require_QCObjects();
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
  return __toCommonJS(qcobjects_cli_exports);
})();
//# sourceMappingURL=qcobjects-cli.js.map
