import React, { useState, } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar";
import { FaMedal } from "react-icons/fa";
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';

const recentCourses = [
  {
    id: 1,
    title: "Web Development",
    category: "Trainee - Full Stack Developer",
    progress: 100,
    image: "https://www.achieversit.com/uploads/course_image/web-dev-img.jpeg",
  },
  {
    id: 2,
    title: "Project Management",
    category: "Project Management",
    progress: 20,
    image: "https://uom.lk/sites/default/files/becon/images/Picture2_0.png",
  },
  {
    id: 3,
    title: "Python Programming",
    category: "Data Science",
    progress: 60,
    image: "https://www.interviewbit.com/blog/wp-content/uploads/2023/05/Artboard-1-copy-2.jpg",
  },
];

function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const coursesToShow = 2;
  const handleNavigation = (courseTitle, image, id) => {
    console.log('you clicked div tag:', courseTitle)
    
    navigate('/course', { state: { course: courseTitle, image: image, id: id } });
  }
  
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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`add-course-page ${sidebarVisible ? 'with-sidebar' : ''}`}>
    
    <header className={`header ${sidebarVisible ? 'shifted' : ''}`}>
      <div className="header-content">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
        <h1 className="title">EduHub - Open Learning Platform - Dashboard</h1>
      </div>
    </header>

   
    <Sidebar isOpen={sidebarVisible} />


  

    
    <div className={`mmain-content ${sidebarVisible ? 'shifted' : ''}`}>
    
      <div className="dashboard-container">
       
        <div className="main-content">
          
          <section className="hero">
            <img
              src="/WelcomeImage.jpg"
              alt="Welcome Banner"
              className="welcome-image"
            />
            <div className="hero-content">
              <h5>
                Each course is a step forward. Build your expertise with EduHub.
              </h5>
            </div>
          </section>



         
          <section className="recent-courses-section">
            <h2 className="recent-courses-title">Recently Accessed Courses</h2>
            <div className="recent-courses-container">
              <button className="nav-btn prev-btn" onClick={handlePrevious}>
                ←
              </button>
              <div className="recent-courses-list">
                {visibleCourses.map((course, index) => (
                  <div className="course2-card" key={index}>
                    <img src={course.image} alt={course.title} height={110} width={200} />
                    <h5>{course.title}</h5>
                    <p>{course.category}</p>
                  </div>
                ))}
              </div>
              <button className="nav-btn next-btn" onClick={handleNext}>
                →
              </button>
            </div>
          </section>

      
          <section className="course-overview">
            <h2 className="overview-title">Course Overview</h2>
            <div className="course-cards">
              {recentCourses.map((course, index) => (
                <div className="course-card" key={index} onClick={() => handleNavigation(course.title, course.image, course.id)}>
                  <img src={course.image} alt={course.title} />
                  <h5>{course.title}</h5>
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

      
        <aside className="sidebar-info">

          <div className="latest-badges">
            <h2 className="info-title">Latest Badges</h2>
            <ul className="badges-list">
              <li><FaMedal className="badge-icon" /> Certificate of Web Development</li>
              <li><FaMedal className="badge-icon" /> Certificate of Python Programming Basics</li>
              <li><FaMedal className="badge-icon" /> Certificate of Agile Project Management</li>
            </ul>
          </div>
         
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

      <footer className="dashboard-footer">
        <div className="dashboard-contact-info">
          <h4>Contact Us</h4>
          <p>EduHub</p>
          <p>Phone: 011 309 278</p>
          <p>Email: eduhub@example.com</p>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default Dashboard;
