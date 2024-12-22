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

// node_modules/qcobjects/public/cjs/QCObjects.cjs
var require_QCObjects = __commonJS({
  "node_modules/qcobjects/public/cjs/QCObjects.cjs"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
      return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
    }, "__init"), "__esm");
    var __commonJS2 = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require2() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    }, "__require"), "__commonJS");
    var __export = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
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
    var Export;
    var init_Export = __esm({
      "src/Export.ts"() {
        "use strict";
        init_make_global();
        Export = /* @__PURE__ */ __name2(function(f) {
          return __make_global__(f);
        }, "Export");
        Export.prototype.toString = function() {
          return "Export(function or symbol) { [QCObjects native code] }";
        };
      }
    });
    async function _import_(name) {
      logger.debug(`Importing ${name}...`);
      function isPackage(name2) {
        logger.debug(`Validating if ${name2} is a package name...`);
        return !name2.startsWith(".") && !name2.startsWith("/") && !name2.includes("/");
      }
      __name(isPackage, "isPackage");
      __name2(isPackage, "isPackage");
      try {
        const hasExtension = /\.[^/\\]+$/.test(name);
        if (!hasExtension && !isPackage(name)) {
          logger.debug(`${name} does not have an extension and is not a package. Adding js extension.`);
          name += ".js";
        }
        const m = await import(name);
        return m;
      } catch (error) {
        logger.warn(`Failed to load module: ${error}`);
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
                logger.warn(`An error ocurred: ${e}`);
              });
            } catch (e) {
              logger.debug(`An error ocurred importing module. ${e}`);
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
    var logger;
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
        logger = new Logger();
        Export(logger);
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
                logger.debug(`An error ocurred: ${e}.`);
                logger.warn(`Unable to cast ${(typeof obj_source).toString()}.${typeof v.toString()} to ${(typeof obj_dest).toString()}.${typeof v.toString()}`);
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
                  logger.debug(`An error ocurred: ${e}.`);
                }
              }
            } else if (typeof obj_source[v] === "function") {
              try {
                obj_dest[v] = obj_source[v].bind(obj_dest);
              } catch (e) {
                logger.warn(e);
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
    var Package;
    var init_Package = __esm({
      "src/Package.ts"() {
        "use strict";
        init_is_raw_class();
        init_PrimaryCollections();
        Package = /* @__PURE__ */ __name2((namespace, classes = []) => {
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
    var InheritClass;
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
        InheritClass = class {
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
                  logger.debug(`An error ocurred: ${e}.`);
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
                  logger.warn(`${self2.__classType}._new_() failed with error: ${e}`);
                }
              }
            } catch (e) {
              logger.warn(e);
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
              logger.debug("body style");
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
            logger.debug("append: start");
            if (is_a(child, "Component")) {
              logger.debug("append: child is a Component");
              logger.debug(`appending the body of ${child.name}`);
            }
            if (typeof this.body !== "undefined") {
              logger.debug("append element");
              if (arguments.length > 0) {
                logger.debug("append to element");
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
                  logger.debug("append to body");
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
        Package("com.qcobjects", [InheritClass]);
      }
    });
    var isQCObjects_Object;
    var isQCObjects_Class;
    var init_isQCObjects = __esm({
      "src/isQCObjects.ts"() {
        "use strict";
        init_InheritClass();
        isQCObjects_Object = /* @__PURE__ */ __name2(function(_) {
          return !!(typeof _ === "object" && Object.hasOwn(_, "__classType") && !!_.__instanceID && Object.hasOwn(_, "__definition") && typeof _.__definition !== "undefined") || _ instanceof InheritClass;
        }, "isQCObjects_Object");
        isQCObjects_Class = /* @__PURE__ */ __name2(function(_) {
          return !!(typeof _ === "function" && !_.__instanceID && !!_.__definition && typeof _.__definition !== "undefined" && !!_.__definition.__classType) || _.prototype instanceof InheritClass;
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
                    logger.debug(`An error ocurred: ${e}.`);
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
                    logger.warn(`${self2.__classType}._new_() failed with error: ${e}`);
                  }
                }
              } catch (e) {
                logger.warn(e);
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
                logger.debug("body style");
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
              logger.debug("append: start");
              if (is_a(child, "Component")) {
                logger.debug("append: child is a Component");
                logger.debug(`appending the body of ${child.name}`);
              }
              if (typeof this.body !== "undefined") {
                logger.debug("append element");
                if (arguments.length > 0) {
                  logger.debug("append to element");
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
                    logger.debug("append to body");
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
              logger.debug(`An error ocurred: ${e}.`);
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
    var _DataStringify;
    var init_DataStringify = __esm({
      "src/DataStringify.ts"() {
        "use strict";
        init_LegacyCopy();
        _DataStringify = /* @__PURE__ */ __name2(function(data) {
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
    var New;
    var init_New = __esm({
      "src/New.ts"() {
        "use strict";
        New = /* @__PURE__ */ __name2(function(__class__, args = {}) {
          args = arguments.length > 1 ? args : {};
          return typeof __class__ === "undefined" ? new Object() : new __class__(args);
        }, "New");
        New.prototype.toString = function() {
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
    var _Crypt;
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
        _Crypt = class __Crypt extends InheritClass {
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
          return _Crypt.encrypt(_DataStringify(o), _secretKey);
        }, "_CryptObject");
        _DecryptObject = /* @__PURE__ */ __name2(function(s) {
          return s === "" ? {} : JSON.parse(_Crypt.decrypt(s, _secretKey));
        }, "_DecryptObject");
        Package("com.qcobjects", [_Crypt]);
      }
    });
    var ConfigSettings;
    var init_ConfigSettings = __esm({
      "src/ConfigSettings.ts"() {
        "use strict";
        init_basePath();
        init_InheritClass();
        init_Package();
        ConfigSettings = class _ConfigSettings extends InheritClass {
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
        Package("com.qcobjects", [ConfigSettings]);
      }
    });
    var CONFIG;
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
        CONFIG = class _CONFIG extends InheritClass {
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
            logger.debug(`CONFIG.set  ${name}: ${value}`);
            if (name === "basePath") {
              setBasePath(value);
            }
            let _conf;
            try {
              _conf = function(config) {
                if (config._CONFIG_ENC === null) {
                  config._CONFIG_ENC = _Crypt.encrypt(_DataStringify({}), _secretKey);
                }
                const _protectedEnc = config._CONFIG_ENC.valueOf();
                const _protectedConf = config._CONFIG?.valueOf();
                return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
              }(ConfigSettings.instance);
            } catch (e) {
              _conf = {};
              console.error(e);
              logger.debug("failed to encrypt config");
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
                  config._CONFIG_ENC = _Crypt.encrypt(_DataStringify({}), _secretKey);
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
              logger.debug("Something wrong when trying to get CONFIG values");
              logger.debug("No config value for: " + name);
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
        Package("com.qcobjects", [CONFIG]);
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
        Processor = class _Processor extends InheritClass {
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
              return CONFIG.get(arg, "");
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
            const processorHandler = component !== null ? component.processorHandler : New(_Processor, { component: null });
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
        Package("com.qcobjects", [Processor]);
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
        Export(asyncLoad);
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
                logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID));
              } else {
                alternate.call(null, {
                  cachedObjectID,
                  cachedResponse,
                  "cache": this
                });
                logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID));
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
            localStorage.setItem(cachedObjectID, _DataStringify(value));
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
              cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify(object).replace(/\{|\}|,/g, "_"));
            }
            return cachedObjectID;
          }
          save(object, cachedNewResponse) {
            const cachedObjectID = this.getID(object);
            logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID));
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
    var serviceLoader;
    var init_serviceLoader = __esm({
      "src/serviceLoader.ts"() {
        "use strict";
        init_asyncLoad();
        init_ComplexStorageCache();
        init_DataStringify();
        init_Logger();
        init_platform();
        init_top();
        serviceLoader = /* @__PURE__ */ __name2(function(service, _async = false) {
          const _serviceLoaderInBrowser = /* @__PURE__ */ __name2(function(service2) {
            var _promise = new Promise(
              function(resolve, reject) {
                logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service2.data)).replace("{{URL}}", service2.url));
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
                    logger.debug("Something went wrong when assign the header " + header);
                    logger.debug(`An error ocurred: ${e}`);
                  }
                }
                xhr.onload = function() {
                  if (xhr.status === 200) {
                    const response = xhr.responseText;
                    logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                    logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service2.name));
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
                  logger.debug("SENDING THE NORMAL REQUEST  ");
                  try {
                    xhr.send(_DataStringify(service2.data));
                  } catch (e) {
                    logger.debug("SOMETHING WRONG WITH REQUEST  ");
                    logger.debug(`An error ocurred: ${e}`);
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
                  logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service2.data)).replace("{{URL}}", service2.url));
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
                        logger.debug("Sending data...");
                        const buffer = new Buffer(_DataStringify(service2.data));
                        req2.write(buffer);
                      } catch (e) {
                        logger.debug("It was not possible to send any data");
                        logger.debug(`An error ocurred: ${e}`);
                      }
                    }
                  }
                  dataXML = "";
                  req2.on("response", (responseHeaders) => {
                    logger.debug("receiving response...");
                    standardResponse.responseHeaders = responseHeaders;
                    dataXML = "";
                  });
                  req2.on("data", (chunk) => {
                    logger.debug("receiving data...");
                    dataXML += "" + chunk.toString();
                    service2.template = dataXML;
                  });
                  if (service2.useHTTP2) {
                    req2.resume();
                  }
                  req2.on("end", () => {
                    logger.debug("ending call...");
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
                    logger.debug("using http2");
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
                      logger.debug(e);
                      throw new Error(e);
                    }
                  }
                } catch (e) {
                  logger.debug(e);
                  service2.fail.call(service2, e);
                  reject.call(_promise, e);
                }
              }
            ).catch((e) => {
              logger.debug(`Something happened when trying to call the service: ${service2.name}. Error: ${e}`);
              service2.fail.call(service2, e);
            });
            return _promise;
          }, "_serviceLoaderInNode");
          const _serviceLoaderMockup = /* @__PURE__ */ __name2(function(service2) {
            var _promise = new Promise(
              function(resolve) {
                logger.debug(`Calling mockup service ${service2.name} ...`);
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
                logger.debug(`Calling local service ${service2.name} ...`);
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
              logger.debug(`The value of the kind property of the service ${service.name} is not valid`);
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
                logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component2.data)).replace("{{URL}}", component2.url));
                const _componentLoaded = /* @__PURE__ */ __name2(function() {
                  const successStatus = is_file ? 0 : 200;
                  if (xhr.status === successStatus) {
                    const response = xhr.responseText;
                    logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                    logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component2.name));
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
                      logger.debug("Calling the url of component in async mode.");
                      xhr.open(component2.method, component2.url, true);
                    } catch (e) {
                      logger.debug(`An error ocurred: ${e}.`);
                      logger.debug("Last try has failed... The component cannot be loaded.");
                    }
                  } else {
                    if ("fetch" in _top) {
                      logger.debug("I can use fetch...");
                      logger.debug("It is a file to be loaded, so I will try to use fetch");
                      fetch(component2.url).then((response) => {
                        logger.debug("I got a response from fetch, so I'll feed the component");
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
                    logger.debug("SENDING THE NORMAL REQUEST  ");
                    if (is_file2) {
                      if (!("fetch" in _top)) {
                        logger.debug("I have to try to load the file using xhr...  ");
                        xhr.send(null);
                        if (xhr.status === XMLHttpRequest.DONE) {
                          _componentLoaded();
                        }
                      }
                    } else {
                      logger.debug("Trying to send the data to the component...  ");
                      xhr.send(_DataStringify(component2.data));
                    }
                  }, "_directLoad");
                  if (component2.cached && !is_file) {
                    logger.debug("USING CACHE FOR COMPONENT: " + component2.name);
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
                    logger.debug("NOT USING CACHE FOR COMPONENT: " + component2.name);
                    _directLoad(is_file);
                  }
                }
              } else {
                logger.debug("CONTAINER DOESNT EXIST");
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
              logger.debug("Something wrong loading the component");
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
              logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component2.data)).replace("{{URL}}", component2.url));
              const _componentLoaded = /* @__PURE__ */ __name2(function(err, responseText) {
                if (!err) {
                  const response = responseText.toString();
                  logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                  logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component2.name));
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
                logger.debug("Loading the component as a local file in server...");
                const _directLoad = /* @__PURE__ */ __name2(function() {
                  const { readFile } = __require("node:fs");
                  logger.debug("SENDING THE NORMAL REQUEST  ");
                  readFile(component2.url, _componentLoaded);
                }, "_directLoad");
                if (component2.cached) {
                  logger.debug("USING CACHE FOR COMPONENT: " + component2.name);
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
                  logger.debug("NOT USING CACHE FOR COMPONENT: " + component2.name);
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
              logger.debug(`Something wrong loading the component: ${e}`);
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
    var Component;
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
        Component = class _Component extends InheritClass {
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
              logger.warn("A name is not defined for " + __getType__(self2));
            }
            self2.routingWay = CONFIG.get("routingWay");
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
                    logger.info(`Component._new_ The component ${self2.name} was built successfully!`);
                  }).catch(function(standardResponse) {
                    logger.warn(`Component._new_ Something went wrong building the component ${self2.name}`);
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
            logger.debug("[cacheIndex] This property is readonly");
          }
          get cacheIndex() {
            const self2 = this;
            const __routing_path__ = _DataStringify(self2.routingPath);
            return Base64.encode(self2.name + __routing_path__);
          }
          set parsedAssignmentText(value) {
            logger.debug("[parsedAssignmentText] This property is readonly");
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
              logger.debug("[shadowRoot] This property can only be assigned once!");
            }
          }
          get shadowRoot() {
            const self2 = this;
            return self2.__shadowRoot;
          }
          set routingSelected(value) {
            logger.debug("[routingSelected] This is a read-only property of the component");
          }
          get routingSelected() {
            const self2 = this;
            return __valid_routings__(self2.routings, self2.routingPath);
          }
          set routingParams(value) {
            logger.debug("[routingParams] This is a read-only property of the component");
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
                logger.info("Loading service " + _serviceClassName);
                const serviceInstance = New(__serviceClass, {
                  data
                });
                serviceLoader(serviceInstance)?.then(function({
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
                  logger.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
                  reject(rejectedResponse);
                }).catch(function(e) {
                  logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
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
                    const routingWay = CONFIG.get("routingWay");
                    const routingPath = e.target[routingWay];
                    if (_top.global.get("routingPaths").includes(routingPath) && e.target[routingWay] !== location[routingWay] && e.target.href !== document.location.href) {
                      logger.debug("A ROUTING WAS FOUND: " + routingPath);
                      window.history.pushState({
                        href: e.target.href
                      }, e?.target?.href, e.target.href);
                      _Component.route().catch((e2) => {
                        throw Error(`Unexpected error: ${e2}`);
                      });
                      _ret_ = false;
                    } else {
                      logger.debug("NO ROUTING FOUND FOR: " + routingPath);
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
              logger.debug(`Routes already bound to popstate events for ${_component_.name}`);
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
                this.controller = New(_Controller, {
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
                    logger.debug(`${controllerName} does not have a done() method.`);
                    reject(new Error(`${controllerName} does not have a done() method.`));
                  }
                  if (typeof this.controller.createRoutingController === "function") {
                    this.controller.createRoutingController.call(this.controller);
                  } else {
                    logger.debug(`${controllerName} does not have a createRoutingController() method.`);
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
                  _component_.view = New(_View, {
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
              logger.debug(`Trying to run component helpers for ${_component_.name}...`);
              try {
                _component_.runComponentHelpers();
                logger.debug(`Component helpers for ${_component_.name} executed.`);
              } catch (e) {
                logger.debug(`Component helpers for ${_component_.name} could not be executed.`);
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
            logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
            const _feedComponent_InBrowser = /* @__PURE__ */ __name2(function(_component_2) {
              if (typeof _component_2.container === "undefined" && typeof _component_2.body === "undefined") {
                logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_2.name));
                return;
              }
              const container = typeof _component_2.container === "undefined" || _component_2.container === null ? _component_2.body : _component_2.container;
              const parsedAssignmentText = _component_2.parsedAssignmentText;
              _component_2.innerHTML = parsedAssignmentText;
              if (_component_2.shadowed) {
                logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_2.name));
                logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                const tmp_shadowContainer = _DOMCreateElement("div");
                container.subelements("[slot]").map(
                  (c) => {
                    if (c.parentElement === container) {
                      tmp_shadowContainer.appendChild(c);
                    }
                    return c;
                  }
                );
                logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                const shadowContainer = _DOMCreateElement("div");
                shadowContainer.classList.add("shadowHost");
                try {
                  _component_2.shadowRoot = shadowContainer.attachShadow({
                    mode: "open"
                  });
                } catch (e) {
                  logger.debug(`An error ocurred: ${e}.`);
                  try {
                    logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_2.name));
                    _component_2.shadowRoot = shadowContainer.shadowRoot;
                  } catch (e2) {
                    logger.debug(`An error ocurred: ${e2}.`);
                    logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_2.name));
                  }
                }
                if (typeof _component_2.shadowRoot !== "undefined" && _component_2.shadowRoot !== null) {
                  if (_component_2.reload) {
                    logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                    if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                      shadowContainer.shadowRoot.innerHTML = _component_2.innerHTML;
                    }
                  } else {
                    tmp_shadowContainer.innerHTML = _component_2.parseTemplate(tmp_shadowContainer.innerHTML);
                    logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
                    if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                      shadowContainer.shadowRoot.innerHTML += _component_2.innerHTML;
                    }
                  }
                  logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
                  shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
                  logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_2.name));
                  const qs = container.querySelector(".shadowHost");
                  if (!(typeof qs !== "undefined" && qs !== null)) {
                    container.appendChild(shadowContainer);
                  } else {
                    logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_2.name));
                    if (_component_2.shadowRoot !== null && shadowContainer.shadowRoot !== null) {
                      _component_2.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
                    }
                  }
                } else {
                  logger.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_2.name));
                }
              } else {
                if (_component_2.reload) {
                  logger.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
                  container.innerHTML = _component_2.innerHTML;
                } else if (container && _component_2) {
                  logger.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
                  container.innerHTML += _component_2.innerHTML;
                } else {
                  logger.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_2.name));
                }
              }
            }, "_feedComponent_InBrowser");
            const _feedComponent_InNode = /* @__PURE__ */ __name2(function(_component_2) {
              const parsedAssignmentText = _component_2.parsedAssignmentText;
              _component_2.innerHTML = parsedAssignmentText;
            }, "_feedComponent_InNode");
            let _ret_;
            if (!is_a(_component_, "Component")) {
              logger.warn("Trying to feed a non component object");
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
                    logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                    var standardResponse = {
                      request: void 0,
                      component: _component
                    };
                    _component.__done__().then(function() {
                      if (typeof _component.done === "function") {
                        _component.done.call(_component, standardResponse).catch((e) => {
                          logger.debug(`It was an error while calling done() in ${_component.name}: ${e}`);
                        });
                      }
                      resolve.call(_promise, standardResponse);
                    }, function() {
                      reject.call(_promise, standardResponse);
                    });
                    break;
                  case _component.get("tplsource") === "inline":
                    logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                    (async (_component2) => {
                      await _component2.feedComponent.bind(_component2)();
                    })(_component).catch((e) => {
                      logger.debug(`It was not possible to feed the component ${_component.name}: ${e}`);
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
                    logger.debug(`Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                    reject.call(_promise, `Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                    break;
                  default:
                    logger.debug("Component " + _component.name + " will not be rebuilt because no templateURI is present");
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
                        logger.debug(`Error ${e}`);
                      });
                      return;
                    }).then(function() {
                      if (Object.hasOwn(rc, "subcomponents") && typeof rc.subcomponents !== "undefined" && rc.subcomponents.length > 0) {
                        logger.debug("LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: " + rc.name);
                        return __route__.call(rc, rc.subcomponents);
                      } else {
                        logger.debug("No subcomponents to look for routings in: " + rc.name);
                        if (rc.subtags.length > 0) {
                          rc.subcomponents = rc.__buildSubComponents__(true);
                        }
                        resolve();
                      }
                    }).catch((e) => {
                      logger.debug(`Error: ${e}`);
                    });
                  } else if (typeof rc !== "undefined") {
                    reject(new Error("Component " + rc.name + " is not an instance of Component"));
                  }
                  return;
                });
              });
              return Promise.all(_promises_).then(function() {
                logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
              }).catch(function(err) {
                logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
              });
            }, "__route__");
            if (isValidInstance || !!componentsStack) {
              if (isValidInstance) {
                logger.debug("loading routings for instance " + componentClass.name);
              }
              _route_promise_ = __route__.call(componentClass, isValidInstance ? componentClass.subcomponents : componentsStack);
            } else {
              logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
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
              logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
              const templateHandlerClass = ClassFactory(templateHandlerName);
              const templateInstance = New(templateHandlerClass, {
                component: _self,
                template: value
              });
              templateInstance.component = _self;
              let selfData = _self.data;
              if (Object.hasOwn(_self, "assignRoutingParams") && _self.assignRoutingParams) {
                try {
                  selfData = Object.assign(selfData, _self.routingParams);
                } catch (e) {
                  logger.debug(`An error ocurred: ${e}.`);
                  logger.debug("[parseTemplate] it was not possible to assign the routing params to the template");
                }
              }
              _parsedAssignmentText = templateInstance.assign(selfData);
            } else {
              logger.debug(`[Component][${this.name}][parseTemplate] No value for templateHandler. Using raw content...`);
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
                      "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
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
              this.effect = New(_Effect, {
                component: this
              });
              this.effect?.apply(this.effect?.defaultParams);
            } else {
              logger.debug(`${effectClassName} is ${__getType__(_Effect)} but is not a TransitionEffect`);
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
                        CONFIG.get("scrollIntoHash", {
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
              if (CONFIG.get("use_i18n")) {
                const component = this;
                const _componentRoot = component.componentRoot;
                const lang1 = CONFIG.get("lang", "en");
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
                    logger.debug("i18n loaded for component: " + component.name);
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
                  logger.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
                  _component_helper_();
                  return _component_helper_;
                }
              );
            } else {
            }
          }
        };
        Package("com.qcobjects", [
          Component
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
          let tplextension = typeof CONFIG.get("tplextension") !== "undefined" ? CONFIG.get("tplextension") : "html";
          tplextension = element.getAttribute("tplextension") !== null ? element.getAttribute("tplextension") : tplextension;
          let _componentName = element.getAttribute("name");
          const _componentClassName = element.getAttribute("componentClass") !== null ? element.getAttribute("componentClass") : "Component";
          const __componentClassName = CONFIG.get("preserveComponentBodyTag") ? _componentName !== null ? "com.qcobjects.components." + _componentName + ".ComponentBody" : "com.qcobjects.components.ComponentBody" : _componentClassName;
          _componentName = _componentName !== null ? _componentName : ClassFactory(__componentClassName) && typeof ClassFactory(__componentClassName).name !== "undefined" ? ClassFactory(__componentClassName).name : "";
          const __classDefinition = ClassFactory(__componentClassName);
          const __tplsource_prop_set = !!(__componentClassName !== "Component" && (typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string" && __classDefinition.tplsource !== ""));
          const tplsource = __tplsource_attr_not_set && __tplsource_prop_set ? __classDefinition.tplsource : __tplsource_attr_not_set ? "default" : element.getAttribute("template-source");
          logger.debug(`template source for  ${_componentName} is ${tplsource} `);
          logger.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);
          const componentURI = ComponentURI({
            "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
            "COMPONENT_NAME": _componentName,
            "TPLEXTENSION": tplextension,
            "TPL_SOURCE": tplsource
          });
          if (CONFIG.get("preserveComponentBodyTag")) {
            Package(_componentName !== "" ? "com.qcobjects.components." + _componentName : "com.qcobjects.components", [
              Class("ComponentBody", Component, {
                name: _componentName,
                tplsource,
                tplextension,
                reload: true
              })
            ]);
          }
          const __create_component_instance_ = /* @__PURE__ */ __name2(function() {
            const __shadowed = __shadowed_not_set ? __classDefinition && __classDefinition.shadowed || Component.shadowed : shadowed;
            const __definition = {
              __parent__,
              name: _componentName,
              cached: __cached_not_set ? Component.cached : cached,
              shadowed: __shadowed,
              tplextension,
              body: CONFIG.get("preserveComponentBodyTag") ? _DOMCreateElement("componentBody") : element,
              templateURI: componentURI,
              tplsource
            };
            if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
              delete __definition.name;
            }
            if (componentURI === "") {
              delete __definition.templateURI;
            }
            const newComponent2 = New(__classDefinition, __definition);
            if (CONFIG.get("preserveComponentBodyTag")) {
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
            logger.debug("[_buildComponentsFromElements_] not implemented for Non-Browser environments");
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
    var Service;
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
        Service = class extends InheritClass {
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
        JSONService = class extends Service {
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
            logger.debug("***** RECEIVED RESPONSE:");
            logger.debug(result.service.template);
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
            logger.debug("***** CONFIG LOADED:");
            logger.debug(result.service.template);
            this.JSONresponse = JSON.parse(result.service.template);
            if (Object.hasOwn(this.JSONresponse, "__encoded__")) {
              const decodedValue = _Crypt.decrypt(this.JSONresponse?.__encoded__, _secretKey);
              this.JSONresponse = JSON.parse(decodedValue);
            }
            const jsonResponse = this.JSONresponse;
            Object.keys(jsonResponse).map((k) => {
              CONFIG.set(k, jsonResponse[k]);
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
        Package("com.qcobjects.api", [
          Service
        ]);
        Package("com.qcobjects.api.services", [
          JSONService
        ]);
        Package("com.qcobjects.api.config", [
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
        GlobalSettings = class _GlobalSettings extends InheritClass {
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
                  if ("serviceWorker" in navigator && typeof CONFIG.get("serviceWorkerURI") !== "undefined") {
                    CONFIG.set("serviceWorkerScope", CONFIG.get("serviceWorkerScope") ? CONFIG.get("serviceWorkerScope") : "/");
                    navigator.serviceWorker.register(CONFIG.get("serviceWorkerURI"), {
                      scope: CONFIG.get("serviceWorkerScope")
                    }).then(function(registration) {
                      logger.debug("Service Worker Registered");
                      resolve.call(_promise, registration);
                    }, function(registration) {
                      logger.debug("Error registering Service Worker");
                      reject.call(_promise, registration);
                    });
                    navigator.serviceWorker.ready.then(function(registration) {
                      logger.debug("Service Worker Ready");
                      resolve.call(_promise, registration);
                    }, function(registration) {
                      logger.debug("Error loading Service Worker");
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
                  logger.debug("Starting to building components");
                  try {
                    buildComponentsStack();
                  } catch (e) {
                    throw Error(`Something went wrong trying to start components tree: ${e.message}`);
                  }
                  logger.debug("Initializing the service worker");
                  __load__serviceWorker.call(_top).catch(function(e) {
                    logger.debug(`error loading the service worker ${e}`);
                  });
                }
                resolve();
              });
            }, "_buildComponents");
            return new Promise((resolve) => {
              logger.debug("Starting to load the config settings...");
              if (CONFIG.get("useConfigService", false)) {
                logger.debug("Loading settings using local configuration file...");
                setConfigService(new ConfigService());
                configService.configLoaded = _buildComponents;
                serviceLoader(configService)?.then((standardResponse) => {
                  resolve(standardResponse);
                })?.catch((e) => {
                  throw new Error(`An error ocurred while trying to load ${configService.url}: ${e}`);
                });
              } else {
                logger.debug("Starting to load the components...");
                _buildComponents.call(this).then(() => {
                  resolve({});
                }).catch((e) => {
                  throw new Error(`An error ocurred while trying to build the components stack. ${e}`);
                });
              }
            });
          }
        };
        Package("com.qcobjects", [
          GlobalSettings
        ]);
      }
    });
    var top_exports = {};
    __export(top_exports, {
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
                logger.debug("PackagesList is readonly");
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
                logger.debug("PackagesNameList is readonly");
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
                logger.debug("ClassesList is readonly");
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
                logger.debug("ClassesNameList is readonly");
              },
              get: /* @__PURE__ */ __name2(() => {
                return getClassesNamesList();
              }, "get")
            });
          }
        }, "_define_props");
        if (isBrowser) {
          Class("GLOBAL", _QC_CLASSES.global);
          Export(ClassFactory("GLOBAL"));
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
            logger.debug(`An error ocurred: ${e}.`);
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
                logger.debug(`${componentName}.${valueName} does not have a map property`);
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
    var findPackageNodePath;
    var init_findPackageNodePath = __esm({
      "src/findPackageNodePath.ts"() {
        "use strict";
        init_CONFIG();
        init_Export();
        init_Logger();
        init_platform();
        findPackageNodePath = /* @__PURE__ */ __name2(function(packagename) {
          let sdkPath = null;
          if (!isBrowser) {
            const fs = __require("fs");
            try {
              let sdkPaths = [
                `${CONFIG.get("projectPath")}${CONFIG.get("relativeImportPath")}`,
                `${CONFIG.get("basePath")}${CONFIG.get("relativeImportPath")}`,
                `${CONFIG.get("projectPath")}`,
                `${CONFIG.get("basePath")}`,
                `${CONFIG.get("relativeImportPath")}`,
                `${process.cwd()}${CONFIG.get("relativeImportPath")}`,
                `${process.cwd()}/node_modules/` + packagename,
                `${process.cwd()}/node_modules`,
                `${process.cwd()}`,
                "node_modules",
                "./",
                ""
              ].concat(module.paths);
              sdkPaths = sdkPaths.filter((p) => {
                return fs.existsSync(p + "/" + packagename);
              });
              if (sdkPaths.length > 0) {
                sdkPath = sdkPaths[0];
                logger.info(packagename + " is Installed.");
              } else {
                sdkPath = "";
                logger.info(`${packagename} is not in a standard path.`);
              }
            } catch (e) {
              console.log(e);
            }
          }
          return sdkPath;
        }, "findPackageNodePath");
        Export(findPackageNodePath);
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
            logger.debug(`[Import] Setting external=${external.toString()} resource to import: ${packagename}`);
          }
          if (external) {
            logger.debug(`[Import] Registering external resource to import: ${packagename}`);
          } else {
            logger.debug(`[Import] Registering local resource to import: ${packagename}`);
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
                if (isBrowser && CONFIG.get("removePackageScriptAfterLoading")) {
                  e.target.remove();
                }
                resolve.call(_promise_import_, {
                  "_imported_": e.target,
                  "_package_name_": packagename
                });
              }, "readyImported");
              if (!Object.hasOwn(_QC_PACKAGES, packagename)) {
                const s1 = _DOMCreateElement("script");
                s1.type = CONFIG.get("sourceType", "text/javascript");
                s1.async = !!CONFIG.get("asynchronousImportsLoad");
                s1.onreadystatechange = function() {
                  if (s1.readyState === "complete") {
                    readyImported(s1);
                  }
                };
                s1.onload = readyImported;
                s1.onerror = function(e) {
                  logger.debug(`An error ocurred: ${e}.`);
                  reject.call(_promise_import_, {
                    "_imported_": s1,
                    "_package_name_": packagename
                  });
                };
                s1.src = external ? CONFIG.get("remoteImportsPath") + packagename + ".js" : _basePath_ + CONFIG.get("relativeImportPath") + packagename + ".js";
                document.getElementsByTagName("head")[0].appendChild(s1);
              }
            });
            _promise_import_.catch(function() {
              logger.debug("Import: Error loading a package ");
            });
          } else {
            _promise_import_ = new Promise(function(resolve, reject) {
              try {
                const standardNodePath = findPackageNodePath(packagename);
                let packageAbsoluteName = "";
                if (standardNodePath !== null) {
                  packageAbsoluteName = standardNodePath + "/" + packagename;
                } else {
                  const jsNodePath = findPackageNodePath(packagename + ".js");
                  if (jsNodePath !== null) {
                    packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
                  } else {
                    packageAbsoluteName = _basePath_ + CONFIG.get("relativeImportPath") + packagename;
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
              logger.debug("Something happened when importing " + packagename);
              console.warn(e);
            });
          }
          _promise_import_.catch(function(e) {
            logger.warn(_DataStringify(e));
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
          const packageInstance = Package(namespace) || [];
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
          if (CONFIG.get("delayForReady") > 0) {
            if (isBrowser) {
              setTimeout(_execReady.bind(window), CONFIG.get("delayForReady"));
            } else if (typeof global !== "undefined") {
              setTimeout(_execReady.bind(global), CONFIG.get("delayForReady"));
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
          source = New(ArrayList, []);
          changed(prop, value) {
            logger.debug("VALUE CHANGED");
            logger.debug(prop);
            logger.debug(value);
          }
          push(value) {
            const self2 = this;
            logger.debug("VALUE ADDED");
            logger.debug(value);
            self2.source.push(value);
          }
          pop() {
            const self2 = this;
            logger.debug("VALUE POPPED");
            self2.source.pop();
          }
          _new_(source) {
            const self2 = this;
            let _index = 0;
            self2.source = New(ClassFactory("ArrayList"), source);
            for (const _k in self2.source) {
              if (!isNaN(_k)) {
                logger.debug("binding " + _k.toString());
                (function(_pname) {
                  Object.defineProperty(self2, _pname, {
                    set(value) {
                      logger.debug("setting " + _pname + "=" + value);
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
            const _o = New(ClassFactory("TagElements"));
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
          const _o = New(TagElements);
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
        Package("com.qcobjects", [
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
          const code1 = _Crypt.encrypt((Math.random() * length).toString().replace(".", ""), (/* @__PURE__ */ new Date()).getTime().toString());
          const code2 = _Crypt.encrypt((Math.random() * length).toString().replace(".", ""), new Date((/* @__PURE__ */ new Date()).getTime() - 1e3 * 1e3).getTime().toString());
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
                logger.debug("Ejecuting " + func2.name + " after wait");
              } else {
                if (_w < maxWaitCycles) {
                  _w += 1;
                  logger.debug("WAIT UNTIL " + func2.name + " is true, " + _w.toString() + " cycles");
                } else {
                  logger.debug("Max execution time for " + func2.name + " expression until true");
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
      if (CONFIG.get("useSDK")) {
        (function() {
          const remoteImportsPath = CONFIG.get("remoteImportsPath");
          const external = !CONFIG.get("useLocalSDK");
          CONFIG.set("remoteImportsPath", CONFIG.get("remoteSDKPath"));
          let tryImportingSDK = false;
          let sdkName = "QCObjects-SDK";
          if (isBrowser) {
            tryImportingSDK = true;
          } else {
            const sdkPath = findPackageNodePath("qcobjects-sdk");
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
            logger.info("Importing SDK... " + sdkName);
            if (isNodeCommonJS && typeof __require !== "undefined") {
              const sdk = _require_("qcobjects-sdk");
              if (sdk) {
                logger.debug("QCObjects SDK was loaded OK.");
              } else {
                logger.debug("QCObjects SDK could not be imported.");
              }
            } else {
              Import(sdkName, function() {
                if (external) {
                  logger.debug("QCObjects-SDK.js loaded from remote location");
                } else {
                  logger.debug("QCObjects-SDK.js loaded from local");
                }
                CONFIG.set("remoteImportsPath", remoteImportsPath);
              }, external)?.catch((e) => {
                throw new Error(`An error ocurred when trying to import: ${e}`);
              });
            }
          } else {
            logger.debug("SDK has not been imported as it is not available at the moment");
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
              logger.debug(`An error ocurred: ${e}`);
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
            logger.debugEnabled = false;
            logger.infoEnabled = true;
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
                    logger.debug(`An error ocurred: ${e}`);
                    _appendVDOM(_self, content);
                  }
                } else {
                  _appendVDOM(_self, content);
                }
              }, "QC_Render"), "QC_Render");
            }
            Export(waitUntil);
            Export(_super_);
            Export(ComplexStorageCache);
            Export(ClassFactory);
            Export(_DOMCreateElement);
            Export(shortCode);
            Export(__getType__);
            Export(is_a);
            Package("com.qcobjects", [Processor]);
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
                Component.route().catch((e) => {
                  throw new Error(`An error ocurred when trying to load initial routes. ${e}`);
                });
              });
            }
            Export(serviceLoader);
            Export(componentLoader);
            Export(ComponentURI);
            Export(ObjectName);
            Export(_DataStringify);
            Export(isQCObjects_Class);
            Export(isQCObjects_Object);
            Export(NamespaceRef);
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
              if (!CONFIG.get("useSDK")) {
                GlobalSettings.__start__().catch((e) => {
                  throw Error(e);
                });
              }
            });
            Export(Export);
            Export(Import);
            Export(Package);
            Export(Class);
            Export(New);
            Export(Tag);
            Export(Ready);
            Export(ready);
            Export(isBrowser);
            Export(_methods_);
            Export(GlobalSettings);
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
              if (isBrowser2 && CONFIG.get("secureObjects", false)) {
                Ready(function() {
                  __freeze__();
                });
              } else if (CONFIG.get("secureObjects", false)) {
                __freeze__();
              }
            })(isBrowser);
          }
        }, "__qcobjects__"), "__qcobjects__"))(_top);
      }
    });
    var qcobjects_exports = {};
    __export(qcobjects_exports, {
      ArrayCollection: /* @__PURE__ */ __name(() => ArrayCollection, "ArrayCollection"),
      ArrayList: /* @__PURE__ */ __name(() => ArrayList, "ArrayList"),
      AssignPolyfill: /* @__PURE__ */ __name(() => AssignPolyfill, "AssignPolyfill"),
      BackendMicroservice: /* @__PURE__ */ __name(() => BackendMicroservice, "BackendMicroservice"),
      CONFIG: /* @__PURE__ */ __name(() => CONFIG, "CONFIG"),
      Class: /* @__PURE__ */ __name(() => Class, "Class"),
      ClassFactory: /* @__PURE__ */ __name(() => ClassFactory, "ClassFactory"),
      ComplexStorageCache: /* @__PURE__ */ __name(() => ComplexStorageCache, "ComplexStorageCache"),
      Component: /* @__PURE__ */ __name(() => Component, "Component"),
      ComponentURI: /* @__PURE__ */ __name(() => ComponentURI, "ComponentURI"),
      ConfigService: /* @__PURE__ */ __name(() => ConfigService, "ConfigService"),
      Controller: /* @__PURE__ */ __name(() => Controller, "Controller"),
      DDO: /* @__PURE__ */ __name(() => DDO, "DDO"),
      DefaultTemplateHandler: /* @__PURE__ */ __name(() => DefaultTemplateHandler, "DefaultTemplateHandler"),
      Effect: /* @__PURE__ */ __name(() => Effect, "Effect"),
      Export: /* @__PURE__ */ __name(() => Export, "Export"),
      GlobalSettings: /* @__PURE__ */ __name(() => GlobalSettings, "GlobalSettings"),
      Import: /* @__PURE__ */ __name(() => Import, "Import"),
      InheritClass: /* @__PURE__ */ __name(() => InheritClass, "InheritClass"),
      JSONService: /* @__PURE__ */ __name(() => JSONService, "JSONService"),
      Logger: /* @__PURE__ */ __name(() => Logger, "Logger"),
      NamespaceRef: /* @__PURE__ */ __name(() => NamespaceRef, "NamespaceRef"),
      New: /* @__PURE__ */ __name(() => New, "New"),
      ObjectName: /* @__PURE__ */ __name(() => ObjectName, "ObjectName"),
      Package: /* @__PURE__ */ __name(() => Package, "Package"),
      Processor: /* @__PURE__ */ __name(() => Processor, "Processor"),
      Ready: /* @__PURE__ */ __name(() => Ready, "Ready"),
      RegisterClass: /* @__PURE__ */ __name(() => RegisterClass, "RegisterClass"),
      RegisterWidget: /* @__PURE__ */ __name(() => RegisterWidget, "RegisterWidget"),
      RegisterWidgets: /* @__PURE__ */ __name(() => RegisterWidgets, "RegisterWidgets"),
      Service: /* @__PURE__ */ __name(() => Service, "Service"),
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
      _Crypt: /* @__PURE__ */ __name(() => _Crypt, "_Crypt"),
      _DOMCreateElement: /* @__PURE__ */ __name(() => _DOMCreateElement, "_DOMCreateElement"),
      _DataStringify: /* @__PURE__ */ __name(() => _DataStringify, "_DataStringify"),
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
      findPackageNodePath: /* @__PURE__ */ __name(() => findPackageNodePath, "findPackageNodePath"),
      get: /* @__PURE__ */ __name(() => get, "get"),
      getDocumentLayout: /* @__PURE__ */ __name(() => getDocumentLayout, "getDocumentLayout"),
      global: /* @__PURE__ */ __name(() => _top, "global"),
      isBrowser: /* @__PURE__ */ __name(() => isBrowser, "isBrowser"),
      isNodeCommonJS: /* @__PURE__ */ __name(() => isNodeCommonJS, "isNodeCommonJS"),
      isQCObjects_Class: /* @__PURE__ */ __name(() => isQCObjects_Class, "isQCObjects_Class"),
      isQCObjects_Object: /* @__PURE__ */ __name(() => isQCObjects_Object, "isQCObjects_Object"),
      is_a: /* @__PURE__ */ __name(() => is_a, "is_a"),
      is_phonegap: /* @__PURE__ */ __name(() => is_phonegap, "is_phonegap"),
      logger: /* @__PURE__ */ __name(() => logger, "logger"),
      qcobjects: /* @__PURE__ */ __name(() => qcobjects, "qcobjects"),
      range: /* @__PURE__ */ __name(() => range, "range"),
      ready: /* @__PURE__ */ __name(() => ready, "ready"),
      resetTop: /* @__PURE__ */ __name(() => resetTop, "resetTop"),
      serviceLoader: /* @__PURE__ */ __name(() => serviceLoader, "serviceLoader"),
      set: /* @__PURE__ */ __name(() => set, "set"),
      setDefaultProcessors: /* @__PURE__ */ __name(() => setDefaultProcessors, "setDefaultProcessors"),
      shortCode: /* @__PURE__ */ __name(() => shortCode, "shortCode"),
      subelements: /* @__PURE__ */ __name(() => subelements, "subelements"),
      waitUntil: /* @__PURE__ */ __name(() => waitUntil, "waitUntil")
    });
    module.exports = __toCommonJS(qcobjects_exports);
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
    var BackendMicroservice = class extends InheritClass {
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
        logger.debug("Initializing BackendMicroservice...");
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
          logger.debug("Validating CORS...");
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
            logger.debug("CORS: allow_origins available. Validating origins...");
            if (allow_origins === "*" || typeof microservice.request.headers.origin === "undefined" || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
              logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
              microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
            } else {
              logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
              logger.debug("CORS: Forcing to finish the response...");
              this.body = {};
              try {
                this.done();
              } catch (e) {
                logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
              }
            }
          } else {
            logger.debug("CORS: no allow_origins available. Allowing all origins...");
            logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
            microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
          }
          if (typeof allow_credentials !== "undefined") {
            logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
            microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
          } else {
            logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
            microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
          }
          if (typeof allow_methods !== "undefined") {
            logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
            microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
          } else {
            logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
            microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
          }
          if (typeof allow_headers !== "undefined") {
            logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
            microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
          } else {
            logger.debug("CORS: No allow_headers present. Allowing all headers...");
            microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
          }
        } else {
          logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
        }
      }
      head(formData) {
        logger.debug(`[BackendMicroservice.head] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      get(formData) {
        logger.debug(`[BackendMicroservice.get] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      post(formData) {
        logger.debug(`[BackendMicroservice.post] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      put(formData) {
        logger.debug(`[BackendMicroservice.put] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      delete(formData) {
        logger.debug(`[BackendMicroservice.delete] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      connect(formData) {
        logger.debug(`[BackendMicroservice.connect] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      options(formData) {
        logger.debug(`[BackendMicroservice.options] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      trace(formData) {
        logger.debug(`[BackendMicroservice.trace] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      patch(formData) {
        logger.debug(`[BackendMicroservice.patch] Data received: ${_DataStringify(formData)}`);
        this.done();
      }
      finishWithBody(stream) {
        try {
          logger.debug("[BackendMicroservice.finishWithBody] Ending the stream...");
          logger.debug(`[BackendMicroservice.finishWithBody] type of body is: ${typeof this.body}`);
          if (typeof this.body !== "string") {
            this.body = _DataStringify(this.body);
          }
          logger.debug(`[BackendMicroservice.finishWithBody] 
 body: ${this.body} `);
          stream?.write(this.body);
          stream?.end();
          logger.debug("[BackendMicroservice.finishWithBody] Stream ended.");
        } catch (e) {
          logger.debug(`[BackendMicroservice.finishWithBody] Something went wrong ending the stream: ${e}`);
        }
      }
      done() {
        logger.debug("[BackendMicroservice.done] Finalizing the response...");
        const microservice = this;
        const stream = microservice.stream;
        try {
          logger.debug("[BackendMicroservice.done] Sending response headers...");
          if (microservice.route.responseHeaders) {
            logger.debug(`[BackendMicroservice.done] Response headers present: ${Object.keys(microservice.route.responseHeaders).join(",")}`);
            stream.respond(microservice.route.responseHeaders);
          } else {
            throw Error("[BackendMicroservice.done] No headers present.");
          }
        } catch (e) {
          logger.debug(`[BackendMicroservice.done] Something went wrong sending response headers: ${e}`);
        }
        if (microservice.body !== null) {
          try {
            logger.debug("[BackendMicroservice.done] A body of message is present. Finalizing the response...");
            microservice.finishWithBody.call(microservice, stream);
          } catch (e) {
            logger.debug(`[BackendMicroservice.done] Something went wrong finalizing the response: ${e}`);
          }
        } else {
          logger.debug("[BackendMicroservice.done] No body present. Ending stream...");
          stream.end();
        }
      }
    };
    Package("com.qcobjects.api", [
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
                logger.warn(`${templateInstance.component.name} could not parse processors.`);
                throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
              }
            }
            return k;
          });
        } else {
          logger.debug(`${templateInstance.component.name}.data is not an object`);
        }
        try {
          parsedAssignmentText = GlobalProcessor.processObject.call(processorHandler, parsedAssignmentText, templateInstance.component);
        } catch (e) {
          logger.warn(`${templateInstance.component.name} could not parse processors.`);
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
    var SourceJS = class extends InheritClass {
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
          logger.debug(`An error ocurred: ${e}`);
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
    Package("com.qcobjects", [SourceJS]);
    init_basePath();
    init_Cast();
    init_domain();
    init_DOMCreateElement();
    init_InheritClass();
    init_platform();
    init_Package();
    var SourceCSS = class extends InheritClass {
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
    Package("com.qcobjects", [SourceCSS]);
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
    Export(_ComponentWidget_);
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
    Export(RegisterWidget);
    Export(RegisterWidgets);
    init_CONFIG();
    init_ClassFactory();
    init_getType();
    init_InheritClass();
    init_Logger();
    init_New();
    init_Package();
    init_platform();
    var Controller = class extends InheritClass {
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
            logger.debug(`An error ocurred: ${e}.`);
            logger.debug("No button to assign press event");
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
            component.routingController = New(_Controller2, {
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
    Package("com.qcobjects.controllers", [
      Controller
    ]);
    init_getType();
    init_InheritClass();
    init_Package();
    var View = class extends InheritClass {
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
    Package("com.qcobjects.views", [
      View
    ]);
    init_Service();
    init_InheritClass();
    init_Package();
    var VO = class extends InheritClass {
      static {
        __name(this, "VO");
      }
      static {
        __name2(this, "VO");
      }
    };
    Package("com.qcobjects.valueObjects", [
      VO
    ]);
    init_InheritClass();
    init_Package();
    init_introspection();
    init_ClassFactory();
    var Effect = class extends InheritClass {
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
    Package("com.qcobjects.effects.base", [
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
        logger.info("EXECUTING TransitionEffect  ");
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
    Package("com.qcobjects.effects.transitions.base", [
      TransitionEffect
    ]);
    init_InheritClass();
    init_Package();
    var Timer = class extends InheritClass {
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
    Package("com.qcobjects.timing", [
      Timer
    ]);
    init_tag_filter();
    init_range();
    init_ArrayCollection();
    init_Export();
    init_InheritClass();
    init_Logger();
    init_ObjectName();
    var DDO = class extends InheritClass {
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
            logger.debug("value changed " + name);
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
            logger.debug("returning value " + name);
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
    Export(DDO);
    init_InheritClass();
    init_Logger();
    init_Package();
    var Toggle = class extends InheritClass {
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
            logger.debug("Toggle functions are not declared");
            reject.call(_promise, toggle);
          }
          return toggle;
        }).then(function(toggle2) {
          toggle2.changeToggle();
          return toggle2;
        }).catch(function(e) {
          logger.debug(e.toString());
          return toggle;
        }).finally(() => {
          return toggle;
        });
        return _promise;
      }
    };
    Package("com.qcobjects.tools.essentials", [
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

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    __name(Mime, "Mime");
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports, module) {
    "use strict";
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/mime/types/other.js"(exports, module) {
    "use strict";
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// src/org.quickcorp.qcobjects.main.http.server.ts
var require_org_quickcorp_qcobjects_main_http_server = __commonJS({
  "src/org.quickcorp.qcobjects.main.http.server.ts"() {
    var { findPackageNodePath, Import, Package, InheritClass, CONFIG, logger, New, global: global2, ClassFactory, Export } = require_QCObjects();
    var path = __require("path");
    var absolutePath = path.resolve(__dirname, "./");
    var fs = __require("fs");
    var mime = require_mime();
    var { FileDispatcher } = __require(absolutePath + "/org.quickcorp.qcobjects.main.file.js");
    var { PipeLog } = __require(absolutePath + "/org.qcobjects.common.pipelog.js");
    var ImportMicroservice = /* @__PURE__ */ __name(function(microservicePackage) {
      var _ret_;
      var standardPath = findPackageNodePath(microservicePackage) || findPackageNodePath(microservicePackage + ".js");
      if (standardPath !== null) {
        _ret_ = Import(microservicePackage);
      } else {
        var nonStandardPath = findPackageNodePath(absolutePath + "/backend/" + microservicePackage) || findPackageNodePath(absolutePath + "/backend/" + microservicePackage + ".js");
        if (nonStandardPath !== null) {
          _ret_ = Import(absolutePath + "/backend/" + microservicePackage);
        } else {
          _ret_ = Promise.resolve(__require(microservicePackage));
        }
      }
      return _ret_;
    }, "ImportMicroservice");
    var BackendMicroservice = class extends InheritClass {
      static {
        __name(this, "BackendMicroservice");
      }
      constructor({
        domain = CONFIG.get("domain"),
        basePath = CONFIG.get("basePath"),
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
        logger.debug("Initializing Legacy BackendMicroservice...");
        const microservice = this;
        if (typeof this.body === "undefined") {
          this.body = null;
        }
        if (typeof body !== "undefined") {
          this.body = body;
        }
        this.cors();
        microservice.stream = stream;
        microservice.req.on("data", (data) => {
          var requestMethod2 = request?.method.toLowerCase();
          var supportedMethods2 = {
            "post": microservice.post.bind(this)
          };
          if (Object.hasOwnProperty.call(supportedMethods2, requestMethod2)) {
            supportedMethods2[requestMethod2].call(microservice, data);
          }
        });
        var requestMethod = request.method.toLowerCase();
        var supportedMethods = {
          "get": microservice.get.bind(this),
          "head": microservice.head.bind(this),
          "put": microservice.put.bind(this),
          "delete": microservice.delete.bind(this),
          "connect": microservice.connect.bind(this),
          "options": microservice.options.bind(this),
          "trace": microservice.trace.bind(this),
          "patch": microservice.patch.bind(this)
        };
        if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
          supportedMethods[requestMethod].call(microservice);
        }
      }
      cors() {
        if (this.route.cors) {
          logger.debug("Validating CORS...");
          const {
            allow_origins,
            allow_credentials,
            allow_methods,
            allow_headers
          } = this.route.cors;
          var microservice = this;
          if (typeof microservice.headers !== "object") {
            microservice.headers = {};
          }
          if (typeof microservice.route.responseHeaders !== "object") {
            microservice.route.responseHeaders = {};
          }
          if (typeof allow_origins !== "undefined") {
            logger.debug("CORS: allow_origins available. Validating origins...");
            if (allow_origins === "*" || typeof microservice.request.headers.origin === "undefined" || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
              logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
              microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
            } else {
              logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
              logger.debug("CORS: Forcing to finish the response...");
              this.body = {};
              try {
                this.done();
              } catch (e) {
                logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
              }
            }
          } else {
            logger.debug("CORS: no allow_origins available. Allowing all origins...");
            logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
            microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
          }
          if (typeof allow_credentials !== "undefined") {
            logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
            microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
          } else {
            logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
            microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
          }
          if (typeof allow_methods !== "undefined") {
            logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
            microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
          } else {
            logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
            microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
          }
          if (typeof allow_headers !== "undefined") {
            logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
            microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
          } else {
            logger.debug("CORS: No allow_headers present. Allowing all headers...");
            microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
          }
        } else {
          logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
        }
      }
      head(formData) {
        this.done();
      }
      post(formData) {
        this.done();
      }
      put(formData) {
        this.done();
      }
      delete(formData) {
        this.done();
      }
      connect(formData) {
        this.done();
      }
      options(formData) {
        this.done();
      }
      trace(formData) {
        this.done();
      }
      patch(formData) {
        this.done();
      }
      finishWithBody(stream) {
        try {
          stream.write(JSON.stringify(this.body));
          stream.end();
        } catch (e) {
          logger.debug(`Something wrong writing the response for microservice: ${e}`);
          throw Error(e);
        }
      }
      done() {
        var microservice = this;
        var stream = microservice.stream;
        try {
          stream.writeHead(200, microservice.headers);
        } catch (e) {
          logger.debug(`Something went wront while sending headers in http... ${e}`);
          throw Error(e);
        }
        if (microservice.body != null) {
          microservice.finishWithBody.call(microservice, stream);
        }
      }
    };
    Export(BackendMicroservice);
    var HTTPServerResponse = class extends InheritClass {
      static {
        __name(this, "HTTPServerResponse");
      }
      constructor({
        headers = {
          "status": 200,
          "content-type": "text/html"
        },
        body = "",
        request = null,
        fileDispatcher = null,
        stream = null
      }) {
        super({
          headers,
          body,
          request,
          fileDispatcher,
          stream
        });
        var self2 = this;
        self2.stream = stream;
        self2._generateResponse();
      }
      sendFile(stream, fileName) {
        try {
          console.log("trying to read " + fileName);
          const fd = fs.openSync(fileName, "r");
          const stat = fs.fstatSync(fd);
          const headers = {
            "content-length": stat.size,
            "last-modified": stat.mtime.toUTCString(),
            "content-type": mime.getType(fileName),
            "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
          };
          logger.debug("closing file " + fileName);
          fs.closeSync(fd);
          stream.setHeader("content-length", headers["content-length"]);
          stream.setHeader("last-modified", headers["last-modified"]);
          stream.setHeader("content-type", headers["content-type"]);
          stream.setHeader("cache-control", headers["cache-control"]);
          var readStream = fs.createReadStream(fileName);
          readStream.on("open", function() {
            readStream.pipe(stream);
          });
          readStream.on("end", function() {
            stream.end();
          });
          readStream.on("error", function(err) {
            const headers2 = {
              "status": 500,
              "content-type": mime.getType(fileName)
            };
            stream.setHeader("content-type", headers2["content-type"]);
            stream.setHeader("status", headers2["status"]);
            stream.write(`<h1>500 - INTERNAL SERVER ERROR</h1>
          <p>${err}</p>
        `);
            stream.end(err);
          });
        } catch (e) {
          if (e.errno == -2) {
            const headers = {
              "status": 404,
              "content-type": mime.getType(fileName)
            };
            stream.setHeader("content-type", headers["content-type"]);
            stream.setHeader("status", headers["status"]);
            stream.write("<h1>404 - FILE NOT FOUND</h1>");
            stream.on("close", () => {
              logger.debug("closing file " + fileName);
            });
            stream.end();
          }
        }
      }
      _generateResponse() {
        var response = this;
        response.fileDispatcher = New(FileDispatcher, {
          scriptname: response.request.scriptname,
          pathname: response.request.pathname,
          done(headers, body, templateURI, isTemplate) {
            response.headers = headers;
            var stream = response.stream;
            if (isTemplate) {
              response.body = body;
              Object.keys(headers).map((header) => stream.setHeader(header, headers[header]));
              stream.write(response.body);
              stream.end();
            } else if (headers["status"] == 200 || headers[":status"] == 200) {
              response.sendFile(stream, templateURI);
            } else {
              Object.keys(headers).map((header) => stream.setHeader(header, headers[header]));
              stream.end();
            }
          }
        });
      }
    };
    var HTTPServerRequest = class extends InheritClass {
      static {
        __name(this, "HTTPServerRequest");
      }
      constructor({
        scriptname = "",
        path: path2 = "",
        method = "",
        url = "",
        headers = null,
        flags = null,
        protocol = null,
        slashes = null,
        auth = null,
        host = null,
        port = null,
        hostname = null,
        hash = null,
        search = "",
        query = "",
        pathname = "",
        href = ""
      }) {
        super(...arguments);
      }
    };
    var HTTPServer = class extends InheritClass {
      static {
        __name(this, "HTTPServer");
      }
      constructor({
        request = null,
        response = "",
        server = null,
        scriptname = "",
        interceptorInstances = []
      }) {
        super(...arguments);
        const welcometo = "Welcome to \n";
        const instructions = "QCObjects Legacy HTTPServer \n";
        const logo = ` .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r
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
        console.log(welcometo);
        console.log(logo);
        console.log(instructions);
        logger.debug(this.showIPAddress());
        logger.info("Listening on HTTP PORT: " + CONFIG.get("serverPortHTTP").toString());
        logger.info("Go to: \n" + this.showPossibleURL());
        this.interceptorInstances = interceptorInstances;
        const http = __require("http");
        this.server = http.createServer((req, res) => {
          logger.debug("Legacy Server Instantiated.");
        });
        this.server.on("error", (err) => console.error(err));
        if (global2.get("backendAvailable")) {
          logger.info("Loading backend interceptors...");
          let interceptors = CONFIG.get("backend", {}).interceptors;
          if (typeof interceptors !== "undefined") {
            logger.info("Backend Interceptors Available");
            interceptors.map((interceptor) => {
              ImportMicroservice(interceptor.microservice);
              var interceptorClassFactory = ClassFactory(interceptor.microservice + ".Interceptor");
              var interceptorInstance = New(interceptorClassFactory, {
                domain: CONFIG.get("domain"),
                basePath: CONFIG.get("basePath"),
                projectPath: CONFIG.get("projectPath"),
                interceptor,
                server: this.server
              });
              this.interceptorInstances.push(interceptorInstance);
            });
          }
        }
        this.server.on("request", (req, res) => {
          let request2 = Object.assign(New(HTTPServerRequest), __require("url").parse(req.url));
          request2.headers = req.headers;
          this.request = request2;
          this.request.method = req.method;
          this.request.path = req.url;
          this.server.setMaxListeners(9999999999);
          CONFIG.set("backendTimeout", CONFIG.get("backendTimeout") || 2e4);
          var timeoutHandler = /* @__PURE__ */ __name(() => {
            try {
              if (!res.destroyed) {
                logger.info("A timeout occurred..." + CONFIG.get("backendTimeout").toString());
                logger.info("Killing session...");
                res.writeHeader(500, {
                  "content-type": "text/html"
                });
                res.on("error", () => {
                });
                res.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
                res.end();
              } else {
                logger.debug("Session was normally finishing...");
              }
            } catch (e) {
              logger.debug(`An unhandled error occurred during timeout catching: ${e}`);
            }
            this.server.removeListener("timeout", timeoutHandler);
          }, "timeoutHandler");
          if (!res.destroyed) {
            this.server.setTimeout(CONFIG.get("backendTimeout"), timeoutHandler);
          }
          if (this.request.pathname.indexOf(".") < 0) {
            this.request.scriptname = CONFIG.get("documentRootFileIndex");
          } else {
            this.request.scriptname = this.request.pathname.split("/").reverse()[0];
          }
          this.request.pathname = this.request.pathname.substr(0, this.request.pathname.lastIndexOf("/"));
          logger.debug(new PipeLog().pipe(this.request));
          if (global2.get("backendAvailable")) {
            logger.info("Backend Legacy Microservices Available...");
            logger.info("Loading backend routes...");
            let routes = CONFIG.get("backend", {}).routes;
            let selectedRoute = routes.filter((route) => {
              let standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
              return new RegExp(standardRoutePath, "g").test(request2.path);
            });
            if (selectedRoute.length > 0) {
              selectedRoute.map((route) => {
                let standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
                console.log(standardRoutePath);
                let selectedRouteParams = {
                  ...[...request2.path.matchAll(new RegExp(standardRoutePath, "g"))][0]["groups"]
                };
                ImportMicroservice(route.microservice).then(() => {
                  logger.debug(`Trying to execute ${route.microservice + ".Microservice"}...`);
                  var microServiceClassFactory = ClassFactory(route.microservice + ".Microservice");
                  if (typeof microServiceClassFactory !== "undefined") {
                    const server2 = this.server;
                    this.response = New(microServiceClassFactory, {
                      domain: CONFIG.get("domain"),
                      basePath: CONFIG.get("basePath"),
                      projectPath: CONFIG.get("projectPath"),
                      route,
                      routeParams: selectedRouteParams,
                      server: server2,
                      stream: res,
                      req,
                      request: request2
                    });
                  } else {
                    throw Error(`${route.microservice + ".Microservice"} not defined.`);
                  }
                }).catch((e) => {
                  throw Error(e);
                });
              });
            } else {
              this.response = New(HTTPServerResponse, {
                domain: CONFIG.get("domain"),
                basePath: CONFIG.get("basePath"),
                projectPath: CONFIG.get("projectPath"),
                server: this.server,
                stream: res,
                req,
                request: this.request
              });
            }
          } else {
            this.response = New(HTTPServerResponse, {
              server: this.server,
              stream: res,
              req,
              request: this.request
            });
          }
        });
      }
      showIPAddress() {
        var _ret_ = "";
        var os = __require("os");
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function(iface) {
          ifaces[iface].map(function(ipGroup) {
            _ret_ += iface + ": " + new PipeLog().pipe(ipGroup) + "\n";
          });
        });
        return _ret_;
      }
      showPossibleURL() {
        var _ret_ = "";
        var os = __require("os");
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function(iface) {
          ifaces[iface].map(function(ipGroup) {
            if (ipGroup["family"].toLowerCase() == "ipv4") {
              _ret_ += "http://" + ipGroup["address"] + ":" + CONFIG.get("serverPortHTTP").toString() + "/\n";
            }
          });
        });
        return _ret_;
      }
      start() {
        var server = this.server;
        server.listen(process.env.PORT || CONFIG.get("serverPortHTTP"));
      }
    };
    Package("org.quickcorp.qcobjects.main.http.server", [
      BackendMicroservice,
      HTTPServer,
      HTTPServerRequest,
      HTTPServerResponse
    ]);
  }
});
export default require_org_quickcorp_qcobjects_main_http_server();
//# sourceMappingURL=org.quickcorp.qcobjects.main.http.server.mjs.map
