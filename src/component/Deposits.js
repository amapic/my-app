import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import LinearProgress from "@material-ui/core/LinearProgress";
import CssBaseline from '@material-ui/core/CssBaseline';
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    padding:theme.spacing(1)
    // paddingLeft:theme.spacing(1),
    // paddingRight:theme.spacing(1)
  },
  LinearProgress: {
    flex: 1,
    paddingLeft:theme.spacing(1),
    paddingRight:theme.spacing(1)
  },
  title: {
    paddingBottom:theme.spacing(4),
    margin:theme.spacing(5)
  },
}));

const chercheData = async (url) => {

  const response = await fetch(url);
  const responseData = await response.json();
  console.log(response)
  console.log(responseData)
  console.log(url)

  if (response.ok) {
    console.log("ok");
    return responseData

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

export default function Deposits() {
  const [items, setItems] = useState(false);
  const [items2, setItems2] = useState(false);
  const classes = useStyles();
  
//   const LinearProgress = styled.section`
//   width:100%;
// `;
  useEffect(() => {
    chercheData("http://localhost:8052/pourcentage_pop_vac_som_1").then((tt) => {
      setItems(tt);
    })
    chercheData("http://localhost:8052/pourcentage_pop_vac_som_2").then((tt) => {
      setItems2(tt);
    })

  }, []);

  return (
    <React.Fragment>
      <Title className={classes.title}>Population vacciné</Title>
      
      <LinearProgress variant="determinate" value={items*100} />
      <Typography color="textSecondary" className={classes.depositContext}>
        Première dose : {parseFloat(items).toFixed(2)}
      </Typography>
      <br />
      <LinearProgress variant="determinate" value={items2*100} />
      <Typography color="textSecondary" className={classes.depositContext}>
        Seconde dose : {parseFloat(items2).toFixed(2)}
      </Typography>

      <div>

      </div>
      {/* <Wrapper>qdqdddd</Wrapper> */}
    </React.Fragment>
  );
}
