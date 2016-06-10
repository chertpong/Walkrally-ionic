(function(){
  'use strict';
  angular.module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  function RegisterCtrl($scope, $state, Storage, $http, C, $log, $ionicPopup) {
    $log.debug('login page loaded');
    var fn = {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    $scope.error = false;
    $scope.errorMessage = '';
    $scope.alert = function(){
      return $ionicPopup.alert({
        title: 'Error!',
        template: $scope.errorMessage,
        buttons:
          [{
            text: 'OK',
            type: 'button'
          }]
      });
    };

    data.credentials = {
      firstName: '',
      lastName: '',
      nationality: '',
      gender: '',
      email: '',
      password: '',
      profilePicture: '',
      phoneNumber: ''
    };

    // Check if already logged in
    Storage
      .getUserToken()
      .then(function(token){
        if(token){
          $log.debug('register page:','user is logged in');
          $state.go('twitts');
        }
        else{
          $log.debug('user is not logged in yet');
        }
      })
      .catch(function(err){
        $log.debug('user is not logged in yet');
      });

    fn.register = function (credentials) {
      var path = C.backendUrl + "/api/users";
      $http.post(path, credentials)
        .then(function (response) {
          $log.debug('register response:', response);
          $log.debug('registered user:', response.data.email);
          $state.go('login');
        })
        .catch(function (err) {
          $log.debug(err);
          var errors = [];
          if(err.data.error.errors){
            for(var a in err.data.error.errors){
              errors.push(err.data.error.errors[a]);
            }
            $scope.errorMessage = errors
              .map(function(e){
                return e.message;
              })
              .reduce(function(a,b){
                $log.debug(a,b);
                return a + '<br>' + b;
              },'');
          }
          $log.debug('[!]',err.data.message);
          $scope.error = true;
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
