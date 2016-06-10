(function(){
  'use strict';
  angular.module('app')
    .controller('rankCtrl', rankCtrl);

  function rankCtrl($scope, $state, Storage, $http, C, $log, $timeout){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.rank = [];

    $log.debug('start loading rank');

    var path = C.backendUrl + '/api/teams/rank';
    $http
      .get(path)
      .then(function (response) {
        $log.debug('loaded rank: ',response.data.length);
        $scope.rank = response.data;
        $scope.ranking();
      })
      .catch(function (err) {
        $log.debug(err);
      });

    $scope.ranking = function (){
      $timeout(function(){
        $scope.rank = $scope.rank.sort(function(a, b){
          return b.score - a.score;
        });
      },0);
    };

    var rankingSocket = io.connect(C.backendUrl + '/ranking');
    rankingSocket.on('updated', function (response) {
      $log.debug('socket ranking response:',response);
      $scope.rank = $scope.rank.map(function(team) {
        if(team._id.toString() === response.teamId.toString()){
          team.score = parseInt(response.score,10);
          return team;
        }
        else
          return team;
      });
      $scope.ranking();
    });
  }
})();
