// src/components/LastIrrigateTable.jsx
import React from "react";
import "./LastIrrigateTable.css";
import { FaStar } from "react-icons/fa";

/**
 * Parse "2025-02-25_15-17-07" into { date: "2025-02-25", time: "15:17:07" }
 */
function parseDateTime(dateKey) {
  if (!dateKey.includes("_")) {
    return { date: dateKey, time: "" };
  }
  const [datePart, timePart] = dateKey.split("_"); // e.g. ["2025-02-25", "15-17-07"]
  // we might want to convert "15-17-07" -> "15:17:07"
  const timeStr = timePart.replace(/-/g, ":"); // "15:17:07"
  return { date: datePart, time: timeStr };
}

const LastIrrigateTable = ({ lastIrrigateEvents = [] }) => {
  // 1) Sort the events by time descending, so the newest is first
  //    We assume dateKey is a lexically ascending timestamp, so we just reverse it.
  //    If needed, we can parse into real date objects. For now, we'll do a simple reverse.
  const sortedDesc = [...lastIrrigateEvents].reverse();

  // 2) The total number of cycles
  const totalCycles = sortedDesc.length;

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
            {sortedDesc.map((entry, idx) => {
              // parse date/time from dateKey
              const { date, time } = parseDateTime(entry.dateKey);
              // if idx === 0 => icon
              const firstCol = idx === 0 ? <FaStar /> : idx + 1;

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
