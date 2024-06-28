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

// components/shared/common/inputs/Input.tsx
var Input_exports = {};
__export(Input_exports, {
  default: () => Input_default
});
module.exports = __toCommonJS(Input_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/inputs/Input.tsx
var import_react2 = require("react");
var import_clsx = __toESM(require("clsx"));
var import_tailwind_merge = require("tailwind-merge");
var Input = ({
  type = "text",
  className,
  containerClassName,
  optional,
  error,
  shrink = true,
  value,
  placeholder,
  label,
  required,
  clearable,
  onChange,
  ...rest
}, ref) => {
  return /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_tailwind_merge.twMerge)("relative group", containerClassName) }, /* @__PURE__ */ import_react.default.createElement("label", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(
    "span",
    {
      className: (0, import_clsx.default)(
        "block absolute text-gray-400 left-6 top-1/2 -translate-y-1/2 pointer-events-none transition-all text-sm font-light text-gray600",
        // focus state
        {
          "group-focus-within:text-xs group-focus-within:-translate-x-3 group-focus-within:-translate-y-8 group-focus-within:bg-white group-focus-within:px-2": shrink,
          "text-xs  -translate-x-3 -translate-y-8 bg-transparent px-2": value || !shrink
        }
      )
    },
    placeholder,
    required && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-red-600" }, "*")
  ), /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      ...rest,
      type,
      onChange,
      ref,
      required,
      value,
      autoCapitalize: "off",
      autoComplete: "off",
      className: (0, import_tailwind_merge.twMerge)(
        (0, import_clsx.default)(
          "w-full bg-white border rounded-lg h-14 p-5 text-base text-gray600 font-medium",
          {
            "border-red600": error,
            "border-gray100": !error,
            "pr-7": clearable
          }
        ),
        className
      )
    }
  ), optional ? /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-gray300 absolute right-5 top-1/2 -translate-y-1/2" }, "optional") : null), error ? /* @__PURE__ */ import_react.default.createElement("div", { className: "text-red600 text-xs mt-1" }, error) : null);
};
var Input_default = (0, import_react2.forwardRef)(Input);
//# sourceMappingURL=Input.js.map