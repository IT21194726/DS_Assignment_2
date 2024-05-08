import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar";
import { FaMedal } from "react-icons/fa"; 
import Calendar from "react-calendar"; 

const recentCourses = [
  {
    title: "Web Development - 1",
    category: "Trainee - Full Stack Developer",
    progress: 100,
    image: "/Course1.png",
  },
  {
    title: "Registration for Project Management",
    category: "Project Management",
    progress: 20,
    image: "/Course2.png",
  },
  {
    title: "Python Programming",
    category: "Data Science",
    progress: 60,
    image: "/Course3.png",
  },
];

function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const coursesToShow = 2;

  // Navigation functions for recently accessed courses
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + coursesToShow, recentCourses.length - coursesToShow)
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - coursesToShow, 0));
  };

  const visibleCourses = recentCourses.slice(
    currentIndex,
    currentIndex + coursesToShow
  );

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`homepage ${sidebarVisible ? "with-sidebar" : ""}`}>
      <header className="header">
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">EduHub - Open Learning Platform</h1>
        </div>
      </header>

      <Sidebar isOpen={sidebarVisible} />

      {/* Two-column Layout */}
      <div className="dashboard-container">
        {/* Main Column (Larger Section) */}
        <div className="main-content">
          {/* Welcome Section */}
          <section className="hero">
            <img
              src="/WelcomeImage.jpg"
              alt="Welcome Banner"
              className="welcome-image"
            />
            <div className="hero-content">
              <h2>
                Each course is a step forward. Build your expertise with EduHub.
              </h2>
            </div>
          </section>

          

          {/* Recently Accessed Courses Section */}
          <section className="recent-courses-section">
            <h2 className="recent-courses-title">Recently Accessed Courses</h2>
            <div className="recent-courses-container">
              <button className="nav-btn prev-btn" onClick={handlePrevious}>
                ←
              </button>
              <div className="recent-courses-list">
                {visibleCourses.map((course, index) => (
                  <div className="course2-card" key={index}>
                    <img src={course.image} alt={course.title} />
                    <h3>{course.title}</h3>
                    <p>{course.category}</p>
                  </div>
                ))}
              </div>
              <button className="nav-btn next-btn" onClick={handleNext}>
                →
              </button>
            </div>
          </section>

          {/* Course Overview Section */}
          <section className="course-overview">
            <h2 className="overview-title">Course Overview</h2>
            <div className="course-cards">
              {recentCourses.map((course, index) => (
                <div className="course-card" key={index}>
                  <img src={course.image} alt={course.title} />
                  <h3>{course.title}</h3>
                  <p>{course.category}</p>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p>{course.progress}% complete</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column (Smaller Section) */}
        <aside className="sidebar-info">
        
          <div className="latest-badges">
                        <h2 className="info-title">Latest Badges</h2>
                        <ul className="badges-list">
                            <li><FaMedal className="badge-icon" /> Certificate of Web Development</li>
                            <li><FaMedal className="badge-icon" /> Certificate of Python Programming Basics</li>
                            <li><FaMedal className="badge-icon" /> Certificate of Agile Project Management</li>
                        </ul>
                    </div>
          {/* Calendar Section */}
          <div className="calendar">
                        <h2 className="info-title">Calendar</h2>
                        <Calendar
                            value={selectedDate}
                            onChange={setSelectedDate} 
                        />
                    </div>
          <div className="upcoming-events">
            <h2 className="info-title">Upcoming Events</h2>
            <ul>
              <li>There are no upcoming events</li>
              
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <div className="dashboard-contact-info">
          <h4>Contact Us</h4>
          <p>EduHub</p>
          <p>Phone: 011 309 278</p>
          <p>Email: eduhub@example.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
