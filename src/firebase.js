import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBy0MWQWGOAlrSWasHzGpCP9OZP3Dv2Qzo",
  authDomain: "code-crackers-54bb0.firebaseapp.com",
  databaseURL:
    "https://code-crackers-54bb0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "code-crackers-54bb0",
  storageBucket: "code-crackers-54bb0.firebasestorage.app",
  messagingSenderId: "515427135834",
  appId: "1:515427135834:web:f946e9875be67f12e98363",
  measurementId: "G-PVXCENVVMF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export { database };
