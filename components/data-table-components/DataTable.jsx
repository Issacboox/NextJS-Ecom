"use client"
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataDateTableToolbar } from "./DataDateTableToolbar";

export default function DataTableDate({ columns, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        const saleDate = new Date(Date.parse(item.createdAt));
        return (
          saleDate.getMonth() === selectedMonth.getMonth() &&
          saleDate.getFullYear() === selectedMonth.getFullYear()
        );
      })
    );
  }, [selectedMonth, data]);

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

   const tableData = Object.keys(monthlySalesData).map((key) => {
    const [date, month, year] = key.split(" ");
    return {
      date: `${date} ${monthNames[parseInt(month) - 1]} ${year}`,
      total: monthlySalesData[key],
    };
  });

  return (
    <div className="space-y-4 text-black dark:text-white">
      <DataDateTableToolbar
        data={data}
        onFilterDataChange={setSelectedMonth}
      />

      {filteredData.length === 0 ? (
        <p className='text-red-800 font-semibold'>No record found for selected month.</p>
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

      <DataTablePagination data={filteredData} />
    </div>
  );
}