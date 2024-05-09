// AccordionExpandDefault.js
import React, { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ColorTabs from '../../components/ColorTabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, CardActions, List, ListItem, Button, Typography, ListItemText, Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';

export default function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, image, id } = location.state || {};
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


  const handleNavigation = (courseTitle, image, id) => {
    console.log('you clicked div tag:', courseTitle)
    // Navigate to '/test' and pass the course title as state
    navigate('/content', { state: { course: courseTitle, image: image, id: id } });
  }


  return (
    <div className={`homepage ${sidebarVisible ? "with-sidebar" : ""}`} >


      <header className="header">
        <div className="header-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <img src="/Edulogo.png" alt="EduHub Logo" className="home2logo" />
          <h1 className="title">EduHub - Open Learning Platform</h1>
        </div>
      </header>
      <Sidebar isOpen={sidebarVisible} />




      <div style={{ margin: 50, }}>
        <Grid container spacing={4}>
          {/* Main Content Section */}
          <Grid item xs={12} md={8}>
            <div>
              {course && image ? (
                <div>
                  <h1>{course}</h1>
                  <img src={image} alt={course} style={{ width: '100%', height: 'auto' }} />
                </div>
              ) : (
                <p>No course data was provided.</p>
              )}
              <div style={{ marginTop: 40 }}>
                <ColorTabs id={id} />
              </div>

            </div>
          </Grid>

          {/* Card Section */}
          <Grid item xs={12} md={4}>
            <Card elevation={16} sx={{ marginTop: 7, borderRadius: 5 }}>
              <CardMedia component="img" image={image} alt={course} />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{course}</Typography>
                <Typography variant="body2">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Typography>
              </CardContent>
              <Box px={2} py={1}>
                <Box display="flex" alignItems="center" py={2}>
                  <HomeOutlinedIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Instructor:</strong> Jack Morkel
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" py={2}>
                  <LibraryBooksIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Lectures:</strong> 12
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" py={2} sx={{ borderBottomWidth: 1, borderColor: 'black' }}>
                  <ScheduleIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Duration:</strong> 5 weeks
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" py={2}>
                  <PeopleIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Enrolled:</strong> 15k students
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" py={2}>
                  <LanguageIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Language:</strong> English
                  </Typography>
                </Box>
              </Box>

              <CardActions sx={{ justifyContent: 'center', padding: 3 }}>

                <Button
                  sx={{ width: '100%', padding: 2, fontWeight: 'bold', borderRadius: 3 }}
                  variant="contained"
                  startIcon={<PersonAddIcon fontSize='medium' color='white' />}
                  onClick={() => handleNavigation(course, image, id)}
                >
                  Enroll Now
                </Button>

              </CardActions>
            </Card>
          </Grid>
        </Grid>

      </div>
      <footer className="dashboard-footer">
        <div className="dashboard-contact-info">
          <h4>Contact Us</h4>
          <p>EduHub</p>
          <p>Phone: 011 309 278</p>
          <p>Email: eduhub@example.com</p>
        </div>
      </footer>


    </div>

  );
}
