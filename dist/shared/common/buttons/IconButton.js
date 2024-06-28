"use strict";
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

// components/shared/common/buttons/IconButton.tsx
var IconButton_exports = {};
__export(IconButton_exports, {
  default: () => IconButton_default
});
module.exports = __toCommonJS(IconButton_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/buttons/IconButton.tsx
var import_clsx = __toESM(require("clsx"));
var import_tailwind_merge = require("tailwind-merge");
var IconButton = ({
  as: Cmp = "button",
  children,
  color = "primary",
  variant = "flat",
  rounded,
  className,
  ...rest
}) => {
  return /* @__PURE__ */ import_react.default.createElement(
    Cmp,
    {
      ...rest,
      className: (0, import_tailwind_merge.twMerge)(
        (0, import_clsx.default)("leading-none flex items-center justify-center w-min h-min p-4 ", {
          "rounded-full": rounded,
          rounded: !rounded,
          "bg-button-primary fill-button-fill-primary": color === "primary",
          "bg-button-secondary fill-button-fill-secondary": color === "secondary",
          "bg-transparent fill-button-fill-primary": color === "transparent",
          "p-[11px]": variant === "flat",
          "border border-button-primary fill-button-fill-primary bg-transparent  ": variant === "outline",
          "border border-button-secondary fill-button-fill-secondary  bg-transparent": variant === "outline-secondary",
          "shadow-button border border-gray100 p-2.5": variant === "shadow"
        }),
        className
      )
    },
    children
  );
};
var IconButton_default = IconButton;
//# sourceMappingURL=IconButton.js.map