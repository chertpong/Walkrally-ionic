(function(){
  'use strict';
  angular.module('app')
    .controller('TeamDetailCtrl', TeamDetailCtrl);

  function TeamDetailCtrl($scope, $stateParams, Storage, $http, $state, $ionicPopup, C, $log){

    var data = {}, fn = {};
    var name='';
    var currentMember ='';
    var maximumMember ='';
    var team =[];
    var teamId= '';
    $scope.error = false;
    $scope.errorMessage = '';

    $scope.fn = fn;
    // Setup alert popup
    $scope.alert = function(){
      return $ionicPopup.alert({
        title: 'Error!',
        template: $scope.errorMessage
      });
    };

    $log.debug('teamDetail',':','$stateParams',':',$stateParams);

    var loadTeamList = function(path) {
      $http
        .get(path)
        .then(function (response) {
          $log.debug('team detail response: ',response.data);
          $scope.team = response.data;
        })
        .catch(function (err) {
          console.log(err);
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        });
    };

    var getTeamPath = '';
    if($stateParams.teamId){
      getTeamPath = C.backendUrl + '/api/teams/'+$stateParams.teamId+'?dto=true';
      $scope.teamId = $stateParams.teamId;
      loadTeamList(getTeamPath);
    }
    else {
      Storage
        .getTeamId()
        .then(function(teamId){
          if(teamId){
            getTeamPath = C.backendUrl + '/api/teams/' + teamId + '?dto=true';
            $scope.teamId = teamId;
            loadTeamList(getTeamPath);
          }
          else{
            $scope.error = true;
            $scope.errorMessage = "Error! No team id found, please join team again";
            $state.go('twitts');
          }
        })
    }

    $scope.quitTeam = function(teamId){
      var path = C.backendUrl + '/api/teams/'+teamId+'/quit';

      $http.post(path)
        .then(function (response) {
          $log.debug('quit team response:',response);
          return Storage.setTeamId(undefined);
        })
        .then(function(){
          $state.go('twitts');
        })
        .catch(function (err) {
          $log.debug('quit team err:',err);
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        });
    };




    $scope.startgame = function(){
      $scope.data = {};

      var language = $ionicPopup.show({
        templateUrl:'app/twitts/chooseLanguagePopup.html',
        title: 'Choose language',
        scope: $scope,
        buttons:
          [ { text: 'Cancel', type: 'button-default',
            onTap: function(e) {
              // e.preventDefault() will stop the popup from closing when tapped.
              return null;
            }}
            ,{
            text: '<b>Start</b>',
            type: 'button',
            onTap: function(e) {
              if (!$scope.data.language) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.language;
              }
            }
          }]

      });
      language.then(function(res) {
        console.log(res);
        if(res){
          Storage.setLanguage(res).then(function(){
            $state.go('mapgame');
          });}
      });
    };

    var socket = io.connect(C.backendUrl + '/teams');
    socket.on('joined', function (response) {
      console.log(response);
          $scope.$apply(function(){
            console.log($scope.team);
            $scope.team.push(response.memberName);
          });


    });

    socket.on('quit', function (response) {
      console.log(response);
          $scope.$apply(function(){
            console.log($scope.team);
            $scope.team.push(response.memberName);
          });
    });





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
