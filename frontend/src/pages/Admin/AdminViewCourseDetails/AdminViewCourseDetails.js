
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminViewCourseDetails.css';
import Sidebar from "../../../components/AdminSidebar";


const initialCourses = [
  {
    id: 1,
    title: "Introduction to Programming",
    instructor: "Vimal Kariyavamsa",
    titleImage: "/images/intro_programming.jpg",
    outcomes: ['Understand loops', 'Basic OOP', 'Functions'],
    mainTopics: [
      {
        title: "Variables and Data Types",
        subtopics: [
          { title: "Primitive Types", video: "/videos/primitive_types.mp4", slides: "/slides/primitive_types.pdf", notes: "/notes/primitive_types.docx" },
          { title: "Composite Types", video: "/videos/composite_types.mp4", slides: "/slides/composite_types.pdf", notes: "/notes/composite_types.docx" },
          { title: "Strings and Collections", video: "/videos/strings_collections.mp4", slides: "/slides/strings_collections.pdf", notes: "/notes/strings_collections.docx" }
        ],
        quiz: [
          {
            question: "What is a variable?",
            answers: ["A type of loop", "A data container", "A Python keyword", "A type of function"],
            correctAnswer: 1
          },
          {
            question: "What type stores a floating-point number?",
            answers: ["Integer", "String", "Float", "Boolean"],
            correctAnswer: 2
          }
        ]
      },
      {
        title: "Control Structures and Functions",
        subtopics: [
          { title: "Conditional Statements", video: "/videos/conditionals.mp4", slides: "/slides/conditionals.pdf", notes: "/notes/conditionals.docx" },
          { title: "Loops", video: "/videos/loops.mp4", slides: "/slides/loops.pdf", notes: "/notes/loops.docx" },
          { title: "Functions", video: "/videos/functions.mp4", slides: "/slides/functions.pdf", notes: "/notes/functions.docx" }
        ],
        quiz: [
          {
            question: "What is the purpose of a loop?",
            answers: ["To execute a block of code once", "To repeat a block of code", "To define variables", "To connect different programs"],
            correctAnswer: 1
          },
          {
            question: "Which keyword is used to define a function in Python?",
            answers: ["func", "function", "def", "lambda"],
            correctAnswer: 2
          }
        ]
      }
    ]
  }
];



const AdminViewCourseDetails = () => {
  
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

 
  useEffect(() => {
    const selectedCourse = initialCourses.find((c) => c.id === parseInt(courseId, 10));
    setCourse(selectedCourse);
  }, [courseId]);

 
  const updateStatusAndNavigate = (status) => {
    const updatedCourses = initialCourses.map((c) =>
      c.id === parseInt(courseId, 10) ? { ...c, status } : c
    );
    navigate('/admincourses', { state: { updatedCourses } });
  };

  if (!course) {
    return <p>Course not found.</p>;
  }
  

  return (
    <div className={`add-course-page ${sidebarVisible ? "with-sidebar" : ""}`}>
      {/* Header Section */}
      <header className={`header ${sidebarVisible ? "shifted" : ""}`}>
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">EduHub - Course Approval Dashboard - Admin</h1>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarVisible} />

      {/* Main Content Section */}
      <div className={`mmain-content ${sidebarVisible ? "shifted" : ""}`}>
    <div className="AVCD-page">
      <h1 className="AVCD-title">Course Details: {course.title}</h1>
      <table className="AVCD-table">
        <tbody>
          <tr>
            <td>Instructor:</td>
            <td>{course.instructor}</td>
          </tr>
          <tr>
            <td>Title Image:</td>
            <td>
              <img src={course.titleImage} alt="Course Title" className="AVCD-title-image" />
            </td>
          </tr>
          <tr>
            <td>Outcomes:</td>
            <td>
              <ul>
                {course.outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </td>
          </tr>
          {course.mainTopics.map((topic, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>Main Topic {index + 1}:</td>
                <td>{topic.title}</td>
              </tr>
              <tr>
                <td>Subtopics:</td>
                <td>
                  <ul>
                    {topic.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex}>
                        {subtopic.title}
                        <div>
                          <a href={subtopic.video}>Watch Video</a> |
                          <a href={subtopic.slides} download> Download Slides</a> |
                          <a href={subtopic.notes} download> Download Notes</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Quiz Questions:</td>
                <td>
                  <ul>
                    {topic.quiz.map((question, qIndex) => (
                      <li key={qIndex}>
                        {`Q${qIndex + 1}: ${question.question}`}
                        <ul>
                          {question.answers.map((answer, aIndex) => (
                            <li key={aIndex} style={{ color: aIndex === question.correctAnswer ? 'green' : 'black' }}>
                              {answer}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="AVCD-buttons">
        <button className="AVCD-button back" onClick={() => navigate('/admincourses')}>Back</button>
        <button className="AVCD-button approve" onClick={() => updateStatusAndNavigate('Approved')}>Approve</button>
        <button className="AVCD-button decline" onClick={() => updateStatusAndNavigate('Declined')}>Decline</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AdminViewCourseDetails;
