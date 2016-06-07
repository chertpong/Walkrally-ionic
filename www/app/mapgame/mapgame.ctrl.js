(function(){
  'use strict';
  angular.module('app')
    .controller('mapGameCtrl', mapGameCtrl);

  function mapGameCtrl($scope, $state, Storage, $http, $rootScope, C, $ionicModal,$log, GeolocationPlugin){
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
    //routeDirection();

    //function routeDirection(){
    //  var center = new qq.maps.LatLng(30.650749363079974, 104.18018643853007);
    //  var map = new qq.maps.Map(document.getElementById("container"), {
    //    center: center
    //  });
    //  //设置获取驾车线路方案的服务
    //
    //  var drivingService = new qq.maps.DrivingService({
    //    map: map,
    //    panel: document.getElementById('infoDiv')
    //  //  position:center
    //    //展现结果
    //  });
    //  //设置搜索地点信息、驾车方案等属性
    //  function search() {
    //    var start = new qq.maps.LatLng(30.645774, 104.049999);
    //    var end = new qq.maps.LatLng(30.646153, 104.049769);
    //    var policy = "LEAST_TIME";
    //    //设置驾车方案
    //    drivingService.setPolicy(qq.maps.DrivingPolicy[policy]);
    //    //设置驾车的区域范围
    //    drivingService.setLocation("成都");
    //    //设置回调函数
    //    drivingService.setComplete(function(result) {
    //      if (result.type == qq.maps.ServiceResultType.MULTI_DESTINATION) {
    //        //alert("起终点不唯一");
    //        var d = result.detail;
    //        drivingService.search(d.start[0], d.end[0]);
    //      }
    //    });
    //    //设置检索失败回调函数
    //    drivingService.setError(function(data) {
    //      alert(data);
    //    });
    //    //设置驾驶路线的起点和终点
    //    drivingService.search(start,end);
    //  }
    //  window.onload = search;
    //
    //}


    function loadMap(){
      $http.get(path)
        .then(function (response) {
          $scope.places = response.data;
          $log.debug('[+]','places are loaded',response.data.length);
          //TODO : remove after add fake location
          $scope.places.push({name:'test1', descriptions: [
            {
              content:'places test 1 description',
              language:'en'
            }, {
              content:'places test 1 คำอธิบาย',
              language:'th'
            }, {
              content:'places test 1 简述',
              language:'cn'
            }],type:'Culture',
            contact:
            {name:'พระครูกิตติชัย โมฬี',
              phoneNumber:'053-417248',
              address:'90 Ratcha Damnoen Rd. Phra Sing, Muang Chiang Mai',
          website:'http://culture.mome.co/watchaiphrakiat/',
          openTime:'8:00',
          closeTime:'17:00',
          workingDay:'Daily',
          description:''},
            thumbnail:'https://lh3.googleusercontent.com/-Q21_-T2xRrU/Vr19_0yWTWI/AAAAAAAAADw/_Zrkx4tgX8k/s650-Ic42/T209.jpg',

                                  location:{lat:30.648658,lng:104.186639},
                            questions:[
                              {descriptions:[{content:'question1',
                                              language:'en'},
                                              {content:'คำถาม1',
                                                language:'th'},
                                              {content:'问题1',
                                                language:'cn'}],
                                score:30,
                                choices:[{correct:true,
                              description:[{content:'answer1',
                                              language:'en'},
                                              {content:'คำตอบ1',
                                                language:'th'},
                                              {content:'答案1',
                                                language:'cn'}]
                                },{correct:false,
                                description:[{content:'answer2',
                                                  language:'en'},
                                                  {content:'คำตอบ2',
                                                    language:'th'},
                                                  {content:'答案2',
                                                    language:'cn'}]
                                },{correct:false,
                                description:[{content:'answer3',
                                                  language:'en'},
                                                  {content:'คำตอบ3',
                                                    language:'th'},
                                                  {content:'答案3',
                                                    language:'cn'}]
                                },{correct:false,
                              description:[{content:'answer4',
                                                  language:'en'},
                                                {content:'คำตอบ4',
                                                  language:'th'},
                                                {content:'答案4',
                                                  language:'cn'}]
                                }]
                              }]
          });
          $scope.places.push({name:'test2',descriptions: [
            {
              content:'places test 2 description',
              language:'en'
            }, {
              content:'places test 2 คำอธิบาย',
              language:'th'
            }, {
              content:'places test 2 简述',
              language:'cn'
            }],location:{lat:30.651624,lng:104.186103},
                        questions:[
                        {descriptions:[{content:'question2',
                                      language:'en'},
                                        {content:'คำถาม2',
                                          language:'th'},
                                        {content:'问题2',
                                          language:'cn'}],
                score:30,
                          choices:[{correct:true,
                            description:[{content:'answer1',
                              language:'en'},
                              {content:'คำตอบ1',
                                language:'th'},
                              {content:'答案1',
                                language:'cn'}]
                          },{correct:false,
                            description:[{content:'answer2',
                              language:'en'},
                              {content:'คำตอบ2',
                                language:'th'},
                              {content:'答案2',
                                language:'cn'}]
                          },{correct:false,
                            description:[{content:'answer3',
                              language:'en'},
                              {content:'คำตอบ3',
                                language:'th'},
                              {content:'答案3',
                                language:'cn'}]
                          },{correct:false,
                            description:[{content:'answer4',
                              language:'en'},
                              {content:'คำตอบ4',
                                language:'th'},
                              {content:'答案4',
                                language:'cn'}]
                }]
              }]
          });


          $scope.places.push({name:'test3',descriptions: [
            {
              content:'places test 3 description',
              language:'en'
            }, {
              content:'places test 3 คำอธิบาย',
              language:'th'
            }, {
              content:'places test 3 简述',
              language:'cn'
            }],location:{lat:30.653036,lng:104.190699},
                                questions:[
                                          {descriptions:[{content:'question3',
                                                          language:'en'},
                                                         {content:'问题3',
                                                          language:'cn'},
                                                          {content:'คำถาม3',
                                                          language:'th'}],
                                            score:30,
                                            choices:[{correct:true,
                                              description:[{content:'answer1',
                                                language:'en'},
                                                {content:'คำตอบ1',
                                                  language:'th'},
                                                {content:'答案1',
                                                  language:'cn'}]
                                            },{correct:false,
                                              description:[{content:'answer2',
                                                language:'en'},
                                                {content:'คำตอบ2',
                                                  language:'th'},
                                                {content:'答案2',
                                                  language:'cn'}]
                                            },{correct:false,
                                              description:[{content:'answer3',
                                                language:'en'},
                                                {content:'คำตอบ3',
                                                  language:'th'},
                                                {content:'答案3',
                                                  language:'cn'}]
                                            },{correct:false,
                                              description:[{content:'answer4',
                                                language:'en'},
                                                {content:'คำตอบ4',
                                                  language:'th'},
                                                {content:'答案4',
                                                  language:'cn'}]
                                            }]
                                          }]
                              });

          Storage.setPlaces($scope.places).then(function(){
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
      $scope.places.forEach(function(place){
        var geolocation = new qq.maps.LatLng(place.location.lat, place.location.lng);
        var marker = new qq.maps.Marker({
          position: geolocation,
          map: $rootScope.map
        });
        qq.maps.event.addListener(marker, 'click', function (index) {

          $scope.modalGameViewDetail.show();
          $scope.place = place;
          // Mock
          $scope.place.descriptions = $scope.place.descriptions.filter(function(d){
              return d.language == "th"
              //return d.language == language
          }
          );
          $scope.place.questions[0].descriptions = $scope.place.questions[0].descriptions.filter(function(q){
            return q.language == "th"
            //return q.language == language

          });

          $scope.place.questions[0].choices[0].description = $scope.place.questions[0].choices[0].description.filter(function(a1){
            return a1.language == "th"
            //return a1.language == language
          });
          $scope.place.questions[0].choices[1].description = $scope.place.questions[0].choices[1].description.filter(function(a2){
           return a2.language == "th"
            //return a2.language == language
          });
          $scope.place.questions[0].choices[2].description = $scope.place.questions[0].choices[2].description.filter(function(a3){
            return a3.language == "th"
           // return a3.language == language
          });
          $scope.place.questions[0].choices[3].description = $scope.place.questions[0].choices[3].description.filter(function(a4){
            return a4.language == "th"
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

    $scope.getCurrent= function() {
      GeolocationPlugin.getCurrentPosition().then(function(position){
        $log.debug('html current position',position);
      });
    };

    $scope.getCompare= function(place){
      var BETWEEN_DEGREE = 15;
      var THOUSAND_METER = 1000;

      /**
       * define surface distance per 1 degree change
       */
      var SURFACE_DISTANCE_PER_ONE_DEGREE = [
        { latitude : 110.574, longitude : 111.320 }, //0  degree
        { latitude : 110.649, longitude : 107.551 }, //15 degree
        { latitude : 110.852, longitude : 96.486 },  //30 degree
        { latitude : 111.132, longitude : 78.847 },  //45 degree
        { latitude : 111.412, longitude : 55.800 },  //60 degree
        { latitude : 111.618, longitude : 28.902 },  //75 degree
        { latitude : 111.694, longitude : 0.000 }    //90 degree
      ];

      /**
       * define class GPS for keep latitude and longitude
       */
      var GPS = function(lat, lnt){
        this.latitude = lat || 0;
        this.longitude = lnt || 0;
      };

      function getSurfaceDistance(gps){
        console.log(gps.latitude);
        return SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(gps.latitude / BETWEEN_DEGREE)]; //depend on latitude
      }

      function getLatitudeDistance(gps){
        return getSurfaceDistance(gps).latitude * THOUSAND_METER;
      }

      function getLongitudeDistance(gps){
        return getSurfaceDistance(gps).longitude * THOUSAND_METER;
      }

      function findDistance(gps1, gps2){

        var latitudeDistance1 = getLatitudeDistance(gps1); //a1
        var latitudeDistance2 = getLatitudeDistance(gps2); //a2

        var longitudeDistance1 = getLongitudeDistance(gps1); //b1
        var longitudeDistance2 = getLongitudeDistance(gps2); //b2

        // (X2 * a2 - X1 * a1) ^ 2
        var power1 = Math.pow((gps2.latitude * latitudeDistance2) - (gps1.latitude * latitudeDistance1), 2);
        // (Y2 * b2 - Y1 * b1) ^ 2
        var power2 = Math.pow((gps2.longitude * longitudeDistance2) - (gps1.longitude * longitudeDistance1), 2);
        return Math.sqrt(power1 + power2);
      }

      /**
       * define gps1 and gps2 location
       * lat:30.653036,lng:104.190699
       * {lat:30.648658,lng:104.186639}
       * 18.788687,"lng":98.985918
       * dining hall 5 30.656254, 104.191239
       * current location 30.650701, 104.180157 ,,,,,latitude: 30.650749363079974longitude: 104.18018643853007
       * test 3 , 30.653036,104.190699
       * lo.lat,lo.lng
       */
      var gps1;
      var gps2 = new GPS(place.location.lat,place.location.lng);

      GeolocationPlugin.getCurrentPosition().then(function(position) {
        $log.debug('position', position);
        gps1 = new GPS(position.coords.latitude, position.coords.longitude);
         if (findDistance(gps1, gps2) < 600){

            $scope.modalListQuestion.show();
         } else{
        alert('Far !!! ' + findDistance(gps1, gps2) + ' meter');
      }
      });

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

        var data = {teamId: response, choiceId:answerId}
      });

      $http.post(server+path,data)
        .then(function (response) {
          console.log(response);
          alert('your answer are '+ response.correct);
          if(response){modalQuestion.hide()}

        }).catch(function (err) {
        console.log(err);
        $scope.error = true;
      });


    }



  }

})();


