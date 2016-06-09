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
//          $scope.places.push({name:'test1', descriptions: [
//            {
//              content:'places test 1 description',
//              language:'en'
//            }, {
//              content:'places test 1 คำอธิบาย',
//              language:'th'
//            }, {
//              content:'places test 1 简述',
//              language:'cn'
//            }],type:'Culture',
//            contact:
//            {name:'พระครูกิตติชัย โมฬี',
//              phoneNumber:'053-417248',
//              address:'90 Ratcha Damnoen Rd. Phra Sing, Muang Chiang Mai',
//          website:'http://culture.mome.co/watchaiphrakiat/',
//          openTime:'8:00',
//          closeTime:'17:00',
//          workingDay:'Daily',
//          description:''},
//            thumbnail:'https://lh3.googleusercontent.com/-Q21_-T2xRrU/Vr19_0yWTWI/AAAAAAAAADw/_Zrkx4tgX8k/s650-Ic42/T209.jpg',
////Happiness hand chain 30.645774, 104.049999 ,, {lat:30.648658,lng:104.186639}
//                                  location:{lat:30.645774,lng:104.049999},
//                            questions:[
//                              {descriptions:[{content:'question1',
//                                              language:'en'},
//                                              {content:'คำถาม1',
//                                                language:'th'},
//                                              {content:'问题1',
//                                                language:'cn'}],
//                                score:30,
//                                choices:[{correct:true,
//                              description:[{content:'answer1',
//                                              language:'en'},
//                                              {content:'คำตอบ1',
//                                                language:'th'},
//                                              {content:'答案1',
//                                                language:'cn'}]
//                                },{correct:false,
//                                description:[{content:'answer2',
//                                                  language:'en'},
//                                                  {content:'คำตอบ2',
//                                                    language:'th'},
//                                                  {content:'答案2',
//                                                    language:'cn'}]
//                                },{correct:false,
//                                description:[{content:'answer3',
//                                                  language:'en'},
//                                                  {content:'คำตอบ3',
//                                                    language:'th'},
//                                                  {content:'答案3',
//                                                    language:'cn'}]
//                                },{correct:false,
//                              description:[{content:'answer4',
//                                                  language:'en'},
//                                                {content:'คำตอบ4',
//                                                  language:'th'},
//                                                {content:'答案4',
//                                                  language:'cn'}]
//                                }]
//                              }]
//          });
//          $scope.places.push({name:'test2',descriptions: [
//            {
//              content:'places test 2 description',
//              language:'en'
//            }, {
//              content:'places test 2 คำอธิบาย',
//              language:'th'
//            }, {
//              content:'places test 2 简述',
//              language:'cn'
//            }],type:'shopping',
//           // Sichuan Opera stage 30.646153, 104.049769  ,,{lat:30.651624,lng:104.186103}
//            location:{lat:30.646153,lng:104.049769},
//            contact:
//            {name:'Wat Phra Singh',
//              phoneNumber:'054-356414',
//              address:'3313 Kai ko apartment, Suthep, Muang Chiang Mai',
//              website:'http://culture.mome.co/watchaiphrakiat/',
//              openTime:'5:00',
//              closeTime:'20:00',
//              workingDay:'Daily',
//              description:'Description place 2'},
//              thumbnail:'https://lh3.googleusercontent.com/-Q21_-T2xRrU/Vr19_0yWTWI/AAAAAAAAADw/_Zrkx4tgX8k/s650-Ic42/T209.jpg,location:{lat:30.651624,lng:104.186103}',
//                        questions:[
//                        {descriptions:[{content:'question2',
//                                      language:'en'},
//                                        {content:'คำถาม2',
//                                          language:'th'},
//                                        {content:'问题2',
//                                          language:'cn'}],
//                score:30,
//                          choices:[{correct:true,
//                            description:[{content:'answer1',
//                              language:'en'},
//                              {content:'คำตอบ1',
//                                language:'th'},
//                              {content:'答案1',
//                                language:'cn'}]
//                          },{correct:false,
//                            description:[{content:'answer2',
//                              language:'en'},
//                              {content:'คำตอบ2',
//                                language:'th'},
//                              {content:'答案2',
//                                language:'cn'}]
//                          },{correct:false,
//                            description:[{content:'answer3',
//                              language:'en'},
//                              {content:'คำตอบ3',
//                                language:'th'},
//                              {content:'答案3',
//                                language:'cn'}]
//                          },{correct:false,
//                            description:[{content:'answer4',
//                              language:'en'},
//                              {content:'คำตอบ4',
//                                language:'th'},
//                              {content:'答案4',
//                                language:'cn'}]
//                }]
//              }]
//          });
//          $scope.places.push({name:'test3',descriptions: [
//            {
//              content:'places test 3 description',
//              language:'en'
//            }, {
//              content:'places test 3 คำอธิบาย',
//              language:'th'
//            }, {
//              content:'places test 3 简述',
//              language:'cn'
//            }],type:'Culture',
//              contact:
//              {name:'Doi Suthep',
//                phoneNumber:'054-1111',
//                address:'Muang Chiang Mai',
//                website:'http://culture.mome.co/watchaiphrakiat/',
//                openTime:'2:00',
//                closeTime:'21:00',
//                workingDay:'Daily',
//                description:'Description place 3'},
//              thumbnail:'https://lh3.googleusercontent.com/-Q21_-T2xRrU/Vr19_0yWTWI/AAAAAAAAADw/_Zrkx4tgX8k/s650-Ic42/T209.jpg',
//            //30.6442199, 104.05147743   ,,{lat:30.653036,lng:104.190699}
//            location:{lat:30.6442199,lng:104.05147743},
//                                questions:[
//                                          {descriptions:[{content:'question3',
//                                                          language:'en'},
//                                                         {content:'问题3',
//                                                          language:'cn'},
//                                                          {content:'คำถาม3',
//                                                          language:'th'}],
//                                            score:30,
//                                            choices:[{correct:true,
//                                              description:[{content:'answer1',
//                                                language:'en'},
//                                                {content:'คำตอบ1',
//                                                  language:'th'},
//                                                {content:'答案1',
//                                                  language:'cn'}]
//                                            },{correct:false,
//                                              description:[{content:'answer2',
//                                                language:'en'},
//                                                {content:'คำตอบ2',
//                                                  language:'th'},
//                                                {content:'答案2',
//                                                  language:'cn'}]
//                                            },{correct:false,
//                                              description:[{content:'answer3',
//                                                language:'en'},
//                                                {content:'คำตอบ3',
//                                                  language:'th'},
//                                                {content:'答案3',
//                                                  language:'cn'}]
//                                            },{correct:false,
//                                              description:[{content:'answer4',
//                                                language:'en'},
//                                                {content:'คำตอบ4',
//                                                  language:'th'},
//                                                {content:'答案4',
//                                                  language:'cn'}]
//                                            }]
//                                          }]
//                              });
          Storage.setPlaces($scope.places).then(function(){
           // setRoute();
            setMarkers();
           // testRoute();
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
        var Icon;
        $scope.places.forEach(function(place){
        var geolocation = new BMap.Point(place.location.lng,place.location.lat);

        if (place.type == "Landmark") {
          Icon = new 	BMap.Icon("img/1land.png", new BMap.Size(300,170));
        } else if (place.type == "Culture") {
          Icon = new 	BMap.Icon("img/2cul.png", new BMap.Size(300,170));
        }else if (place.type == "Shopping") {
          Icon = new 	BMap.Icon("img/3shop.png", new BMap.Size(300,170));
        }else if (place.type == "Restautant") {
          Icon = new 	BMap.Icon("img/4res.png", new BMap.Size(300,170));
        } else {
          Icon = new BMap.Icon("img/5other.png", new BMap.Size(300,170));
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

    //function testRoute(){
    //var  Icon = new BMap.Icon("img/5other.png", new BMap.Size(300,170));
    //  var p1 = new BMap.Point($scope.places[0].location.lng,$scope.places[0].location.lat);
    //  var  p2 = new BMap.Point($scope.places[1].location.lng,$scope.places[1].location.lat);
    //  var  p3 = new BMap.Point($scope.places[2].location.lng,$scope.places[2].location.lat);
    //
    //  var marker1 = new BMap.Marker(p1, {icon: Icon});
    //  var marker2 = new BMap.Marker(p2, {icon: Icon});
    //  var marker3 = new BMap.Marker(p3, {icon: Icon});
    //  $rootScope.map.addOverlay(marker1);
    //  $rootScope.map.addOverlay(marker2);
    //  $rootScope.map.addOverlay(marker3);
    //
    //  var  walking = new BMap.WalkingRoute($rootScope.map, {renderOptions:{map: $rootScope.map, autoViewport: true}});
    //  walking.search(p1,p2);
    //  walking.search(p2,p3);
    //  walking.setSearchCompleteCallback(function(){
    //    var pts = walking.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
    //    var polyline = new BMap.Polyline(pts);
    //    $rootScope.map.addOverlay(polyline);
    //  });
    //
    //  var lab1 = new BMap.Label("起点",{position:p1});        //创建3个label
    //  var lab2 = new BMap.Label("途径点",{position:p2});
    //  var lab3 = new BMap.Label("终点",{position:p3});
    //  $rootScope.map.addOverlay(lab1);
    //  $rootScope.map.addOverlay(lab2);
    //  $rootScope.map.addOverlay(lab3);
    //
    //}

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

    $scope.postAnswer = function(questionId){

      var server= "http://52.163.91.205";
      var path = '/api/questions/'+questionId+'/answer';

      Storage.getTeamId().then(function(response){
        var data = {teamId: response, choiceId:$scope.answer};

        console.log(data);
        $http.post(server+path,data)
          .then(function (response) {
            console.log(response);
            alert('your answer are '+ response.correct);
            if(response){

              $scope.modalQuestion.hide();}

          }).catch(function (err) {
          console.log(err);
          $scope.error = true;
        });

      });




    }



  }

})();


