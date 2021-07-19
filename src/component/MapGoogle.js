import React, {
  Component,
  useState,
  useContext,
  useRef,
  useCallback,
  ReactDOM
} from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  Polyline,
  Polygon,
  useJsApiLoader,
  LoadScript
} from '@react-google-maps/api';
import list_poly from "../fonction/region_load"

import {
  RegionSelectedContext
} from '../context/DataContext';

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

const center = {
  lat: 46.7833,
  lng: 3.0833
};

const options = {
  draggable: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  draggableCursor: 'default',
  draggable: false,
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  styles: mapStyles2
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

export default function Map_google() {

  const [mapProps,setmapProps]=useState({
    ttest: "ee",
    selectedItems: [],
    selectedItem:0
  });

  const RegionSelected = useContext(RegionSelectedContext);
  

  const clickk=(i) =>{
    
    let listeRegion=mapProps.selectedItems
    if (listeRegion.includes(i)){
      listeRegion = listeRegion.filter(item => item !== i)
    }else{
      listeRegion.push(i)
    }
    // console.log(listeRegion)
    RegionSelected.setRegionSelectedlast(i);
    RegionSelected.setRegionSelectedlist(listeRegion);
    setmapProps({
      selectedItem:i,
      selectedItems: listeRegion,
      ttest: i
    })
    

  }
  
  return ( <
    LoadScript googleMapsApiKey = "AIzaSyBHNfjuxMNcHVdkLgHctexkayh5tAMOWjA" >
    <
    >
    <
    GoogleMap mapContainerStyle = {
      containerStyle
    }
    center = {
      {
        lat: 46.7833,
        lng: 3.0833
      }
    }
    zoom = {
      5
    }
    options = {
      options
    }
  
    >
    {
      list_poly.map((object, i) =>


        <
        Polygon key = {
          i
        }
        path = {
          object
        }
        onClick = {
          () => clickk(i)
        }
        options = {
          (Array.isArray(mapProps.selectedItems) && mapProps.selectedItems.includes(i)) ? mapOptionsClicked : mapOptionsNotClicked
        }
        />

      )

    } <
    >
    < /> < /
    GoogleMap > <
    h1 > {
      mapProps.ttest
    } < /h1> < /
    > <
    /LoadScript>)

  }
  