import { isBrowser } from "./platform";

export var _basePath_:string = (
    function ():string {
      let _basePath:string = "";
      if (isBrowser) {
        const baseURI:string[] = document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
      } else {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const nodeProcess = require("node:process");
          if (typeof nodeProcess !== "undefined") {
            _basePath = `${(nodeProcess).cwd()}/`;
          } else {
            _basePath = "";
          }
        } catch {
          _basePath = "";
        }
      }
      return _basePath;
    }
  )();

export const setBasePath = (value:string):void => { _basePath_ = value;};