(function(){
  'use strict';
  angular.module('app')
    .controller('TeamDetailCtrl', TeamDetailCtrl);

  function TeamDetailCtrl($scope, $stateParams, Storage, $http, $state){

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

      $state.go('mapgame');
    }




  }



})();
