(function(){
  'use strict';
  angular.module('app')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, $state, Storage, $http){
    var fn= {}, data = {};
    $scope.fn = fn;
    $scope.data = data;

    data.credentials = {
      email: '',
      password: ''
    };

    fn.login = function(credentials){
      $scope.error = false;
      //success function

      if(credentials.email && credentials.password) {

         var server= "http://52.163.91.205";
          var path = "/auth/local";
        console.log('credential',data.credentials);
        $http.post(server+path,data.credentials)
          .then(function (response) {
            console.log('login response',response);
            Storage.setUserToken(response.data.token).then(function(){

              if(response.data.teams){
                $state.go('teamDetail',{teamId:response.data.teams[0]._id});
              }else{
                $state.go('twitts');
              }

            });

          }).catch(function (err) {
          console.log(err);
          $scope.error = true;

        });

      }


      }

    $scope.linkToBeginMap = function(){

      $state.go('mapbegin');
    }

    };

})();
