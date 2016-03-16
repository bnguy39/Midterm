var map = L.map('map').setView([30, -90], 4); // setting geographical coordinates to create map object


var streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', //add tile layer to map
	{
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map)

	var satellite = L.tileLayer( 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
		type: 'sat',
		ext: 'jpg',
		attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
		subdomains: '1234'
	});

// adding Web Map Services to map

var featuregroup = L.layerGroup();

function addpopup( feature, layer ){
  var html = feature.properties.mag + " magnitude, " + feature.properties.place;
  layer.bindPopup( html );
}


$.getJSON( "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", function( geojsonFeatures ){
  L.geoJson( geojsonFeatures, { onEachFeature: addpopup } ).addTo(map);
});


featuregroup.addTo( map );

// add layer control to map
var baseLayers = { // basemap to switch between
    "Streets": streets,
		"Satellite": satellite
};

var datalayers = {
  "Earthquakes": featuregroup
};


L.control.layers(baseLayers, datalayers).addTo(map);
