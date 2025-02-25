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

// Icons
import { FaHistory, FaWifi } from "react-icons/fa";

/**
 * Chart configs: dataType => "temperature" | "humidity" | "moisture" | "light".
 * We store these to pass into the SensorChartCard. currentValue is updated with the latest reading.
 */
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
  // ------------------------
  // 1) State for DB data
  // ------------------------
  const [dataNode, setDataNode] = useState({});
  const [monitorNode, setMonitorNode] = useState({});

  // ------------------------
  // 2) Fetch from Firebase
  // ------------------------
  useEffect(() => {
    // A) Subscribe to /data
    const dataRef = ref(database, "data");
    const unsubData = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setDataNode(snapshot.val());
      } else {
        setDataNode({});
      }
    });

    // B) Subscribe to /monitor
    const monitorRef = ref(database, "monitor");
    const unsubMon = onValue(monitorRef, (snapshot) => {
      if (snapshot.exists()) {
        setMonitorNode(snapshot.val());
      } else {
        setMonitorNode({});
      }
    });

    return () => {
      unsubData();
      unsubMon();
    };
  }, []);

  // ------------------------
  // 3) Derive "latest" reading from /data
  //    + last connection time
  // ------------------------
  const {
    latestReading, // e.g. { humidity, temperature, moisture, light, ...}
    lastConnectionTime, // e.g. "2025-02-25_14-00-06"
  } = useMemo(() => {
    let latestReading = null;
    let lastConnectionTime = null;

    // dataNode is an object with dateKey => randomChild => reading
    // We'll sort date keys to find the last one
    const dateKeys = Object.keys(dataNode).sort();
    if (dateKeys.length > 0) {
      // e.g. "2025-02-25_14-00-06"
      const lastDate = dateKeys[dateKeys.length - 1];
      lastConnectionTime = lastDate;

      const randomChildObj = dataNode[lastDate];
      if (randomChildObj && typeof randomChildObj === "object") {
        const childKeys = Object.keys(randomChildObj);
        if (childKeys.length > 0) {
          // We'll just take the first child for "latest"
          latestReading = randomChildObj[childKeys[0]];
        }
      }
    }

    return { latestReading, lastConnectionTime };
  }, [dataNode]);

  // ------------------------
  // 4) Water Saved/Used from /monitor
  //    + build data for Last Irrigate
  // ------------------------
  const { totalWaterSaved, totalWaterUsed, lastIrrigateEvents } =
    useMemo(() => {
      // monitorNode might look like:
      // {
      //   "2025-02-25_14-00-06": { "-OJxP6jUHjOz46NitNGL": { waterUsed: -100 } },
      //   "fbwatertime": 1,
      //   "totalWaterSaved": 100,
      //   "totalWaterUsed": 100
      // }
      const totalWaterSaved = monitorNode.totalWaterSaved || 0;
      const totalWaterUsed = monitorNode.totalWaterUsed || 0;

      // For the last irrigate table, we look for date-like keys in monitorNode
      const monitorKeys = Object.keys(monitorNode).filter((k) =>
        // naive check: if it has an underscore, might be a date
        k.includes("_")
      );

      // Build a list of irrigation events
      let lastIrrigateEvents = [];
      monitorKeys.sort().forEach((mk) => {
        const randomObj = monitorNode[mk];
        if (randomObj && typeof randomObj === "object") {
          // e.g. { "-OJxP6jUHjOz46NitNGL": { waterUsed: -100 } }
          Object.keys(randomObj).forEach((rk) => {
            const event = randomObj[rk];
            if (event && typeof event === "object") {
              lastIrrigateEvents.push({
                dateKey: mk,
                randomId: rk,
                ...event,
              });
            }
          });
        }
      });

      return { totalWaterSaved, totalWaterUsed, lastIrrigateEvents };
    }, [monitorNode]);

  // ------------------------
  // 5) Last Connection Icon / Charts
  // ------------------------
  // We'll show lastConnectionTime in the tooltip
  const [showReportedTooltip, setShowReportedTooltip] = useState(false);
  const [showConnectivityTooltip, setShowConnectivityTooltip] = useState(false);
  const lastReported = lastConnectionTime || "No data yet";

  // If you want to decide connectivity based on time differences, do so here.
  const [isConnected] = useState(true);

  // Build chart configs with the real "currentValue" from latestReading
  const [expandedIndex, setExpandedIndex] = useState(null);
  const charts = useMemo(() => {
    if (!latestReading) return chartConfigs;
    return chartConfigs.map((cfg) => {
      const val = latestReading[cfg.dataType];
      if (val !== undefined) {
        return {
          ...cfg,
          currentValue: `${val}`,
        };
      }
      return cfg;
    });
  }, [latestReading]);

  const handleChartClick = (index) => setExpandedIndex(index);
  const handleCloseModal = () => setExpandedIndex(null);
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

  // ------------------------
  // 6) Render the same layout
  // ------------------------
  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="header-icons">
          {/* Last reported data (from "data") */}
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
          totalSaved={`${totalWaterSaved} L`}
          percentage="+8% Since last cycle" // or from DB if available
          backgroundColor="#9b8af7"
        />
        <WaterUsedCard
          totalUsed={`${totalWaterUsed} L`}
          percentage="+5% Since last cycle"
          backgroundColor="#ff7b7b"
        />
      </div>

      {/* ROW 2: 4 Charts (Temperature, Humidity, Moisture, Light) */}
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

      {/* LAST IRRIGATE TABLE -> from the 'monitor' node */}
      <LastIrrigateTable lastIrrigateEvents={lastIrrigateEvents} />

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
