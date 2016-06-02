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
      var path = '/api/teams/'+$stateParams.teamId;

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


    //var socket = io.connect('http://52.163.91.205/teams');
    //socket.on('joined', function (response) {
    //  $scope.$apply(function(){
    //    console.log(response);
    //
    //  })
    //});
    //
    //socket.on('quit', function (response) {
    //  $scope.$apply(function(){
    //    console.log(response);
    //
    //  })
    //});


    //var server= "http://52.163.91.205";
    //var path = "/api/teams";
    //
    //
    //$http.get(server+path)
    //  .then(function (response) {
    //    console.log(response.data);
    //    $scope.teams= response.data
    //
    //  }).catch(function (err) {
    //  console.log(err);
    //  $scope.error = true;
    //
    //});

    //
    //var socket = io.connect('http://52.163.91.205/teams');
    //socket.on('created', function (response) {
    //  console.log(response);
    //
    //});

    // $http get team list

    // create ->  socket on
    // update team list   ->  list (get + create)
    // เช้คcurrent team , ถ้ามีอยู๋เเล้ว สร้างเพิม่ไม่ได้

  }



})();
