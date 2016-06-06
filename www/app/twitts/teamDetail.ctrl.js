(function(){
  'use strict';
  angular.module('app')
    .controller('TeamDetailCtrl', TeamDetailCtrl);

  function TeamDetailCtrl($scope, $stateParams, Storage, $http, $state, $ionicPopup){

    var data = {}, fn = {};
    var name='';
    var currentMember ='';
    var maximumMember ='';
    var team =[];
    var teamId= '';
    $scope.fn = fn;
    // เรียก team id

    console.log($stateParams);

    //$scope.name = $stateParams.name;
    //$scope.currentMember = $stateParams.currentMember;
    //$scope.maximumMember = $stateParams.maximumMember;

    if($stateParams.teamId){

      var server= "http://52.163.91.205";
      var path = '/api/teams/'+$stateParams.teamId+'?dto=true';

      $http.get(server+path)
        .then(function (response) {
          console.log(response.data);
          $scope.teamId =$stateParams.teamId;
          $scope.team = response.data;
        console.log( $scope.team);
        }).catch(function (err) {
        console.log(err);
        $scope.error = true;


      });
    }

    $scope.quitTeam = function(teamId){

      var server= "http://52.163.91.205";
      var path = '/api/teams/'+teamId+'/quit';

      $http.post(server+path)
        .then(function (response) {
          console.log(response);

          $state.go('twitts',{quitTeamId:teamId});

        }).catch(function (err) {
        console.log(err);
        $scope.error = true;

      });

    }




    $scope.startgame = function(){
      $scope.data = {};

      var language = $ionicPopup.show({
        templateUrl:'app/twitts/chooseLanguagePopup.html',
        title: 'Choose language',
        scope: $scope,
        buttons:
          [ { text: 'Cancel', type: 'button-default',
            onTap: function(e) {
            // e.preventDefault() will stop the popup from closing when tapped.
            return null;
          }}
            ,{
            text: '<b>Start</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.language) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.language;
              }
            }
          }]

      });
               language.then(function(res) {
                 console.log(res);
                if(res){
                     Storage.setLanguage(res).then(function(){
                    $state.go('mapgame');
                     });}
                   });

    }




  }



})();
