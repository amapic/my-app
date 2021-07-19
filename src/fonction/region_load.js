import DATA from '../data/france_geojson.js';
var _ = require('underscore');


var list_poly = []

DATA.features.forEach(function (item) {
	
  var Coords = item.geometry.coordinates;

  var dimensions = [
	Coords.length,
	Coords.reduce((x, y) => Math.max(x, y.length), 0)
  ];


  var paths_list = [];
  // var X=0;
  for (let pas = 0; pas <= dimensions[0] - 1; pas++) {

	var X;
	if (dimensions[0]===1){
		X=[[Coords][pas][0]];
	}else if (item.properties.code==="84"){
		X=[[Coords][0][pas]];
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
	// console.log(paths.length);
	paths_list.push(paths[0]);
  }
  
	  if (paths_list.length === 1) {
		list_poly.push(paths_list[0]);
	  }else{
		  list_poly.push(paths_list[0]);
	  }

});

export default list_poly