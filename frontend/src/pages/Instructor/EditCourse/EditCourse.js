
import React, { useState, useEffect } from 'react';
import InstructorSidebar from '../../../components/InstructorSidebar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useParams } from 'react-router-dom';
import '../AddCourse/AddCourse.css';
import Sidebar from "../../../components/InstructorSidebar";

const steps = ['Basic Info', 'Outcomes & Structure', 'Main Topics & Subtopics', 'Complete'];

const EditCourse = () => {
  
  const mockCourses = [
    {
      id: 1,
      title: "Introduction to Programming",
      titleImage: "/images/intro_programming.jpg", 
      outcomes: ['Understand loops', 'Basic OOP', 'Apply functions'],
      structure: "Covers Python basics including loops, functions, and OOP.",
      mainTopics: [
        {
          title: "Variables and Data Types",
          description: "Understanding variables and data types in Python.",
          subtopics: [
            { title: "Primitive Types", video: "/videos/primitive_types.mp4", slides: "/slides/primitive_types.pdf", notes: "/notes/primitive_types.docx" },
            { title: "Composite Types", video: "/videos/composite_types.mp4", slides: "/slides/composite_types.pdf", notes: "/notes/composite_types.docx" }
          ],
          quiz: [
            {
              question: "What is a variable?",
              answers: ["A type of loop", "A data container", "A Python keyword", "A type of function"],
              correctAnswer: 1
            },
            {
              question: "Which data type is used to store text?",
              answers: ["Integer", "Boolean", "String", "Float"],
              correctAnswer: 2
            },
            {
              question: "Which function returns the length of a string?",
              answers: ["size()", "count()", "len()", "length()"],
              correctAnswer: 2
            },
            {
              question: "What keyword is used to declare a variable in Python?",
              answers: ["int", "str", "var", "None"],
              correctAnswer: 3
            }
          ]
        },
        {
          title: "Loops and Functions",
          description: "Mastering loops and functions in Python.",
          subtopics: [
            { title: "For Loops", video: "/videos/for_loops.mp4", slides: "/slides/for_loops.pdf", notes: "/notes/for_loops.docx" },
            { title: "While Loops", video: "/videos/while_loops.mp4", slides: "/slides/while_loops.pdf", notes: "/notes/while_loops.docx" }
          ],
          quiz: [
            {
              question: "Which loop is better for iterating over a list?",
              answers: ["For Loop", "While Loop", "If Statement", "Switch Statement"],
              correctAnswer: 0
            },
            {
              question: "What is a function?",
              answers: ["A variable type", "A reusable block of code", "A class", "A keyword"],
              correctAnswer: 1
            },
            {
              question: "What is the keyword used to define a function in Python?",
              answers: ["func", "def", "lambda", "method"],
              correctAnswer: 1
            },
            {
              question: "Which loop iterates as long as a condition is true?",
              answers: ["For Loop", "While Loop", "Do-While Loop", "If Statement"],
              correctAnswer: 1
            }
          ]
        }
      ]
    }
  ];

 
  const { courseId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
 

 
  const [courseTitle, setCourseTitle] = useState('');
  const [titleImage, setTitleImage] = useState(null);
  const [outcomes, setOutcomes] = useState(['', '', '']);
  const [structure, setStructure] = useState('');
  const [mainTopics, setMainTopics] = useState([]);

 
  useEffect(() => {
    const selectedCourse = mockCourses.find((course) => course.id === parseInt(courseId, 10));
    if (selectedCourse) {
      
      setCourseTitle(selectedCourse.title);
      setTitleImage(selectedCourse.titleImage);
      setOutcomes(selectedCourse.outcomes);
      setStructure(selectedCourse.structure);
      setMainTopics(selectedCourse.mainTopics);
    }
  }, [courseId]);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  

  const handleTitleChange = (e) => setCourseTitle(e.target.value);
  const handleImageChange = (e) => setTitleImage(e.target.files[0]);
  const handleOutcomeChange = (index, value) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const handleTopicChange = (index, key, value) => {
    const newTopics = [...mainTopics];
    newTopics[index][key] = value;
    setMainTopics(newTopics);
  };

  const handleSubtopicChange = (topicIndex, subtopicIndex, key, value) => {
    const newTopics = [...mainTopics];
    newTopics[topicIndex].subtopics[subtopicIndex][key] = value;
    setMainTopics(newTopics);
  };

  const handleQuizQuestionChange = (topicIndex, questionIndex, key, value) => {
    const newTopics = [...mainTopics];
    if (key === 'answers') {
      newTopics[topicIndex].quiz[questionIndex][key][value.index] = value.text;
    } else {
      newTopics[topicIndex].quiz[questionIndex][key] = value;
    }
    setMainTopics(newTopics);
  };
  const [sidebarVisible, setSidebarVisible] = useState(true);


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="basic-info">
            <label>
              Course Title:
              <input type="text" value={courseTitle} onChange={handleTitleChange} required />
            </label>
            <label>
              Title Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {titleImage && <img src={titleImage} alt="Title" className="title-image-preview" />}
            </label>
          </div>
        );
      case 1:
        return (
          <div className="outcomes-structure">
            <h3>Outcomes</h3>
            {outcomes.map((outcome, index) => (
              <input
                key={index}
                type="text"
                value={outcome}
                onChange={(e) => handleOutcomeChange(index, e.target.value)}
                placeholder={`Outcome ${index + 1}`}
                required
              />
            ))}
            <label>
              Structure (2-3 lines):
              <textarea value={structure} onChange={(e) => setStructure(e.target.value)} required />
            </label>
          </div>
        );
      case 2:
        return (
          <div className="main-topics">
            <h3>Main Topics</h3>
            {mainTopics.map((topic, index) => (
              <div key={index} className="topic-box">
                <label>
                  Topic {index + 1}:
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) => handleTopicChange(index, 'title', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Description (2-3 lines):
                  <textarea
                    value={topic.description}
                    onChange={(e) => handleTopicChange(index, 'description', e.target.value)}
                    required
                  />
                </label>

                <h5>Subtopics</h5>
                {topic.subtopics.map((subtopic, subIndex) => (
                  <div key={subIndex} className="subtopic-box">
                    <label>
                      Subtopic {index + 1}.{subIndex + 1}:
                      <input
                        type="text"
                        value={subtopic.title}
                        onChange={(e) => handleSubtopicChange(index, subIndex, 'title', e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Lecture Video:
                      <input type="file" accept="video/*" onChange={(e) => handleSubtopicChange(index, subIndex, 'video', e.target.files[0])} />
                      {subtopic.video && <video controls src={subtopic.video} className="subtopic-video-preview" />}
                    </label>
                    <label>
                      Lecture Slides:
                      <input type="file" accept=".pdf,.pptx" onChange={(e) => handleSubtopicChange(index, subIndex, 'slides', e.target.files[0])} />
                      {subtopic.slides && <aa href={subtopic.slides} download>Download Slides</aa>}
                    </label>
                    <label>
                      Lecture Notes:
                      <input type="file" accept=".pdf,.docx" onChange={(e) => handleSubtopicChange(index, subIndex, 'notes', e.target.files[0])} />
                      {subtopic.notes && <aa href={subtopic.notes} download>Download Notes</aa>}
                    </label>
                  </div>
                ))}

                <h5>Quiz Questions</h5>
                {topic.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="quiz-box">
                    <label>
                      Question {qIndex + 1}:
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuizQuestionChange(index, qIndex, 'question', e.target.value)}
                        required
                      />
                    </label>
                    <h6>Answers:</h6>
                    {question.answers.map((answer, aIndex) => (
                      <input
                        key={aIndex}
                        type="text"
                        value={answer}
                        onChange={(e) => handleQuizQuestionChange(index, qIndex, 'answers', { index: aIndex, text: e.target.value })}
                        placeholder={`Answer ${aIndex + 1}`}
                        required
                      />
                    ))}
                    <label>
                      Correct Answer Index (0-3):
                      <input
                        type="number"
                        min="0"
                        max="3"
                        value={question.correctAnswer}
                        onChange={(e) => handleQuizQuestionChange(index, qIndex, 'correctAnswer', e.target.value)}
                        required
                      />
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      default:
        return 'Complete your updates.';
    }
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
      
      <div className="main-content">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="step-content">
          {activeStep === steps.length ? (
            <div>
              <h2>Course Updated Successfully!</h2>
             
            </div>
          ) : (
            <div>
              {renderStepContent(activeStep)}
              <div className="stepper-buttons">
                {activeStep !== 0 && <button onClick={handleBack}>Back</button>}
                <button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Complete' : 'Next'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditCourse;
