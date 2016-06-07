(function(){
  'use strict';
  angular.module('app')
    .controller('LayoutCtrl', LayoutCtrl);

  function LayoutCtrl($state, $scope, $ionicHistory, Storage){
    var fn = {};
    $scope.fn = fn;
  }
})();
