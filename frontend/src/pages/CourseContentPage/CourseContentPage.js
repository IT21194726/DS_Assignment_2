import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import AccordionExpandDefault from '../../components/AccordionForContent';
import CourseOverview from '../../data/CourseOverview';



function CourseContent() {
    const location = useLocation();
    const { course, image, id } = location.state || {};
    const [sidebarVisible, setSidebarVisible] = useState(false);
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const selectedCourse = CourseOverview.find(overview => overview.id === id);

    return (
        <div style={{ backgroundColor: '#f9f9fa' }} className={`homepage ${sidebarVisible ? "with-sidebar" : "hello"}`}>

            <header style={{ position: 'relative' }} className="header">
                <div className="header-content">
                    <button className="menu-btn" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
                    <h1 className="title">EduHub - Open Learning Platform</h1>
                </div>
            </header>
            <Sidebar isOpen={sidebarVisible} />


            <div style={{ margin: 50 }}>
                {/* <div>
                    {course && image ? (
                        <div>
                            <h5>{course}</h5>
                            <img src={image} alt={course} style={{ width: '40%', height: '20%' }} />
                        </div>
                    ) : (
                        <p>No course data was provided.</p>
                    )}
                </div> */}
                <div class="card">
                    <h5 style={{ backgroundColor: 'white' }} class="card-header">
                        Course Content
                    </h5>
                    <div class="card-body">
                        <AccordionExpandDefault courseTopics={selectedCourse.content} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CourseContent