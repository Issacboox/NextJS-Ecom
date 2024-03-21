"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MonthlySalesChart({ sales }) {
  const monthlySalesData = sales.reduce((acc, sale) => {
    const saleDate = new Date(Date.parse(sale.createdAt));
    const month = saleDate.getMonth(); // Get the month (0-indexed)
    acc[month] = (acc[month] || 0) + sale.total; // Accumulate total sales for each month
    return acc;
  }, []);

  const labels = Array.from({ length: 12 }, (_, i) => i + 1); // Create an array of month numbers (1-12)

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: monthlySalesData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Monthly Sales
      </h2>
      <div className="p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
