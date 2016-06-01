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

  var data = {name: $scope.teamname, token: Storage.getUserToken()}

  console.log(data);


  $http.post(server + path, data)
    .then(function (response) {
      console.log(response.data);

    }).catch(function (err) {
    console.log(err);
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
