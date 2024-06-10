import { IImage } from "@/components/interface";
import clsx from "clsx";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ElementType;
  variant?: "primary" | "secondary" | "text" | "outlined" | "link";
  color?: "primary" | "secondary";
  href?: string;
  [key: string]: any;
  disabled?: boolean;
  loading?: boolean;
  prevIcon?: IImage;
  nextIcon?: IImage;
};

const Button = ({
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
}: Props) => {
  return (
    <Cmp
      {...rest}
      className={twMerge(
        "h-10 flex items-center gap-1.5 text-center justify-center transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-button-primary focus:ring-opacity-50",
        clsx("py-[11px] px-6 rounded font-semibold leading-none", {
          ...(variant === "primary"
            ? {
                "bg-button-primary text-button-text-primary":
                  color === "primary",
                "bg-button-secondary text-button-secondary":
                  color === "secondary",
              }
            : null),
          ...(variant === "secondary"
            ? {
                border: true,
                "border-button-primary text-button-text-primary":
                  color === "primary",
                "border-button-secondary text-button-secondary":
                  color === "secondary",
              }
            : null),
          ...(variant === "text"
            ? {
                "text-button-text-primary": color === "primary",
                "text-button-text-secondary": color === "secondary",
              }
            : null),
          ...(variant === "outlined"
            ? {
                "border border-solid border-button-primary": true,
                "text-button-text-primary": color === "primary",
                "text-button-text-secondary": color === "secondary",
              }
            : null),
          ...(variant === "link"
            ? {
                "p-0 m-0 underline h-auto w-auto": true,
                "text-button-text-primary": color === "primary",
                "text-button-text-secondary": color === "secondary",
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
      {/* {loading ? <Spinner className="w-4 h-4" /> : children} */}
      {children}
      {nextIcon && (
        <Image
          width={nextIcon.width}
          height={nextIcon.height}
          src={nextIcon.src}
          alt={nextIcon.alt}
          className="w-4 h-4"
        />
      )}
    </Cmp>
  );
};

export default Button;
