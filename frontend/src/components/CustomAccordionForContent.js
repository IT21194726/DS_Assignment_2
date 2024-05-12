import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
// let count = 0;
export default function CustomAccordion({ topics, subtopics, count }) {

  const navigate = useNavigate();


  const handleNavigation = (subtopic, index, count) => {
    console.log('you clicked div tag:', index)
    // Navigate to '/test' and pass the course title as state
    navigate('/lectures', { state: { subtopic: subtopic, id: index, main : count } });
  }

  return (
    <Accordion elevation={2} style={{
      marginBottom: 20, borderRadius: 10,
    }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ padding: 1, paddingLeft: 5, bgcolor: '#f9f9fa' }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{count + 1}. {topics}</Typography>
        <Divider />
      </AccordionSummary>
      <AccordionDetails >
        {/* {subtopics.map((sub)=>(

        ))} */}


        {subtopics.map((subtopic, index) => (
          // count = count + index ,
          <div key={index} onClick={() => handleNavigation(subtopic, index , count)}>

            <Typography sx={{ opacity: 1, padding: 2 }}  >{count + 1}.{index + 1}. <a href='/lectures' style={{ textDecoration: 'none', color: 'brown' }}>{subtopic.title}</a></Typography>
            <Divider sx={{ color: 'red', bgcolor: 'red' }} />
          </div>



        ))}


      </AccordionDetails>
    </Accordion>
  );
}
