(function(){
  'use strict';
  angular.module('app')
    .controller('CreateTeamCtrl', CreateTeamCtrl);

  function CreateTeamCtrl($scope, $stateParams, Storage, $http, $state){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    //Storage.getUserToken().then(function(twitt){
    //  data.twitt = twitt;
    //});

$scope.createTeam = function() {
  var server = "http://52.163.91.205";
  var path = "/api/teams";

  $http.post(server + path, {name: $scope.data.teamName })
    .then(function (response) {
      console.log(response.data);

      Storage.setTeamId(response.data._id).then(function(){
       console.log(success);
      });

      $state.go('teamDetail',{teamId:response.data._id});




    }).catch(function (err) {
    console.log(err);
    console.log($scope.data.teamName);
    console.log(token);
    $scope.error = true;

  });



}



  }



})();
