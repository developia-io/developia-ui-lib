"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// components/shared/common/inputs/TextArea.tsx
var TextArea_exports = {};
__export(TextArea_exports, {
  default: () => TextArea_default
});
module.exports = __toCommonJS(TextArea_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/inputs/TextArea.tsx
var import_tailwind_merge = require("tailwind-merge");
var TextArea = ({ className, optional, ...rest }) => {
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(
    "textarea",
    {
      ...rest,
      className: (0, import_tailwind_merge.twMerge)(
        "w-full bg-white border border-gray100 rounded-lg h-28 p-5 text-base text-gray600 font-medium placeholder:text-sm placeholder:font-light placeholder:gray600",
        className
      )
    }
  ), optional ? /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-gray300 absolute right-5 top-1/2 -translate-y-1/2" }, "optional") : null);
};
var TextArea_default = TextArea;
//# sourceMappingURL=TextArea.js.map