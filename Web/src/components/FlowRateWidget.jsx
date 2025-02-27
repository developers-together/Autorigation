// src/components/FlowRateWidget.jsx
import React, { useState, useEffect } from "react";
import "./FlowRateWidget.css";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";

const FlowRateWidget = () => {
  // Local state to hold the current irrigation time
  const [flowTime, setFlowTime] = useState(1); // default to 1 if not set

  // On mount, subscribe to the "params/fbwatertime" node
  useEffect(() => {
    const fbTimeRef = ref(database, "params/fbwatertime");
    const unsubscribe = onValue(fbTimeRef, (snapshot) => {
      if (snapshot.exists()) {
        const currentTime = snapshot.val();
        setFlowTime(currentTime);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const selectedSeconds = Number(e.target.value);
    setFlowTime(selectedSeconds);
    // Update the fbwatertime under "params" in Firebase
    set(ref(database, "params/fbwatertime"), selectedSeconds)
      .then(() => {
        console.log("Irrigation time updated to:", selectedSeconds);
      })
      .catch((error) => {
        console.error("Error updating irrigation time:", error);
      });
  };

  return (
    <div className="flow-rate-widget">
      <label className="widget-label">Irrigation Time</label>
      <select
        className="flow-rate-select"
        onChange={handleChange}
        value={flowTime}
      >
        <option value={1}>1 second || 250 ml</option>
        <option value={2}>2 seconds || 500 ml</option>
        <option value={3}>3 seconds || 750 ml</option>
        <option value={4}>4 seconds || 1000 ml</option>
        <option value={5}>5 seconds || 1250 ml</option>
        <option value={6}>6 seconds || 1500 ml</option>
        <option value={7}>7 seconds || 1750 ml</option>
        <option value={8}>8 seconds || 2000 ml</option>
        <option value={9}>9 seconds || 2250 ml</option>
        <option value={10}>10 seconds || 2500 ml</option>
      </select>
    </div>
  );
};

export default FlowRateWidget;
