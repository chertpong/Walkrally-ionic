(function(){
  'use strict';
  angular.module('app')
    .directive("qqMap", function ($rootScope) {
      return {
        restrict: "E",
        replace: true,
        template: "<div id='qqMap'></div>",
        scope: {
          centerLatitude: "=",		// Latitude of center point on the map
          centerLongitude: "=", //Longitude of center point on the map
          markers: "=",	   // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
          zoom: "=",		  // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
          zoomControl: "@",   // Whether to show a zoom control on the map.
          scaleControl: "@",   // Whether to show scale control on the map.
          address:"@",
          draggable: "="
        },
        link: function (scope, element, attrs) {
          var mapContainer = document.getElementById('qqMap');

          $rootScope.map = new qq.maps.Map(mapContainer,{
            center: new qq.maps.LatLng(39.914850, 116.403765),
            zoom: 13,
            draggable: scope.draggable,
            scrollwheel: true,
            disableDoubleClickZoom: false
          });
          $rootScope.map.zoomTo(scope.zoom);
          var center;
          // Get the user's current location
          navigator.geolocation.getCurrentPosition(
            function displayCenter(position){
              // If scope.centerLatitude && scope.centerLongitude) are set, then just set location
              if(scope.centerLatitude && scope.centerLongitude) {
                center = new qq.maps.LatLng(parseFloat(scope.centerLatitude),parseFloat(scope.centerLongitude));
              }
              else {
                // There is no location set
                center = new qq.maps.LatLng(position.coords.latitude,position.coords.longitude);
                //var marker = new qq.maps.Marker({
                //  position: center,
                //  map: $rootScope.map
                //});
              }

              $rootScope.map.panTo(center);
            },
            function failCallback(err){
              console.error(err);
            });
        }
      };
    });
})();
