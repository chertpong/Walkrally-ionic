(function(){
  'use strict';
  angular
    .module('app', ['ionic'])
    .config(configBlock)
    .run(runBlock);

  function configBlock($stateProvider, $urlRouterProvider, $provide, $httpProvider){

    $httpProvider.interceptors.push('tokenInterceptor');

    $stateProvider
      .state('loading', {
        url: '/loading',
        template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
        controller: 'LoadingCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/authentication/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/authentication/register.html',
        controller: 'RegisterCtrl'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/layout/layout.html',
        controller: 'LayoutCtrl'
      })
      .state('twitts', {
        url: '/twitts',
        templateUrl: 'app/twitts/twitts.html',
        controller: 'TeamListCtrl',
        params:{ quitTeamId: null },
        cache: false
      })
      .state('twitt', {
        url: '/twitt',
        templateUrl: 'app/twitts/twitt.html',
        controller: 'CreateTeamCtrl',
        cache: false
      })
      .state('teamDetail', {
        url: '/teamDetail',
        templateUrl: 'app/twitts/teamDetail.html',
        controller: 'TeamDetailCtrl',
        params:{
          name: null,
          currentMember:null,
          maximumMember:null,
          teamId:null
        },
        resolve: {
          startTime: function($http, C){
            return $http
              .get(C.backendUrl+'/api/events/latest/1')
              .then(function(response){
                return new Date(response.data.startTime);
              });
          }
        },
        cache: false
      })

      .state('rank', {
        url: '/rank',
        templateUrl: 'app/rank/rank.html',
        controller: 'rankCtrl',
        cache: false,
        params: {
          isEventFinish: false,
          finishTime: null
        }
      })

      .state('mapbegin', {
        url: '/mapbegin',
        templateUrl: 'app/mapbegin/mapbegin.html',
        controller: 'mapBeginCtrl'
      })

      .state('mapgame', {
        url: '/mapgame',
        templateUrl: 'app/mapgame/mapgame.html',
        controller: 'mapGameCtrl',
        cache: false,
        resolve: {
          language: function(Storage){
            return Storage.getLanguage().then(function(l){
              return l;
            });
          },
          counter: function($http, C, timeConverter, $state) {
            return $http
              .get(C.backendUrl+'/api/events/latest/1')
              .then(function(response){
                var now = new Date();
                var totalTimeInSeconds = (new Date(response.data.finishTime).getTime() - now.getTime())/1000;
                var callback = function(){
                  $state.go('rank',{ isEventFinish:true, finishTime: new Date(response.data.finishTime) });
                };
                return timeConverter.getTimeCounter(timeConverter.secondsToObject(totalTimeInSeconds),1000,callback);
              });
          }
        }
      })

      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl',
        cache: false
      })


      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'app/settings/settings.html',
            controller: 'SettingsCtrl',
            resolve: {
              resolvedSettings: function(Storage){
                return Storage.getUserSettings();
              }
            }
          }
        }
      });

    $urlRouterProvider.otherwise('/loading');

    // catch Angular errors
    $provide.decorator('$exceptionHandler', ['$delegate', function($delegate){
      return function(exception, cause){
        $delegate(exception, cause);
        var data = {};
        if(cause)               { data.cause    = cause;              }
        if(exception){
          if(exception.message) { data.message  = exception.message;  }
          if(exception.name)    { data.name     = exception.name;     }
          if(exception.stack)   { data.stack    = exception.stack;    }
        }
        Logger.error('Angular error: '+data.message, {cause: data.cause, stack: data.stack});
      };
    }]);
  }

  // catch JavaScript errors
  window.onerror = function(message, url, line, col, error){
    var stopPropagation = false;
    var data = {};
    if(message)       { data.message      = message;      }
    if(url)           { data.fileName     = url;          }
    if(line)          { data.lineNumber   = line;         }
    if(col)           { data.columnNumber = col;          }
    if(error){
      if(error.name)  { data.name         = error.name;   }
      if(error.stack) { data.stack        = error.stack;  }
    }
    if(navigator){
      if(navigator.userAgent)   { data['navigator.userAgent']     = navigator.userAgent;    }
      if(navigator.platform)    { data['navigator.platform']      = navigator.platform;     }
      if(navigator.vendor)      { data['navigator.vendor']        = navigator.vendor;       }
      if(navigator.appCodeName) { data['navigator.appCodeName']   = navigator.appCodeName;  }
      if(navigator.appName)     { data['navigator.appName']       = navigator.appName;      }
      if(navigator.appVersion)  { data['navigator.appVersion']    = navigator.appVersion;   }
      if(navigator.product)     { data['navigator.product']       = navigator.product;      }
    }
    Logger.error('JavaScript error: '+data.message, {cause: data.cause, stack: data.stack});
    return stopPropagation;
  };

  function runBlock($rootScope){
    $rootScope.map = null;
    $rootScope.safeApply = function(fn){
      var phase = this.$root ? this.$root.$$phase : this.$$phase;
      if(phase === '$apply' || phase === '$digest'){
        if(fn && (typeof(fn) === 'function')){
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }
})();
