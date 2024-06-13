import { forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { IconsCheck } from "@/components/icons";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | JSX.Element | undefined;
  routes?: boolean;
};

const Radio = (
  { label, checked, value, onChange, name, className, routes = false }: Props,
  ref: any
) => {
  return (
    <label
      className={twMerge(
        "flex items-center gap-2 tracking-[0.32px] font-semibold cursor-pointer",
        className
      )}
    >
      <span
        className={clsx(
          "inline-flex w-6 h-6 border-[6px] flex-shrink-0 rounded-full text-white items-center justify-center",
          {
            "bg-gray-100 border-gray100": !checked,
            "border-button-primary bg-button-text-primary": checked,
            "!border-[0px] !bg-white": routes && !checked,
            "!bg-button-primary": routes && checked,
          }
        )}
      >
        {!routes && checked ? <IconsCheck width={18} height={18} /> : null}
        {routes && checked ? (
          <span className="!text-white">
            <IconsCheck width={18} height={18} />
          </span>
        ) : null}
      </span>
      <input
        ref={ref}
        type="radio"
        className="fixed top-0 left-0 opacity-0 invisible"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
export default forwardRef(Radio);
