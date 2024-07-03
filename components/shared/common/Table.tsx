import React, { useState } from "react";
import Pagination from "./Pagination";

type Column<T> = {
  id: string;
  label: string;
  sortable?: boolean; // Ekledik: sıralama özelliğini etkinleştirmek için
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
  const [searchText, setSearchText] = useState<string>("");

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string | null;
  }>({
    key: "",
    direction: "ascending", // İsteğe bağlı olarak başlangıç sıralama yönü
  });

  // Sıralama işlevi
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Sıralama yöntemini değiştirme işlevi
  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white divide-y divide-gray-200 ">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.sortable ? (
                  <button
                    onClick={() => column.sortable && requestSort(column.id)}
                    className="flex items-center space-x-1"
                  >
                    <span>{column.label}</span>
                    {sortConfig.key === column.id && (
                      <span>
                        {sortConfig.direction === "ascending" ? "▲" : "▼"}
                      </span>
                    )}
                  </button>
                ) : (
                  <span>{column.label}</span>
                )}
              </th>
            ))}{" "}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
          {sortedData.map((item, index) => (
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
