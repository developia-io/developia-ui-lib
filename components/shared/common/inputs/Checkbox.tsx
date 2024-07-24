import { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IconCheck } from "@/components/icons";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  disabled?: boolean;
  boxClassName?: string;
};

const Checkbox = (
  {
    label,
    checked,
    value,
    onChange,
    name,
    className,
    boxClassName,
    disabled,
  }: Props,
  ref: any
) => {
  return (
    <label
      className={twMerge(
        'flex items-center gap-2 tracking-[0.32px] font-semibold',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      <span
        className={twMerge(
          clsx(
            'inline-flex w-6 h-6 border flex-shrink-0 rounded text-helper_White items-center justify-center',
            {
              "bg-helper_White border-neutral_30": !checked,
              "bg-primary_50 border-primary_50": checked,
            }
          ),
          boxClassName
        )}
      >
        {checked ? <IconCheck width={18} height={18} /> : null}
      </span>
      <input
        ref={ref}
        type="checkbox"
        className="fixed top-0 left-0 opacity-0 invisible"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label}
    </label>
  );
};
export default forwardRef(Checkbox);
