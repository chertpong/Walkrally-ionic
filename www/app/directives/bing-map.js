(function(){
  'use strict';
  angular.module('app')
    .directive("bingMap", function () {
      return {
        restrict: "E",
        replace: true,
        template: "<div id='bingMap'></div>",
        scope: {
          centerLatitude: "=",		// Latitude of center point on the map
          centerLongitude: "=", //Longitude of center point on the map
          markers: "=",	   // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
          width: "@",		 // Map width in pixels.
          height: "@",		// Map height in pixels.
          zoom: "=",		  // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
          zoomControl: "@",   // Whether to show a zoom control on the map.
          scaleControl: "@",   // Whether to show scale control on the map.
          address:"@"
        },
        link: function (scope, element, attrs) {
          var map;
          map = new Microsoft.Maps.Map(
            document.getElementById('bingMap'),
            {
              credentials: 'xxEqPBbX2DizyMgVDKqk~862rZ5LpDH9l-lHeXClraQ~At5GRZNCemLpwzFmOlJJYHe8EvjhV8nWS6mEYSqvn9mfKHnTj1cI8CKdDbsb3ta8',
              width: scope.width,
              height: scope.height,
              zoom: scope.zoom
            }
          );

          // Get the user's current location
          navigator.geolocation.getCurrentPosition(
            function displayCenter(position){
              var center;
              // If scope.centerLatitude && scope.centerLongitude) are set, then just set location
              if(scope.centerLatitude && scope.centerLongitude) {
                center = new Microsoft.Maps.Location(parseFloat(scope.centerLatitude),parseFloat(scope.centerLongitude));
                map.setView({
                  center : center
                });
              }
              else {
                // There is no location set
                center = new Microsoft.Maps.Location(position.coords.latitude,position.coords.longitude);
                map.setView({
                  center : center
                });
              }
            },
            function failCallback(err){
              console.error(err);
            });
        }
      };
    });
})();
