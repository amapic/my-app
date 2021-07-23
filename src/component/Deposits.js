import React,{useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

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
  useEffect(() => {
    chercheData("http://localhost:8052/pourcentage_pop_vac_som_1").then((tt)=>{
    setItems(tt);})
    chercheData("http://localhost:8052/pourcentage_pop_vac_som_2").then((tt)=>{
    setItems2(tt);})
                          
  },[]);

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
      Proportion de personne vacciné premiere dose :{items}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Proportion de personne vacciné seconde dose :{items2}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
