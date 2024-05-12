import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accor from './Accordion'
import { Box, Grid, Typography, LinearProgress, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import ReviewForm from './ReviewForm';
import CourseOverview from '../data/CourseOverview';
import CourseDetails from './CourseDetails';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 , backgroundColor:'white' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ id }) {
  const [value, setValue] = React.useState(0);
  const courseID = id
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const totalRating = 5;
  const totalReviews = 4;
  const selectedCourse = CourseOverview.find(overview => overview.id === courseID);
  const ratingsData = [
    { label: '5 stars', percentage: 100 },
    { label: '4 stars', percentage: 0 },
    { label: '3 stars', percentage: 0 },
    { label: '2 stars', percentage: 0 },
    { label: '1 star', percentage: 0 },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' , }}>
        <Tabs   value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{fontWeight:'bold' , }} label="Overview" {...a11yProps(0)} />
          <Tab sx={{fontWeight:'bold'}}  label="Content" {...a11yProps(1)} />
          <Tab sx={{fontWeight:'bold'}}  label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      
        {selectedCourse ? (
          <CourseDetails
            overviewContent={selectedCourse.overview}
            outcomes={selectedCourse.outcomes}
            structure={selectedCourse.structure}
          />
        ) : (
          <Typography variant="body1">No matching course found for the provided ID.</Typography>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}  >
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Course Content
        </Typography>
        <Accor courseContent={selectedCourse.content} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{}}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Reviews
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Gosh william Im telling crikey burke I dont want no agro A bit of hows your father bugger all mate off his nut that, what a plonker cuppa owt to do
          </Typography>
          <Grid container sx={{ marginX: 2, marginY: 2 }} >
           
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '' }}>
              <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
                {totalRating}
              </Typography>
              <StarIcon sx={{ color: '#FFC107', fontSize: 32 }} />
              <Typography variant="subtitle1">{`${totalReviews} Ratings`}</Typography>
            </Grid>
          
            <Grid item xs={8} sx={{ bgcolor: '' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Detailed Rating
              </Typography>
              {ratingsData.map((rating, index) => (
                <Grid container alignItems="center" key={index}>
                  <Grid item xs={2}>
                    <Typography variant="body2">{rating.label}</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <LinearProgress variant="determinate" value={rating.percentage} />
                  </Grid>
                  <Grid item sx={{ marginX: 2 }}>
                    <Typography variant="body2">{rating.percentage}%</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <ReviewForm />
        </Box>

      </CustomTabPanel>
    </Box>
  );
}
