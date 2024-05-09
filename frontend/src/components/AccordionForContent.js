import React from 'react';
import CustomAccordion from './CustomAccordionForContent';

export default function AccordionExpandDefault({courseTopics}) {

  return (
    <div style={{ margin: 30 }}>
      
      {courseTopics.map((topics)=>(
        <CustomAccordion topics={topics.title} subtopics={topics.subtopics} />
      ))}
    
    </div>
  );
}
