import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
import Chart from './component/Chart';
import Deposits from './component/Deposits';
import Orders from './component/Orders';

import ListCheckbox from './component/ListCheckbox';
import Slider_zone from './component/Slider';
import Map_google from './component/MapGoogle';
import Slider_vaccin from './component/Slider_vaccin';

import { useContext,useEffect,useState } from 'react';
import { DataContext } from './context/DataContext';
// import { VaccinSelectedProvider } from './context/DataContext';
// import { setDataLim } from './fonction';

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

const drawerWidth = 240;

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
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeightx3: {
    height: 240,
  },
}));

function createData(time, amount,amount2) {
  return {
      time,
      amount,
      amount2
  };
}

function choose(choice, ...availableChoices) {
  return {choice, ...availableChoices}
}

function useFetchSpecial (url) {
  const [state, setState] = useState({
      items: [],
      loading: true
  })

  useEffect(function () {
      (async function () {
          const response = await fetch(url)
          const responseData = await response.json()
          // console.log(response)
    // console.log(responseData)
          if (response.ok) {
      // console.log("ok");
            var data = [];
    var arrayTime = [];
    var arrayAmount = [];
              setState({
                  items: responseData,
                  loading: false
              })
              for (var key in responseData.datetime){
        var value = responseData.datetime[key];
        arrayTime.push(value);
      }
      for (var key in responseData.n_cum_dose1){
        var value = responseData.n_cum_dose1[key];
        arrayAmount.push(value);
      }
       arrayAmount.forEach((x, i) => data.push(createData(arrayTime[i].toString(), i,i/2)));
       var ff=data.slice(1,10);
      //  console.log(ff);
      setState({items:ff,loading:false});
          } else {
              alert(JSON.stringify(responseData))
              setState(s => ({...s, loading: false}))
          }
      })()
  }, [])

  return [
      state.loading,
      state.items
  ]
}

function useFetch (url) {
  const [state, setState] = useState({
      items: [],
      loading: true
  })

  useEffect(function () {
      (async function () {
          // var myInit = {mode: 'no-cors' }
          const response = await fetch(url)
          const responseData = await response.json()
          // const responseData =response
          // console.log(responseData)
    
          if (response.ok) {
            // console.log(responseData);
            // var data = [];

      //  arrayAmount.forEach((x, i) => data.push(createData(arrayTime[i].toString(), i,i/2)));
      //  var ff=data.slice(1,10);
      setState({items:responseData,loading:false});
          } else {
              alert(JSON.stringify(responseData))
              setState(s => ({...s, loading: false}))
          }
      })()
  }, [])

  return [
      state.loading,
      state.items
  ]
}

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
  const fixedHeightPaperx3 = clsx(classes.paper, classes.fixedHeightx3);
  var data2 = useContext(DataContext);
  
  const [loadingrange, range] = useFetch("http://localhost:8052/liste_mois_detail")
  // const [loadinglim, lim] = useFetch("http://localhost:8052/lim_detail")
  // const [loading, items] = useFetchSpecial("http://localhost:8052/detail/3/2") 
  // }
  // useEffect(function () {
  //   //chargement de données asynchrone, pas de reload du composant avec useEffect
  //   data2.setData(items);
  //   // setDataLim(data2);
  // }, []);

  // useEffect(function () {
  //   //chargement de données asynchrone, pas de reload du composant avec useEffect
  //   if (lim.length!=0){
  //   console.log(lim)
  //   data2.setDataLim(lim);
  //   }

  // }, [lim]);

  useEffect(function () {

    if (range.length!=0){
      // console.log(range)
      data2.setMonthRange(range);
    }

  }, [range]);

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
       {/* <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container  spacing={3}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper}>
              {/* <RegionSelectedProvider> */}
                <Chart />
                {/* </RegionSelectedProvider> */}
              </Paper>
              {/* <Paper className={fixedHeightPaperx3}>
                <Deposits />
              </Paper> */}
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper}>
              
                <Slider_vaccin />
                
              </Paper>

            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper >
              {/* <RegionSelectedProvider> */}
              <Map_google />
              {/* </RegionSelectedProvider> */}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} >
            {/* <Grid container spacing={3}> */}
              <Grid item xs={12} md={4} lg={12}>
                <Paper className={fixedHeightPaperx3}>
                  {/* <Deposits /> */}
                </Paper>
              </Grid>
          </Grid>
            </Grid> 
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Slider_zone />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
            {/* Recent Orders */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid> */}
          {/* </Grid> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
