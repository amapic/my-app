import React, {Component,
  useState,
  useEffect
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  GoogleMap,
  Polygon,
  LoadScript
} from '@react-google-maps/api';
import list_poly from "../fonction/region_load"
import {
  subjectregion,subjectregionswitch
} from './observable/observable'

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Popoverwrap from './Popoverwrap';

const mapStyles2 = [

  {
    featureType: "administrative.country",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{
      visibility: "on",
      color: "#ff0000"
    }]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  },

  {
    featureType: "landscape.natural",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{
      color: "#31373E"
    }],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [{
      visibility: "off"
    }],
  },

];
const containerStyle = {
  width: '800px',
  height: '800px'
};

const containerStyle_petit = {
  width: '100px',
  height: '100px'
};


const options_style = {
  draggable: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  draggableCursor: 'default',
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  styles: mapStyles2
}

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

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

export default function MapGoogle({ region_excluded = [], region_included = [],zoom=5,center={}}) {
  // const classes = useStyles();
  // var options=Component.defaultProps;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handlePopoverOpen = (event) => {
    console.log("qdgqdg");
    setAnchorEl(event.domEvent.currentTarget);
  };

  const handlePopoverClose = () => {
    console.log("sfhgsfh");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"],
    selectedItem: 0
  });
  

  useEffect(() => {
    subjectregionswitch.subscribe({
        next: (v) =>{ setmapProps({
          selectedItem: 0,
          selectedItems: v,
          etat: "pas_init"
        })}
      });
    },[])


  const list_poly2 = list_poly
  var keys = Object.keys(list_poly2);
  if (region_excluded.length>0){
    keys=keys.filter(item => {
      let jj=!region_excluded.includes(item)
      return jj
    })
    
  }else{
    keys=keys.filter(item => region_included.includes(item))
  }

  const clickk = function (i) {

    let listeRegion = mapProps.selectedItems
    if (listeRegion.includes(i)) {
      if (listeRegion.length > 1) {
        listeRegion = listeRegion.filter(item => item !== i)
      }
    } else {
      listeRegion.push(i)
    }
    subjectregion.next(listeRegion)
    setmapProps({
      selectedItem: i,
      selectedItems: listeRegion,
      ttest: i
    })
  }
  if (mapProps.etat==="init"){
    return null
  }else{
    return ( <
      LoadScript googleMapsApiKey = "AIzaSyBHNfjuxMNcHVdkLgHctexkayh5tAMOWjA" >
      
      <
      GoogleMap mapContainerStyle = {
        (zoom>5?containerStyle_petit:containerStyle)
      }

      center = { center
      }
      zoom = {
        zoom
      }
      options = {
        options_style
      }

      >
      
      {
        keys.map((object, i) => {

            if (list_poly2[object].length === 1) {
              console.log("rrrrrrrrrrrrrrrrrrrrr");
              return ( <
                Polygon key = {
                  object
                }

                path = {
                  list_poly2[object]
                }
                onClick = {
                  () => clickk(object)
                }


                options = {
                  (mapProps.selectedItems.includes(object)) ? mapOptionsClicked : mapOptionsNotClicked
                }
                />)
              }
              else {
                return ( 
                  <Popoverwrap object={object} paths={list_poly2[object]}/>
                
                  
                  )
                }



              })

          }
        
           </GoogleMap >
           
          </LoadScript>
          )
        }
        }