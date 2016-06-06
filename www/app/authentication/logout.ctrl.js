/**
 * Created by Judyza on 6/6/2016 AD.
 */
(function(){
  'use strict';
  angular.module('app')
    .controller('LogoutCtrl', LogoutCtrl);

  function LogoutCtrl($state, $scope, $ionicHistory, Storage){
   // var fn = {};
   // $scope.fn = fn;


     // console.log();
      Storage.clear().then(function(){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        //$state.go('login');

        Storage.getUser().then(function(user){
          if(user){
            $state.go('twitts');
          } else {
            $state.go('login');
          }
        });
      }).catch(function (err) {
      console.log(err);
      $scope.error = true;

    });


  }
})();
