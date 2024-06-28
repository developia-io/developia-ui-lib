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

// components/shared/common/layout/Section.tsx
var Section_exports = {};
__export(Section_exports, {
  default: () => Section_default
});
module.exports = __toCommonJS(Section_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/layout/Section.tsx
var import_react3 = __toESM(require("react"));
var import_tailwind_merge = require("tailwind-merge");

// components/shared/common/layout/Grid.tsx
var import_react2 = __toESM(require("react"));
var Container = ({ className }) => {
  return /* @__PURE__ */ import_react2.default.createElement("div", null);
};

// components/shared/common/layout/Section.tsx
var Section = ({ className, children }) => {
  return /* @__PURE__ */ import_react3.default.createElement(Container, { className: (0, import_tailwind_merge.twMerge)("py-6 lg:py-7", className) }, children);
};
var Section_default = Section;
//# sourceMappingURL=Section.js.map