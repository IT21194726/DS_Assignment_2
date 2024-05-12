import React from 'react';
import CustomAccordion from './CustomAccordion';

export default function AccordionExpandDefault({courseContent}) {

  return (
    <div style={{ margin: 20 }}>
      {courseContent.map((topics)=>(
        <CustomAccordion summary={topics.title} details={topics.description} />
      ))}
    
    </div>
  );
}
