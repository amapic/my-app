import React, { useState, useEffect } from 'react';
import { makeStyles, Theme,withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import LinearProgress from "@material-ui/core/LinearProgress";
import theme from '../../custom'

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import adresse from '../fonction/conf'



// const useStyles = makeStyles((theme) => ({
// const useStyles = makeStyles((theme)=>{
//   depositContext: {
//     flex: 1;
//     padding: theme.spacing(1);
//   },
//   LinearProgress: {
//     flex: 1;
//     paddingLeft: theme.spacing(1);
//     paddingRight: theme.spacing(1);
//   },
//   title: {
//     paddingBottom: theme.spacing(4);
//     margin: theme.spacing(5)
//   }
// });

const chercheData = async (url: string): Promise<any> => {

  const response = await fetch(url, { mode: 'cors' });
  const responseData = await response.json();

  if (response.ok) {
    return responseData

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

export default function Deposits() {
  const [items, setItems] = useState<number>(0);
  const [items2, setItems2] = useState<number>(0);
  // const classes = useStyles();

  useEffect(() => {
    chercheData(adresse + ":8052/pourcentage_pop_vac_som_1").then((tt: number) => {
      setItems(tt);
    })
    chercheData(adresse + ":8052/pourcentage_pop_vac_som_2").then((tt:number) => {
      setItems2(tt);
    })

  }, []);

  return (
    <>
      {/* className={classes.title} */}
      <Title  >Population vacciné</Title>
      {/* className={classes.title} */}
      <LinearProgress variant="determinate" value={items * 100}  />
      <Typography align="center" color="secondary" >
        Première dose : {(items * 100).toFixed(1)} %
      </Typography>
      <br />
      {/* className={classes.depositContext} */}
      {/* className={classes.depositContext} */}
      {/* style={theme.palette.secondary.bar_droite1} */}
      {/* style={theme.palette.secondary.bar_droite1} */}
      <ThemeProvider theme={theme}>
      <LinearProgress variant="determinate" value={items2 * 100}  />
      </ThemeProvider>
      <Typography align="center" color="secondary" >
        Seconde dose : {(items2 * 100).toFixed(1)} %
      </Typography>

      <div>

      </div>
    </>
  );
}
