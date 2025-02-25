// src/components/ModalChart.jsx
import React from "react";
import "./ModalChart.css";
import { FaTimes } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import LineChartSensor from "./charts/LineChartSensor";

const ModalChart = ({
  chartIndex,
  charts,
  onClose,
  onPrevChart,
  onNextChart,
}) => {
  if (chartIndex == null) return null;

  const { title, accentColor, dataType, currentValue } = charts[chartIndex];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Title row */}
        <div className="modal-title-row">
          <h2 className="modal-title">{title}</h2>
          <span className="modal-subtitle">{currentValue}</span>
        </div>

        {/* Arrow controls */}
        <button className="arrow-button left-arrow" onClick={onPrevChart}>
          <FiArrowLeft size={24} />
        </button>
        <button className="arrow-button right-arrow" onClick={onNextChart}>
          <FiArrowRight size={24} />
        </button>

        {/* Large chart container -> same chart */}
        <div className="modal-chart-container">
          <LineChartSensor
            dataType={dataType}
            datasetLabel={title}
            accentColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalChart;
