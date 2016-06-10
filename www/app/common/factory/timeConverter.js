
angular.module('app').factory('timeConverter',
  ['$interval','$timeout','$log', function($interval,$timeout,$log)
  {
    return {
      secondsToObject: function(seconds) {
        var isFinished = seconds <= 0;
        seconds = Math.abs(Math.floor(seconds));
        var h = Math.floor((seconds/3600)).toFixed(0);
        var m = Math.floor((seconds - (h * 3600))/60).toFixed(0);
        var s = Math.floor(seconds - ((m * 60) + (h * 3600))).toFixed(0);
        return { h: h, m: m, s: s , totalSeconds: seconds, isFinished : isFinished};
      },
      getTimeCounter: function(timeObject,intervalPeriod, callback){
        var counter = $interval(function (index) {
          if(timeObject.isFinished){
            $timeout(function () {
              callback();
            }, 900);
          }
          if (index == (timeObject.totalSeconds) || index >= (timeObject.totalSeconds)) {
            $interval.cancel(counter);
            $timeout(function () {
              callback();
            }, 200);
          }
          else {
            if(timeObject.s > 0){
              timeObject.s-=1;
            }
            else if (timeObject.s <= 0 && timeObject.m > 0){
              timeObject.s = 59;
              timeObject.m-=1;
            }
            else if (timeObject.s <= 0 && timeObject.m <= 0 && timeObject.h >= 0){
              timeObject.s = 59;
              timeObject.m = 59;
              timeObject.h-=1;
            }
          }
        }, intervalPeriod);
        $log.debug('timeObject',timeObject);
        return {counter: counter,timeObject: timeObject}
      }
    };
  }]);



