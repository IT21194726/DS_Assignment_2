import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accor from './Accordion'
import { Box, Grid, Typography, LinearProgress, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import ReviewForm from './ReviewForm';
import TextField from '@mui/material/TextField';

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
        <Box sx={{ p: 3 }}>
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const totalRating = 5;
  const totalReviews = 4;

  const ratingsData = [
    { label: '5 stars', percentage: 100 },
    { label: '4 stars', percentage: 0 },
    { label: '3 stars', percentage: 0 },
    { label: '2 stars', percentage: 0 },
    { label: '1 star', percentage: 0 },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Content" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Course Overview */}
        <Typography variant="h4" component="h2" gutterBottom>
          Course Overview
        </Typography>
        <Typography variant="body1" paragraph>
          Only a quid me old mucker squiffy tomfoolery grub cheers ruddy cor blimey guvnor in my flat, up the duff Eaton car boot up the kyver pardon you A bit of how your father David skive off sloshed, dont get shirty with me chip shop vagabond crikey bugger Queen English chap. Matie boy nancy boy bite your arm off up the kyver old no biggie fantastic boot, David have it show off show off pick your nose and blow off lost the plot porkies bits and bobs only a quid bugger all mate, absolutely bladdered bamboozled its your round dont get shirty with me down the pub well. Give us a bell bits and bobs Charles he lost his bottle super my lady cras starkers bite your arm off Queens English, pardon me horse play Elizabeth a blinding shot chinwag knees up do one David, blag cup of tea Eaton so I said bleeding haggle James Bond cup of char. Gosh William ummm Im telling crikey burke I dont want no agro A bit of how your father bugger all mate off his nut that, what a plonker cuppa owt to do with me nancy boy show off show off pick your nose and blow off spiffing good time lavatory me old mucker, chimney pot what a load of rubbish boot squiffy lost the plot brolly wellies excuse my french.
        </Typography>

        {/* Target Audience */}
        <Typography variant="h4" component="h2" gutterBottom>
          What is the Target Audience?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Business managers, leaders" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Downloadable lectures, code and design assets for all projects" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Anyone who is finding a chance to get the promotion" />
          </ListItem>
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <h2>Course Content</h2>
        <Accor />
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
            {/* Main Review Score */}
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '' }}>
              <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
                {totalRating}
              </Typography>
              <StarIcon sx={{ color: '#FFC107', fontSize: 32 }} />
              <Typography variant="subtitle1">{`${totalReviews} Ratings`}</Typography>
            </Grid>
            {/* Detailed Rating Breakdown */}
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
