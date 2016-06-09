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
      //$http.get(server+path)
      //  .then(function (response) {
      //    $scope.places = response.data;
      //    $log.debug('[+]','places are loaded',response.data.length);
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
            }],type:'shopping',location:{lat:30.651624,lng:104.186103},
            contact:
            {name:'Wat Phra Singh',
              phoneNumber:'054-356414',
              address:'3313 Kai ko apartment, Suthep, Muang Chiang Mai',
              website:'http://culture.mome.co/watchaiphrakiat/',
              openTime:'5:00',
              closeTime:'20:00',
              workingDay:'Daily',
              description:'Description place 2'},
            thumbnail:'https://lh3.googleusercontent.com/-Q21_-T2xRrU/Vr19_0yWTWI/AAAAAAAAADw/_Zrkx4tgX8k/s650-Ic42/T209.jpg,location:{lat:30.651624,lng:104.186103}',
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
            }],type:'Culture',
            contact:
            {name:'Doi Suthep',
              phoneNumber:'054-1111',
              address:'Muang Chiang Mai',
              website:'http://culture.mome.co/watchaiphrakiat/',
              openTime:'2:00',
              closeTime:'21:00',
              workingDay:'Daily',
              description:'Description place 3'},
            thumbnail:'https://lh3.googleusercontent.com/-Q21_-T2xRrU/Vr19_0yWTWI/AAAAAAAAADw/_Zrkx4tgX8k/s650-Ic42/T209.jpg',
            location:{lat:30.653036,lng:104.190699},
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
      //  }).catch(function (err) {
      //  console.log(err);
      //  $scope.error = true;
      //});
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
      console.log($scope.places);
      $scope.places.forEach(function(place){
        var position = new BMap.Point(place.location.lng,place.location.lat);
        var marker = new BMap.Marker(position);
        $rootScope.map.addOverlay(marker);
        marker.addEventListener('click',function(){
          $scope.modalViewDetail.show();
          $scope.place = place;});
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
