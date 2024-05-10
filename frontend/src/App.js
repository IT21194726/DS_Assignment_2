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
import InstructorDashboard from "./pages/Instructor/InstructorDashboard/InstructorDashboard";
import AddCourse from "./pages/Instructor/AddCourse/AddCourse";
import InstructorViewCourses from "./pages/Instructor/InstructorViewCourses/InstructorViewCourses";
import InstructorLearnerProgress from "./pages/Instructor/InstructorLearnerProgress/InstructorLearnerProgress";
import EditCourse from "./pages/Instructor/EditCourse/EditCourse";

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
        <Route path="/instructordashboard" element={<InstructorDashboard />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/instructorviewcourses" element={<InstructorViewCourses />} />
        <Route path="/instructorlearnerprogress" element={<InstructorLearnerProgress />} />
        <Route path="/editcourse/:courseId" element={<EditCourse/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
