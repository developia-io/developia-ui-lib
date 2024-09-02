import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { ButtonGroupProps } from "./ButtonGroup";

const RadioButtonGroup = ({
  buttons = ["Option 1", "Option 2"],
  orientation = "horizontal",
  className,
  colorvariant = "custom",
  customTextColor,
  ...rest
}: ButtonGroupProps) => {
  const textColorStyle = (() => {
    switch (colorvariant) {
      case "primary":
        return { color: "black" };
      case "secondary":
        return { color: "white" };
      case "custom":
        return customTextColor ? { color: customTextColor } : {}; // custom için özelleştirilmiş renk
      default:
        return {};
    }
  })();

  return (
    <div
      {...rest}
      className={twMerge(
        "flex",
        clsx({
          "flex-row space-x-2": orientation === "horizontal",
          "flex-col items-start space-y-2": orientation === "vertical",
        }),
        className
      )}
    >
      {buttons.map((text, index) => (
        <label key={index} className="flex items-center cursor-pointer">
          <input type="radio" name="radio-group" className="mr-2" />
          <span style={textColorStyle}>{text}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
