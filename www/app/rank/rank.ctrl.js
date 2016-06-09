(function(){
  'use strict';
  angular.module('app')
    .controller('rankCtrl', rankCtrl);

  function rankCtrl($scope, $state, Storage, $http,C){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;

      var path = C.backendUrl + '/api/teams/rank';
      $http
        .get(path)
        .then(function (response) {
          console.log(response);
          $scope.teamsScore = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });

    $scope.ranking = function (){
      $scope.teamsScore.score.sort(function(a,b){return a-b});
      $scope.teamsScore.forEach(function(team){
        $scope.teamScore= team;
      });
    }

    var Rankingsocket = io.connect(C.backendUrl + '/ranking');
    Rankingsocket.on('updated', function (response) {
      $scope.$apply(function(){
        console.log('socket ranking response:'+response);
        $scope.teamsScore.push(response);
        //     $scope.score =response.data.currentMember;
        console.log($scope.teams);
      })
    });




  }

})();
