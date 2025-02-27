// src/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

// Existing components
import WaterSavedCard from "./components/WaterSavedCard";
import WaterUsedCard from "./components/WaterUsedCard";
import SensorChartCard from "./components/SensorChartCard";
import ModalChart from "./components/ModalChart";
import LastIrrigateTable from "./components/LastIrrigateTable";

// The EXACT same middle widget code you already have:
import FlowRateWidget from "./components/FlowRateWidget";
import TempRangeWidget from "./components/TempRangeWidget";
import HumRangeWidget from "./components/HumRangeWidget";
import MoistRangeWidget from "./components/MoistRangeWidget";

// Floating Chat Assistant
import ChatAssistant from "./components/ChatAssistant";

// Icons
import { FaHistory, FaWifi } from "react-icons/fa";

/** Helper: format "yyyy-mm-dd_HH-MM-SS" into "mm:dd : HH:MM" */
function formatTimestamp(str) {
  if (!str.includes("_")) return str;
  const [datePart, timePart] = str.split("_");
  const [yyyy, mm, dd] = datePart.split("-");
  const [HH, MM] = timePart.split("-");
  return `${mm}:${dd} : ${HH}:${MM}`;
}

/** Chart configs for sensor cards */
const chartConfigs = [
  {
    title: "Temperature",
    accentColor: "#ffa500",
    dataType: "temperature",
    currentValue: "—",
  },
  {
    title: "Humidity",
    accentColor: "#00adb5",
    dataType: "humidity",
    currentValue: "—",
  },
  {
    title: "Moisture",
    accentColor: "#76c64e",
    dataType: "moisture",
    currentValue: "—",
  },
  {
    title: "Light",
    accentColor: "#ffd700",
    dataType: "light",
    currentValue: "—",
  },
];

