import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { IImage } from "@/components/interface";

export type ButtonGroupProps = React.HTMLProps<HTMLDivElement> & {
  as?: React.ElementType;
  buttons?: string[]; 
  orientation?: "horizontal" | "vertical";
  spacing?: string;
  variant?: "filled" | "text" | "outlined" | "link";
  colorvariant?: "primary" | "secondary" | "custom";
  prevIcon?: IImage;
  nextIcon?: IImage;
  customBgColor?: string;
  customBorderColor?: string;
  customTextColor?: string;
  radius?: "rounded" | "square";
};

const ButtonGroup = ({
  as: Cmp = "div", 
  buttons = ["Button", "Button"], 
  orientation = "horizontal",
  spacing = "space-x-*", 
  variant = "outlined",
  colorvariant = "primary",
  customBgColor,
  customBorderColor,
  customTextColor,
  radius = "square",
  className,
  ...rest
}: ButtonGroupProps) => {

  const computedSpacing = orientation === "horizontal" ? spacing : spacing.replace("x-", "y-");

  return (
    <Cmp
      {...rest}
      className={twMerge(
        "flex",
        clsx({
          "flex-row": orientation === "horizontal",
          "flex-col items-start": orientation === "vertical",
          [computedSpacing]: true,
        }),
        className
      )}
    >
      {buttons.map((text, index) => (
        <button
          key={index}
          className={twMerge(
            "h-10 px-6 py-2 my-2 border-[1.5px] flex items-center justify-center transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2",
            clsx("py-[11px] px-6 rounded font-semibold leading-none", {
              // Variant-specific styles
              "bg-primary_80 text-helper_White border-primary_80": variant === "filled" && colorvariant === "primary",
              "bg-secondary_70 text-neutral_20 border-secondary_70": variant === "filled" && colorvariant === "secondary",
              "bg-custom text-neutral_20 border-radius rounded py-1 px-3": variant === "filled" && colorvariant === "custom" && customBgColor,
              
              "border-primary_80 text-neutral_70": variant === "outlined" && colorvariant === "primary",
              "border-secondary_80 text-neutral_70": variant === "outlined" && colorvariant === "secondary",
              "border-custom text-neutral_70": variant === "outlined" && colorvariant === "custom" && customBorderColor,
              
              "text-neutral_50": variant === "text" && colorvariant === "primary",
              "text-secondary_30": variant === "text" && colorvariant === "secondary",
              "text-custom": variant === "text" && colorvariant === "custom" && customTextColor,


              "p-0 m-0 underline h-auto w-auto px-4": variant === "link",
              "text-primary_70": variant === "link" && colorvariant === "primary",
              "text-secondary_60": variant === "link" && colorvariant === "secondary",

              "rounded-lg": radius === "rounded",
              "rounded-none": radius === "square",
            })
          )}
        >
          {text}
        </button>
      ))}
    </Cmp>
  );
};

export default ButtonGroup;
