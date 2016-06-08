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
          $rootScope.map = new BMap.Map('bMap');
          var geolocationControl = new BMap.GeolocationControl();
          //geolocationControl.addEventListener("locationSuccess", function(e){
          //});
          //geolocationControl.addEventListener("locationError",function(e){
          //  // 定位失败事件
          //  alert(e.message,"error place");
          //});
          $rootScope.map.addControl(geolocationControl);
          var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});
          $rootScope.map.addControl(top_right_navigation);
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(position){
            if(this.getStatus()==BMAP_STATUS_SUCCESS){
             // console.log('position.point:',position.point.lat,position.point.lng);  r.point.lng+','+r.point.lat
              var point = new BMap.Point(position.point.lng,position.point.lat);
              $rootScope.map.centerAndZoom(point,12);
             //
             // var currentPosition = new BMap.Marker(position.point);
             // $rootScope.map.addOverlay(currentPosition);
             // currentPosition.addEventListener('click',function(){
             //  alert(" your current location");
             // });
              setTimeout(function(){
                $rootScope.map.setZoom(15);
              }, 2000);
              $rootScope.map.panTo(position.point);
              $rootScope.map.enableScrollWheelZoom(true);
             // alert('your current' + position.point.lng +','+ position.point.lat);
            }else{
              alert('failed' + this.getStatus());
            }
          },{enableHighAccuracy: true});



          //$rootScope.map = new qq.maps.Map(mapContainer,{
          //  center: new qq.maps.LatLng(39.914850, 116.403765),
          //  zoom: 13,
          //  draggable: scope.draggable,
          //  scrollwheel: true,
          //  disableDoubleClickZoom: false
          //});
          //$rootScope.map.zoomTo(scope.zoom);
          //var center;
          //// Get the user's current location
          //navigator.geolocation.getCurrentPosition(
          //  function displayCenter(position){
          //    // If scope.centerLatitude && scope.centerLongitude) are set, then just set location
          //    if(scope.centerLatitude && scope.centerLongitude) {
          //      center = new qq.maps.LatLng(parseFloat(scope.centerLatitude),parseFloat(scope.centerLongitude));
          //    }
          //    else {
          //      // There is no location set
          //      center = new qq.maps.LatLng(position.coords.latitude,position.coords.longitude);
          //      //var marker = new qq.maps.Marker({
          //      //  position: center,
          //      //  map: $rootScope.map
          //      //});
          //    }
          //
          //    $rootScope.map.panTo(center);
          //  },
          //  function failCallback(err){
          //    console.error(err);
          //  });
// qq map
          //var mapContainer = document.getElementById('qqMap');
          //
          //$rootScope.map = new qq.maps.Map(mapContainer,{
          //  center: new qq.maps.LatLng(39.914850, 116.403765),
          //  zoom: 13,
          //  draggable: scope.draggable,
          //  scrollwheel: true,
          //  disableDoubleClickZoom: false
          //});
          //$rootScope.map.zoomTo(scope.zoom);
          //var center;
          //// Get the user's current location
          //navigator.geolocation.getCurrentPosition(
          //  function displayCenter(position){
          //    // If scope.centerLatitude && scope.centerLongitude) are set, then just set location
          //    if(scope.centerLatitude && scope.centerLongitude) {
          //      center = new qq.maps.LatLng(parseFloat(scope.centerLatitude),parseFloat(scope.centerLongitude));
          //    }
          //    else {
          //      // There is no location set
          //      center = new qq.maps.LatLng(position.coords.latitude,position.coords.longitude);
          //      //var marker = new qq.maps.Marker({
          //      //  position: center,
          //      //  map: $rootScope.map
          //      //});
          //    }
          //
          //    $rootScope.map.panTo(center);
          //  },
          //  function failCallback(err){
          //    console.error(err);
          //  });
          //  var mapContainer = document.getElementById('bMap');

        }
      };
    });
})();
