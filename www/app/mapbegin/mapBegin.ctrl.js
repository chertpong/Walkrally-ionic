(function(){
  'use strict';
  angular.module('app')
    .controller('mapBeginCtrl', mapBeginCtrl);

  function mapBeginCtrl($scope, $stateParams, Storage, $http, $state){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    //Storage.getUserToken().then(function(twitt){
    //  data.twitt = twitt;
    //});

    $scope.linkToBeginMap = function(){
      console.log('sucess111')
      $state.go('mapbegin');
    }


    $scope.linkToLogin = function(){
console.log('sucess')
      $state.go('login');
    }
  }



})();
