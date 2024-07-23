import * as react from 'react';
import react__default from 'react';
import { StaticImageData } from 'next/image';

interface IImage {
    width: number;
    height: number;
    src: string | StaticImageData;
    alt: string;
    url?: string;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: React.ElementType;
    variant?: "filled" | "text" | "outlined" | "link";
    color?: "primary" | "secondary";
    href?: string;
    [key: string]: any;
    disabled?: boolean;
    loading?: boolean;
    prevIcon?: IImage;
    nextIcon?: IImage;
};
declare const Button: ({ as: Cmp, children, variant, color, className, disabled, loading, prevIcon, nextIcon, ...rest }: ButtonProps) => react.JSX.Element;

type Props$4 = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: React.ElementType;
    color?: "primary" | "secondary" | "transparent";
    variant?: "flat" | "shadow" | "outline" | "outline-secondary";
    rounded?: boolean;
};
declare const IconButton: ({ as: Cmp, children, color, variant, rounded, className, ...rest }: Props$4) => react.JSX.Element;

declare const _default$1: react.ForwardRefExoticComponent<react.InputHTMLAttributes<HTMLInputElement> & {
    label?: string | JSX.Element | undefined;
    routes?: boolean | undefined;
} & react.RefAttributes<unknown>>;

declare const _default: react.ForwardRefExoticComponent<react.InputHTMLAttributes<HTMLInputElement> & {
    optional?: boolean | undefined;
    containerClassName?: string | undefined;
    error?: string | undefined;
    shrink?: boolean | undefined;
    clearable?: boolean | undefined;
    onChange: (e: any) => void;
    label?: string | undefined;
} & react.RefAttributes<unknown>>;

type Props$3 = React.InputHTMLAttributes<HTMLTextAreaElement> & {
    optional?: boolean;
};
declare const TextArea: ({ className, optional, ...rest }: Props$3) => react.JSX.Element;

type ContainerProps = {
    children: react__default.ReactNode;
    className?: string;
};
declare const Container: ({ className }: ContainerProps) => react__default.JSX.Element;

type Props$2 = {
    className?: string;
    children: react__default.ReactNode;
};
declare const Section: ({ className, children }: Props$2) => react__default.JSX.Element;

declare const Header: () => react__default.JSX.Element;

type PaginationChangePage = (page: number, totalRows: number) => void;
type Props$1 = {
    rowsPerPage: number;
    className?: string;
    rowCount: number;
    currentPage: number;
    onChangePage: PaginationChangePage;
};
type PaginationComponentProps = Props$1;
declare const Pagination: (props: Props$1) => react.JSX.Element;

type Props = {
    className?: string;
};
declare function Spinner({ className, ...rest }: Props): react__default.JSX.Element;

declare const DOTS = "...";
declare const usePagination: ({ rowsPerPage, rowCount, currentPage, }: PaginationComponentProps) => (string | number)[];

export { Button, DOTS, Container as Grid, Header, IconButton, _default as Input, Pagination, _default$1 as RadioButton, Section, Spinner, TextArea, usePagination };
