
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCourses.css';
import Sidebar from "../../../components/AdminSidebar";

const AdminCourses = () => {
  
  const initialCourses = [
    { id: 1, title: "Introduction to Programming", status: "Pending Approval" },
    { id: 2, title: "Web Development Bootcamp", status: "Approved" },
    { id: 3, title: "Machine Learning Fundamentals", status: "Pending Approval" },
    { id: 4, title: "Data Structures & Algorithms", status: "Pending Approval" },
    { id: 5, title: "Cloud Computing Basics", status: "Approved" },
    { id: 6, title: "Mobile App Development", status: "Declined" },
    { id: 7, title: "Network Security Essentials", status: "Pending Approval" },
    { id: 8, title: "Artificial Intelligence Overview", status: "Approved" }
  ];

  
  const [courses, setCourses] = useState(initialCourses);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  
  const approveCourse = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: "Approved" } : course
      )
    );
  };

  
  const declineCourse = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: "Declined" } : course
      )
    );
  };


  const resetCourseStatus = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: "Pending Approval" } : course
      )
    );
  };

 
  const viewCourseDetails = (id) => {
    navigate(`/adminviewcoursedetails/${id}`);
  };

  return (
    <div className={`add-course-page ${sidebarVisible ? "with-sidebar" : ""}`}>
     
      <header className={`header ${sidebarVisible ? "shifted" : ""}`}>
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">EduHub - Course Approval Dashboard - Admin</h1>
        </div>
      </header>

     
      <Sidebar isOpen={sidebarVisible} />

      
      <div className={`mmain-content ${sidebarVisible ? "shifted" : ""}`}>
    <div className="AC-page">
     
      <table className="AC-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td className="AC-status">{course.status}</td>
              <td>
                <button
                  className="AC-button view"
                  onClick={() => viewCourseDetails(course.id)}
                >
                  View Course Details
                </button>
                <button
                  className="AC-button approve"
                  onClick={() => approveCourse(course.id)}
                >
                  Approve
                </button>
                <button
                  className="AC-button decline"
                  onClick={() => declineCourse(course.id)}
                >
                  Decline
                </button>
                <button
                  className="AC-button reset"
                  onClick={() => resetCourseStatus(course.id)}
                >
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default AdminCourses;
