import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import SiteHome from "./pages/SiteHome/SiteHome";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseDetailsPage from "./pages/CourseDetailsPage/CourseDetailsPage";
import CourseContentPage from "./pages/CourseContentPage/CourseContentPage"


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/sitehome" element={<SiteHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<CourseDetailsPage />} />
        <Route path="/content" element={<CourseContentPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
