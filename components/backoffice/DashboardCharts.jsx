import React from "react";
import WeeklySalesChart from "./WeeklySalesChart";
import BestSellingProductsChart from "./BestSellingProductsChart";
import MonthlySalesChart from "./WeeklySalesChart";

export default function DashboardCharts({ sales }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MonthlySalesChart sales={sales} />
      <BestSellingProductsChart sales={sales} />
    </div>
  );
}