const Dashboard = () => {
  // Firebase subscriptions
  const [dataNode, setDataNode] = useState({});
  const [monitorNode, setMonitorNode] = useState({});
  const [totalNode, setTotalNode] = useState({});

  useEffect(() => {
    // /data
    const dataRef = ref(database, "data");
    const unsubData = onValue(dataRef, (snapshot) => {
      setDataNode(snapshot.exists() ? snapshot.val() : {});
    });

    // /monitor
    const monitorRef = ref(database, "monitor");
    const unsubMonitor = onValue(monitorRef, (snapshot) => {
      setMonitorNode(snapshot.exists() ? snapshot.val() : {});
    });

    // /total
    const totalRef = ref(database, "total");
    const unsubTotal = onValue(totalRef, (snapshot) => {
      setTotalNode(snapshot.exists() ? snapshot.val() : {});
    });

    return () => {
      unsubData();
      unsubMonitor();
      unsubTotal();
    };
  }, []);

  // Derive latest sensor reading
  const { latestReading, lastConnectionTime } = useMemo(() => {
    let reading = null;
    let lastTime = null;
    const keys = Object.keys(dataNode).sort();
    if (keys.length > 0) {
      const lastKey = keys[keys.length - 1];
      lastTime = lastKey;
      const randomObj = dataNode[lastKey];
      if (randomObj && typeof randomObj === "object") {
        const childIds = Object.keys(randomObj);
        if (childIds.length > 0) {
          reading = randomObj[childIds[0]];
        }
      }
    }
    return { latestReading: reading, lastConnectionTime: lastTime };
  }, [dataNode]);

  // Update chart configs
  const charts = useMemo(() => {
    if (!latestReading) return chartConfigs;
    return chartConfigs.map((cfg) => {
      const val = latestReading[cfg.dataType];
      return val !== undefined ? { ...cfg, currentValue: String(val) } : cfg;
    });
  }, [latestReading]);

  // Format last reported
  const lastReported = lastConnectionTime
    ? formatTimestamp(lastConnectionTime)
    : "No data yet";

  // Format water usage from /total
  function formatLiquid(mlAmount) {
    if (!mlAmount || mlAmount < 0) mlAmount = 0;
    if (mlAmount >= 1000) {
      const liters = (mlAmount / 1000).toFixed(2);
      return `${liters} L`;
    }
    return `${mlAmount} ml`;
  }
  const totalWaterSaved = formatLiquid(totalNode.totalWaterSaved);
  const totalWaterUsed = formatLiquid(totalNode.totalWaterUsed);

  // Build Last Irrigate events from /monitor
  const lastIrrigateEvents = useMemo(() => {
    const monitorKeys = Object.keys(monitorNode).filter((k) => k.includes("_"));
    let events = [];
    monitorKeys.sort().forEach((dateKey) => {
      const subObj = monitorNode[dateKey];
      if (subObj && typeof subObj === "object") {
        Object.keys(subObj).forEach((rk) => {
          const eData = subObj[rk];
          if (eData && typeof eData === "object") {
            events.push({
              dateKey,
              waterUsed: formatLiquid(eData.waterUsed),
            });
          }
        });
      }
    });
    // Sort descending
    return events.reverse();
  }, [monitorNode]);

  // UI states
  const [isConnected] = useState(true);
  const [showReportedTooltip, setShowReportedTooltip] = useState(false);
  const [showConnectivityTooltip, setShowConnectivityTooltip] = useState(false);

  // Modal chart
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleChartClick = (idx) => setExpandedIndex(idx);
  const handleCloseModal = () => setExpandedIndex(null);
  const handlePrevChart = () => {
    if (expandedIndex === null) return;
    setExpandedIndex((expandedIndex - 1 + charts.length) % charts.length);
  };
  const handleNextChart = () => {
    if (expandedIndex === null) return;
    setExpandedIndex((expandedIndex + 1) % charts.length);
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="header-icons">
          <div
            className="icon-wrapper"
            title="Last Reported Data"
            onMouseEnter={() => setShowReportedTooltip(true)}
            onMouseLeave={() => setShowReportedTooltip(false)}
            onClick={() => setShowReportedTooltip((p) => !p)}
          >
            <FaHistory size={24} />
            {showReportedTooltip && (
              <div className="tooltip-box">
                <p>Last reported: {lastReported}</p>
              </div>
            )}
          </div>
          <div
            className="icon-wrapper"
            title="Connection Status"
            onMouseEnter={() => setShowConnectivityTooltip(true)}
            onMouseLeave={() => setShowConnectivityTooltip(false)}
            onClick={() => setShowConnectivityTooltip((p) => !p)}
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
      {/* FIRST ROW (WATER SAVED - MIDDLE WIDGETS - WATER USED) */}
      {/* DO NOT CHANGE THIS PART: EXACT middle widget code as you have it now */}
      <div className="dashboard-row big-row">
        {/* Left: Water Saved */}
        <div
          className="big-col water-saved" /* possibly your gradient or styling */
        >
          <WaterSavedCard totalSaved={totalWaterSaved} />
        </div>

        {/* Middle: 2×2 grid of FlowRateWidget, TempRangeWidget, HumRangeWidget, MoistRangeWidget */}
        <div className="big-col middle-widgets">
          <div className="middle-row">
            <FlowRateWidget />
            <TempRangeWidget />
          </div>
          <div className="middle-row">
            <HumRangeWidget />
            <MoistRangeWidget />
          </div>
        </div>

        {/* Right: Water Used */}
        <div
          className="big-col water-used" /* possibly your gradient or styling */
        >
          <WaterUsedCard totalUsed={totalWaterUsed} />
        </div>
      </div>
      {/* SECOND ROW: Sensor Charts */}
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
      {/* THIRD ROW: Last Irrigate Table */}
      <div className="dashboard-row">
        <LastIrrigateTable lastIrrigateEvents={lastIrrigateEvents} />
      </div>
      {/* Modal for full-page chart */}
      {expandedIndex !== null && (
        <ModalChart
          chartIndex={expandedIndex}
          charts={charts}
          onClose={handleCloseModal}
          onPrevChart={handlePrevChart}
          onNextChart={handleNextChart}
        />
      )}
      const [isConnected, setIsConnected] = useState(false);
      {/* Floating Chat Assistant Button/Panel */}
      <ChatAssistant />
      {/* Footer area with button to navigate to /api-docs */}
      <div className="dashboard-footer">
        <Link to="/api-docs" className="api-docs-button">
          View API Documentation
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
