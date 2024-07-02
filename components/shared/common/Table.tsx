import React from "react";
import Pagination from "./Pagination";

type Column<T> = {
  id: string;
  label: string;
};

type DataItem = {
  [key: string]: any;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  totalPages: number;
  rowsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Table = <T extends DataItem>({
  columns,
  data,
  totalPages,
  rowsPerPage,
  currentPage,
  onChangePage,
}: TableProps<T>) => {
  console.log(currentPage);
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white divide-y divide-gray-200">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  {item[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPagesCount={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Table;
