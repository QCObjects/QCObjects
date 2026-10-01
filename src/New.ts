/**
     * Creates an object from a Class definition
     *
     * Canonical precedence, from highest to lowest:
     *   1. attribute tag values
     *   2. instance property values passed to the constructor
     *   3. inherited class property declaration values
     *   4. base class instance constructor values
     *   5. base class property declaration values
     *   6. __definition, the mirror of the class declaration values
     *   7. the static __definition object, mirroring the static declarations
     *
     * Native class field initializers (rules 3-5) are emitted by the compiler
     * inside the constructor, right after super() returns, so they always land
     * *after* the definition has been handed to the constructor. Rules 1-2 are
     * therefore re-applied here, once the whole prototype chain has settled, so
     * that tag and constructor values can never be clobbered by a field
     * initializer. This keeps the ordering correct for every subclass, including
     * third party ones, without having to strip their field initializers.
     *
     * @param {QC_Object} o
     * @param {Object} args
     */
    export const New = function (__class__:any, args:any = {}):any {
        args = (arguments.length > 1) ? (args) : ({});
        if (typeof __class__ === "undefined") {
          return (new Object());
        }
        const __instance__ = new __class__(args);

        if (typeof args === "object" && args !== null) {
          Object.keys(args)
            .filter((__key__:string):boolean => {
              return isNaN(__key__ as any) && !["__instanceID", "__classType", "__definition"].includes(__key__);
            })
            .forEach((__key__:string):void => {
              if (typeof args[__key__] === "function") {
                (__instance__ as any)[__key__] = args[__key__].bind(__instance__);
              } else {
                (__instance__ as any)[__key__] = args[__key__];
              }
            });
        }

        /* rule 6: __definition mirrors the class declaration values */
        const __classDefinition__ = (typeof (__class__ as any).__definition === "object" && (__class__ as any).__definition !== null)
          ? (__class__ as any).__definition
          : {};
        (__instance__ as any).__definition = Object.assign({}, __classDefinition__);
        if (typeof (__instance__ as any).__classType === "string" && (__instance__ as any).__classType !== "") {
          (__instance__ as any).__definition.__classType = (__instance__ as any).__classType;
        }

        return __instance__;
      };
      
      New.prototype.toString = function () {
        return "New(QCObjectsClassName, args) { [QCObjects native code] }";
      };