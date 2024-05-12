import React from "react";
import "./InstructorSidebar.css";

function Sidebar({ isOpen }) {
  
    const currentPath = window.location.pathname;

    
    const isActive = (path) => currentPath === path;

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <img src="/Edulogo.png" alt="EduHub Logo" className="logoo" />
            <nav>
                <ul>
                    <li>
                        <a
                            href="/instructordashboard"
                            className={isActive('/instructordashboard') ? 'active-link' : ''}
                        >
                            Instructor Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="/addcourse"
                            className={isActive('/addcourse') ? 'active-link' : ''}
                        >
                            Add Course
                        </a>
                    </li>
                    <li>
                        <a
                            href="/instructorviewcourses"
                            className={isActive('/instructorviewcourses') ? 'active-link' : ''}
                        >
                            View Courses
                        </a>
                    </li>
                    <li>
                        <a
                            href="/instructorviewcourses"
                            className={isActive('/editcourse/:courseId') ? 'active-link' : ''}
                        >
                            Manage Courses
                        </a>
                    </li>
                    <li>
                        <a
                            href="/instructorlearnerprogress"
                            className={isActive('/instructorlearnerprogress') ? 'active-link' : ''}
                        >
                            View Learner Progress
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
