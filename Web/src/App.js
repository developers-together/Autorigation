import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import ApiDocumentation from "./ApiDocumentation";

function App() {
  return (
    <BrowserRouter>
      {/* REMOVE or comment out this nav block */}
      {/* 
      <nav>
        <Link to="/api-docs">API Docs</Link>
      </nav>
      */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/api-docs" element={<ApiDocumentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
