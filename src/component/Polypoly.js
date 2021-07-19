import React, {Component, useState, useRef, useCallback,ReactDOM } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap,Polyline,Polygon, useJsApiLoader} from '@react-google-maps/api';


export default class Polypoly extends Component{
	constructor(props) {
    super(props);
    this.state = {
	mapOptions:{strokeColor: "#212527",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: props.fillColor,
			fillOpacity: 0.35,
			polygonKey: 1},
	nbClick:0,
	id:props.id,
	path: props.path}
    
// mapOtions={
				// strokeColor: this.state.StrokeColor,
				// strokeOpacity: this.state.strokeOpacity,
				// strokeWeight: this.state.strokeWeight,
				// fillColor: this.state.fillColor,
				// fillOpacity: this.state.fillOpacity,
				// polygonKey: this.state.polygonKey
			// }	
		
	
	// this.myRef = React.createRef();
	// this.handleToggleClick = this.handleToggleClick.bind(this);
	// this.state.isLoaded=this.isLoaded.bind(this);
  }
  
  
  
//   onClick= () => {
// 		console.log("rrrrrrrrr");
// 	  if (this.state.mapOptions["fillColor"]=="#05628A"){
// 		  let copyMapOptions = { ...this.state.mapOptions, fillColor: "#212527" };
// 		  this.setState({mapOptions: copyMapOptions,nbClick:1});
// 	  }else{
// 		  let copyMapOptions = { ...this.state.mapOptions, fillColor: "#05628A" };
// 		  this.setState({mapOptions: copyMapOptions,nbClick:0});
// 	  }
//   }
  

  render(){
	  return (
		
		  <Polygon
		  clickable
			// onClick={()=>{this.props.whenClicked(this.state.id)}}
			path={this.state.path}
			options={this.state.mapOptions}
		  />
	  
	  );
  }
}