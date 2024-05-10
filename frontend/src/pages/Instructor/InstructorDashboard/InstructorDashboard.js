import React, { useState } from "react";
import "./InstructorDashboard.css";
import Sidebar from "../../../components/InstructorSidebar";
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
const courseAnalytics = [
  {
    courseName: "Web Development - 1",
    progress: 75,
    studentsEnrolled: 120,
  },
  {
    courseName: "Python Programming",
    progress: 40,
    studentsEnrolled: 80,
  },
];

function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
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
    <div className={` ${sidebarVisible ? 'with-sidebar' : ''}`}>
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
        <div className="dashboard-container" >

          <div className="main-content">

            <section className="hero">
              <img
                src="/WelcomeImageInstructor.jpg"
                alt="Welcome Banner"
                className="welcome-image"
              />
              <div className="hero-content">
                <h2>Elevate Your Teaching Journey.</h2>
              </div>
            </section>

            {/* Kick-Start Section with Background */}
            <section
              className="kick-start"
              style={{
                backgroundImage: "url('/EduPicInstructor2.jpg')", margin: 5, height:'auto'
              }}
            >
              <div style={{ margin:5}}>
                <h2>Empowering Educators for Excellence</h2>
                <h4>with the EduHub Open learning Platform</h4>
                <hr className="red-line" />
                <p>
                  Customize Your Approach: Manage courses to your liking, tailoring
                  content and delivery methods to best suit your teaching style.
                </p>
                <p>
                  Innovate Your Instruction: Embrace new teaching methods and
                  technologies to engage students in innovative and effective ways.
                </p>
                <p>
                  Unlock Your Potential: Tap into your creativity and expertise to
                  create dynamic and impactful learning experiences
                </p>
                <p>
                  Foster Collaboration: Connect with fellow educators to share
                  ideas, resources, and support each other's professional growth.
                </p>
                <p>
                  Celebrate Your Achievements: Recognize the difference you're
                  making in students' lives and celebrate your successes along the
                  way.
                </p>
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
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column (Smaller Section) */}
          <aside className="sidebar-info">
            {/* Course Analytics */}
            <div className="info-box">
              <h2 className="info-title">Course Analytics</h2>
              <ul className="analytics-list">
                {courseAnalytics
                  .slice(-3) // Get the last three courses
                  .map((course, index) => (
                    <li key={index}>
                      <h3>{course.courseName}</h3>
                      <p>Progress: {course.progress}%</p>
                      <p>Students Enrolled: {course.studentsEnrolled}</p>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Calendar Section */}
            <div className="calendar">
              <h2 className="info-title">Calendar</h2>
              <Calendar value={selectedDate} onChange={setSelectedDate} />
            </div>
            <div className="upcoming-events">
              <h2 className="info-title">Upcoming Events</h2>
              <ul>
                <li>There are no upcoming events</li>
              </ul>
            </div>
          </aside>
        </div>
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
