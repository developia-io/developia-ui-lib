import * as react from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: React.ElementType;
    color?: "primary" | "secondary" | "transparent";
    variant?: "flat" | "shadow" | "outline" | "outline-secondary";
    rounded?: boolean;
};
declare const IconButton: ({ as: Cmp, children, color, variant, rounded, className, ...rest }: Props) => react.JSX.Element;

export { IconButton as default };
