"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean;
  containerClassName?: string;
  error?: string;
  shrink?: boolean;
  clearable?: boolean;
  onChange: (e: any) => void;
  label?: string;
};

const Input = (
  {
    type = "text",
    className,
    containerClassName,
    optional,
    error,
    shrink = true,
    value,
    placeholder,
    label,
    required,
    clearable,
    onChange,
    ...rest
  }: Props,
  ref: any
) => {
  return (
    <div className={twMerge("relative group", containerClassName)}>
      <label className="relative">
        <span
          className={clsx(
            "block absolute text-gray-400 left-6 top-1/2 -translate-y-1/2 pointer-events-none transition-all text-sm font-light text-gray600",
            // focus state
            {
              "group-focus-within:text-xs group-focus-within:-translate-x-3 group-focus-within:-translate-y-8 group-focus-within:bg-white group-focus-within:px-2":
                shrink,
              "text-xs  -translate-x-3 -translate-y-8 bg-transparent px-2":
                value || !shrink,
            }
          )}
        >
          {placeholder}
          {required && <span className="text-red-600">*</span>}
        </span>

        <input
          {...rest}
          type={type}
          onChange={onChange}
          ref={ref}
          required={required}
          value={value}
          autoCapitalize="off"
          autoComplete="off"
          className={twMerge(
            clsx(
              "w-full bg-white border rounded-lg h-14 p-5 text-base text-gray600 font-medium",
              {
                "border-red600": error,
                "border-gray100": !error,
                "pr-7": clearable,
              }
            ),
            className
          )}
        />

        {optional ? (
          <span className="text-xs text-gray300 absolute right-5 top-1/2 -translate-y-1/2">
            optional
          </span>
        ) : null}
      </label>

      {error ? <div className="text-red600 text-xs mt-1">{error}</div> : null}
    </div>
  );
};

export default forwardRef(Input);
