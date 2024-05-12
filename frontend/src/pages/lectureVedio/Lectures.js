import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,

} from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom';
import vedio from '../../React App - Google Chrome 2024-05-09 02-37-00.mp4'
import pdf from '../../DSmid _ all-in-one.pdf'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PlayCircleOutlineSharpIcon from '@mui/icons-material/PlayCircleOutlineSharp';
import StickyNote2SharpIcon from '@mui/icons-material/StickyNote2Sharp';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MenuIcon1 from '@mui/icons-material/Menu';
// import logo from '../../../public/Edulogo.png'
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  color: 'white',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const { subtopic, id, main } = location.state || {};
  const count = main + 1;

  const [tab, setTab] = useState(0);

 


  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <TabContext value={value} >
        <CssBaseline />
        <AppBar sx={{ bgcolor: 'white', }} position="fixed" open={open}>
          <Toolbar >
            <IconButton

              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ mr: 2, color: 'white', bgcolor: 'brown',  borderRadius: 2, }}
            >
              {/* <MenuIcon sx={{ fontSize: 'large' }} /> */}
              <MenuIcon1/>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: 'brown', }}>
           
              {count}.{id + 1} {subtopic.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            
          <img src='/Edulogo.png' alt='Eduhublogo.png' height={'250px'} width={'220px'}/>
          </DrawerHeader>

          <Divider />
          {/* <Tabs
            orientation="vertical"
            value={tab}
            onChange={handleChangeTab}
            // indicatorColor='primary'
            // textColor="primary"
            variant="fullWidth"
            aria-label="icon tabs example"

          >
            <Tab
              icon={<PlayCircleOutlineSharpIcon />}
              label="Lecture Video" />

            <Divider />
            <Tab icon={<StickyNote2SharpIcon />} label="Lecture Video"/>
          </Tabs> */}
          <TabList onChange={handleChange} aria-label="lab API tabs example" orientation='vertical'>
            <Tab icon={<PlayCircleOutlineSharpIcon />}  label="Lecture Video"  value="1" />
            <Tab icon={<StickyNote2SharpIcon />} label="Notes" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>

        </Drawer>
        <Main sx={{ marginTop: 0 }} open={open}>
          <DrawerHeader />
          
          <TabPanel value="1">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=NmhlDuebo3g"
              controls
              width="100%"
              height="500px"
            /></TabPanel>
          <TabPanel value="2">
            <div style={{ height: "500px", overflow: "auto", marginTop: "20px" }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={pdf} />
              </Worker>
            </div></TabPanel>
          <TabPanel value="3">Item Three</TabPanel>

        </Main>
      </TabContext>
    </Box>
  );
}



