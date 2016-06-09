(function(){
  'use strict';
  angular.module('app')
    .controller('mapBeginCtrl', mapBeginCtrl);

  function mapBeginCtrl($scope, $stateParams,C, Storage, $http, $state, $rootScope, $ionicModal,$log){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.places=[];

    var path = C.backendUrl+"/api/places";
    loadMap();


    function loadMap(){
      $http.get(path)
        .then(function (response) {
          $scope.places = response.data;
          $log.debug('[+]','places are loaded',response.data.length);
          //console.log($scope.places);
          //TODO : remove after add fake location

          Storage.setPlaces($scope.places).then(function(){
            // setRoute();
            setMarkers();
          });
        }).catch(function (err) {
        $log.debug('[!] Error: ',err);
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
      backdropClickToClose: false,
      animation: 'fade-in'
    }).then(function (modal) {
      $scope.modalViewDetail = modal;
    });

      $ionicModal.fromTemplateUrl('app/mapbegin/mapViewMoreDetail.html', {
        scope: $scope,
        backdropClickToClose: false,
        animation: 'fade-in'
      }).then(function (modal) {
        $scope.modalViewMoreDetial = modal;
      });


    function setMarkers(){
      var Icon;

      $scope.places.forEach(function(place){
        //console.log(place);
        $rootScope.map.enableScrollWheelZoom(true);
        var geolocation = new BMap.Point(place.location.lng,place.location.lat);
        if (place.type == "Landmark") {
          Icon = new BMap.Icon("img/1land.png", new BMap.Size(300,170));
        } else if (place.type == "Culture") {
          Icon = new BMap.Icon("img/2cul.png", new BMap.Size(300,170));
        }else if (place.type == "Shopping") {
          Icon = new BMap.Icon("img/3shop.png", new BMap.Size(300,170));
        }else if (place.type == "Restautant") {
          Icon = new BMap.Icon("img/4res.png", new BMap.Size(300,170));
        } else {
          Icon = new BMap.Icon("img/5other.png", new BMap.Size(300,170));
        }
        var marker = new BMap.Marker(geolocation, {icon: Icon});
        $rootScope.map.addOverlay(marker);
        marker.addEventListener('click',function(){
          $scope.modalViewDetail.show();
          $scope.place = place;
        });
      });
    }
    $scope.openModalDetail = function(){
      $scope.modalViewDetail.show();
    };

    $scope.openModalMoreDetail = function(){
      $scope.modalViewMoreDetial.show();
    };

    //  $scope.closeModal = function(index) {
    //  if (index == 1) $scope.oModal1.hide();
    //  else $scope.oModal2.hide();
    //};

    $scope.linkToBeginMap = function(){
      console.log('reloadMap');
      $state.go('mapbegin');
    };

    $scope.linkToLogin = function(){
      console.log('go to login');
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
