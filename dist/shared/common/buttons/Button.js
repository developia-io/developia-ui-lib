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

// components/shared/common/buttons/Button.tsx
var Button_exports = {};
__export(Button_exports, {
  default: () => Button_default
});
module.exports = __toCommonJS(Button_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/buttons/Button.tsx
var import_clsx = __toESM(require("clsx"));
var import_image = __toESM(require("next/image"));
var import_tailwind_merge = require("tailwind-merge");
var Button = ({
  as: Cmp = "button",
  children,
  variant = "primary",
  color = "primary",
  className,
  disabled,
  loading,
  prevIcon,
  nextIcon,
  ...rest
}) => {
  return /* @__PURE__ */ import_react.default.createElement(
    Cmp,
    {
      ...rest,
      className: (0, import_tailwind_merge.twMerge)(
        "h-10 flex items-center gap-1.5 text-center justify-center transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-button-primary focus:ring-opacity-50",
        (0, import_clsx.default)("py-[11px] px-6 rounded font-semibold leading-none", {
          ...variant === "primary" ? {
            "bg-button-primary text-button-text-primary": color === "primary",
            "bg-button-secondary text-button-secondary": color === "secondary"
          } : null,
          ...variant === "secondary" ? {
            border: true,
            "border-button-primary text-button-text-primary": color === "primary",
            "border-button-secondary text-button-secondary": color === "secondary"
          } : null,
          ...variant === "text" ? {
            "text-button-text-primary": color === "primary",
            "text-button-text-secondary": color === "secondary"
          } : null,
          ...variant === "outlined" ? {
            "border border-solid border-button-primary": true,
            "text-button-text-primary": color === "primary",
            "text-button-text-secondary": color === "secondary"
          } : null,
          ...variant === "link" ? {
            "p-0 m-0 underline h-auto w-auto": true,
            "text-button-text-primary": color === "primary",
            "text-button-text-secondary": color === "secondary"
          } : null,
          ...disabled ? {
            "opacity-50 cursor-not-allowed text-white pointer-events-none": true
          } : null,
          ...loading ? {
            "pointer-events-none opacity-80 justify-center": true
          } : null
        }),
        className
      )
    },
    prevIcon && /* @__PURE__ */ import_react.default.createElement(
      import_image.default,
      {
        width: prevIcon.width,
        height: prevIcon.height,
        src: prevIcon.src,
        alt: prevIcon.alt,
        className: "w-4 h-4"
      }
    ),
    children,
    nextIcon && /* @__PURE__ */ import_react.default.createElement(
      import_image.default,
      {
        width: nextIcon.width,
        height: nextIcon.height,
        src: nextIcon.src,
        alt: nextIcon.alt,
        className: "w-4 h-4"
      }
    )
  );
};
var Button_default = Button;
//# sourceMappingURL=Button.js.map