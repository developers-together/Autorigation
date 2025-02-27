// src/components/TempRangeWidget.jsx
import React, { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import "./RangeWidget.css";

const TempRangeWidget = () => {
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");

  useEffect(() => {
    const minTempRef = ref(database, "params/mintemp");
    const maxTempRef = ref(database, "params/maxtemp");

    const unsubscribeMin = onValue(minTempRef, (snapshot) => {
      if (snapshot.exists()) {
        setMinTemp(snapshot.val());
      }
    });
    const unsubscribeMax = onValue(maxTempRef, (snapshot) => {
      if (snapshot.exists()) {
        setMaxTemp(snapshot.val());
      }
    });
    return () => {
      unsubscribeMin();
      unsubscribeMax();
    };
  }, []);

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMinTemp(value);
    set(ref(database, "params/mintemp"), Number(value)).catch((err) =>
      console.error("Error updating mintemp:", err)
    );
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxTemp(value);
    set(ref(database, "params/maxtemp"), Number(value)).catch((err) =>
      console.error("Error updating maxtemp:", err)
    );
  };

  return (
    <div className="range-widget">
      <label className="widget-label">Min/Max Temp (°C)</label>
      <div className="range-inputs">
        <input
          type="number"
          placeholder="Min"
          min="-20"
          max="50"
          value={minTemp}
          onChange={handleMinChange}
        />
        <input
          type="number"
          placeholder="Max"
          min="-20"
          max="50"
          value={maxTemp}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default TempRangeWidget;
