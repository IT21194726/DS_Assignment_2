import React from 'react';
import CustomAccordion from './CustomAccordion';
import CourseContent from '../data/CourseContent';
export default function AccordionExpandDefault() {
  return (
    <div style={{ margin: 20 }}>
   
      {CourseContent.map((content, index) =>(
            <CustomAccordion key={index} summary={content.title} details={content.description}/>
      ))}
    </div>
  );
}
