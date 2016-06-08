(function(){
  'use strict';
  angular.module('app')
    .controller('CreateTeamCtrl', CreateTeamCtrl);

  function CreateTeamCtrl($scope, $stateParams, Storage, $http, $state, C, $log, $ionicPopup){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.alert = function(){
      return $ionicPopup.alert({
        title: 'Error!',
        template: $scope.errorMessage,
        buttons:
          [{
            text: 'OK',
            type: 'button',
          }]
      });
    };

    $scope.createTeam = function() {
      var path = C.backendUrl + '/api/teams';

      $http.post(path, {name: $scope.data.teamName })
        .then(function (response) {
          $log.debug(response.data);

          Storage.setTeamId(response.data._id).then(function(){
            $log.debug('Save team id: ',response.data._id);
          });
          $state.go('teamDetail',{teamId:response.data._id});
        })
        .catch(function (err) {
          $log.debug('create team err:',err);
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        });
    };

    // Watch for error
    $scope.$watch('error',function(newValue){
      if(newValue){
        $scope.alert().then(function(res) {
          $scope.error = false;
        });
      }
    });
  }
})();
