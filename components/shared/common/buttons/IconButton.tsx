import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ElementType;
  color?: "primary" | "secondary" | "transparent";
  variant?: "flat" | "shadow" | "outline" | "outline-secondary";
  rounded?: boolean;
};

const IconButton = ({
  as: Cmp = "button",
  children,
  color = "primary",
  variant = "flat",
  rounded,
  className,
  ...rest
}: Props) => {
  return (
    <Cmp
      {...rest}
      className={twMerge(
        clsx("leading-none flex items-center justify-center w-min h-min p-4 ", {
          "rounded-full": rounded,
          rounded: !rounded,
          "bg-button-primary fill-button-fill-primary": color === "primary",
          "bg-button-secondary fill-button-fill-secondary":
            color === "secondary",
          "bg-transparent fill-button-fill-primary": color === "transparent",
          "p-[11px]": variant === "flat",
          "border border-button-primary fill-button-fill-primary bg-transparent  ":
            variant === "outline",
          "border border-button-secondary fill-button-fill-secondary  bg-transparent":
            variant === "outline-secondary",
          "shadow-button border border-gray100 p-2.5": variant === "shadow",
        }),
        className
      )}
    >
      {children}
    </Cmp>
  );
};
export default IconButton;
