import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataDateTableToolbar } from "./DataDateTableToolbar";
export default function DataTableDate({
  columns,
  data,
  filterKeys = ["date"],
}) {
  const [filteredData, setFilteredData] = useState(data);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredDate = useMemo(() => {
    if (!columnFilters.length) return data;

    return data
      .filter((item) =>
        columnFilters.every((filter) =>
          item[filter.id]?.toLowerCase().includes(filter.value.toLowerCase())
        )
      )
      .filter((item) => {
        const saleDate = new Date(Date.parse(item.createdAt));
        return (
          saleDate.getMonth() === selectedMonth.getMonth() &&
          saleDate.getFullYear() === selectedMonth.getFullYear()
        );
      });
  }, [columnFilters, data, selectedMonth]);
  const handleFilterDataChange = (filteredData) => {
    setFilteredData(filteredData);
  };
  const monthlySalesData = useMemo(() => {
    return filteredData.reduce((acc, sale) => {
      const saleDate = new Date(Date.parse(sale.createdAt));
      const month = saleDate.getMonth(); // Get the month (0-indexed)
      const date = saleDate.getDate(); // Get the date of the month
      const year = saleDate.getFullYear(); // Get the year
      const key = `${date} ${month + 1} ${year}`; // Key for grouping by date in the format "date month year"
      acc[key] = (acc[key] || 0) + sale.total; // Accumulate total sales for each date
      return acc;
    }, {});
  }, [filteredData]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const tableData = Object.keys(monthlySalesData).map((key) => {
    const [date, month, year] = key.split(" ");
    return {
      date: `${date} ${monthNames[parseInt(month) - 1]} ${year}`,
      total: monthlySalesData[key],
    };
  });

  return (
    <div className="space-y-4 text-black dark:text-white">
      <DataDateTableToolbar table={table} filterKeys={filterKeys} data={data} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.total} Bath</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
