
angular.module('app').factory('httpRequestInterceptor',
  ['Storage', function(Storage)
  {
    return {
      request: function($config) {
        $config.headers = $config.headers ||{};
          Storage
            .getUserToken()
            .then(function(t){
              console.log(t)
              $config.headers['X-ACCESS-TOKEN'] = t || '';
              return $config;
           })
            .catch(function (err){
              console.log(err);
              return $config;
          });



      }
    };
  }]);
