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

  // Handler for clicking overlay => close if user clicks outside content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-title-row">
          <h2 className="modal-title">{title}</h2>
          <span className="modal-subtitle">{currentValue}</span>
        </div>

        {/* Arrow Controls */}
        <button className="arrow-button left-arrow" onClick={onPrevChart}>
          <FiArrowLeft size={24} />
        </button>
        <button className="arrow-button right-arrow" onClick={onNextChart}>
          <FiArrowRight size={24} />
        </button>

        <div className="modal-chart-container">
          <LineChartSensor
            dataType={dataType}
            datasetLabel={title}
            accentColor={accentColor}
            showFullDate={
              true
            } /* If you're using the "showFullDate" approach */
          />
        </div>
      </div>
    </div>
  );
};

export default ModalChart;
