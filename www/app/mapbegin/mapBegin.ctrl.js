(function(){
  'use strict';
  angular.module('app')
    .controller('mapBeginCtrl', mapBeginCtrl);

  function mapBeginCtrl($scope, $stateParams,C, Storage, $http, $state, $rootScope, $ionicModal,$log, $ionicPopup,
  $timeout){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.places= [];
    $scope.markers = [];
    $scope.tempMarkers = [];
    $scope.search = {
      type:'',
      name:''
    };
    var path = C.backendUrl+"/api/places";
    loadMap();

    function loadMap(){
      $http
        .get(path)
        .then(function (response) {
          $scope.places = response.data;
          $log.debug('[+]','places are loaded',response.data.length);
          //TODO : remove after add fake location

          Storage.setPlaces($scope.places).then(function(){
            // setRoute();
            setMarkers();
          });
        })
        .catch(function (err) {
          $log.debug('[!] Error: ',err);
          $scope.error = true;
        });
    }

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
      $rootScope.map.clearOverlays();
      var Icon;
      $scope.places.forEach(function(place){
        var geolocation = new BMap.Point(place.location.lng,place.location.lat);

        if (place.type == "Landmark") {
          Icon = new BMap.Icon("img/1land.png", new BMap.Size(40,54));

        } else if (place.type == "Culture") {
          Icon = new BMap.Icon("img/2cul.png", new BMap.Size(40,54));

        }else if (place.type == "Shopping") {
          Icon = new BMap.Icon("img/3shop.png", new BMap.Size(40,54));

        }else if (place.type == "Restaurant") {
          Icon = new BMap.Icon("img/4res.png", new BMap.Size(40,54));

        } else {
          Icon = new BMap.Icon("img/5other.png", new BMap.Size(40,54));
        }

        var marker = new BMap.Marker(geolocation, {icon: Icon});
        $rootScope.map.addOverlay(marker);
        marker.addEventListener('click',function(){
          $scope.modalViewDetail.show();
          $scope.place = place;
        });
        $scope.markers.push(marker);
      });
    }

    $scope.filterMarkers = function(keyword){
      $timeout(function(){
        var temp = $scope.tempMarkers.concat($scope.markers);
        $log.debug('filterMarkers','all',temp);
        $scope.tempMarkers = temp.filter(function(marker){
          if(marker)
            if(marker.getIcon().imageUrl.toString() != keyword.type.toString()){
              $rootScope.map.removeOverlay(marker);
              return true;
            }
            else
              return false;
          else
            return false;
        });
        $scope.markers = temp.filter(function(marker){
          if(marker)
            if(marker.getIcon().imageUrl.toString() === keyword.type.toString()){
              $rootScope.map.addOverlay(marker);
              return true;
            }
            else
              return false;
          else
            return false;
        });
        if(keyword.type.toString() === 'all'){
          temp.forEach(function(marker){
            $rootScope.map.removeOverlay(marker);
            $rootScope.map.addOverlay(marker);
          });
        }
        $log.debug('markers after filterMarkers', $scope.markers.length);
      },0);
    };

    $scope.showFilter = function(){
      var categories = $ionicPopup.show({
        templateUrl:'app/mapbegin/chooseCategories.html',
        title: 'Choose category',
        scope: $scope,
        buttons:
          [
            {
              text: 'Cancel',
              type: 'button-default',
              onTap: function(e) {
                // e.preventDefault() will stop the popup from closing when tapped.
                $log.debug('categoryPopup','cancel is selected');
                return null;
              }
            },
            {
              text: '<b>Select</b>',
              type: 'button',
              onTap: function(e) {
                // If user is not select any category, then don't do anything
                if (!$scope.search.type) {
                  e.preventDefault();
                } else {
                  $log.debug('select category:', $scope.search.type);
                  return $scope.search.type;
                }
              }
            }
          ]

      });
      categories
        .then(function(category) {
          if(category){ //if category is not null
            $log.debug('filter keyword:',category);
            $scope.search.type = category;
            $scope.filterMarkers($scope.search);
          }
        })
        .catch(function(err){
          $log.debug('select category err:',err);
          $scope.error = true;
          $scope.errorMessage = err.message;
        });
    };

    $scope.openModalDetail = function(){
      $scope.modalViewDetail.show();
    };

    $scope.openModalMoreDetail = function(){
      $scope.modalViewMoreDetial.show();
    };

    $scope.linkToBeginMap = function(){
      console.log('reloadMap');
      $state.go('mapbegin');
    };

    $scope.linkToLogin = function(){
      console.log('go to login');
      $state.go('login');
    };

  }
})();
