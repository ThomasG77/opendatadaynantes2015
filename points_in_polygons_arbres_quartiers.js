var turf = require('turf');
var fs = require('fs');

var pointsArbres = fs.readFileSync('./arbres_seve_nantes.geojson');
pointsArbres = JSON.parse(pointsArbres);

var polygonsQuartiers = fs.readFileSync('./quartiers_nantes.geojson');
polygonsQuartiers = JSON.parse(polygonsQuartiers);

var counted = turf.count(polygonsQuartiers, pointsArbres, 'pt_count');
console.log(JSON.stringify(counted));
