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
    module2.exports = "../../../vercel-HSHO7TTP.svg";
  }
});

// public/next.svg
var require_next = __commonJS({
  "public/next.svg"(exports2, module2) {
    module2.exports = "../../../next-HOXZBJQP.svg";
  }
});

// public/IconCheck.svg
var require_IconCheck = __commonJS({
  "public/IconCheck.svg"(exports2, module2) {
    module2.exports = "../../../IconCheck-MKFTAVLL.svg";
  }
});

// public/IconAngleLeft.svg
var require_IconAngleLeft = __commonJS({
  "public/IconAngleLeft.svg"(exports2, module2) {
    module2.exports = "../../../IconAngleLeft-Y5JBCL46.svg";
  }
});

// public/IconAngleRight.svg
var require_IconAngleRight = __commonJS({
  "public/IconAngleRight.svg"(exports2, module2) {
    module2.exports = "../../../IconAngleRight-G4J6PJZH.svg";
  }
});

// components/shared/common/buttons/RadioButton.tsx
var RadioButton_exports = {};
__export(RadioButton_exports, {
  default: () => RadioButton_default
});
module.exports = __toCommonJS(RadioButton_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/buttons/RadioButton.tsx
var import_react2 = require("react");
var import_clsx = __toESM(require("clsx"));
var import_tailwind_merge = require("tailwind-merge");

// components/icons.tsx
var IconTest = require_vercel().default;
var IconTest2 = require_next().default;
var IconsCheck = require_IconCheck().default;
var IconAngleLeft = require_IconAngleLeft().default;
var IconAngleRight = require_IconAngleRight().default;

// components/shared/common/buttons/RadioButton.tsx
var Radio = ({ label, checked, value, onChange, name, className, routes = false }, ref) => {
  return /* @__PURE__ */ import_react.default.createElement(
    "label",
    {
      className: (0, import_tailwind_merge.twMerge)(
        "flex items-center gap-2 tracking-[0.32px] font-semibold cursor-pointer",
        className
      )
    },
    /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        className: (0, import_clsx.default)(
          "inline-flex w-6 h-6 border-[6px] flex-shrink-0 rounded-full text-white items-center justify-center",
          {
            "bg-gray-100 border-gray100": !checked,
            "border-button-primary bg-button-text-primary": checked,
            "!border-[0px] !bg-white": routes && !checked,
            "!bg-button-primary": routes && checked
          }
        )
      },
      !routes && checked ? /* @__PURE__ */ import_react.default.createElement(IconsCheck, { width: 18, height: 18 }) : null,
      routes && checked ? /* @__PURE__ */ import_react.default.createElement("span", { className: "!text-white" }, /* @__PURE__ */ import_react.default.createElement(IconsCheck, { width: 18, height: 18 })) : null
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        ref,
        type: "radio",
        className: "fixed top-0 left-0 opacity-0 invisible",
        name,
        value,
        checked,
        onChange
      }
    ),
    label
  );
};
var RadioButton_default = (0, import_react2.forwardRef)(Radio);
//# sourceMappingURL=RadioButton.js.map