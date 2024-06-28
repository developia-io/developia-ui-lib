import * as react from 'react';
import { StaticImageData } from 'next/image';

interface IImage {
    width: number;
    height: number;
    src: string | StaticImageData;
    alt: string;
    url?: string;
}

type Props$1 = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
declare const Button: ({ as: Cmp, children, variant, color, className, disabled, loading, prevIcon, nextIcon, ...rest }: Props$1) => react.JSX.Element;

type PaginationChangePage = (page: number, totalRows: number) => void;
type Props = {
    rowsPerPage: number;
    className?: string;
    rowCount: number;
    currentPage: number;
    onChangePage: PaginationChangePage;
};
declare const Pagination: (props: Props) => react.JSX.Element;

export { Button, Pagination };
