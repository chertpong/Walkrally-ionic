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

      if(credentials.email) {

         var server= "http://52.163.91.205";
          var path = "/auth/local";

        var data ={ email: credentials.email, password: credentials.password}
        console.log(data);


        $http.post(server+path,data)
          .then(function (response) {
            console.log(response.data.token);
            Storage.setUserToken(response.data.token).then(function(){
              $state.go('app.twitts');
            });
          }).catch(function (err) {
          console.log(err);
          $scope.error = true;

        });

      }


      }
    };

})();
