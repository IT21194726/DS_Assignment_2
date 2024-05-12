import React, { useState } from "react";
import "./SiteHome.css";
import Sidebar from '../../components/Sidebar';

function HomePage() {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
      <div className={`add-course-page ${sidebarVisible ? "with-sidebar" : ""}`}>
    
      <header className={`header ${sidebarVisible ? "shifted" : ""}`}>
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">EduHub - Open Learning Platform</h1>
        </div>
      </header>


      <Sidebar isOpen={sidebarVisible} />

      
      <div className={`mmain-content ${sidebarVisible ? "shifted" : ""}`}>
      <section className="hero">
        <img src="/EduPic1.jpg" alt="Main Image" className="hero-image" />
        <div className="hero-content">
          <h2>EduHub: Unleash your potential with curated courses and seamless collaboration—where personalized learning meets endless possibilities.</h2>
          
        </div>
      </section>

       
       <section className="it-industry">
        <h2>Would you like to enter the IT industry?</h2>
        <p>You can obtain an industry-recognized qualification free of charge from EduHub</p>
        <div className="industry-cards">
          <div className="industry-card dark-red">
            <h3>FLEXIBLE MODULES</h3>
            <p>Tailor your educational path with flexible, self-paced modules aligned to your goals, offering a structured yet customizable learning journey.</p>
          </div>
          <div className="industry-card dark-gray">
            <h3>CAREER ADVANCEMENT</h3>
            <p>Elevate your career prospects with personalized guidance, resume-building workshops, and mock interviews that prepare you for top roles.</p>
          </div>
          <div className="industry-card dark-red">
            <h3>CERTIFICATION PROGRAM</h3>
            <p>Earn a recognized certification that demonstrates your expertise, providing a competitive edge when applying for your next role.</p>
          </div>
          <div className="industry-card dark-gray">
            <h3>HANDS-ON SKILL DEVELOPMENT</h3>
            <p>Engage in practical exercises that empower you to confidently apply new knowledge in real-world situations.</p>
          </div>
        </div>
      </section>

      
      <section className="kick-start" style={{ backgroundImage: "url('/EduPic2.png')" }}>
        <h2>Kick-start Your Career as a Software Developer</h2>
        <h4>with the EduHub Open learning Platform</h4>
        <hr className="red-line" />
        <p>This six-module programme will provide full stack software development exposure to learners.</p>
        <p>Upon successful completion of each module, participants will receive a certificate of participation.</p>
        <p>Prior qualification or experience is not required to register for these courses.</p>
        <p>Courses are developed by the Departments of Computer Science and Engineering and Information Technology in collaboration with industry professionals.</p>
        <p>This endeavour is administered by the Centre for Open and Distance Learning, University of Moratuwa, and sponsored by DP Education.</p>
      </section>

     
      <section className="courses">
        <h2>Courses</h2>
        <div className="course-cards">
          <div className="course-card">
            <img src="/EduPic3.png" alt="Python Programming" />
            <h3>Python Programming</h3>
            <p>Learn Python from scratch.</p>
          </div>
          <div className="course-card">
            <img src="/EduPic3.png" alt="Python Programming" />
            <h3>Python Programming</h3>
            <p>Learn Python from scratch.</p>
          </div>
          <div className="course-card">
            <img src="/EduPic3.png" alt="Python Programming" />
            <h3>Python Programming</h3>
            <p>Learn Python from scratch.</p>
          </div>
          <div className="course-card">
            <img src="/EduPic3.png" alt="Python Programming" />
            <h3>Python Programming</h3>
            <p>Learn Python from scratch.</p>
          </div>
        </div>
      </section>

      
      <footer className="footer">
        <div className="contact-info">
          <h4>Get in Touch</h4>
          <p>EduHuba</p>
          <p>Phone: 011 309 278</p>
          <p>Email: eduhub@gmail.com</p>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default HomePage;
