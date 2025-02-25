// src/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";

import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

import WaterSavedCard from "./components/WaterSavedCard";
import WaterUsedCard from "./components/WaterUsedCard";
import SensorChartCard from "./components/SensorChartCard";
import LastIrrigateTable from "./components/LastIrrigateTable";
import ModalChart from "./components/ModalChart";

import { FaHistory, FaWifi } from "react-icons/fa";

/**
 * Format "yyyy-mm-dd_HH-MM-SS" -> e.g. "02:25 : 13:01"
 */
function formatTimestamp(str) {
  if (!str.includes("_")) return str;
  const [datePart, timePart] = str.split("_");
  const [yyyy, mm, dd] = datePart.split("-");
  const [HH, MM] = timePart.split("-");
  return `${mm}:${dd} : ${HH}:${MM}`;
}

/**
 * Convert a milliliter value to a string in ml or L if ≥ 1000.
 * For example: 500 => "500 ml", 1300 => "1.30 L"
 */
function formatLiquid(mlAmount) {
  if (!mlAmount || mlAmount < 0) mlAmount = 0;
  if (mlAmount >= 1000) {
    const liters = (mlAmount / 1000).toFixed(2);
    return `${liters} L`;
  }
  return `${mlAmount} ml`;
}

// Chart config array for sensors
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
  const [dataNode, setDataNode] = useState({});
  const [monitorNode, setMonitorNode] = useState({});
  const [totalNode, setTotalNode] = useState({});

  useEffect(() => {
    // Subscribe to /data for sensor readings
    const dataRef = ref(database, "data");
    const unsubData = onValue(dataRef, (snapshot) => {
      setDataNode(snapshot.exists() ? snapshot.val() : {});
    });

    // Subscribe to /monitor for last irrigate table
    const monitorRef = ref(database, "monitor");
    const unsubMonitor = onValue(monitorRef, (snapshot) => {
      setMonitorNode(snapshot.exists() ? snapshot.val() : {});
    });

    // Subscribe to /total for water saved/used
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

  // ============= LATEST READING FROM "data" =============
  const { latestReading, lastConnectionTime } = useMemo(() => {
    let latestReading = null;
    let lastConnectionTime = null;
    const dateKeys = Object.keys(dataNode).sort();
    if (dateKeys.length) {
      const lastKey = dateKeys[dateKeys.length - 1];
      lastConnectionTime = lastKey;
      const randomObj = dataNode[lastKey];
      if (randomObj && typeof randomObj === "object") {
        const childIds = Object.keys(randomObj);
        if (childIds.length) {
          latestReading = randomObj[childIds[0]];
        }
      }
    }
    return { latestReading, lastConnectionTime };
  }, [dataNode]);

  // ============= WATER SAVED/USED FROM "total" =============
  const { totalWaterSaved, totalWaterUsed } = useMemo(() => {
    const savedML = totalNode.totalWaterSaved || 0;
    const usedML = totalNode.totalWaterUsed || 0;
    return {
      totalWaterSaved: formatLiquid(savedML),
      totalWaterUsed: formatLiquid(usedML),
    };
  }, [totalNode]);

  // ============= LAST IRRIGATE TABLE FROM "monitor" =============
  const lastIrrigateEvents = useMemo(() => {
    // "monitor" has date-keys => randomKey => { waterUsed }
    // We'll parse them into an array for the table
    const keys = Object.keys(monitorNode).sort();
    let events = [];
    keys.forEach((dateKey) => {
      const subObj = monitorNode[dateKey];
      if (subObj && typeof subObj === "object") {
        Object.keys(subObj).forEach((rk) => {
          const detail = subObj[rk];
          if (detail && typeof detail === "object") {
            // We'll store date/time by parsing dateKey if you want
            // Or just store the raw dateKey
            // waterUsed in ml => convert it
            const waterUsedStr = formatLiquid(detail.waterUsed);
            events.push({
              dateKey, // e.g. "2025-02-25_15-17-07"
              waterUsed: waterUsedStr,
            });
          }
        });
      }
    });
    return events;
  }, [monitorNode]);

  // ============= BUILD CHART CONFIGS WITH LATEST SENSOR =============
  const charts = useMemo(() => {
    if (!latestReading) return chartConfigs;
    return chartConfigs.map((cfg) => {
      const val = latestReading[cfg.dataType];
      return val !== undefined ? { ...cfg, currentValue: String(val) } : cfg;
    });
  }, [latestReading]);

  // ============= LAST REPORTED (TIME STAMP) =============
  const lastReported = lastConnectionTime
    ? formatTimestamp(lastConnectionTime)
    : "No data yet";

  // ============= UI LOGIC FOR HEADER ICONS / MODAL CHART =============
  const [isConnected] = useState(true);
  const [showReportedTooltip, setShowReportedTooltip] = useState(false);
  const [showConnectivityTooltip, setShowConnectivityTooltip] = useState(false);

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
          {/* Last reported data */}
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

          {/* Connectivity */}
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

      {/* ROW 1: Water Cards */}
      <div className="dashboard-row">
        <WaterSavedCard
          totalSaved={totalWaterSaved}
          backgroundColor="#9b8af7"
        />
        <WaterUsedCard totalUsed={totalWaterUsed} backgroundColor="#ff7b7b" />
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

      {/* LAST IRRIGATE TABLE */}
      <LastIrrigateTable lastIrrigateEvents={lastIrrigateEvents} />

      {/* CHART MODAL */}
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
