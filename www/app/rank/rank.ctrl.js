(function(){
  'use strict';
  angular.module('app')
    .controller('rankCtrl', rankCtrl);

  function rankCtrl($scope, $state, Storage, $http, C, $log, $timeout, $ionicPopup){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.rank = [];
    $scope.alertTitle = '';
    $scope.alertMessage = '';
    $scope.alert = function(){
      return $ionicPopup.alert({
        title: $scope.alertTitle,
        template: $scope.alertMessage,
        buttons:
          [{
            text: 'OK',
            type: 'button'
          }]
      });
    };
    $log.debug('start loading rank');
    if($state.params.isEventFinish){
      $scope.alertTitle = 'Time\'s Up!!';
      $scope.alertMessage = 'The game is over at' + '<br>' + $state.params.finishTime;
      var popup = $scope.alert();
      popup.then(function(response) {
        popup.close();
        $log.debug($scope.alertMessage);
      });
    }
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
