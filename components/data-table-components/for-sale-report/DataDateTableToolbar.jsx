import { useState } from 'react';
import { DatePicker, Space } from 'antd';

export function DataDateTableToolbar({ data, onFilterDataChange }) {
  const [noRecordsFound, setNoRecordsFound] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date); // Update selected date state

    if (date) {
      const selectedMonth = date.month() + 1;
      const selectedYear = date.year();
      const filteredData = data.filter((item) => {
        const saleDate = new Date(item.createdAt); // Use the Date object directly
        return saleDate.getMonth() + 1 === selectedMonth && saleDate.getFullYear() === selectedYear;
      });

      if (filteredData.length === 0) {
        setNoRecordsFound(true);
      } else {
        setNoRecordsFound(false);
        // Pass the filtered data back to the parent component
        onFilterDataChange(filteredData);
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Space direction="vertical">
          <DatePicker onChange={handleDateChange} picker="month" value={selectedDate} />
        </Space>
      </div>
      {noRecordsFound && <p className='text-red-800 font-semibold'>No record found for selected month.</p>}
    </div>
  );
}
