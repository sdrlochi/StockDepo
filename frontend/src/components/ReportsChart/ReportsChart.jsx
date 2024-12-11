import "./ReportsChart.css";
import React, { useContext } from "react";
import { DataContext } from "../../App";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment";

export const ReportsChart = ({dateFrom, dateTo, selectedCategory, showResults}) => {
  const { orders } = useContext(DataContext);

const filteredOrders = orders.filter((order) => {
  if (!dateFrom && !dateTo && !selectedCategory) {
    return true;
  }
  const orderDate = moment(order.ordered);
  return (
    (!dateFrom || orderDate.isSameOrAfter(dateFrom)) &&
    (!dateTo || orderDate.isSameOrBefore(dateTo)) &&
    (!selectedCategory || order.categoryTitle === selectedCategory)
  );
});
  return (
    <>
      <div className="chart-main-container">
        <Line
          data={{
            labels: filteredOrders.map((order) =>
              moment(order.ordered).format("MM/DD/YYYY")
            ),
            datasets: [
              {
                label: "Total Cost",
                data: filteredOrders.map((order)=> order.pricePerUnit * order.quantity),
                cubicInterpolationMode: 'monotone'
              },
            ],
          }}
        />
      </div>
    </>
  );
};