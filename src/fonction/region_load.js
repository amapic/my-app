import DATA from '../data/france_geojson.js';
// import {liste_id_region,liste_nom_region} from 'fonction'
var _ = require('underscore');


var list_poly = []

DATA.features.forEach(function (item,i) {
	
  var Coords = item.geometry.coordinates;

  var dimensions = [
	Coords.length,
	Coords.reduce((x, y) => Math.max(x, y.length), 0)
  ];


  var paths_list = [];
  // var X=0;
//   if (item.properties.code==="52"){
  for (let pas = 0; pas <= dimensions[0] - 1; pas++) {

	var X;
	if (dimensions[0]===1){
		X=[[Coords][pas][0]];
	}else if (item.properties.code==="84"){
		X=[[Coords][0][pas]];
	}else if (item.properties.code==="94"){
		X=[Coords][0][pas];
	}else if (item.properties.code==="52"){
		X=[Coords][0][pas];
	}else{
		X=[Coords][0][pas];
	}
	
	var paths = _.map([
	 X // doit être un array avec une valeur
	], function (entry) {
	  return _.reduce(entry, function (list, polygon) {
		// This map() only transforms the data.
		_.each(_.map(polygon, function (point) {
		  return {"lat":point[1],"lng": point[0]};
		}), function (point) {
		  list.push(point);
		});

		return list;
	  }, []);
	});
	paths_list.push(paths[0]); //[0]iitialement
}		
// list_poly[item.properties.code]=paths_list;
	  if (paths_list.length === 1) {
		list_poly[item.properties.code]=paths_list[0];
	  }else{
		  list_poly[item.properties.code]=paths_list;
	  }
	// }
// }
});





export default list_poly