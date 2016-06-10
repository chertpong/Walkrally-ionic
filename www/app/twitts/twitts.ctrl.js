(function(){
  'use strict';
  angular.module('app')
    .controller('TeamListCtrl', TeamListCtrl);

  function TeamListCtrl($scope,$http, Storage, Backend, $state, $stateParams, C, $log, $ionicPopup){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    $scope.teams= [];
    $scope.error = false;
    $scope.errorMessage = '';

    $scope.alert = function(){
      return $ionicPopup.alert({
        title: 'Error!',
        template: $scope.errorMessage,
        buttons:
          [{
            text: 'OK',
            type: 'button',
          }]//
      });
    };

    Storage
      .getTeamId()
      .then(function(teamId){
        if(teamId) {
          $log.debug('lobby: user already have a team');
          $log.debug('redirect to teamDetail : ',' teamId = ',teamId);
          $state.go('teamDetail', {teamId: teamId});
        }
      });
    var teamId='';
    var path = C.backendUrl + "/api/teams?dto=true";

    $http
      .get(path)
      .then(function (response) {
        $log.debug('team loaded ',response.data.length);
        $scope.teams= response.data;
      })
      .catch(function (err) {
        $log.debug('load team err:',err);
        $scope.error = true;
        $scope.errorMessage = err.data.message;
    });

    $scope.joinTeam = function(teamId){
      var path = C.backendUrl + '/api/teams/'+teamId+'/join';
      $http.post(path)
        .then(function (response) {
          $log.debug('join team success');
          $log.debug('join team response:',response);

          Storage.getUserToken().then(function(token){ $log.debug('token',token);});
          Storage.getUser().then(function(user){ $log.debug('user',user);});
          Storage.setTeamId(teamId).then(function(){
            $log.debug('join:',teamId);
          });
          $state.go('teamDetail',{teamId:teamId});
        })
        .catch(function (err) {
          $log.debug('join team err:',err);
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        });
    };

    var socket = io.connect(C.backendUrl + '/teams');
    socket.on('created', function (response) {
      $scope.$apply(function(){
        console.log('socket create response:'+response);
        $scope.teams.push(response);
        //     $scope.currentMember =response.data.currentMember;
        //     $scope.maximumMember =response.data.maximumMember;
        console.log($scope.teams);
      })
    });

    socket.on('joined', function (response) {
      console.log(response);
      $scope.teams.forEach(function(team,index){
        if(team._id=== response.teamId){
          $scope.$apply(function(){
            console.log($scope.teams);
            $scope.teams[index].currentMember++;
          });
        }
      });
    });

    socket.on('quit', function (response) {
      console.log(response);
      $scope.teams.forEach(function(team,index){
        if(team._id=== response.teamId){
          $scope.$apply(function(){
            console.log($scope.teams);
            $scope.teams[index].currentMember--;
          });
        }
      });
    });
    socket.on('deleted', function (response) {
      $scope.$apply(function(){
        console.log(response);
        $scope.teams = $scope.teams.filter(function(team){
          return team._id.toString() === response.teamId.toString();  
        });
        console.log($scope.teams);
      })
    });

    $scope.linktoCreateTeam = function(){
      $state.go('twitt');
    };

    // Watch for error
    $scope.$watch('error',function(newValue){
      if(newValue){
        $scope.alert().then(function(res) {
          $scope.error = false;
        });
      }
    });
  }
})();
