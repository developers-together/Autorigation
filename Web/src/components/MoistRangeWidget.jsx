// src/components/MoistRangeWidget.jsx
import React from "react";
import "./RangeWidget.css";

const MoistRangeWidget = () => {
  return (
    <div className="range-widget">
      <label className="widget-label">Min Moisture (%)</label>
      <div className="range-inputs">
        <input type="number" placeholder="Min" min="0" max="100" />
      </div>
    </div>
  );
};

export default MoistRangeWidget;
