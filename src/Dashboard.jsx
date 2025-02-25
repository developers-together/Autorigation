import React, { useState } from "react";
import "./Dashboard.css";

import WaterSavedCard from "./components/WaterSavedCard";
import WaterUsedCard from "./components/WaterUsedCard";
import SensorChartCard from "./components/SensorChartCard";
import LastIrrigateTable from "./components/LastIrrigateTable.jsx";
import ModalChart from "./components/ModalChart";

// Icons
import { FaHistory, FaWifi } from "react-icons/fa";

/**
 * We store chart configs in an array,
 * so we can track the "current index"
 * for previous/next in the modal.
 */
const chartConfigs = [
  {
    title: "Temperature",
    accentColor: "#ffa500",
    dataType: "temperature",
    currentValue: "28°C",
  },
  {
    title: "Humidity",
    accentColor: "#00adb5",
    dataType: "humidity",
    currentValue: "65%",
  },
  {
    title: "Moisture",
    accentColor: "#76c64e",
    dataType: "moisture",
    currentValue: "60%",
  },
  {
    title: "Light",
    accentColor: "#ffd700",
    dataType: "light",
    currentValue: "80%",
  },
];

const Dashboard = () => {
  const [showReportedTooltip, setShowReportedTooltip] = useState(false);
  const [showConnectivityTooltip, setShowConnectivityTooltip] = useState(false);

  const [lastReported] = useState("Sept 1, 2025, 10:45 AM");
  const [isConnected] = useState(true);

  // Chart modal state
  const [charts] = useState(chartConfigs);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleChartClick = (index) => {
    setExpandedIndex(index);
  };

  const handleCloseModal = () => {
    setExpandedIndex(null);
  };

  const handlePrevChart = () => {
    if (expandedIndex === null) return;
    const newIndex = (expandedIndex - 1 + charts.length) % charts.length;
    setExpandedIndex(newIndex);
  };

  const handleNextChart = () => {
    if (expandedIndex === null) return;
    const newIndex = (expandedIndex + 1) % charts.length;
    setExpandedIndex(newIndex);
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="header-icons">
          {/* Last reported data */}
          <div
            className="icon-wrapper"
            title="Last Reported Data"
            onMouseEnter={() => setShowReportedTooltip(true)}
            onMouseLeave={() => setShowReportedTooltip(false)}
            onClick={() => setShowReportedTooltip((prev) => !prev)}
          >
            <FaHistory size={24} />
            {showReportedTooltip && (
              <div className="tooltip-box">
                <p>Last reported: {lastReported}</p>
              </div>
            )}
          </div>

          {/* Connectivity */}
          <div
            className="icon-wrapper"
            title="Connection Status"
            onMouseEnter={() => setShowConnectivityTooltip(true)}
            onMouseLeave={() => setShowConnectivityTooltip(false)}
            onClick={() => setShowConnectivityTooltip((prev) => !prev)}
          >
            <FaWifi size={24} color={isConnected ? "#00ff00" : "#ff0000"} />
            {showConnectivityTooltip && (
              <div className="tooltip-box">
                <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 1: Water Cards */}
      <div className="dashboard-row">
        <WaterSavedCard
          totalSaved="14,260 L"
          percentage="+8% Since last cycle"
          backgroundColor="#9b8af7"
        />
        <WaterUsedCard
          totalUsed="3,540 L"
          percentage="+5% Since last cycle"
          backgroundColor="#ff7b7b"
        />
      </div>

      {/* ROW 2: 4 Charts */}
      <div className="dashboard-row charts-row">
        {charts.map((cfg, idx) => (
          <SensorChartCard
            key={idx}
            title={cfg.title}
            currentValue={cfg.currentValue}
            accentColor={cfg.accentColor}
            dataType={cfg.dataType}
            onChartClick={() => handleChartClick(idx)}
          />
        ))}
      </div>

      {/* IRRIGATE TABLE */}
      <LastIrrigateTable />

      {/* MODAL (only if expandedIndex != null) */}
      {expandedIndex !== null && (
        <ModalChart
          chartIndex={expandedIndex}
          charts={charts}
          onClose={handleCloseModal}
          onPrevChart={handlePrevChart}
          onNextChart={handleNextChart}
        />
      )}
    </div>
  );
};

export default Dashboard;
