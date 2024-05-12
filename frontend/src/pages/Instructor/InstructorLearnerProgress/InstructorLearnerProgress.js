
import React, { useState, useEffect } from 'react';
import './InstructorLearnerProgress.css';
import Sidebar from "../../../components/InstructorSidebar";

const InstructorLearnerProgress = () => {
  
  const mockLearnerProgress = [
    {
      name: "John Doe",
      courseTitle: "Introduction to Programming",
      progress: 75,
      score: 85,
      status: "In Progress"
    },
    {
      name: "Jane Smith",
      courseTitle: "Machine Learning Fundamentals",
      progress: 100,
      score: 95,
      status: "Completed"
    },
    {
      name: "Alice Johnson",
      courseTitle: "Data Structures & Algorithms",
      progress: 60,
      score: 70,
      status: "In Progress"
    },
    {
      name: "Bob Williams",
      courseTitle: "Web Development Bootcamp",
      progress: 90,
      score: 88,
      status: "Near Completion"
    }
  ];

 
  const [learners, setLearners] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

 
  useEffect(() => {
    const fetchLearnerProgress = () => {
      
      setTimeout(() => {
        setLearners(mockLearnerProgress);
      }, 1000);
    };

    fetchLearnerProgress();
  }, []);

  return (
    <div className={` ${sidebarVisible ? "with-sidebar" : ""}`}>
      <header className={`header ${sidebarVisible ? 'shifted' : ''}`}>
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">
            EduHub - Open Learning Platform - Instructor
          </h1>
        </div>
      </header>

      <Sidebar isOpen={sidebarVisible} />
      <div className={`mmain-content ${sidebarVisible ? 'shifted' : ''}`}>
        <div className="learner-progress-page">
          <h2>Learner Progress</h2>
          <table className="learner-progress-table">
            <thead>
              <tr>
                <th>Learner Name</th>
                <th>Course Title</th>
                <th>Progress</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {learners.length === 0 ? (
                <tr>
                  <td colSpan="5">No learner progress available.</td>
                </tr>
              ) : (
                learners.map((learner, index) => (
                  <tr key={index}>
                    <td>{learner.name}</td>
                    <td>{learner.courseTitle}</td>
                    <td>{learner.progress}%</td>
                    <td>{learner.score}</td>
                    <td>{learner.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InstructorLearnerProgress;
