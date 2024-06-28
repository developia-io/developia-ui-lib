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
    module2.exports = "../../vercel-HSHO7TTP.svg";
  }
});

// public/next.svg
var require_next = __commonJS({
  "public/next.svg"(exports2, module2) {
    module2.exports = "../../next-HOXZBJQP.svg";
  }
});

// public/IconCheck.svg
var require_IconCheck = __commonJS({
  "public/IconCheck.svg"(exports2, module2) {
    module2.exports = "../../IconCheck-MKFTAVLL.svg";
  }
});

// public/IconAngleLeft.svg
var require_IconAngleLeft = __commonJS({
  "public/IconAngleLeft.svg"(exports2, module2) {
    module2.exports = "../../IconAngleLeft-Y5JBCL46.svg";
  }
});

// public/IconAngleRight.svg
var require_IconAngleRight = __commonJS({
  "public/IconAngleRight.svg"(exports2, module2) {
    module2.exports = "../../IconAngleRight-G4J6PJZH.svg";
  }
});

// components/shared/common/Pagination.tsx
var Pagination_exports = {};
__export(Pagination_exports, {
  default: () => Pagination_default
});
module.exports = __toCommonJS(Pagination_exports);

// react.import.js
var import_react = __toESM(require("react"));

// components/shared/common/Pagination.tsx
var import_react3 = require("react");
var import_clsx2 = __toESM(require("clsx"));
var import_tailwind_merge2 = require("tailwind-merge");

// hooks/usePagination.ts
var import_react2 = require("react");
var DOTS = "...";
var range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
var usePagination = ({
  rowsPerPage,
  rowCount,
  currentPage
}) => {
  const siblingCount = 1;
  const paginationRange = (0, import_react2.useMemo)(() => {
    const totalPageCount = Math.ceil(rowCount / rowsPerPage);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [rowCount, rowsPerPage, siblingCount, currentPage]);
  return paginationRange ?? [];
};

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

// components/icons.tsx
var IconTest = require_vercel().default;
var IconTest2 = require_next().default;
var IconsCheck = require_IconCheck().default;
var IconAngleLeft = require_IconAngleLeft().default;
var IconAngleRight = require_IconAngleRight().default;

// components/shared/common/Pagination.tsx
var Pagination = (props) => {
  const { rowCount, onChangePage, className, currentPage } = props;
  const paginationRange = usePagination(props);
  const handlePrevious = (0, import_react3.useCallback)(
    () => onChangePage(Number(currentPage) - 1, rowCount),
    [currentPage, onChangePage, rowCount]
  );
  const handleNext = (0, import_react3.useCallback)(
    () => onChangePage(Number(currentPage) + 1, rowCount),
    [currentPage, onChangePage, rowCount]
  );
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_tailwind_merge2.twMerge)(
        "flex items-center gap-4 justify-center pb-6 lg:mb-0",
        className
      )
    },
    /* @__PURE__ */ import_react.default.createElement(
      IconButton_default,
      {
        variant: "outline",
        disabled: currentPage === 1,
        className: "text-blue800 p-0",
        onClick: handlePrevious
      },
      /* @__PURE__ */ import_react.default.createElement(IconAngleLeft, { width: 18, height: 18 })
    ),
    paginationRange.map(
      (item, index) => item === DOTS ? /* @__PURE__ */ import_react.default.createElement("span", { key: index, className: "font-semibold text-blue800" }, DOTS) : /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          key: index,
          onClick: () => onChangePage(Number(item), rowCount),
          className: (0, import_clsx2.default)(
            "rounded-2xl w-8 h-8 font-semibold text-blue800 hover:bg-blue800 hover:text-white",
            {
              "bg-blue800 text-white": currentPage === item
            }
          )
        },
        item
      )
    ),
    /* @__PURE__ */ import_react.default.createElement(
      IconButton_default,
      {
        variant: "outline",
        disabled: currentPage === rowCount,
        className: "text-blue800 p-0",
        onClick: handleNext
      },
      /* @__PURE__ */ import_react.default.createElement(IconAngleRight, { width: 18, height: 18 })
    )
  );
};
var Pagination_default = Pagination;
//# sourceMappingURL=Pagination.js.map