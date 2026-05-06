"use client";

import React from "react";

type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
};

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white shadow-sm border border-gray-100 rounded-xl">
      <table className="w-full">
        {/* HEADER */}
        <thead className="border-b border-gray-100 bg-gray-50/60">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-5 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wide ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-50">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50/70 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-5 py-4 text-sm text-gray-700 ${col.className || ""}`}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-12 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}