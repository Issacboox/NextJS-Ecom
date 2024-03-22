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
          "rgb(182, 243, 231)",
          "rgb(249, 165, 239)",
          "rgb(202, 166, 247)",
          "rgba(0, 0, 0, 0.7)",
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
    <div className="dark:bg-slate-700 p-8 rounded-lg ">
    {/* Chart */}
    <div className="p-4 flex items-center justify-center" style={{height:"400px"}}>
      <Pie data={chartData} />
    </div>
  </div>
  );
}
