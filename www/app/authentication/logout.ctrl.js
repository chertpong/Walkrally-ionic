/**
 * Created by Judyza on 6/6/2016 AD.
 */
(function(){
  'use strict';
  angular.module('app')
    .controller('LogoutCtrl', LogoutCtrl);

  function LogoutCtrl($state, $scope, $ionicHistory, Storage, $log){
    // TODO: fix blank logout
    $log.debug('logout');
    Storage
      .clear()
      .then(function() {
        $log.debug('logout success');
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });
        $ionicHistory.clearCache();
        $state.go('login');
      })
      .catch(function(err) {
        $log.debug('logout error: ' + err);
        $state.go('login');
      });
  }
})();
