// src/hooks/useDBData.js
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export function useDBData() {
  const [testData, setTestData] = useState({});
  const [irrigateData, setIrrigateData] = useState({});

  useEffect(() => {
    // Example 1: Subscribe to "/test" node for sensor data
    const testRef = ref(database, "test");
    const unsubTest = onValue(testRef, (snapshot) => {
      if (snapshot.exists()) {
        setTestData(snapshot.val());
      } else {
        setTestData({});
      }
    });

    // Example 2: Subscribe to "/irrigation" node for irrigation events, if you have that
    // If you store irrigation data differently, adjust:
    const irrigateRef = ref(database, "irrigation");
    const unsubIrr = onValue(irrigateRef, (snapshot) => {
      if (snapshot.exists()) {
        setIrrigateData(snapshot.val());
      } else {
        setIrrigateData({});
      }
    });

    return () => {
      unsubTest();
      unsubIrr();
    };
  }, []);

  return { testData, irrigateData };
}
