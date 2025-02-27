// src/components/MoistRangeWidget.jsx
import React, { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import "./RangeWidget.css";

const MoistRangeWidget = () => {
  const [minMoisture, setMinMoisture] = useState("");

  useEffect(() => {
    const moistRef = ref(database, "params/minmoisture");
    const unsubscribe = onValue(moistRef, (snapshot) => {
      if (snapshot.exists()) {
        setMinMoisture(snapshot.val());
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setMinMoisture(value);
    set(ref(database, "params/minmoisture"), Number(value)).catch((err) =>
      console.error("Error updating minmoisture:", err)
    );
  };

  return (
    <div className="range-widget">
      <label className="widget-label">Min Moisture (%)</label>
      <div className="range-inputs">
        <input
          type="number"
          placeholder="Min"
          min="0"
          max="100"
          value={minMoisture}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default MoistRangeWidget;
