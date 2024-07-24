import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type CardProps = {
  title?: string;
  imageSrc?: string;
  paragraph?: string;
  variant?: "outlined" | "filled";
  radius?: "rounded" | "square";
  customClass?: string;
  color?: "primary" | "secondary" | "transparent" | "custom";
  customBorderColor?: string;
  customBgColor?: string;
  customTextColor?: string;
  children?: React.ReactNode;
};

const Card = ({
  children,
  title,
  imageSrc,
  paragraph,
  variant = "outlined",
  radius = "rounded",
  customClass,
  color = "transparent",
  customBorderColor,
  customBgColor,
  customTextColor,
}: CardProps) => {
  // Generate classes using clsx
  const baseClasses = clsx(
    "p-4 shadow-md w-auto flex flex-col gap-4",
    {
      // Variants
      "border border-gray-300 bg-transparent": variant === "outlined",
      "bg-primary-_100 text-neutral-100": variant === "filled",

      // Radius
      "rounded-lg": radius === "rounded",
      "rounded-none": radius === "square",

      // Colors
      "bg-primary_100 text-neutral_100 border-primary_100": color === "primary",
      "bg-secondary_100 text-neutral_100 border-secondary_100":
        color === "secondary",
      "bg-transparent border-transparent text-neutral_100":
        color === "transparent",
    },
    customBorderColor && `border ${customBorderColor}`, // Custom border color
    customBgColor && customBgColor, // Custom background color

    customClass // Custom classes
  );

  // Merge classes with twMerge to handle potential conflicts
  const cardClasses = twMerge(baseClasses);

  return (
    <div className={cardClasses}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Card image"
          className={clsx("object-cover w-full h-auto mb-4", {
            "rounded-lg": radius === "rounded",
            "rounded-none": radius === "square",
          })}
        />
      )}
      <div className={clsx("flex flex-col gap-2", customTextColor)}>
        {title && (
          <h2
            className={clsx(
              "text-xl font-semibold text-neutral_70",
              customTextColor
            )}
          >
            {title}
          </h2>
        )}
        {paragraph && <p className="text-base">{paragraph}</p>}
      </div>
      {children}
    </div>
  );
};

export default Card;
