import * as react from 'react';

type PaginationChangePage = (page: number, totalRows: number) => void;
type Props = {
    rowsPerPage: number;
    className?: string;
    rowCount: number;
    currentPage: number;
    onChangePage: PaginationChangePage;
};
type PaginationComponentProps = Props;
declare const Pagination: (props: Props) => react.JSX.Element;

export { type PaginationComponentProps, Pagination as default };
