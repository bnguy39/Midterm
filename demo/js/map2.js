  var map = new google.maps.Map( document.getElementById( 'map' ), {
    center: { lat: 30, lng: -90 },
    zoom: 4
  });

	var kml1 = new google.maps.KmlLayer({
	  url: 'http://wdssii.nssl.noaa.gov/realtime/nws_warnings.kmz',
	  preserveViewport: true // setting to true will prevent the map from zooming to this layer
	});
	kml1.setMap( map );

  var kml2 = new google.maps.KmlLayer({
	  url: 'http://radar.weather.gov/ridge/warningzipmaker.php',
	  preserveViewport: true // setting to true will prevent the map from zooming to this layer
	});
	kml2.setMap( map );
