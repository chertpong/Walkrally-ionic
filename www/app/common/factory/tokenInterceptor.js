
angular.module('app').factory('tokenInterceptor',
  ['Storage','$q', function(Storage,$q)
  {
    return {
      request: function(config) {
        var deferred = $q.defer();
          Storage
            .getUserToken()
            .then(function(token){
              config.headers['X-ACCESS-TOKEN'] = token || '';
              deferred.resolve(config);
           })
            .catch(function (err){
              console.log(err);
              deferred.resolve(config);
          });
        return deferred.promise;
      }
    };
  }]);



