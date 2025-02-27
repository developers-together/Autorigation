// src/components/LastIrrigateTable.jsx
import React from "react";
import "./LastIrrigateTable.css";
import { FaStar } from "react-icons/fa";

/**
 * Parse a timestamp string "yyyy-mm-dd_HH-MM-SS" into { date, time }
 * For example: "2025-02-25_15-17-07" => { date: "2025-02-25", time: "15:17:07" }
 */
function parseDateTime(dateKey) {
  if (!dateKey.includes("_")) return { date: dateKey, time: "" };
  const [datePart, timePart] = dateKey.split("_");
  const timeStr = timePart.replace(/-/g, ":");
  return { date: datePart, time: timeStr };
}

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
        <table className="hoverable-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "30%" }}>Date</th>
              <th style={{ width: "30%" }}>Time</th>
              <th style={{ width: "35%" }}>Water Used</th>
            </tr>
          </thead>
          <tbody>
            {lastIrrigateEvents.map((entry, idx) => {
              const { date, time } = parseDateTime(entry.dateKey);
              // For the first (newest) entry, show an icon
              const firstCol = idx === 0 ? <FaStar color="#ffd700" /> : idx + 1;
              return (
                <tr key={idx}>
                  <td>{firstCol}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{entry.waterUsed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastIrrigateTable;
