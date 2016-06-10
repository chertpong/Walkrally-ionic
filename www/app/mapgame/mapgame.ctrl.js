(function(){
  'use strict';
  angular.module('app')
    .controller('mapGameCtrl', mapGameCtrl);

  function mapGameCtrl($scope, $state, Storage, $http, $rootScope, C, $ionicModal,$log, GeolocationPlugin,$ionicPopup,
                       counter, language){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.places=[];
    var allPlaces=[];
    $scope.location={};
    $scope.answer = '';
  //"Ming Tablet (明碑)","Tang Tablet (唐碑)","The Second Gate (二门)","Chu Shi Biao (出师表)","The Corrior of Generals (武将廊)","The Corridor of Officials (文臣廊)",
    //"Liu Bei Temple (汉昭烈庙)","Big Bell (大钟)","Large Drum (诸葛鼓)","Guan Yu (关羽)","Zhang Fei (张飞)","Zhuge Shang (诸葛尚)","Zhuge Zhan Statue (诸葛瞻像)",
    //"Wu Hou Memorial Temple (武侯祠)","name":"Zhuge Liang Statue (诸葛亮像)","San Yi Temple (三义庙)","Hui Ling (惠陵)","name":"Exhibition Hall of the Three Kingdoms Culture (三国文化陈列室)",
    //"name":"North Gate (北门)","Paper-Cut (剪纸)","Happiness Hand Chain (喜神连)","name":"Sichuan Opera Stage （川剧戏台）"
    var routeId =["5757cc03225fcf2f5c721d95","5757cef2321b9a1c620bec6a","5757e462752e58cddf4fa8cf","5757e3b8752e58cddf4fa8b7","5757e5da752e58cddf4fa917","5757e68f752e58cddf4fa92f",
      "575801aff6fe9eb1db05f78a","5757e7a5752e58cddf4fa95f","5757facaee13431790261886","5757ea83752e58cddf4fa977","5757feb1ee1343179026189e","5757f8f0ee1343179026186e","5757f4eb752e58cddf4fa9ef",
      "575811291f20f8434ea2c5d3","5758050df6fe9eb1db05f7a2","5757f28a752e58cddf4fa9d7","5757e470752e58cddf4fa8e7","5757e6bb752e58cddf4fa947","5757e57e752e58cddf4fa8ff","575834f838e6cdfdf09bbaf0",
      "575835ca38e6cdfdf09bbb08","575815c91f20f8434ea2c603","575a7fcf510d456cd1788a92"];

    $scope.counter = {
      timeObject : counter.timeObject,
      counter: counter
    };

    var path = C.backendUrl+"/api/places";
    //loadMap();
    loadMapTest();

    //function loadMap(){
    //  $http.get(path)
    //    .then(function (response) {
    //      $scope.places = response.data;
    //      $log.debug('[+]','places are loaded',response.data.length);
    //      Storage.setPlaces($scope.places).then(function(){
    //        // setRoute();
    //        setMarkers();
    //
    //      });
    //    }).catch(function (err) {
    //    $log.debug('[!] Error: ',err);
    //    $scope.error = true;
    //  });
    //}

    //TODO : remove after complete test and un-comment the real
    function loadMapTest(){
      $http.get(path)
        .then(function (response) {
          allPlaces = response.data;
          $log.debug('[+]','places are loaded',response.data.length);
          filterRoute();
        }).catch(function (err) {
        $log.debug('[!] Error: ',err);
        $scope.error = true;
      });
    }

    function filterRoute(){
      routeId.forEach(function(routeId){
        var placeFiltered = allPlaces.filter(function(place){
          return place._id.toString() == routeId;
        });
        $log.debug('[+]','placeMatch',placeFiltered[0]);
        $scope.places.push(placeFiltered[0]);
        $log.debug('[=]','places filter',$scope.places);
      });
        $log.debug('===Then=== start marker');
      setMarkers();
      //setRoute();

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

        }else if (place.type == "Restaurant") {
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
      //for (var i=1;i < $scope.places.length;i++){
      //  $log.debug('i value =',i);
      //  $log.debug('place',$scope.places[i-1]);
      //  $log.debug('place',$scope.places[i]);
      //  var start = new BMap.Point($scope.places[i-1].location.lng,$scope.places[i-1].location.lat);
      //  var  end = new BMap.Point($scope.places[i].location.lng,$scope.places[i].location.lat);
      //  var  walking = new BMap.WalkingRoute($rootScope.map);
      //  walking.search(start,end);
      //  walking.setSearchCompleteCallback(function(){
      //    var pts = walking.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
      //    var polyline = new BMap.Polyline(pts);
      //    $rootScope.map.addOverlay(polyline);
      //  });
      //}

     // for (var i=1;i < $scope.places.length;i++){
     //   $log.debug('i value =',i);
     //   $log.debug('place',$scope.places[i-1]);
     //   $log.debug('place',$scope.places[i]);
        var start = new BMap.Point($scope.places[0].location.lng,$scope.places[0].location.lat);
        var  end = new BMap.Point($scope.places[1].location.lng,$scope.places[1].location.lat);
        var  walking = new BMap.WalkingRoute($rootScope.map);
        walking.search(start,end);
        walking.setSearchCompleteCallback(function(){
          var pts = walking.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
          var polyline = new BMap.Polyline(pts);
          $rootScope.map.addOverlay(polyline);
        });
     // }
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

    $scope.isDisabled = false;
    $scope.checkQuestion = function(questionId){
      $log.debug('check question id:',questionId);
      var correctChoice = "";
      var path2 = C.backendUrl + '/api/questions/'+questionId;
      $http.get(path2)
        .then(function (response) {
          console.log(response.data.choices);
          if(response.data.choices) {
            response.data.choices = response.data.choices.filter(function (choices) {
              return choices.correct.toString() == "true";
            });
              response.data.choices[0].description = response.data.choices[0].description.filter(function(choice){
                // TODO language select choice
                return choice.language == "en";
                //  return solution.language == language
              });
          }
          correctChoice = response.data.choices[0].description[0].content;
        })
        .catch(function (err) {
          console.log(err);
          $scope.error = true;
        });

      var path = C.backendUrl + '/api/questions/'+questionId+'/answer';
      Storage.getTeamId().then(function(response){
        var data = {teamId: response, choiceId: "test"};
        var alreadyAnsAleart = function(){
          $ionicPopup.alert({
            title: '<b>'+'You already answered !'+'</b>',
            template: 'The answer is '+'<br>'+correctChoice,
            buttons:
              [{
                text: 'OK',
                type: 'button'
              }]
          });
          var Icon = new BMap.Icon("img/answeredMark.png", new BMap.Size(40,54));
          var places = new BMap.Point($scope.place.location.lng,$scope.place.location.lat);
          var markerChange2 = new BMap.Marker(places, {icon: Icon});
          $rootScope.map.addOverlay(markerChange2);
          markerChange2.addEventListener('click',function (index){
            $scope.modalGameViewDetail.show();
          });
        };
        $http.post(path,data)
          .then(function (response) {
            console.log(response);
            $scope.modalQuestion.show();
          })
            .catch(function (err) {
              console.log(err);
              if(err.data.message=="This question is already answered"){
                $log.debug('not able to answer/already');
                alreadyAnsAleart();
                $scope.isDisabled = true;
              }else {
                $log.debug('able to answer');
                $scope.modalQuestion.show();
              }
              $scope.isDisabled = false;
              $scope.error = true;
            });
      });
    };

    $scope.postAnswer = function(answer){
      var Icon = new BMap.Icon("img/answeredMark.png", new BMap.Size(40,54));
      var places = new BMap.Point($scope.place.location.lng,$scope.place.location.lat);
      var markerChange = new BMap.Marker(places, {icon: Icon});

      var path = C.backendUrl + '/api/questions/'+$scope.place.questions[0]._id+'/answer';
      Storage.getTeamId().then(function(response){
        var data = {teamId: response, choiceId: answer};

        $log.debug('answer:',data);
        $http.post(path,data)
          .then(function (response) {
            console.log(response);

            if(response.data.correctAnswer){
              response.data.correctAnswer.description = response.data.correctAnswer.description.filter(function(solution){
                // TODO language select choice
                return solution.language == "en";
                //  return solution.language == language
              });
            }

            var alertAnswer1 = function(){
              return $ionicPopup.alert({
                title: 'alert',
                template: '<b>'+'You are '+ response.data.message + '</b>',
                buttons:
                  [{
                    text: 'OK',
                    type: 'button'
                  }]
              });
            };
            var alertAnswer2 = function(){
              return $ionicPopup.alert({
                title: '<b>'+response.data.message +'</b>',
                template: '<br>'+'The correct answer is '+ response.data.correctAnswer.description[0].content,
                buttons:
                  [{
                    text: 'OK',
                    type: 'button'
                  }]
              });
            };
            $log.debug('response answer status',response.data.correct);
            if(response.data.correct.toString() == 'true'){
              alertAnswer1();
              $scope.modalQuestion.hide();
              $rootScope.map.addOverlay(markerChange);
              markerChange.addEventListener('click',function (index){
                $scope.modalGameViewDetail.show();
              });
            } else{
              alertAnswer2();
              $scope.modalQuestion.hide();
              $rootScope.map.addOverlay(markerChange);
              markerChange.addEventListener('click',function (index){
                $scope.modalGameViewDetail.show();
              });
            }
          })
          .catch(function (err) {
            console.log(err);
            $scope.error = true;
          });
      });
    }
  }
})();


