// src/EnvironmentBox.jsx
import React from "react";
import "./EnvironmentBox.css";

const EnvironmentBox = ({ temperature, humidity, moisture }) => {
  return (
    <div className="env-box">
      <h3 className="env-box__title">Environment</h3>
      <div className="env-box__metrics">
        <div className="env-box__metric">
          <span className="env-box__metric-label">Temperature</span>
          <span className="env-box__metric-value">{temperature}°C</span>
        </div>
        <div className="env-box__metric">
          <span className="env-box__metric-label">Humidity</span>
          <span className="env-box__metric-value">{humidity}%</span>
        </div>
        <div className="env-box__metric">
          <span className="env-box__metric-label">Moisture</span>
          <span className="env-box__metric-value">{moisture}</span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentBox;
