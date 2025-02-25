// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Your Firebase config from the console
  apiKey: "AIzaSy...",
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

// Realtime Database
export const database = getDatabase(app);
