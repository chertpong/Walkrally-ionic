(function(){
  'use strict';
  angular.module('app')
    .controller('mapGameCtrl', mapGameCtrl);

  function mapGameCtrl($scope, $state, Storage, $http, $rootScope, $ionicModal,$log){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.places=[];
    $scope.location={};
    var language;



    Storage.getLanguage().then(function(l){
       language = l;

    });

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

          $scope.place.descriptions = $scope.place.descriptions.filter(function(d){
              //return d.language == "th"
              return d.language == language
          }
          );
          $scope.place.questions[0].descriptions = $scope.place.questions[0].descriptions.filter(function(q){
            //return q.language == "th"
            return q.language == language

          });

          $scope.place.questions[0].choices[0].description = $scope.place.questions[0].choices[0].description.filter(function(a1){
           // return a1.language == "th"
            return a1.language == language
          });
          $scope.place.questions[0].choices[1].description = $scope.place.questions[0].choices[1].description.filter(function(a2){
           // return a2.language == "th"
            return a2.language == language
          });
          $scope.place.questions[0].choices[2].description = $scope.place.questions[0].choices[2].description.filter(function(a3){
            //return a3.language == "th"
            return a3.language == language
          });
          $scope.place.questions[0].choices[3].description = $scope.place.questions[0].choices[3].description.filter(function(a4){
           // return a4.language == "th"
            return a4.language == language
          });

          console.log($scope.place.descriptions);
          console.log($scope.place.questions[0].descriptions);
          console.log($scope.place.questions[0].choices[0].description);
          console.log($scope.place.questions[0].choices[1].description);
          console.log($scope.place.questions[0].choices[2].description);
          console.log($scope.place.questions[0].choices[3].description);
          //var language;
          //$scope.placeDescription;
          //$scope.placeQuestion;    place.questions[0].descriptions[0].content
          //$scope.placeAnswer1;     place.questions[0].choices[0].description[0].content
          //$scope.placeAnswer2;
          //$scope.placeAnswer3;
          //$scope.placeAnswer4;
        });
      });
    }
    $scope.getCurrent= function(){

    var onSuccess = function(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n'
      );
    };

    function onError(error) {
      alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
      console.log(position.coords.latitude);
    };


    $scope.getCompare= function(){
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
      };

      /**
       * define gps1 and gps2 location
       * lat:30.653036,lng:104.190699
       * {lat:30.648658,lng:104.186639}
       * 18.788687,"lng":98.985918
       */
      var gps1;

      navigator.geolocation.getCurrentPosition(function(position){
       gps1 = new GPS(position.coords.latitude,position.coords.longitude);
      });

      var gps2 = new GPS(30.657663, 104.058755);

      alert(findDistance(gps1, gps2) + ' meter');
    };


    function compareTwoPosition(){

    }

    $scope.openModalGameViewMoreDetail = function(){
      $scope.modalGameViewMoreDetail.show();
    };
    $scope.openModalListQuestion = function(){
      $scope.modalListQuestion.show();


    };
    $scope.openModalQuestion = function(){
      $scope.modalQuestion.show();

    };



  };

})();


