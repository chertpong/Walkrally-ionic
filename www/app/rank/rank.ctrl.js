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
          Scope.teamScore = response.data;

        })
        .catch(function (err) {
          console.log(err);
        });

    var Rankingsocket = io.connect(C.backendUrl + '/ranking');
    Rankingsocket.on('updated', function (response) {
      $scope.$apply(function(){
        console.log('socket ranking response:'+response);
        $scope.teamScore.push(response);
        //     $scope.score =response.data.currentMember;
        console.log($scope.teams);
      })
    });




  }

})();
