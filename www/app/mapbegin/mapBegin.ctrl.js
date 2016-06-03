(function(){
  'use strict';
  angular.module('app')
    .controller('mapBeginCtrl', mapBeginCtrl);

  function mapBeginCtrl($scope, $stateParams, Storage, $http, $state, $rootScope, $ionicModal){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.places=[];

    //Storage.getUserToken().then(function(twitt){
    //  data.twitt = twitt;
    //});

    var server= "http://52.163.91.205";
    var path = "/api/places";

    $http.get(server+path)
      .then(function (response) {
        console.log(response.data);
        $scope.places = response.data;
        Storage.setPlaces(response.data).then(function(){
         // console.log(Storage.getPlaces());
        });
      }).catch(function (err) {
        console.log(err);
        $scope.error = true;
      });

  var latlngs=[];
    //var center;
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      function displayCenter(position) {
        // There is no location set place.location.lat
        // lat lng for test
         var latlngs = [
           new qq.maps.LatLng(30.648658, 104.186639),
           new qq.maps.LatLng(30.651624, 104.186103),
           new qq.maps.LatLng(30.653036, 104.190699)
         ];

        //var infoWin = new qq.maps.InfoWindow({
        //  map: $rootScope.map
        //});

        //if (Storage.getPlaces()) {
        //  for (var j = 0; j < Storage.getPlaces().length; j++) {
        //
        //    (function (n) {
        //        latlngs =[
        //      center = new qq.maps.LatLng($scope.places.location.lat[n], $scope.places.location.lng[n]);
        //      //  center= latlngs[n];
        //        ];
        //      console.log($scope.places);
        //    })(j);
        //  }
        //}}
        for (var i = 0; i < latlngs.length; i++) {
               //alert(latlngs.length);
            (function (n) {
            var marker = new qq.maps.Marker({
             position: latlngs[n],
              //position: center,
              map: $rootScope.map
            });
            qq.maps.event.addListener(marker, 'click', function () {
              $ionicModal.fromTemplateUrl('app/twitts/chooseLanguagePopup.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function (modal) {
                $scope.modal = modal;
              });
              //infoWin.open();
              //infoWin.setContent('<div style="text-align:center;white-space:'+
              //  'nowrap;margin:10px;">这是第 ' +
              //  n + ' 个标注</div>');
              //infoWin.setPosition(latlngs[n]);
            });
          })(
             i
           // j
          );
        }


      });









    //var latlngs = [
    //  new qq.maps.LatLng(39.91474,116.37333),
    //  new qq.maps.LatLng(39.91447,116.39336),
    //  new qq.maps.LatLng(39.90884,116.41306)
    //];
    //
    //for(var i = 0;i < latlngs.length; i++) {
    //
    //  //     alert(latlngs.length);
    //  (function(n){
    //    var marker = new qq.maps.Marker({
    //      position: latlngs[n],
    //      map: $rootScope.map
    //    });
    //    qq.maps.event.addListener(marker, 'click', function() {
    //      infoWin.open();
    //      infoWin.setContent('<div style="text-align:center;white-space:'+
    //        'nowrap;margin:10px;">这是第 ' +
    //        n + ' 个标注</div>');
    //      infoWin.setPosition(latlngs[n]);
    //    });
    //  })(i);
    //}
    //Krit
    //var center;
    //// Get the user's current location
    //navigator.geolocation.getCurrentPosition(
    //  function displayCenter(position) {
    //    // There is no location set
    //    center = new qq.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //    var marker = new qq.maps.Marker({
    //      position: center,
    //      map: $rootScope.map
    //    });
    //  });


    $scope.linkToBeginMap = function(){
      console.log('sucess111')
      $state.go('mapbegin');
    }


    $scope.linkToLogin = function(){
      console.log('sucess')
      $state.go('login');
    }

  }
})();
