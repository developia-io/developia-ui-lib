import * as react from 'react';
import { IImage } from '../../../interface.js';
import 'next/image';

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
declare const Button: ({ as: Cmp, children, variant, color, className, disabled, loading, prevIcon, nextIcon, ...rest }: Props) => react.JSX.Element;

export { Button as default };
