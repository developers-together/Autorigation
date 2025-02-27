// src/components/FlowRateWidget.jsx
import React from "react";
import "./FlowRateWidget.css";

const FlowRateWidget = () => {
  return (
    <div className="flow-rate-widget">
      <label className="widget-label">Control Flow Rate</label>
      <select className="flow-rate-select">
        <option value="1">1 second || 250 ml</option>
        <option value="2">2 seconds || 500 ml</option>
        <option value="3">3 seconds || 750 ml</option>
        <option value="4">4 seconds || 1000 ml</option>
        <option value="5">5 seconds || 1250 ml</option>
        <option value="6">6 seconds || 1500 ml</option>
        <option value="7">7 seconds || 1750 ml</option>
        <option value="8">8 seconds || 2000 ml</option>
        <option value="9">9 seconds || 2250 ml</option>
        <option value="10">10 seconds || 2500 ml</option>
      </select>
    </div>
  );
};

export default FlowRateWidget;
