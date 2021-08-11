import React, {
  useRef, useState, useEffect
} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Polygon
} from '@react-google-maps/api';
import {
  subjectregion, subjectmapfr
} from './observable/observable'

import Popover from '@material-ui/core/Popover';
import theme from '../style/theme';
import { randomInt } from 'mathjs'

var mapOptionsClicked = {
  strokeColor: "#212527",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: theme.palette.primary.main,
  fillOpacity: 1,
  polygonKey: 1
}

var mapOptionsNotClicked = {
  strokeColor: "#212527",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#212527",
  fillOpacity: 0.35,
  polygonKey: 1
}


const useStyles = makeStyles((theme) => ({
  popovervisible: {
    pointerEvents: 'none',
  },
  popovernotvisible: {
    pointerEvents: 'none',
    display: 'none'
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const clickk = function (i, mapProps) {

  let listeRegion = mapProps.selectedItems
  if (listeRegion.includes(i)) {
    if (listeRegion.length > 1) {
      listeRegion = listeRegion.filter(item => item !== i)
    }
  } else {
    listeRegion.push(i)
  }
  subjectregion.next(listeRegion)
}


export default function Popoverwrap(props) {

  const myContainer = useRef(null);
  const [visiblePopup, setvisiblePopup] = useState(true)
  const [color, setColor] = useState(null)
  const { object, paths, mapProps, anchorEl, open, handlePopoverClose, handlePopoverOpen } = props


  const classes = useStyles();
  const mapFr = subjectmapfr.getValue()
  const refMapFr = ReactDOM.findDOMNode(mapFr.current)
  var mapOptionsClicked = {
    strokeColor: "#212527",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 1,
    polygonKey: 1
  }

  var mapOptionsNotClicked = {
    strokeColor: "#212527",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#212527",
    fillOpacity: 0.35,
    polygonKey: 1
  }
  if (!color) {
    const COLORS = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.first];
    setColor(COLORS[randomInt(COLORS.length)]);
    mapOptionsClicked.fillColor = COLORS[randomInt(COLORS.length)];
  }

  // if (mapProps.hovered){
  // mapOptionsClicked.strokeColor="white";

  // mapOptionsNotClicked.strokeColor="white";
  // mapOptionsClicked.strokeWeight= 3,
  // mapOptionsNotClicked.strokeWeight= 3
  // }

  useEffect(() => {
    console.log("rr");
  }, []);


  return (<>
    <Polygon key={
      object
    }
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseOut={(e) => handlePopoverClose(e, object)}
      onMouseOver={(e) => handlePopoverOpen(e, object)}
      id={"region-poly-" + object}
      ref={myContainer}
      paths={
        paths
      }
      onClick={
        () => clickk(object, mapProps)
      }
      options={
        (mapProps.selectedItems.includes(parseInt(object)) || mapProps.selectedItems.includes(object)) ? mapOptionsClicked : mapOptionsNotClicked
      }

    />
    <Popover
      id={"mouse-over-popover-" + object}
      className={visiblePopup ? classes.popovervisible : classes.popovernotvisible}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorReference="anchorEl"
      anchorPosition={{ left: -100, top: 100 }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorEl={refMapFr}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      Première dose : {anchorEl.d} <br />
      Seconde dose : {anchorEl.e}
    </Popover></>)
}