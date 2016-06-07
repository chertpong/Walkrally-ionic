/**
 * Created by Judyza on 6/6/2016 AD.
 */
(function(){
  'use strict';
  angular.module('app')
    .controller('LogoutCtrl', LogoutCtrl);

  function LogoutCtrl($state, $scope, $ionicHistory, Storage, $log){
      Storage
        .clear()
        .then(function() {
          $log.debug('logout');
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
          $state.go('login');
      });
  }
})();
