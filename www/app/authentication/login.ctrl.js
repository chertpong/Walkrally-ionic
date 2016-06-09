(function(){
  'use strict';
  angular.module('app')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, $state, Storage, $http, C, $log, $ionicPopup) {
    var fn = {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.error = false;
    $scope.errorMessage = '';

    data.credentials = {
      email: '',
      password: ''
    };

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
    // Check if already logged in
    Storage
      .getUserToken()
      .then(function(token){
        if(token){
          $log.debug('user is logged in');
          Storage
            .getTeamId()
            .then(function(teamId){
              $log.debug('user already has a team');
              $log.debug('redirect to teamDetail : teamId = ',teamId);
              $state.go('teamDetail', {teamId: teamId});
            })
            .catch(function(err){
              $log.debug('user doesn\'t has any team yet, redirect to lobby');
              $state.go('twitts');
            });

        }
        else{
          $log.debug('user is not logged in yet');
        }
      })
      .catch(function(err){
        $log.debug('user is not logged in yet');
      });
    fn.login = function (credentials) {
      var path = C.backendUrl + "/auth/local";
      $http.post(path, data.credentials)
        .then(function (response) {
          $log.debug('login response:', response);
          $log.debug('login user:', response.data.user.email);
          Storage
            .setUserToken(response.data.token)
            .then(function () {
              $log.debug('save token id: ',response.data.token);
              return Storage.setUser(response.data.user);
            })
            .then(function() {
              if (response.data.teams[0]) {
                Storage
                  .setTeamId(response.data.teams[0]._id)
                  .then(function() {
                    $log.debug('save team id: ', response.data.teams[0]._id);
                    $state.go('teamDetail', {teamId: response.data.teams[0]._id});
                  });
              } else {
                $state.go('twitts');
              }
          });
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        });
    };

    $scope.linkToMapBegin = function () {
      $log.debug('go to be');
      $state.go('mapbegin');
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
