// src/components/charts/LineChartSensor.jsx
import React, { useState, useEffect } from "react";
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
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";

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
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    // Option A: each chart subscribes to /data
    // Then we flatten out and build arrays for the chosen dataType
    const dataRef = ref(database, "data");
    const unsub = onValue(dataRef, (snapshot) => {
      if (!snapshot.exists()) {
        setLabels([]);
        setDataValues([]);
        return;
      }
      const dataObj = snapshot.val();
      // dataObj is { dateKey => { randomId => {humidity, temperature, etc.} } }
      // We'll collect them in chronological order
      const dateKeys = Object.keys(dataObj).sort();
      const tempLabels = [];
      const tempValues = [];

      dateKeys.forEach((dk) => {
        const randomObj = dataObj[dk];
        if (randomObj && typeof randomObj === "object") {
          const childKeys = Object.keys(randomObj);
          // We'll just take the first child or you might want them all
          const childKey = childKeys[0];
          const reading = randomObj[childKey];
          if (reading && reading[dataType] !== undefined) {
            // Use the dateKey as the label, or parse it if needed
            tempLabels.push(dk);
            tempValues.push(reading[dataType]);
          }
        }
      });

      setLabels(tempLabels);
      setDataValues(tempValues);
    });

    return () => unsub();
  }, [dataType]);

  const data = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: dataValues,
        borderColor: accentColor,
        backgroundColor: `${accentColor}33`,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    hover: { mode: null },
    plugins: {
      tooltip: { enabled: false },
      legend: { labels: { color: "#fff" } },
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
