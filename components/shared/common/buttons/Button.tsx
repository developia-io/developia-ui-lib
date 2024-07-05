import { IImage } from "@/components/interface";
import clsx from "clsx";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Spinner from "../Spinner";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ElementType;
  variant?: "filled" | "text" | "outlined" | "link";
  colorvariant?: "primary" | "secondary" | "custom";
  href?: string;
  [key: string]: any;
  disabled?: boolean;
  loading?: boolean;
  prevIcon?: IImage;
  nextIcon?: IImage;
  customBgColor?: string;
  customBorderColor?: string;
  customTextColor?: string;
};

const Button = ({
  as: Cmp = "button",
  children,
  variant = "filled",
  colorvariant = "primary",
  customBgColor,
  customBorderColor,
  customTextColor,
  className,
  disabled,
  loading,
  prevIcon,
  nextIcon,
  ...rest
}: Props) => {
  return (
    <Cmp
      {...rest}
      className={twMerge(
        "h-10 flex items-center gap-1.5 text-center justify-center transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-button-primary focus:ring-opacity-50",
        clsx("py-[11px] px-6 rounded font-semibold leading-none", {
          ...(variant === "filled"
            ? {
                "bg-primary_100 text-helper_White":
                  colorvariant === "primary",
                "bg-secondary_100 text-neutral_20":
                  colorvariant === "secondary",
              }
            : null),
          ...(variant === "text"
            ? {
                "text-neutral_40": colorvariant === "primary",
                "text-secondary_20": colorvariant === "secondary",
              }
            : null),
          ...(variant === "outlined"
            ? {
                "border border-solid border-primary_80": true,
                "text-neutral_70": colorvariant === "primary",
                "text-secondary_30": colorvariant === "secondary",
              }
            : null),
          ...(variant === "link"
            ? {
                "p-0 m-0 underline h-auto w-auto": true,
                "text-primary_70": colorvariant === "primary",
                "text-secondary_60": colorvariant === "secondary",
              }
            : null),
          ...(disabled
            ? {
                "opacity-50 cursor-not-allowed text-white pointer-events-none":
                  true,
              }
            : null),
          ...(loading
            ? {
                "pointer-events-none opacity-80 justify-center": true,
              }
            : null),...(customBgColor || customBorderColor || customTextColor
              ? {
                  [`bg-[${customBgColor}]`]: customBgColor,
                  [`border-[${customBorderColor}]`]: customBorderColor,
                  [`text-[${customTextColor}]`]: customTextColor,
                }
              : colorvariant
              ? {
                  [`${colorvariant}`]: colorvariant,
                }
              : null),
            
        }),
        className
      )}
    >
      {prevIcon && (
        <Image
          width={prevIcon.width}
          height={prevIcon.height}
          src={prevIcon.src}
          alt={prevIcon.alt}
          className="w-4 h-4"
        />
      )}
      {loading ? <Spinner className="w-4 h-4" /> : children} 
      {/*{children}*/}
      {nextIcon && (
        <Image
          width={nextIcon.width}
          height={nextIcon.height}
          src={nextIcon.src}
          alt={nextIcon.alt}
          className="w-4 h-4"
        />
      )},
    </Cmp>
  );
};

export default Button;