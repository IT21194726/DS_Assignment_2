
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorViewCourses.css';
import Sidebar from "../../../components/InstructorSidebar";

const InstructorViewCourses = () => {
 
  const mockCourses = [
    {
      id: 1,
      title: "Introduction to Programming",
      structure: `
        This course covers Python basics, including variables, loops, functions, and conditionals.
        Students will learn efficient code practices with object-oriented programming.
        By the end, students will be able to build small projects to apply their newfound skills.
      `,
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      structure: `
        Learn HTML, CSS, JavaScript, and build a full-stack web application from scratch.
        The course covers responsive web design, JavaScript frameworks, and working with back-end APIs.
        Students will also develop practical skills by creating multiple web projects.
      `,
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      structure: `
        Explore data processing, feature engineering, and training machine learning models.
        Learn supervised and unsupervised techniques like decision trees and neural networks.
        Gain experience through hands-on labs reinforcing key concepts in machine learning.
      `,
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      structure: `
        Gain knowledge of data structures like linked lists, stacks, and queues.
        Learn to implement and analyze sorting, searching, and graph algorithms.
        This course emphasizes problem-solving techniques and algorithm complexity analysis.
      `,
    },
    {
      id: 5,
      title: "Software Architecture",
      structure: `
          Gain knowledge of data structures like linked lists, stacks, and queues.
          Learn to implement and analyze sorting, searching, and graph algorithms.
          This course emphasizes problem-solving techniques and algorithm complexity analysis.
        `,
    },
  ];

  
  const [expandedCourse, setExpandedCourse] = useState(mockCourses[0].id);

 
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);

 
  const toggleCourse = (courseId) => {
    if (courseId === mockCourses[0].id) {
      setExpandedCourse(mockCourses[0].id); 
    } else {
      setExpandedCourse(expandedCourse === courseId ? mockCourses[0].id : courseId);
    }
  };


  const handleEdit = (courseId) => {
    navigate(`/editcourse/${courseId}`);
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
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
        <div className="ivc-page">
          <h2>Courses You've Added</h2>
          <ul className="ivc-list">
            {mockCourses.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              mockCourses.map((course) => (
                <li key={course.id} className="ivc-item">
                  <div
                    className="ivc-header"
                    onClick={() => toggleCourse(course.id)}
                  >
                    {course.title}
                    <span className={`ivc-arrow ${expandedCourse === course.id ? 'expanded' : ''}`}>&#x25BC;</span>
                    
                    <button
                      className="ivc-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleEdit(course.id);
                      }}
                    >
                      edit
                    </button>
                  </div>
                  {expandedCourse === course.id && (
                    <div className="ivc-content">
                      <p>{course.structure}</p>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default InstructorViewCourses;
