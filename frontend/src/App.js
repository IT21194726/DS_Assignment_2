import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import SiteHome from "./pages/SiteHome";
import Dashboard from "./pages/Dashboard";




function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/sitehome" element={<SiteHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
        
        
      </Routes>
    </Router>
  );
}

export default App;
