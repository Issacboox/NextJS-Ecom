"use client";
import React, { useState } from "react";
import BestSellingProductsChart from "./BestSellingProductsChart";
import DataTableDate from "../data-table-components/DataTableDate";
import { tableColumnSale } from "./TableColumnSale";
import MonthlySalesChart from "./WeeklySalesChart";

export default function DashboardCharts({ sales }) {
  const [activeTab, setActiveTab] = useState("salesBest");

  const tabs = [
    {
      title: "Best Selling",
      type: "salesBest",
      component: <BestSellingProductsChart sales={sales} />,
    },
    {
      title: "Sale Report Month",
      type: "monthSaleReport",
      component: <DataTableDate columns={tableColumnSale} data={sales} />,
    },
  ];

  const handleTabClick = (tabType) => {
    setActiveTab(tabType);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MonthlySalesChart sales={sales} />
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={
            activeTab === tab.type
              ? "block dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl"
              : "hidden"
          }
        >
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
            Sale Report
          </h2>
          <div className="p-4">
            <div className="text-sm mb-5 font-medium text-center text-gray-200 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px ">
                {tabs.map((tab, i) => (
                  <li className="me-2" key={i}>
                    <button
                      onClick={() => handleTabClick(tab.type)}
                      className={
                        activeTab === tab.type
                          ? "inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-orange-500 dark:border-orange-500"
                          : "inline-block p-4 border-b-2 border-transparent rounded-t-lg  text-slate-500 hover:text-orange-600 hover:border-gray-100 dark:hover:text-gray-100"
                      }
                    >
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {tab.component}
          </div>
        </div>
      ))}
    </div>
  );
}
