import { useEffect, useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "../DataTablePagination";
import { DataTableToolbar } from "../DataTableToolbar";
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
  filterKeys = ["datePicker"],
}) {
  const [filteredData, setFilteredData] = useState([]);
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

  const filterData = () => {
    const filtered = data.filter((item) => {
      const saleDate = new Date(Date.parse(item.createdAt));
      return (
        saleDate.getMonth() === selectedMonth.getMonth() &&
        saleDate.getFullYear() === selectedMonth.getFullYear()
      );
    });

    if (columnFilters.length > 0) {
      return filtered.filter((item) =>
        columnFilters.every((filter) =>
          item[filter.id]?.toLowerCase().includes(filter.value.toLowerCase())
        )
      );
    }

    return filtered;
  };

  useEffect(() => {
    setFilteredData(filterData());
  }, [selectedMonth, columnFilters, data]);

  const handleFilterDataChange = (filteredData) => {
    setFilteredData(filteredData);
  };


  const monthlySalesData = useMemo(() => {
    return filteredData.reduce((acc, sale) => {
      const saleDate = new Date(Date.parse(sale.createdAt));
      const key = `${saleDate.getDate()} ${
        saleDate.getMonth() + 1
      } ${saleDate.getFullYear()}`;
      acc[key] = (acc[key] || 0) + sale.total;
      return acc;
    }, {});
  }, [filteredData]);

  const tableData = Object.keys(monthlySalesData).map((key) => {
    const [date, month, year] = key.split(" ");
    return {
      date: `${date} ${monthNames[parseInt(month) - 1]} ${year}`,
      total: monthlySalesData[key],
    };
  });

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

  return (
    <div className="space-y-4 text-black dark:text-white">
      <DataDateTableToolbar
  data={data}
  onFilterDataChange={handleFilterDataChange} // Make sure this prop is passed correctly
/>


      {filteredData.length === 0 ? (
        <p className="text-red-800 font-semibold">
          No record found for selected month.
        </p>
      ) : (
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
      )}
      <DataTablePagination table={table}/>
    </div>
  );
}