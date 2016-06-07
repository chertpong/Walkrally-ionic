(function(){
  'use strict';
  angular.module('app')
    .controller('TeamListCtrl', TeamListCtrl);

  function TeamListCtrl($scope,$http, Storage, Backend, $state, $stateParams){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.teams= [];

    //Storage.getTeamId().then(function(teamId){
    //  if(teamId){
    //    $state.go('teamDetail');
    //  }else{}}).catch();

    var currentMember ='';
    var maximumMember ='';
    var teamId='';
      var server= "http://52.163.91.205";
      var path = "/api/teams?dto=true";

      $http.get(server+path)
        .then(function (response) {
          console.log(response.data);
          $scope.teams= response.data

        }).catch(function (err) {
        console.log(err);
        $scope.error = true;

    });

    $scope.joinTeam = function(teamId){
      Storage.setTeamId(teamId).then(function(){
       console.log(teamId)
      });

      var server= "http://52.163.91.205";
      var path = '/api/teams/'+teamId+'/join';
      $http.post(server+path)
        .then(function (response) {
          console.log('join team response:'+response);
          $state.go('teamDetail',{teamId:teamId});
        }).catch(function (err) {
        console.log(err);
        $scope.error = true;
      });
    };

    var socket = io.connect('http://52.163.91.205/teams');
    socket.on('created', function (response) {
      $scope.$apply(function(){
        console.log('socket create response:'+response);
        $scope.teams.push(response);
   //     $scope.currentMember =response.data.currentMember;
   //     $scope.maximumMember =response.data.maximumMember;
        console.log($scope.teams);
      })
    });

    socket.on('joined', function (response) {
      console.log(response);
      $scope.teams.forEach(function(team,index){
        if(team._id=== response.teamId){
          $scope.$apply(function(){
            console.log($scope.teams);
            $scope.teams[index].currentMember++;
          });
        }
      });
    });

    socket.on('quit', function (response) {
      console.log(response);
      $scope.teams.forEach(function(team,index){
        if(team._id=== response.teamId){
          $scope.$apply(function(){
            console.log($scope.teams);
            $scope.teams[index].currentMember--;
          });
        }
      });
    });
    socket.on('deleted', function (response) {
      $scope.$apply(function(){
        console.log(response);
        $scope.teams.push(response);
        console.log($scope.teams);
      })
    });

    $scope.linktoCreateTeam = function(){
      $state.go('twitt');
    }
  }
})();
