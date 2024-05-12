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
                            href="/admincourses"
                            className={isActive('/admincourses') ? 'active-link' : ''}
                        >
                            Admin Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admincourses"
                            className={isActive('/admincourses') ? 'active-link' : ''}
                        >
                            Approve Courses
                        </a>
                    </li>
                    <li>
                        <a
                            href="/adminviewcoursedetails"
                            className={isActive('/adminviewcoursedetails') ? 'active-link' : ''}
                        >
                            View Course Details
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
