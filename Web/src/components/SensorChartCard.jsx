// src/components/SensorChartCard.jsx
import React from "react";
import "./SensorChartCard.css";
import LineChartSensor from "./charts/LineChartSensor";

const SensorChartCard = ({
  title,
  currentValue,
  accentColor,
  dataType,
  onChartClick,
  showFullDate,
}) => {
  return (
    <div className="sensor-chart-card" onClick={onChartClick}>
      <div className="sensor-chart-header">
        <div className="sensor-chart-title">{title}</div>
        <div className="sensor-chart-value" style={{ color: accentColor }}>
          {currentValue}
        </div>
      </div>

      <LineChartSensor
        dataType={dataType}
        datasetLabel={title}
        accentColor={accentColor}
        showFullDate={showFullDate} // forward the prop
      />
    </div>
  );
};

export default SensorChartCard;
