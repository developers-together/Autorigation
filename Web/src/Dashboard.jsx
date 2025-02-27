// src/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";

import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

// Existing components
import WaterSavedCard from "./components/WaterSavedCard";
import WaterUsedCard from "./components/WaterUsedCard";
import SensorChartCard from "./components/SensorChartCard";
import ModalChart from "./components/ModalChart";
import LastIrrigateTable from "./components/LastIrrigateTable";

// New widget components
import FlowRateWidget from "./components/FlowRateWidget";
import TempRangeWidget from "./components/TempRangeWidget";
import HumRangeWidget from "./components/HumRangeWidget";
import MoistRangeWidget from "./components/MoistRangeWidget";

// Icons
import { FaHistory, FaWifi } from "react-icons/fa";

/**
 * Helper to format a timestamp string from "yyyy-mm-dd_HH-MM-SS"
 * into "mm:dd : HH:MM"
 */
function formatTimestamp(str) {
  if (!str.includes("_")) return str;
  const [datePart, timePart] = str.split("_");
  const [yyyy, mm, dd] = datePart.split("-");
  const [HH, MM] = timePart.split("-");
  return `${mm}:${dd} : ${HH}:${MM}`;
}

// Chart config for sensor cards remains unchanged.
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
  // Subscribe to sensor data from /data
  const [dataNode, setDataNode] = useState({});
  // Subscribe to /monitor for irrigation events and water usage totals
  const [monitorNode, setMonitorNode] = useState({});
  // Subscribe to /total for overall water totals
  const [totalNode, setTotalNode] = useState({});

  useEffect(() => {
    const dataRef = ref(database, "data");
    const unsubData = onValue(dataRef, (snapshot) => {
      setDataNode(snapshot.exists() ? snapshot.val() : {});
    });

    const monitorRef = ref(database, "monitor");
    const unsubMonitor = onValue(monitorRef, (snapshot) => {
      setMonitorNode(snapshot.exists() ? snapshot.val() : {});
    });

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

  // Derive the latest sensor reading from /data
  const { latestReading, lastConnectionTime } = useMemo(() => {
    let latestReading = null;
    let lastConnectionTime = null;
    const dateKeys = Object.keys(dataNode).sort();
    if (dateKeys.length > 0) {
      const lastKey = dateKeys[dateKeys.length - 1];
      lastConnectionTime = lastKey;
      const randomObj = dataNode[lastKey];
      if (randomObj && typeof randomObj === "object") {
        const childIds = Object.keys(randomObj);
        if (childIds.length > 0) {
          latestReading = randomObj[childIds[0]];
        }
      }
    }
    return { latestReading, lastConnectionTime };
  }, [dataNode]);

  // Update sensor chart configurations with the latest reading
  const charts = useMemo(() => {
    if (!latestReading) return chartConfigs;
    return chartConfigs.map((cfg) => {
      const val = latestReading[cfg.dataType];
      return val !== undefined ? { ...cfg, currentValue: String(val) } : cfg;
    });
  }, [latestReading]);

  // Format the last connection timestamp for header tooltip
  const lastReported = lastConnectionTime
    ? formatTimestamp(lastConnectionTime)
    : "No data yet";

  // Process total water values from /total (in ml), convert to L if needed.
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

  // Build last irrigate events from /monitor.
  const lastIrrigateEvents = useMemo(() => {
    // Filter monitor keys that are timestamps (contain an underscore)
    const keys = Object.keys(monitorNode).filter((k) => k.includes("_"));
    let events = [];
    keys.sort().forEach((dateKey) => {
      const subObj = monitorNode[dateKey];
      if (subObj && typeof subObj === "object") {
        Object.keys(subObj).forEach((rk) => {
          const eventData = subObj[rk];
          if (eventData && typeof eventData === "object") {
            events.push({
              dateKey, // raw timestamp key
              waterUsed: formatLiquid(eventData.waterUsed),
            });
          }
        });
      }
    });
    // Sort descending (newest first)
    return events.reverse();
  }, [monitorNode]);

  // Header icon state
  const [isConnected] = useState(true);
  const [showReportedTooltip, setShowReportedTooltip] = useState(false);
  const [showConnectivityTooltip, setShowConnectivityTooltip] = useState(false);

  // Chart modal state
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

      {/* FIRST ROW: Big Row using CSS Grid */}
      <div className="dashboard-row big-row">
        {/* Left: Water Saved (spans 2 columns) */}
        <div className="big-col water-saved" style={{ gridColumn: "span 2" }}>
          <WaterSavedCard totalSaved={totalWaterSaved} />
        </div>

        {/* Middle: Two widgets columns (each spans 1 column) */}
        <div
          className="big-col middle-widgets"
          style={{ gridColumn: "span 2" }}
        >
          <div className="middle-row">
            <FlowRateWidget />
            <TempRangeWidget />
          </div>
          <div className="middle-row">
            <HumRangeWidget />
            <MoistRangeWidget />
          </div>
        </div>

        {/* Right: Water Used (spans 2 columns) */}
        <div className="big-col water-used" style={{ gridColumn: "span 2" }}>
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

      {/* Modal Chart */}
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
