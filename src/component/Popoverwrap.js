import React, {
  Component,
  useState,
  useEffect,
  useRef
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  GoogleMap,
  Polygon,
  LoadScript
} from '@react-google-maps/api';
// import list_poly from "../fonction/region_load"
import {
  subjectregion, subjectregionswitch
} from './observable/observable'

import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import { Camembert2 } from './PieChart';
// import PopoverwrapLogic from './PopoverwrapLogic';

const mapOptionsClicked = {
  strokeColor: "#212527",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#0088FE",
  fillOpacity: 0.35,
  polygonKey: 1
}

const mapOptionsNotClicked = {
  strokeColor: "#212527",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#212527",
  fillOpacity: 0.35,
  polygonKey: 1
}

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

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));





export default function Popoverwrap(props) {

  const myContainer = useRef(null);
  const { object, paths, mapProps, anchorEl, open, handlePopoverClose, handlePopoverOpen }=props

  // const [object, paths, mapProps, anchorEl,open,handlePopoverClose,handlePopoverOpen]=PopoverwrapLogic()

  const classes = useStyles();


  return (<>
    <Polygon key={
      object
    }
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseOut={(e) => handlePopoverClose(e, object)}
      onMouseOver={(e) => handlePopoverOpen(e, object)}
      id ={"region-poly-" + object}
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
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      // anchorEl={myContainer.current}
      anchorReference="anchorPosition"
      anchorPosition={{ left: anchorEl.b, top: anchorEl.c }}

      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      {anchorEl.d}
    </Popover></>)
}