import React, { ReactElement, useState, useEffect, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import LinearProgress from "@material-ui/core/LinearProgress";

import theme from '../style/theme';

interface EventTarget {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  dispatchEvent(evt: Event): boolean;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: Date;
  type: string;
}

function preventDefault(event: React.SyntheticEvent): void {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    padding: theme.spacing(1)
    // paddingLeft:theme.spacing(1),
    // paddingRight:theme.spacing(1)
  },
  LinearProgress: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  title: {
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(5)
  },
}));

const chercheData = async (url: string): Promise<any> => {

  const response = await fetch(url);
  const responseData = await response.json();

  if (response.ok) {
    return responseData

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

interface IMyProps{

}

const Deposits: FC<{}> = props =>{
  const [items, setItems] = useState<number>(0);
  const [items2, setItems2] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    chercheData("http://localhost:8052/pourcentage_pop_vac_som_1").then((tt: any) => {
      setItems(tt);
    })
    chercheData("http://localhost:8052/pourcentage_pop_vac_som_2").then((tt: any) => {
      setItems2(tt);
    })

  }, []);

  return (
    <React.Fragment>
      <Title className={classes.title}>Population vacciné</Title>

      <LinearProgress variant="determinate" value={items * 100} />
      <Typography align="center" color="secondary" className={classes.depositContext}>
        Première dose : {items.toFixed(2)}
      </Typography>
      <br />
      <LinearProgress variant="determinate" value={items2 * 100} />
      <Typography align="center" color="secondary" className={classes.depositContext}>
        Seconde dose : {items2.toFixed(2)}
      </Typography>

      <div>

      </div>
    </React.Fragment>
  );
}

export default Deposits;
