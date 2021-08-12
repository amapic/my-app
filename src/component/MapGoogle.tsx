import React, {
  useState,
  useEffect,
  useRef,FC 
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  GoogleMap,
  LoadScript
} from '@react-google-maps/api';


import PopoverwrapLogic from './PopoverwrapLogic';
import { subjectmapfr } from './observable/observable'

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
  width: '400px',
  height: '400px'
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

interface MapGoogleParam {
  region_excluded: string[];
  region_included?: string[];
  zoom: number;
  center: {lat:number,lng:number};
  list_poly2: any;
}

function MapGoogle({ region_excluded, region_included = [], zoom = 5, center, list_poly2 }:MapGoogleParam){
// export default function MapGoogle({ region_excluded:string[]=[], region_included = [], zoom = 5, center = {}, list_poly2 }) {
  // { region_excluded, region_included = [], zoom = 5, center = {}, list_poly2 }=props
  const mapFr = useRef<HTMLDivElement | void>(null);

  useEffect(() => {
    if (zoom < 5.2) {
      if (null !== mapFr.current) {
        subjectmapfr.next(mapFr)
      }
    }
  }, [mapFr]);


  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"],
    selectedItem: 0
  });


  // const list_poly2 = list_poly
  var keys = Object.keys(list_poly2);
  if (region_excluded.length > 0) {
    keys = keys.filter(item => {
      let jj = !region_excluded.includes(item)
      return jj
    })

  } else {
    keys = keys.filter(item => region_included.includes(item))
  }


  // if (mapProps.etat === "init") {
  //   return null
  // } else {
  return (<
    LoadScript googleMapsApiKey="AIzaSyBHNfjuxMNcHVdkLgHctexkayh5tAMOWjA" >

    <
      GoogleMap mapContainerStyle={
        (zoom > 5.2 ? containerStyle_petit : containerStyle)
      }

      ref={mapFr}
      center={center
      }
      zoom={
        zoom
      }
      options={
        options_style
      }

    >

      {
        keys.map((object) => {
        return (
            <PopoverwrapLogic key={object} object={object} paths={list_poly2[object]} />
          )
        })
      }

    </GoogleMap >

  </LoadScript>)
  // }
}
