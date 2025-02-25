// src/components/LastIrrigateTable.jsx
import React from "react";
import "./LastIrrigateTable.css";

const LastIrrigateTable = ({ lastIrrigateEvents = [] }) => {
  const totalCycles = lastIrrigateEvents.length;

  return (
    <div className="irrigate-table">
      <div className="irrigate-table__header">
        <h2>Last Irrigate</h2>
        <span className="irrigate-table__description">
          Recent irrigation cycles
        </span>
        <span className="irrigate-table__total-cycles">
          Total cycles: {totalCycles}
        </span>
      </div>

      <div className="irrigate-table-content">
        <table>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "45%" }}>Date</th>
              <th style={{ width: "25%" }}>Water Used</th>
              <th style={{ width: "25%" }}>ID</th>
            </tr>
          </thead>
          <tbody>
            {lastIrrigateEvents.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.dateKey}</td>
                <td>{entry.waterUsed !== undefined ? entry.waterUsed : "—"}</td>
                <td>{entry.randomId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastIrrigateTable;
