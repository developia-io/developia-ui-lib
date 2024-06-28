"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// public/vercel.svg
var require_vercel = __commonJS({
  "public/vercel.svg"(exports2, module2) {
    module2.exports = "./vercel-HSHO7TTP.svg";
  }
});

// public/next.svg
var require_next = __commonJS({
  "public/next.svg"(exports2, module2) {
    module2.exports = "./next-HOXZBJQP.svg";
  }
});

// public/IconCheck.svg
var require_IconCheck = __commonJS({
  "public/IconCheck.svg"(exports2, module2) {
    module2.exports = "./IconCheck-MKFTAVLL.svg";
  }
});

// public/IconAngleLeft.svg
var require_IconAngleLeft = __commonJS({
  "public/IconAngleLeft.svg"(exports2, module2) {
    module2.exports = "./IconAngleLeft-Y5JBCL46.svg";
  }
});

// public/IconAngleRight.svg
var require_IconAngleRight = __commonJS({
  "public/IconAngleRight.svg"(exports2, module2) {
    module2.exports = "./IconAngleRight-G4J6PJZH.svg";
  }
});

// components/icons.tsx
var icons_exports = {};
__export(icons_exports, {
  IconAngleLeft: () => IconAngleLeft,
  IconAngleRight: () => IconAngleRight,
  IconTest: () => IconTest,
  IconTest2: () => IconTest2,
  IconsCheck: () => IconsCheck
});
module.exports = __toCommonJS(icons_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/icons.tsx
var IconTest = require_vercel().default;
var IconTest2 = require_next().default;
var IconsCheck = require_IconCheck().default;
var IconAngleLeft = require_IconAngleLeft().default;
var IconAngleRight = require_IconAngleRight().default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IconAngleLeft,
  IconAngleRight,
  IconTest,
  IconTest2,
  IconsCheck
});
//# sourceMappingURL=icons.js.map