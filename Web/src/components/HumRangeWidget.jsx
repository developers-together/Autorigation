// src/components/HumRangeWidget.jsx
import React from "react";
import "./RangeWidget.css";

const HumRangeWidget = () => {
  return (
    <div className="range-widget">
      <label className="widget-label">Min Humidity (%)</label>
      <div className="range-inputs">
        <input type="number" placeholder="Min" min="0" max="100" />
      </div>
    </div>
  );
};

export default HumRangeWidget;
