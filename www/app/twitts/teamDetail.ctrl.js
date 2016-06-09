(function(){
  'use strict';
  angular.module('app')
    .controller('TeamDetailCtrl', TeamDetailCtrl);

  function TeamDetailCtrl($scope, $stateParams, Storage, $http, $state, $ionicPopup, C, $log){

    var data = {}, fn = {};
    $scope.error = false;
    $scope.errorMessage = '';

    $scope.fn = fn;
    // Setup alert popup
    $scope.alert = function(){
      return $ionicPopup.alert({
        title: 'Error!',
        template: $scope.errorMessage,
        buttons:
          [{
            text: 'OK',
            type: 'button',
          }]
      });
    };

    $log.debug('teamDetail',':','$stateParams',':',$stateParams);

    $scope.isReady = function(id){
      $log.debug('isReady',id);
      return $scope.team.readyMemberIds.some(function(readyMemberId){
        return readyMemberId === id;
      });
    };

    var loadTeamDetail = function(path) {
      $http
        .get(path)
        .then(function (response) {
          $log.debug('team detail response: ',response.data);
          $scope.team = response.data;
        })
        .catch(function (err) {
          $log.debug('load team detail error',err);
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        });
    };

    var getTeamPath = '';
    if($stateParams.teamId){
      getTeamPath = C.backendUrl + '/api/teams/'+$stateParams.teamId+'?dto=true';
      $scope.teamId = $stateParams.teamId;
      loadTeamDetail(getTeamPath);
    }
    else {
      Storage
        .getTeamId()
        .then(function(teamId){
          if(teamId){
            getTeamPath = C.backendUrl + '/api/teams/' + teamId + '?dto=true';
            $scope.teamId = teamId;
            loadTeamDetail(getTeamPath);
          }
          else{
            $scope.error = true;
            $scope.errorMessage = "Error! No team id found, please join team again";
            $state.go('twitts');
          }
        })
    }
    Storage
      .getUser()
      .then(function(user){
        $scope.isStartPressed = $scope.isReady(user._id);
        $log.debug('User is',$scope.isStartPressed ? 'READY':'START')
      });

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

    var notReady = function(memberId){
      $scope.$apply(function(){
        $scope.team.readyMemberIds = $scope.team.readyMemberIds.filter(function(readyMemberId){
          return memberId !== readyMemberId;
        });
        $log.debug('team.readyMemberIds after socket "notReady": ',$scope.team.readyMemberIds);
      });
    };

    var ready = function(memberId){
      $log.debug('ready socket response: ',response);
      $scope.$apply(function(){
        $scope.team.readyMemberIds.push(memberId);
        $log.debug('team.readyMemberIds after socket "ready": ',$scope.team.readyMemberIds);
      });
    };

    $scope.isStartPressed = false;
    $scope.startButtonText = $scope.isStartPressed ? 'READY' : 'START';
    var sendStartGameReadyRequest = function(){
      $scope.isStartPressed = true;
      Storage
        .getTeamId()
        .then(function(teamId){
          $http
            .get(C.backendUrl+'/api/teams/' + teamId + '/ready-state?ready=true')
            .then(function(response){
              $log.debug("set state to ready successful");
            })
            .catch(function(err){
              $scope.isStartPressed = false;
              $log.debug('sendStartGameReadyRequest err:',err);
              $scope.error = true;
              $scope.errorMessage = err.message;
            });
        });
    };
    var sendStartGameNotReadyRequest = function(){
      Storage
        .getTeamId()
        .then(function(teamId){
          $http
            .get(C.backendUrl+'/api/teams/' + teamId + '/ready-state?ready=false')
            .then(function(response){
              $log.debug("set state to not ready successful");
              $scope.isStartPressed = false;
            })
            .catch(function(err){
              $log.debug('sendStartGameNotReadyRequest err:',err);
              $scope.error = true;
              $scope.errorMessage = err.message;
            });
        });
    };

    $scope.startGame = function(){
      $scope.data = {};
      if($scope.isStartPressed){
        sendStartGameNotReadyRequest();
      }
      else{
        var language = $ionicPopup.show({
          templateUrl:'app/twitts/chooseLanguagePopup.html',
          title: 'Choose language',
          scope: $scope,
          buttons:
            [
              {
                text: 'Cancel',
                type: 'button-default',
                onTap: function(e) {
                  // e.preventDefault() will stop the popup from closing when tapped.
                  $log.debug('languagePopup','cancel is selected');
                  return null;
                }
              }
              ,
              {
                text: '<b>Start</b>',
                type: 'button',
                onTap: function(e) {
                  // If user is not select any language, then don't do anything
                  if (!$scope.data.language) {
                    e.preventDefault();
                  } else {
                    $log.debug('select language:', $scope.data.language);
                    return $scope.data.language;
                  }
                }
              }
            ]

        });
        language
          .then(function(lang) {
            if(lang){ //if lang is not null
              Storage
                .setLanguage(lang)
                .then(function(){
                  $log.debug('save language:',lang);
                  if($scope.isStartPressed)
                    sendStartGameNotReadyRequest();
                  else
                    sendStartGameReadyRequest();
                });
            }
          })
          .catch(function(err){
            $log.debug('select language err:',err);
            $scope.error = true;
            $scope.errorMessage = err.message;
          });
      }
    };

    var teamSocket = io.connect(C.backendUrl + '/teams');
    teamSocket.on('joined', function (response) {
      if($scope.team._id === response.teamId){
        $log.debug('joined socket response: ',response);
        $scope.$apply(function(){
          $scope.team.members.push({_id: response.memberId, fullName:response.memberName});
          $log.debug('team after socket join: ',$scope.team.members);
        });
      }
    });

    teamSocket.on('quit', function (response) {
      if($scope.team._id === response.teamId){
        $log.debug('quit socket response:',response);
        $scope.$apply(function(){
          $scope.team.members = $scope.team.members.filter(function(m){
            return m._id !== response.userId;
          });
          $log.debug('$scope.team after quit',$scope.team.members);
        });
      }
    });

    teamSocket.on('deleted', function (response) {
      $log.debug('deleted socket response:',response);
      if($scope.team._id === response._id){
        Storage
          .setTeamId(undefined)
          .then(function(){
            $state.go('twitts',{}, { reload: true });
          })
          .catch(function(err){
            $log.debug('socket deleted team err:',err);
            $scope.error = true;
            $scope.errorMessage = err.message;
          });
      }
    });

    var startGameSocket = io.connect(C.backendUrl + '/startGame');
    teamSocket.on('ready', function (response) {
      if($scope.team._id === response.teamId){
        ready(response.memberId);
      }
    });
    teamSocket.on('go', function (response) {
      if($scope.team._id === response.teamId){
        $log.debug('"go" socket response: ',response);
        $state.go('mapgame');
      }
    });
    teamSocket.on('notReady', function (response) {
      if($scope.team._id === response.teamId){
        $log.debug('notReady socket response: ',response);
        notReady(response.memberId);
      }
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
