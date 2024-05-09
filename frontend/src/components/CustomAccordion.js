import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomAccordion({ summary, details }) {
  return (
    <Accordion style={{ marginBottom: 10 , borderWidth:1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{bgcolor:'#FAF9F6'}}
      >
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{opacity:0.7}}>
          {details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
