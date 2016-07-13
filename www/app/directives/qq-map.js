(function(){
  'use strict';
  angular.module('app')
    .directive("bMap", function ($rootScope) {
      return {
        restrict: "E",
        replace: true,
        template: "<div id='bMap'></div>",
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
          $rootScope.map = new BMap.Map('bMap',{enableMapClick:false});

          var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});
          $rootScope.map.addControl(top_right_navigation);

          var geolocationControl = new BMap.GeolocationControl();
          $rootScope.map.addControl(geolocationControl);
          geolocationControl.addEventListener("locationSuccess", function(e){
              $rootScope.map.setZoom(20);

          });

          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(position){
            if(this.getStatus()==BMAP_STATUS_SUCCESS){
             // console.log('position.point:',position.point.lat,position.point.lng);  r.point.lng+','+r.point.lat
              var point = new BMap.Point(position.point.lng,position.point.lat);
              $rootScope.map.centerAndZoom(point,20);
              $rootScope.map.panTo(position.point);

              //var currentPosition = new BMap.Marker(point);
              //$rootScope.map.addOverlay(currentPosition);
              //currentPosition.addEventListener('click',function(){
              //  alert(" your current location");
              //});


              setTimeout(function(){
                $rootScope.map.setZoom(20);
              }, 300);

              $rootScope.map.enableScrollWheelZoom(true);
             // alert('your current' + position.point.lng +','+ position.point.lat);
            }else{
              alert('failed' + this.getStatus());
            }
          },{enableHighAccuracy: true});

        }
      };
    });
})();
