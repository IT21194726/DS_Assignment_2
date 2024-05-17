
import React, { useState, useEffect } from 'react';
import axios from "axios";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PaymentIcon from '@mui/icons-material/Payment';
import ColorTabs from '../../components/ColorTabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, Box, Divider } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import CourseOverview from '../../data/CourseOverview';
// import PayHerePayment from '../PayHere/PayHerePayment';

export default function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, image, id } = location.state || {};
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [payHereLoaded, setPayHereLoaded] = useState(false);
  useEffect(() => {
    if (typeof payhere !== 'undefined') {
      console.log("PayHere SDK successfully loaded.");
      setPayHereLoaded(true); // Set to true if PayHere is loaded
    } else {
      console.error("PayHere is not loaded");
    }
  }, []);


  const selectedCourse = CourseOverview.find(overview => overview.id === id);

  console.log('you clicked div tag of :', course);
  const handleNavigation = async () => {

    const merchantId = "1226704";
    const orderId = "ORDER_12345";
    const amount = "109.00";
    const currency = "LKR";
    const merchantSecret = "MTI3MTEyMTYzOTEwMzcwODMxNDQxMjQzMDQ4NzUxOTcyOTE4ODUz";

    // Request the hash from the backend
    const response = await axios.post("http://localhost:5000/generate-hash", {
      merchant_id: merchantId,
      order_id: orderId,
      amount,
      currency,
      merchant_secret: merchantSecret
    });

    const hash = response.data.hash;

    const payment = {
      sandbox: true,
      merchant_id: merchantId,
      return_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      notify_url: "https://little-needles-double.loca.lt/notify",
      order_id: orderId,
      items: "Python Programming",
      amount,
      currency,
      hash,
      first_name: "John",
      last_name: "Doe",
      email: "muhammedfazilmufeel@gmail.com",
      phone: "0757416964",
      address: "123, Main Street",
      city: "Colombo",
      country: "Sri Lanka"
    };
    payhere.onCompleted = function (orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      // console.log('status_code', status_code)



      navigate('/content', { state: { course: course, image: image, id: id } });
    };

    if (payHereLoaded) {
      payhere.startPayment(payment);
    } else {
      console.error('Attempted to trigger payment before PayHere was loaded.');
    }

  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


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
                  <h1 style={{ marginBottom: 2 }}>{course}</h1>
                  <Divider />
                  <img src={image} alt={course} style={{ width: '100%', height: 'auto', marginTop: 5 }} />
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
                <Divider />
                <Box display="flex" alignItems="center" py={2}>
                  <LibraryBooksIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Lectures:</strong> 12
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" py={2} sx={{ borderBottomWidth: 1, borderColor: 'black' }}>
                  <ScheduleIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Duration:</strong> 5 weeks
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" py={2}>
                  <PeopleIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Enrolled:</strong> 15k students
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" py={2}>
                  <LanguageIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Language:</strong> English
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" py={2}>
                  <PaymentIcon fontSize="medium" sx={{ color: '#0096FF', marginLeft: 2 }} />
                  <Typography variant="body2" sx={{ marginLeft: 3 }}>
                    <strong>Price:</strong> {selectedCourse.price} LKR
                  </Typography>
                </Box>
              </Box>

              <CardActions sx={{ justifyContent: 'center', padding: 3 }}>

                <Button
                  sx={{ width: '100%', padding: 2, fontWeight: 'bold', borderRadius: 3 }}
                  variant="contained"
                  startIcon={<PersonAddIcon fontSize='medium' color='white' />}
                  onClick={() => handleNavigation()}
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



