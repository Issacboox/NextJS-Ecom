import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Input } from "@/components/ui/input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DataDateTableToolbar({ table, filterKeys, data }) {
  const isFiltered = filterKeys.some(
    (key) => table.getState().columnFilters[key]?.length > 0
  );

  const handleInputChange = (key, value) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue("");
    });
  };

  const handleDateChange = (date) => {
    const selectedMonth = date.getMonth() + 1;
    const selectedYear = date.getFullYear();
    const filteredData = data.filter((item) => {
      const saleDate = new Date(Date.parse(item.createdAt));
      return saleDate.getMonth() + 1 === selectedMonth && saleDate.getFullYear() === selectedYear;
    });
    // Pass the filtered data back to the parent component
    onFilterDataChange(filteredData);
  };
  

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DatePicker
          selected={new Date()}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="h-8 w-[150px] lg:w-[250px] border-gray-300 border rounded-md px-2"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
