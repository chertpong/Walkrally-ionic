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

    //
    //function setTemplateUrlModal(index){
    // if (index=='detail'){
    //   var TemplateUrl =  'app/mapbegin/mapViewDetail.html';
    // }else{
    //   var TempleteUrl= 'app/mapbegin/mapViewMoreDetail.html';
    // }

      $ionicModal.fromTemplateUrl('app/mapbegin/mapViewDetail.html', {
        scope: $scope,
        animation: 'fade-in'
      }).then(function (modal) {
        $scope.modal1 = modal;
      });

      $ionicModal.fromTemplateUrl('app/mapbegin/mapViewMoreDetail.html', {
        scope: $scope,
        animation: 'fade-in'
      }).then(function (modal) {
        $scope.modal2 = modal;
      });


    function setMarkers(){
      $scope.places.forEach(function(place){
        var geolocation = new qq.maps.LatLng(place.location.lat, place.location.lng);
        var marker = new qq.maps.Marker({
          position: geolocation,
          map: $rootScope.map
        });
        qq.maps.event.addListener(marker, 'click', function (index) {

          $scope.modal1.show();
          $scope.place = place;

        });
      });
    }

    $scope.openModal = function(){
      $scope.modal2.show();
    };



      $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    $scope.linkToBeginMap = function(){
      console.log('sucess111');
      $state.go('mapbegin');
    };

    $scope.linkToLogin = function(){
      console.log('sucess');
      $state.go('login');
    };
    
    
    /*   $scope.data = {};
    $scope.data.showSearch = false;

    $timeout( function() {

      $scope.data.items = [
        { price: '$4.99', text: 'Landmark' },
        { price: '$2.99', text: 'Food' },
        { price: '$3.99', text: 'Culture' },
        { price: '$4.99', text: 'Shop' },
        { price: '$2.99', text: 'Etc.' },
    
      ];

      $ionicScrollDelegate.scrollTo(0, 44, false);
      $scope.data.showSearch = true;

    }, 2000);

    $scope.clearSearch = function() {
      $scope.data.searchQuery = '';
    };*/
  }
})();
