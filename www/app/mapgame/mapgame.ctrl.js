(function(){
  'use strict';
  angular.module('app')
    .controller('mapGameCtrl', mapGameCtrl);

  function mapGameCtrl($scope, $state, Storage, $http, $rootScope, C, $ionicModal,$log, GeolocationPlugin,$ionicPopup){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.places=[];
    $scope.location={};
    var language;

    Storage.getLanguage().then(function(l){
       language = l;
    });

    var path = C.backendUrl+"/api/places";
    loadMap();

    function loadMap(){
      $http.get(path)
        .then(function (response) {
          $scope.places = response.data;

          $log.debug('[+]','places are loaded',response.data.length);
          console.log($scope.places);
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

    $ionicModal.fromTemplateUrl('app/mapgame/mapgame-ViewDetail.html', {
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modalGameViewDetail = modal;
    });

    $ionicModal.fromTemplateUrl('app/mapgame/mapgame-ViewMoreDetail.html', {
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modalGameViewMoreDetail = modal;
    });

    $ionicModal.fromTemplateUrl('app/mapgame/mapgame-ListQuestions.html', {
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modalListQuestion = modal;
    });

    $ionicModal.fromTemplateUrl('app/mapgame/mapgame-Question.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modalQuestion = modal;
    });

    function setMarkers(){
     // var myIcon = new 	BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
      $scope.places.forEach(function(place){
        var geolocation = new BMap.Point(place.location.lng,place.location.lat);
        var marker = new BMap.Marker(geolocation);

        $rootScope.map.addOverlay(marker);
        marker.addEventListener('click',function (index) {
          $scope.modalGameViewDetail.show();
          $scope.place = place;
          // Mock
          $scope.place.descriptions = $scope.place.descriptions.filter(function(d){
              return d.language == "th";
              //return d.language == language
          });
          $scope.place.questions[0].descriptions = $scope.place.questions[0].descriptions.filter(function(q){
            return q.language == "th";
            //return q.language == language
          });
          $scope.place.questions[0].choices[0].description = $scope.place.questions[0].choices[0].description.filter(function(a1){
            return a1.language == "th";
            //return a1.language == language
          });
          $scope.place.questions[0].choices[1].description = $scope.place.questions[0].choices[1].description.filter(function(a2){
           return a2.language == "th";
            //return a2.language == language
          });
          $scope.place.questions[0].choices[2].description = $scope.place.questions[0].choices[2].description.filter(function(a3){
            return a3.language == "th";
           // return a3.language == language
          });
          $scope.place.questions[0].choices[3].description = $scope.place.questions[0].choices[3].description.filter(function(a4){
            return a4.language == "th";
            //return a4.language == language
          });
          console.log($scope.place.descriptions);
          console.log($scope.place.questions[0].descriptions);
          console.log($scope.place.questions[0].choices[0].description);
          console.log($scope.place.questions[0].choices[1].description);
          console.log($scope.place.questions[0].choices[2].description);
          console.log($scope.place.questions[0].choices[3].description);
        });
      });
    }

    function setRoute(){
      for (var i=1;i < $scope.places.length;i++){
                $log.debug('i value =',i);
                $log.debug('place',$scope.places[i-1]);
                $log.debug('place',$scope.places[i]);
       var start = new BMap.Point($scope.places[i-1].location.lng,$scope.places[i-1].location.lat);
       var  end = new BMap.Point($scope.places[i].location.lng,$scope.places[i].location.lat);
       var  walking = new BMap.WalkingRoute($rootScope.map, {renderOptions:{map: $rootScope.map, autoViewport: true}});
        walking.search(start,end);
        //walking.setSearchCompleteCallback(function(res){
        //  console.log(res);
        //});
      }
      //starts.forEach(function(start){
      //  ends.forEach(function(end){
      //    walking.search(start,end);
      //  });
      //});
    }

    $scope.getCurrent= function() {
      Geolocation.getCurrentPosition().then(function(position){
        $log.debug('html current position',position);
      });
    };

    $scope.getCompare= function(place){
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(position){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){

          var gps1 = new BMap.Point(position.point.lng,position.point.lat);
          console.log('current.point:',gps1);

          var gps2 = new BMap.Point(place.location.lng,place.location.lat);
          console.log('gps2.point:', gps2);

          var distance = ($rootScope.map.getDistance(gps1,gps2)).toFixed(2);
          $log.debug(distance);

          if (distance > 100){
                      $scope.modalListQuestion.show();
                    } else{
            var alertPopup = $ionicPopup.alert({
              title: 'alert',
              template: "you're too far"
            });
            alertPopup.then(function(res) {
              console.log('too far from your destination');
            });
                    }

        }else{alert('failed' + this.getStatus());}
      },{enableHighAccuracy: true});
    };

    $scope.openModalGameViewMoreDetail = function(){
      $scope.modalGameViewMoreDetail.show();
    };
    $scope.openModalListQuestion = function(){
      $scope.modalListQuestion.show();
    };
    $scope.openModalQuestion = function(){
      $scope.modalQuestion.show();

    };

    $scope.postAnswer = function(answerId){
      var server= "http://52.163.91.205";
      var path = '/api/questions/'+answerId+'/answer';

      Storage.getTeamId().then(function(response){
        var data = {teamId: response, choiceId:answerId};

        console.log(data);
        $http.post(server+path,data)
          .then(function (response) {
            console.log(response);
            alert('your answer are '+ response.correct);
            if(response){

              modalQuestion.hide();}

          }).catch(function (err) {
          console.log(err);
          $scope.error = true;
        });

      });




    }



  }

})();


