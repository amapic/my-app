import React, {Component,
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
  subjectregion,subjectregionswitch
} from './observable/observable'

import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import { Camembert2 } from './PieChart';

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
const mapOptionsClicked = {
  strokeColor: "#212527",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#05628A",
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

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const handlePopoverOpen = (event,region,open,setAnchorEl) => {
  if (!open){
    setAnchorEl({a:event.domEvent.currentTarget,b:event.domEvent.pageX,c:event.domEvent.pageY,d:"rr"});
  }
};

const handlePopoverClose = (open,setAnchorEl) => {
  if (open){
    setAnchorEl({a:null,b:null,c:0,d:""});
  }
};

const clickk = function (i,mapProps) {

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

export default function Popoverwrap({object,paths}){
  
  const myContainer = useRef(null);

  useEffect(() => {
    subjectregion.subscribe({
        next: (v) =>{ 
          if (v.includes(object)){
            setmapProps({
              selectedItems: v,
              etat: "pas_init"
              })
          }else{
            setmapProps({
              selectedItems: v,
              etat: "pas_init"
              })}
          }
      });
    },[])

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState({a:false,b:0,c:0,d:""});
  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"]
  });

  const open = Boolean(anchorEl.b);

  return (<>
    <Polygon key={
      object
    }
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseOut={(e) => handlePopoverClose(e, object,open,setAnchorEl)}
      onMouseOver={(e) => handlePopoverOpen(e, object,open,setAnchorEl)}

      ref={myContainer}
      paths={
        paths
      }
      onClick={
        () => clickk(object,mapProps)
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
      open={anchorEl.a}
      anchorEl={myContainer.current}
      anchorReference="anchorPosition"
      anchorPosition={{ left: anchorEl.b, top: anchorEl.c }}

      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      AAA
    </Popover></>)
}