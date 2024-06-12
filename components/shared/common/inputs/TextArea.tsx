"use client";

import { twMerge } from "tailwind-merge";

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  optional?: boolean;
};

const TextArea = ({ className, optional, ...rest }: Props) => {
  return (
    <div className="relative">
      <textarea
        {...rest}
        className={twMerge(
          "w-full bg-white border border-gray100 rounded-lg h-28 p-5 text-base text-gray600 font-medium placeholder:text-sm placeholder:font-light placeholder:gray600",
          className
        )}
      />

      {optional ? (
        <span className="text-xs text-gray300 absolute right-5 top-1/2 -translate-y-1/2">
          optional
        </span>
      ) : null}
    </div>
  );
};

export default TextArea;
