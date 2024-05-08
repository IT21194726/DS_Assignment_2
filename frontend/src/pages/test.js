// AccordionExpandDefault.js
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColorTabs from '../components/ColorTabs';
import { useLocation } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, CardActions, List, ListItem, Button } from '@mui/material';

export default function AccordionExpandDefault() {
  const location = useLocation();
  const { course, image, id } = location.state || {};

  return (
    <div style={{ margin: 50 }}>
      <Grid container spacing={4}>
        {/* Main Content Section */}
        <Grid item xs={12} md={8}>
          <div>
            {course && image ? (
              <>
                <h1>{course}</h1>
                <img src={image} alt={course} style={{ width: '100%', height: 'auto' }} />
              </>
            ) : (
              <p>No course data was provided.</p>
            )}
            <ColorTabs id={id} />
          </div>
        </Grid>

        {/* Card Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia component="img" image={image} alt={course} />
            <CardContent>
              <Typography variant="h5">Card Title</Typography>
              <Typography variant="body2">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Typography>
            </CardContent>
            <List>
              <ListItem>An item</ListItem>
              <ListItem>A second item</ListItem>
              <ListItem>A third item</ListItem>
            </List>
            <CardActions>
              <Button size="small">Card link</Button>
              <Button size="small">Another link</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
