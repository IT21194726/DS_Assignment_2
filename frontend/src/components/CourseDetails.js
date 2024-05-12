// src/components/CourseDetails.js
import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';

const CourseDetails = ({ overviewContent, outcomes, structure }) => {
    return (
        <div>
            {/* Course Overview */}
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Course Overview
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
                {overviewContent}
            </Typography>

            {/* Target Audience */}
            <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Intended Learning Outcomes:
            </Typography>
            <List>
                {outcomes.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            <CheckCircleIcon sx={{color:'#0096FF' , marginLeft:2.5}}   fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
            {/* course structure */}
            <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Course Structure:
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                {structure}
            </Typography>
        </div>
    );
};

// PropTypes for type-checking
CourseDetails.propTypes = {
   
    overviewContent: PropTypes.string.isRequired,
    structure: PropTypes.string.isRequired,
    outcomes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CourseDetails;
