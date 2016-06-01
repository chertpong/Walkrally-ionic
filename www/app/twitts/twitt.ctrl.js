(function(){
  'use strict';
  angular.module('app')
    .controller('TwittCtrl', TwittCtrl);

  function TwittCtrl($scope, $stateParams, Storage, $http){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    //Storage.getUserToken().then(function(twitt){
    //  data.twitt = twitt;
    //});

$scope.createTeam = function() {
  var server = "http://52.163.91.205";
  var path = "/api/teams";
  var token = '';
  Storage.getUserToken().then(function(t){
    token = t;
  });

  $http.post(server + path, {name: $scope.data.teamName, token: token })
    .then(function (response) {
      console.log(response.data);

    }).catch(function (err) {
    console.log(err);
    console.log($scope.data.teamName);
    console.log(token);
    $scope.error = true;

  });


  //var socket = io.connect('http://52.163.91.205/teams');
  //socket.on('created', function (response) {
  //  console.log(response);
  //
  //});
}



  }



})();
