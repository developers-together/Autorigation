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

/** Format "yyyy-mm-dd_HH-MM-SS" => just "HH:MM" */
function formatTimeOnly(str) {
  if (!str.includes("_")) return str; // fallback
  const [datePart, timePart] = str.split("_"); // e.g. "2025-02-25", "13-01-05"
  const [HH, MM] = timePart.split("-"); // ignoring seconds
  return `${HH}:${MM}`; // "13:01"
}

/** Format "yyyy-mm-dd_HH-MM-SS" => "mm:dd : HH:MM" (previous style) */
function formatDayTime(str) {
  if (!str.includes("_")) return str;
  const [datePart, timePart] = str.split("_");
  const [yyyy, mm, dd] = datePart.split("-");
  const [HH, MM] = timePart.split("-");
  return `${mm}:${dd} : ${HH}:${MM}`; // "02:25 : 13:01"
}

/**
 * @param {boolean} showFullDate – if true, we show day+time (e.g. "02:25 : 13:01")
 *                                 if false, we only show the time (e.g. "13:01")
 */
const LineChartSensor = ({
  dataType,
  datasetLabel,
  accentColor,
  showFullDate,
}) => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, "data");
    const unsub = onValue(dataRef, (snapshot) => {
      if (!snapshot.exists()) {
        setLabels([]);
        setDataValues([]);
        return;
      }
      const dataObj = snapshot.val();

      const dateKeys = Object.keys(dataObj).sort();
      const tempLabels = [];
      const tempValues = [];

      dateKeys.forEach((dk) => {
        // Choose how to format each date key
        const formattedKey = showFullDate
          ? formatDayTime(dk)
          : formatTimeOnly(dk);

        const childObj = dataObj[dk];
        if (childObj && typeof childObj === "object") {
          const childIDs = Object.keys(childObj);
          if (childIDs.length > 0) {
            const reading = childObj[childIDs[0]];
            if (reading && reading[dataType] !== undefined) {
              tempLabels.push(formattedKey);
              tempValues.push(reading[dataType]);
            }
          }
        }
      });

      setLabels(tempLabels);
      setDataValues(tempValues);
    });

    return () => unsub();
  }, [dataType, showFullDate]);

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
        ticks: { color: "#fff", maxRotation: 45 },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartSensor;
