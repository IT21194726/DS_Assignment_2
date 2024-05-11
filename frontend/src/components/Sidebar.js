import React from "react";
import "./Sidebar.css";

function Sidebar({ isOpen }) {
    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <img src="/Edulogo.png" alt="EduHub Logo" className="logoo" />
            <nav>
                <ul>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/sitehome">Site Home</a></li>
                    <li><a href="/calendar">Calendar</a></li>
                    <li><a href="/courses">My Courses</a></li>

                    
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
