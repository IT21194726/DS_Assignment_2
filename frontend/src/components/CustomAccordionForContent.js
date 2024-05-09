import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomAccordion({ topics, subtopics }) {
  return (
    <Accordion elevation={2} style={{ marginBottom: 20,borderRadius:10, 
    }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{padding:1, paddingLeft:5 , bgcolor:'#f9f9fa' }}
      >
        <Typography>{topics}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* {subtopics.map((sub)=>(

        ))} */}
      
            <ul type='I' >
              {subtopics.map((subtopic, index) => (

                <li key={index}>
                  <Typography sx={{ opacity: 1 , padding:2}}><a href='/dashboard'>{subtopic}</a></Typography>
                </li>

              ))}
            </ul>
      
      </AccordionDetails>
    </Accordion>
  );
}
