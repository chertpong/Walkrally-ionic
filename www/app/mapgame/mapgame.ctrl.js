(function(){
  'use strict';
  angular.module('app')
    .controller('mapGameCtrl', mapGameCtrl);

  function mapGameCtrl($scope, $state, Storage, $http, $rootScope, $ionicModal,$log){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.places=[];
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
