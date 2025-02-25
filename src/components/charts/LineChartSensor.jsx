// src/components/charts/LineChartSensor.jsx

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

// Register Chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartSensor = ({ dataType, datasetLabel, accentColor }) => {
  // Numeric labels (e.g. "01", "02", etc.)
  const labels = ["01", "02", "03", "04", "05", "06", "07"];

  // Example data (with moisture/light as percentages)
  const mockDataPoints = {
    temperature: [26, 27, 29, 25, 28, 30, 29],
    humidity: [62, 65, 64, 70, 68, 72, 65],
    moisture: [50, 55, 60, 52, 66, 71, 65],
    light: [20, 35, 45, 60, 80, 100, 90],
  };

  const dataPoints = mockDataPoints[dataType] || [0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: dataPoints,
        borderColor: accentColor,
        backgroundColor: `${accentColor}33`, // partial transparency
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    /* DISABLE default Chart.js hover & tooltips */
    hover: {
      mode: null, // no highlight
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff", // label color
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartSensor;
