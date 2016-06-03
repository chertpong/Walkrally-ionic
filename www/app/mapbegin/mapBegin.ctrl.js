(function(){
  'use strict';
  angular.module('app')
    .controller('mapBeginCtrl', mapBeginCtrl);

  function mapBeginCtrl($scope, $stateParams, Storage, $http, $state, $rootScope, $ionicModal,$log){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.places=[];

    var server= "http://52.163.91.205";
    var path = "/api/places";
    loadMap();
    var latlngs=[];

    function loadMap(){
      $http.get(server+path)
        .then(function (response) {
          $scope.places = response.data;
          $log.debug('[+]','places are loaded',response.data.length);
          //TODO : remove after add fake location
          $scope.places.push({name:'test1',location:{lat:30.648658,lng:104.186639}});
          $scope.places.push({name:'test2',location:{lat:30.651624,lng:104.186103}});
          $scope.places.push({name:'test3',location:{lat:30.653036,lng:104.190699}});

          Storage.setPlaces($scope.places).then(function(){
            setMarkers();
          });
        }).catch(function (err) {
        console.log(err);
        $scope.error = true;
      });
    }
    function setMarkers(){
      $scope.places.forEach(function(place){
        var geolocation = new qq.maps.LatLng(place.location.lat, place.location.lng);
        var marker = new qq.maps.Marker({
          position: geolocation,
          map: $rootScope.map
        });
        $ionicModal.fromTemplateUrl('app/mapbegin/mapViewDetail.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
        });
        qq.maps.event.addListener(marker, 'click', function () {
          $scope.modal.show();
          $scope.place = place;
        });
      });
    }
    $scope.linkToBeginMap = function(){
      console.log('sucess111');
      $state.go('mapbegin');
    };

    $scope.linkToLogin = function(){
      console.log('sucess');
      $state.go('login');
    }
  }
})();
