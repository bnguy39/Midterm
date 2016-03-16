var map;
require([
  "esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/BasemapToggle", "esri/arcgis/utils", "esri/dijit/LayerList",
  "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
  "dojo/domReady!"// modules need to be added to this list before dojo/domReady, separated by a comma and enclosed in quotation marks
], function (
  Map, ArcGISDynamicMapServiceLayer, BasemapToggle,
  arcgisUtils, LayerList// the names of functions corresponding to the modules need to be added to this list, separated by a comma
) {
  map = new Map("map", {
    basemap: "topo", // list of basemap names: https://developers.arcgis.com/javascript/jsapi/esri.basemaps-amd.html
    center: [-90, 30],
    zoom: 4
  });

  //Create a map based on an ArcGIS Online web map id
   arcgisUtils.createMap("df8bcc10430f48878b01c96e907a1fc3", "map").then(function(response){
       var myWidget = new LayerList({
          map: response.map,
          layers: arcgisUtils.getLayerList(response)
       },"layerList");
       myWidget.startup();
   });


	// Create a layer object from an ArcGIS Server web service, with no options
  var layer3= new ArcGISDynamicMapServiceLayer( "http://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Owner_Occupied_Housing/MapServer" );
  map.addLayer(layer3); // add the layer object to the map

var layer1= new ArcGISDynamicMapServiceLayer( "http://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Unemployment_Rate/MapServer" );
map.addLayer(layer1); // add the layer object to the map

// Create a layer object from an ArcGIS Server web service, setting the opacity option
var layer2= new ArcGISDynamicMapServiceLayer( "http://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Diversity_Index/MapServer", {
  "opacity": 0.15
});
map.addLayer(layer2); // add the layer object to the map



var toggle = new BasemapToggle({
  map: map,
  basemap: "hybrid"
}, "BasemapToggle");
toggle.startup();
});
  // code to add layers and map control goes here
