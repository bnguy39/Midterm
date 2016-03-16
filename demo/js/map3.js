var layer, map, visible = [];
require([
  "esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/BasemapToggle",
  "dojo/dom", "dojo/on", "dojo/query", "dojo/_base/array",
  "dojo/domReady!"// modules need to be added to this list before dojo/domReady, separated by a comma and enclosed in quotation marks
], function (
  Map, ArcGISDynamicMapServiceLayer, BasemapToggle,
  dom, on, query, arrayUtils// the names of functions corresponding to the modules need to be added to this list, separated by a comma
) {
  map = new Map("map", {
    basemap: "topo", // list of basemap names: https://developers.arcgis.com/javascript/jsapi/esri.basemaps-amd.html
    center: [-90, 30],
    zoom: 4
  });


	// Create a layer object from an ArcGIS Server web service, with no options
var layer1= new ArcGISDynamicMapServiceLayer( "http://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Unemployment_Rate/MapServer" );
map.addLayer(layer1); // add the layer object to the map

var layer3= new ArcGISDynamicMapServiceLayer( "http://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Owner_Occupied_Housing/MapServer" );
map.addLayer(layer3); // add the layer object to the map

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

layer1.on("click", buildLayerList);

layer2.on("click", buildLayerList);

layer3.on("click", buildLayerList);

function buildLayerList() {
  var items = arrayUtils.map(layer.layerInfos, function(info, index) {
    if (info.defaultVisibility) {
      visible.push(info.id);
    }
    return "<input type='checkbox' class='list_item'" + (info.defaultVisibility ? "checked=checked" : "") + "' id='" + info.id + "'' /><label for='" + info.id + "'>" + info.name + "</label>";
  });
  var ll = dom.byId("layer_list");
  ll.innerHTML = items.join(' ');
  layer.setVisibleLayers(visible);
  on(ll, "click", updateLayerVisibility);
}

function updateLayerVisibility() {
  var inputs = query(".list_item");
  var input;
  visible = [];

  arrayUtils.forEach(inputs, function(input) {
    if (input.checked) {
      visible.push(input.id);
    }
  });
  //if there aren't any layers visible set the array to be -1
  if (visible.length === 0) {
    visible.push(-1);
  }
  layer.setVisibleLayers(visible);

};




  // code to add layers and map control goes here
