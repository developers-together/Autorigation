// src/ApiDocumentation.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import "./ApiDocumentation.css";

const ApiDocumentation = () => {
  const baseURL =
    "https://code-crackers-54bb0-default-rtdb.europe-west1.firebasedatabase.app/";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="api-doc-container">
      <header className="api-doc-header">
        <h1>🌱 Smart Irrigation System API Documentation</h1>
        <p>
          <strong>Version:</strong> 1.0
        </p>
        <div className="base-url-container">
          <strong>Base URL:</strong>
          <span
            className="base-url"
            onClick={copyToClipboard}
            title="Click to copy"
          >
            {baseURL}
          </span>
          <button
            className="copy-btn"
            onClick={copyToClipboard}
            title="Copy Base URL"
          >
            <FaCopy size={16} />
          </button>
          {copied && <span className="copy-notice">Copied!</span>}
        </div>
      </header>

      <section className="api-doc-section">
        <h2>Introduction</h2>
        <p>
          The Smart Irrigation System API provides endpoints for monitoring
          environmental conditions, managing water usage, and configuring
          irrigation parameters. It enables seamless integration with IoT
          devices and web applications for remote monitoring and automation.
        </p>
      </section>

      <section className="api-doc-section">
        <h2>📌 1. Sensor Data (Environmental Readings)</h2>
        <p>
          Sensor data includes real-time readings for{" "}
          <strong>
            humidity, light, soil moisture, rain probability, and temperature
          </strong>
          .
        </p>

        <div className="api-endpoint">
          <h3>📍 Retrieve Sensor Data</h3>
          <p>
            <strong>Endpoint:</strong> GET /data
          </p>
          <p>
            <strong>Description:</strong> Fetches all recorded sensor data.
          </p>
          <pre className="api-code">
            {`{
  "2025-02-25_18-04-48": {
    "-OJyH607Zq3AxhFoaSpM": {
      "humidity": 45.9,
      "light": 98.92,
      "moisture": 51.13,
      "rainProbability": 12,
      "temperature": 18.7
    }
  }
}`}
          </pre>
        </div>

        <div className="api-endpoint">
          <h3>📍 Add Sensor Data</h3>
          <p>
            <strong>Endpoint:</strong> POST /data/{"{timestamp}"}
          </p>
          <p>
            <strong>Description:</strong> Adds a new sensor reading.
          </p>
          <pre className="api-code">
            {`{
  "humidity": 50.5,
  "light": 97.2,
  "moisture": 60.1,
  "rainProbability": 15,
  "temperature": 20.5
}`}
          </pre>
        </div>

        <div className="api-endpoint">
          <h3>📍 Delete Sensor Data</h3>
          <p>
            <strong>Endpoint:</strong> DELETE /data/{"{timestamp}"}/
            {"{entryId}"}
          </p>
          <p>
            <strong>Description:</strong> Deletes a specific sensor record.
          </p>
        </div>
      </section>

      <section className="api-doc-section">
        <h2>📌 2. Water Usage Monitoring</h2>

        <div className="api-endpoint">
          <h3>📍 Retrieve Water Usage Logs</h3>
          <p>
            <strong>Endpoint:</strong> GET /monitor
          </p>
          <p>
            <strong>Description:</strong> Fetches all water usage logs.
          </p>
          <pre className="api-code">
            {`{
  "2025-02-25_18-04-48": {
    "-OJyH6kaxTiUfv3uU3-6": {
      "waterUsed": 250
    }
  }
}`}
          </pre>
        </div>

        <div className="api-endpoint">
          <h3>📍 Log Water Usage</h3>
          <p>
            <strong>Endpoint:</strong> POST /monitor/{"{timestamp}"}
          </p>
          <p>
            <strong>Description:</strong> Logs the amount of water used during
            irrigation.
          </p>
          <pre className="api-code">
            {`{
  "waterUsed": 500
}`}
          </pre>
        </div>

        <div className="api-endpoint">
          <h3>📍 Delete Water Usage Log</h3>
          <p>
            <strong>Endpoint:</strong> DELETE /monitor/{"{timestamp}"}/
            {"{entryId}"}
          </p>
          <p>
            <strong>Description:</strong> Removes a specific water usage entry.
          </p>
        </div>
      </section>

      <section className="api-doc-section">
        <h2>📌 3. System Parameters & Configuration</h2>

        <div className="api-endpoint">
          <h3>📍 Retrieve System Parameters</h3>
          <p>
            <strong>Endpoint:</strong> GET /params
          </p>
          <p>
            <strong>Description:</strong> Fetches the current system parameters.
          </p>
          <pre className="api-code">
            {`{
  "FLOW_RATE": 250,
  "fbwatertime": 1,
  "maxtemp": 30,
  "minhumidity": 40,
  "minmoisture": 30,
  "mintemp": 30
}`}
          </pre>
        </div>

        <div className="api-endpoint">
          <h3>📍 Update System Parameters</h3>
          <p>
            <strong>Endpoint:</strong> PUT /params
          </p>
          <p>
            <strong>Description:</strong> Updates irrigation thresholds and flow
            rate.
          </p>
          <pre className="api-code">
            {`{
  "FLOW_RATE": 300,
  "maxtemp": 32,
  "minhumidity": 35,
  "minmoisture": 28
}`}
          </pre>
        </div>
      </section>

      <section className="api-doc-section">
        <h2>📌 4. Water Consumption Summary</h2>

        <div className="api-endpoint">
          <h3>📍 Retrieve Water Usage Summary</h3>
          <p>
            <strong>Endpoint:</strong> GET /total
          </p>
          <p>
            <strong>Description:</strong> Fetches total water consumption and
            savings.
          </p>
          <pre className="api-code">
            {`{
  "totalWaterSaved": 100,
  "totalWaterUsed": 100
}`}
          </pre>
        </div>

        <div className="api-endpoint">
          <h3>📍 Update Water Usage Summary</h3>
          <p>
            <strong>Endpoint:</strong> PUT /total
          </p>
          <p>
            <strong>Description:</strong> Updates total water consumption
            statistics.
          </p>
          <pre className="api-code">
            {`{
  "totalWaterSaved": 200,
  "totalWaterUsed": 300
}`}
          </pre>
        </div>
      </section>

      <section className="api-doc-section">
        <h2>🔒 Authentication & Security</h2>
        <p>To secure API access, configure Firebase Database Rules:</p>
        <pre className="api-code">
          {`{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}`}
        </pre>
      </section>

      <section className="api-doc-section">
        <h2>📊 Summary of Endpoints</h2>
        <table className="api-summary-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sensor Data</td>
              <td>/data</td>
              <td>GET</td>
              <td>Fetch all sensor readings</td>
            </tr>
            <tr>
              <td>Sensor Data</td>
              <td>/data/{"{timestamp}"}</td>
              <td>POST</td>
              <td>Add a new sensor reading</td>
            </tr>
            <tr>
              <td>Sensor Data</td>
              <td>
                /data/{"{timestamp}"}/{"{entryId}"}
              </td>
              <td>DELETE</td>
              <td>Delete a specific sensor reading</td>
            </tr>
            <tr>
              <td>Water Usage</td>
              <td>/monitor</td>
              <td>GET</td>
              <td>Fetch all water usage logs</td>
            </tr>
            <tr>
              <td>Water Usage</td>
              <td>/monitor/{"{timestamp}"}</td>
              <td>POST</td>
              <td>Log water usage</td>
            </tr>
            <tr>
              <td>Water Usage</td>
              <td>
                /monitor/{"{timestamp}"}/{"{entryId}"}
              </td>
              <td>DELETE</td>
              <td>Remove a water usage entry</td>
            </tr>
            <tr>
              <td>System Parameters</td>
              <td>/params</td>
              <td>GET</td>
              <td>Retrieve system settings</td>
            </tr>
            <tr>
              <td>System Parameters</td>
              <td>/params</td>
              <td>PUT</td>
              <td>Update system parameters</td>
            </tr>
            <tr>
              <td>Water Statistics</td>
              <td>/total</td>
              <td>GET</td>
              <td>Retrieve total water statistics</td>
            </tr>
            <tr>
              <td>Water Statistics</td>
              <td>/total</td>
              <td>PUT</td>
              <td>Update total water usage</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="api-doc-section"></section>

      <div className="api-nav">
        <Link className="api-nav-button" to="/">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ApiDocumentation;
