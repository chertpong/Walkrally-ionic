(function(){
  'use strict';
  angular.module('app')
    .controller('TeamListCtrl', TeamListCtrl);

  function TeamListCtrl($scope,$http, Storage, Backend, $state, $stateParams){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.teams= [];

    var currentMember ='';
    var maximumMember ='';
  var teamId='';
      var server= "http://52.163.91.205";
      var path = "/api/teams";

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
          console.log(response);
          $state.go('teamDetail',{teamId:teamId});

        }).catch(function (err) {
        console.log(err);
        $scope.error = true;

      });

    }

    var socket = io.connect('http://52.163.91.205/teams');
    socket.on('created', function (response) {
      $scope.$apply(function(){
        console.log(response);
        $scope.teams.push(response);
   //       $scope.currentMember =response.data.currentMember;
   //     $scope.maximumMember =response.data.maximumMember;
        console.log($scope.teams);
      })
    });



    //socket.on('joined', function (response) {
    //  $scope.$apply(function(){
    //    console.log(response);
    // a = _.find(results,function(rw){ return rw.id == 2 });
    //if(Storage.getTeamId(teamId)==response.data.teamId){
    // $scpoe.currentMember = response.data.userId.length
    //
    // }
    //
    //    console.log($scope.teams);
    //  })
    //});
    //หาทีมที่ถูก ่มีคนออก ที่อยู่ในlist ทั้งหมด
    //  currentmember  ++





    //socket.on('quit', function (response) {
    //  $scope.$apply(function(){
    //    console.log(response);
    //    if($stateParams.quitTeamId==response)
    //$scpoe.currentMember = response.data.userId.length
    //    console.log($scope.teams);
    //  })
    //});

    //หาทีมที่ถูกquit มีคนออก ที่อยู่ในlist ทั้งหมด
    //  currentmember --


    //
    //socket.on('deleted', function (response) {
    //  $scope.$apply(function(){
    //    console.log(response);
    //    $scope.teams.push(response);
    //    console.log($scope.teams);
    //  })
    //});

    // $http get team list

    // create ->  socket on
                    // update team list   ->  list (get + create)
    // เช้คcurrent team , ถ้ามีอยู๋เเล้ว สร้างเพิม่ไม่ได้


    // join ->
        // get team , response data
                    //"currentMemeber": Number, ++
                    // post data with new currentmember
                    //    update team list

    // quit ->
       // get team
                     //"currentMemeber": Number, --
                     // post data with new currentmember
                     //    update team list
    //delete team
                      // get team , delete
                      //    update team list

    $scope.linktoCreateTeam = function(){

      $state.go('twitt');
    }


  }




})();
