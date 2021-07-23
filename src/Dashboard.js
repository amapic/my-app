import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu'; 
import NotificationsIcon from '@material-ui/icons/Notifications';
import Chart from './component/Chart';
import Deposits from './component/Deposits';

import Slider_zone from './component/Slider';
import Map_google from './component/MapGoogle';
import Slider_vaccin from './component/SliderVaccin';
import {Camembert} from './component/PieChart';
// import ToggleSwitch from './component/ToggleSwitchWrap'
import { ToggleButton, ToggleButtonPerso } from './component/RadioButton';

import { SwitchMap } from './component/SwitchMap';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'visible',
    flexDirection: 'column',
  },
  containerprinc: {
    display: 'flex',
    boxsizing: 'border-box',
    padding: theme.spacing(2),
    aligncontent:'flex-start'
  },
  fixedHeight: {
    height: 240,
  },
  fixedWidth: {
    width: 600,
  },
  fixedHeightx3: {
    height: 240,
  },
}));




export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const radiovac = clsx(classes.fixedWidth);
  const fixedHeightPaperx3 = clsx(classes.paper, classes.fixedHeightx3);
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
        <Grid className={classes.container} item xs={12} md={8} lg={12}>
          <Paper className={fixedHeightPaper} spacing={3}>
          <Paper className={radiovac} spacing={3}>
            <ToggleButtonPerso />
            <Slider_zone />
          </Paper>
          </Paper>
        </Grid>
        
        <Grid id="AA" container direction="row" className={classes.container} spacing={3}>
          {/* <Grid container spacing={3}> */}
            {/* Chart */}
            <Grid id="BB" container direction="column" item xs={12} md={8} lg={10} spacing={3}>
              <Grid item xs={12} md={8} lg={12} >
                <Paper className={fixedHeightPaper} spacing={3}>
                  
                    <Chart />
                    
                  
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={12} >
                <Paper >
                <Map_google region_excluded={["1","2","3","4"]} center={{lat: 46.7833,lng: 3.0833}} zoom={5}/>
                <Map_google region_included={["1","2","3","4"]} center={{lat: 16.15,lng: -61.6}} zoom={9.5}/>
                <Map_google region_included={["1","2","3","4"]} center={{lat: 14.6,lng: -61}} zoom={9.5}/>
                {/* <SwitchMap /> */}
                {/* <Slider_zone /> */}
                </Paper>
              </Grid>
              
            </Grid>
            <Grid item xs={12} md={8} lg={2}>
              <Paper >
                
                <Camembert />
                {/* <Deposits /> */}
              </Paper>

              
            </Grid>
            {/* <Grid item xs={12} md={8} lg={6}>
              
            </Grid> */}
          </Grid>
          {/* </Grid> */}
            {/* </Grid> 
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Slider_zone />
              </Paper>
            </Grid> */}
          
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
