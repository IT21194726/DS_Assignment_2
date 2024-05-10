import React, { useState } from 'react';
import InstructorSidebar from '../../../components/InstructorSidebar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './AddCourse.css';

const steps = ['Basic Info', 'Outcomes & Structure', 'Main Topics & Subtopics', 'Complete'];

const AddCourse = () => {
  
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // Sidebar toggle handler

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  // Navigation handlers for the stepper
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  // Basic Course Info (state variables and handlers)
  const [courseTitle, setCourseTitle] = useState('');
  const [titleImage, setTitleImage] = useState(null);
  const [outcomes, setOutcomes] = useState(['', '', '']);
  const [structure, setStructure] = useState('');

  const handleTitleChange = (e) => setCourseTitle(e.target.value);
  const handleImageChange = (e) => setTitleImage(e.target.files[0]);
  const handleOutcomeChange = (index, value) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  // Main Topics (state variables and handlers)
  const initialSubtopic = { title: '', video: null, slides: null, notes: null };
  const initialQuizQuestion = { question: '', answers: ['', '', '', ''], correctAnswer: 0 };
  const initialTopic = { title: '', description: '', subtopics: [initialSubtopic], quiz: [initialQuizQuestion] };
  const [mainTopics, setMainTopics] = useState([initialTopic]);

  const addMainTopic = () => setMainTopics([...mainTopics, { ...initialTopic }]);

  const addSubtopic = (topicIndex) => {
    const newTopics = [...mainTopics];
    newTopics[topicIndex].subtopics.push({ ...initialSubtopic });
    setMainTopics(newTopics);
  };

  const addQuizQuestion = (topicIndex) => {
    const newTopics = [...mainTopics];
    newTopics[topicIndex].quiz.push({ ...initialQuizQuestion });
    setMainTopics(newTopics);
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

  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      courseTitle,
      titleImage,
      outcomes,
      structure,
      mainTopics,
    });
  };

  // Render form steps based on active step
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
              <input type="file" accept="image/*" onChange={handleImageChange} required />
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
                    Topic {index + 1}: {/* Add topic number */}
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
        
                  {/* Subtopics */}
                  <h5>Subtopics</h5>
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <div key={subIndex} className="subtopic-box">
                      <label>
                        Subtopic {index + 1}.{subIndex + 1}: {/* Add subtopic number */}
                        <input
                          type="text"
                          value={subtopic.title}
                          onChange={(e) => handleSubtopicChange(index, subIndex, 'title', e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Lecture Video:
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleSubtopicChange(index, subIndex, 'video', e.target.files[0])}
                        />
                      </label>
                      <label>
                        Lecture Slides:
                        <input
                          type="file"
                          accept=".pdf,.pptx"
                          onChange={(e) => handleSubtopicChange(index, subIndex, 'slides', e.target.files[0])}
                        />
                      </label>
                      <label>
                        Lecture Notes:
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          onChange={(e) => handleSubtopicChange(index, subIndex, 'notes', e.target.files[0])}
                        />
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={() => addSubtopic(index)}>Add Another Subtopic</button>
        
                  {/* Quiz Section */}
                  <h5>Quiz Questions</h5>
                  {topic.quiz.map((question, qIndex) => (
                    <div key={qIndex} className="quiz-box">
                      <label>
                        Question {qIndex + 1}: {/* Question number */}
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
                  <button type="button" onClick={() => addQuizQuestion(index)}>Add Another Quiz Question</button>
                </div>
              ))}
              <div className="stepper-buttons">
              <button type="button" onClick={addMainTopic}>Add Another Main Topic</button>
              </div>
            </div>
          );
        
      default:
        return 'Click complete to add your new course';
    }
  };

  return (
    <div className={`add-course-page ${sidebarVisible ? 'with-sidebar' : ''}`}>
      {/* Header Section */}
      <header className={`header ${sidebarVisible ? 'shifted' : ''}`}>
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>☰</button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">EduHub - Add New Course</h1>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <InstructorSidebar isOpen={sidebarVisible} />


    

      {/* Main Content Section */}
      <div className={`mmain-content ${sidebarVisible ? 'shifted' : ''}`}>
       
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
              <h2>Course Added Successfully!</h2>
              <div className="stepper-buttons">
              <button onClick={handleReset}>Add Another Course</button>
              </div>
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
    
  );
};

export default AddCourse;
