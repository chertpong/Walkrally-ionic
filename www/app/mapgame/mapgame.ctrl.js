(function(){
  'use strict';
  angular.module('app')
    .controller('mapGameCtrl', mapGameCtrl);

  function mapGameCtrl($scope, $state, Storage, $http){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;



    //fn.login = function(credentials){
    //  $scope.error = false;
    //  //success function
    //
    //  if(credentials.email) {
    //
    //    var server= "http://52.163.91.205";
    //    var path = "/auth/local";
    //
    //    var data ={ email: credentials.email, password: credentials.password}
    //
    //    $http.post(server+path,data)
    //      .then(function (response) {
    //        console.log(response.data.token);
    //        Storage.setUserToken(response.data.token).then(function(){
    //          $state.go('twitts');
    //        });
    //
    //      }).catch(function (err) {
    //      console.log(err);
    //      $scope.error = true;
    //
    //    });
    //
    //  }
    //
    //}

    //$scope.linkToBeginMap = function(){
    //  $state.go('mapbegin');
    //}

  };

})();
