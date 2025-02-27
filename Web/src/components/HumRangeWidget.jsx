// src/components/HumRangeWidget.jsx
import React, { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import "./RangeWidget.css";

const HumRangeWidget = () => {
  const [minHumidity, setMinHumidity] = useState("");

  useEffect(() => {
    const humRef = ref(database, "params/minhumidity");
    const unsubscribe = onValue(humRef, (snapshot) => {
      if (snapshot.exists()) {
        setMinHumidity(snapshot.val());
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setMinHumidity(value);
    set(ref(database, "params/minhumidity"), Number(value)).catch((err) =>
      console.error("Error updating minhumidity:", err)
    );
  };

  return (
    <div className="range-widget">
      <label className="widget-label">Min Humidity (%)</label>
      <div className="range-inputs">
        <input
          type="number"
          placeholder="Min"
          min="0"
          max="100"
          value={minHumidity}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default HumRangeWidget;
