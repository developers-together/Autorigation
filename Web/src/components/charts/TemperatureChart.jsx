// src/components/charts/TemperatureChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components (only once in your app)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart = ({ accentColor }) => {
  // Example data & labels (static mock data)
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: [26, 27, 29, 25, 28, 30, 29], // mock data
        borderColor: accentColor,
        backgroundColor: `${accentColor}33`, // partial transparency
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff", // color of the dataset label
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureChart;
