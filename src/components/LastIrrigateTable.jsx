import React from "react";
import "./LastIrrigateTable.css";

const mockData = [
  { date: "01 Sep 2025", time: "09:15", waterUsed: "200 ml" },
  { date: "31 Aug 2025", time: "14:40", waterUsed: "300 ml" },
  { date: "30 Aug 2025", time: "12:20", waterUsed: "250 ml" },
  { date: "29 Aug 2025", time: "08:05", waterUsed: "180 ml" },
  { date: "28 Aug 2025", time: "07:50", waterUsed: "220 ml" },
  { date: "27 Aug 2025", time: "10:10", waterUsed: "310 ml" },
  // ... more items
];

const LastIrrigateTable = () => {
  const totalCycles = mockData.length;

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
              <th style={{ width: "25%" }}>Time</th>
              <th style={{ width: "25%" }}>Water Used</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.date}</td>
                <td>{entry.time}</td>
                <td>{entry.waterUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastIrrigateTable;
