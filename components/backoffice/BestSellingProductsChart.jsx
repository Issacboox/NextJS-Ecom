"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function BestSellingProductsChart({sales}) {
   // Calculate the total quantity sold for each product
   const productSales = sales.reduce((acc, sale) => {
    const { productTitle, productQty } = sale;
    acc[productTitle] = (acc[productTitle] || 0) + productQty;
    return acc;
  }, {});

  // Sort the products by sales quantity in descending order
  const sortedProducts = Object.keys(productSales).sort(
    (a, b) => productSales[b] - productSales[a]
  );

  // Get the top 4 best selling products
  const labels = sortedProducts.slice(0, 5);
  const data = labels.map((label) => productSales[label]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data,
        backgroundColor: [
          "rgba(210, 94, 48, 0.9)",
          "rgba(162, 0, 32, 0.9)",
          "rgba(4, 68, 162, 0.9)",
          "rgba(14, 131, 64, 0.9)",
          "rgba(210, 202, 48, 0.9)",
          
        ],
        borderColor: [
          "rgb(251, 248, 254)",
          "rgb(251, 248, 254)",
          "rgb(251, 248, 254)",
          "rgb(251, 248, 254)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="dark:bg-slate-700 p-4 rounded-lg ">
    {/* Chart */}
    <div className=" flex items-center justify-center" style={{height:"350px"}}>
      <Pie data={chartData} />
    </div>
  </div>
  );
}
