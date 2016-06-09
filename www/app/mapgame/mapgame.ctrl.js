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
      $rootScope.map.clearOverlays();
      $rootScope.map.enableScrollWheelZoom(true);
        var Icon;
        $scope.places.forEach(function(place){
        var geolocation = new BMap.Point(place.location.lng,place.location.lat);

          if (place.type == "Landmark") {
            Icon = new BMap.Icon("img/1land.png", new BMap.Size(40,54));

          } else if (place.type == "Culture") {
            Icon = new BMap.Icon("img/2cul.png", new BMap.Size(40,54));

          }else if (place.type == "Shopping") {
            Icon = new BMap.Icon("img/3shop.png", new BMap.Size(40,54));

          }else if (place.type == "Restautant") {
            Icon = new BMap.Icon("img/4res.png", new BMap.Size(40,54));

          } else {
            Icon = new BMap.Icon("img/5other.png", new BMap.Size(40,54));
          }

        var marker = new BMap.Marker(geolocation, {icon: Icon});
        $rootScope.map.addOverlay(marker);
        marker.addEventListener('click',function (index) {
          $scope.modalGameViewDetail.show();
          $scope.place = place;
          // Mock
          $scope.place.descriptions = $scope.place.descriptions.filter(function(d){
             // return d.language == "th";
             return d.language == language
          });
          $scope.place.questions[0].descriptions = $scope.place.questions[0].descriptions.filter(function(q){
           // return q.language == "th";
            return q.language == language
          });
          $scope.place.questions[0].choices[0].description = $scope.place.questions[0].choices[0].description.filter(function(a1){
           // return a1.language == "th";
            return a1.language == language
          });
          $scope.place.questions[0].choices[1].description = $scope.place.questions[0].choices[1].description.filter(function(a2){
          // return a2.language == "th";
            return a2.language == language
          });
          $scope.place.questions[0].choices[2].description = $scope.place.questions[0].choices[2].description.filter(function(a3){
           // return a3.language == "th";
            return a3.language == language
          });
          $scope.place.questions[0].choices[3].description = $scope.place.questions[0].choices[3].description.filter(function(a4){
            //return a4.language == "th";
            return a4.language == language
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
       var  walking = new BMap.WalkingRoute($rootScope.map);
        walking.search(start,end);
        walking.setSearchCompleteCallback(function(){
          var pts = walking.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
          var polyline = new BMap.Polyline(pts);
          $rootScope.map.addOverlay(polyline);
        });
      }

    }

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

    //$scope.checkQuestion = function(questionId){
    //get
    //
    //  return true;
    //
    //  return false;
    //};

    $scope.postAnswer = function(answer){

      //Storage.getQuestionIds().then(function(questionIs){
      //  if(questionIs==null){
      //    Storage.setQuestionIds($scope.place.questions[0]._id).then(function(){
      //      // setRoute();
      //      setMarkers();
      //
      //    });
      //
      //  }eles
      //
      //});


      var path = C.backendUrl + '/api/questions/'+$scope.place.questions[0]._id+'/answer';

      console.log(answer);
      if($scope.answer == "0"){
        answer = $scope.place.questions[0].choices[0]._id;
      }else if($scope.answer == "1"){
        answer= $scope.place.questions[0].choices[1]._id;
      }else if($scope.answer == "2"){
        answer= $scope.place.questions[0].choices[2]._id;
      }else{
        answer=$scope.place.questions[0].choices[3]._id;
      }

      Storage.getTeamId().then(function(response){
        var data = {teamId: response, choiceId:answer};

        console.log(data);
        $http.post(path,data)
          .then(function (response) {
            console.log(response);

            response.data.correctAnswer.description = response.data.correctAnswer.description.filter(function(solution){
              return solution.language == "en";
             // return solution.language == language
            });

            if(response.data.message == "correct"){
              var alertAnswer1 = $ionicPopup.alert({
                title: 'alert',
                template: '<b>'+'You are'+ response.data.message + '</b>'
              });
              $scope.modalQuestion.hide();
            } else{
              var alertAnswer2 = $ionicPopup.alert({
                title: 'alert',
                template: '<b>'+response.data.message +'</b>'+'<br>'+'The correct answer is'+ response.data.correctAnswer.description[0].content
              });
               $scope.modalQuestion.hide();
                  }
          }).catch(function (err) {
          console.log(err);
          $scope.error = true;
                 });
      });
    }
  }
})();


