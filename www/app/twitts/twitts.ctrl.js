(function(){
  'use strict';
  angular.module('app')
    .controller('TwittsCtrl', TwittsCtrl);

  function TwittsCtrl($scope,$http, Storage, Backend){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    var token = '';
    Storage.getUserToken().then(function(t){
      token = t;

      var server= "http://52.163.91.205";
      var path = "/api/teams";

      // var data ={ email: credentials.email, password: credentials.password}
      //console.log(data);

      $http.get(server+path,{})
        .then(function (response) {
          console.log(response.data);
          $scope.teams= response.data

        }).catch(function (err) {
        console.log(err);
        $scope.error = true;

      });


    });


    //var socket = io.connect('http://52.163.91.205/teams');
    //socket.on('created', function (response) {
    //  console.log(response);
    //
    //});

    // $http get team list

    // create ->  socket on
                    // update team list   ->  list (get + create)
    // เช้คcurrent team , ถ้ามีอยู๋เเล้ว สร้างเพิม่ไม่ได้


    // join ->
        // get team , response data
                    //"currentMemeber": Number, ++
                    // post data with new currentmember
                    //    update team list

    // quit ->
       // get team
                     //"currentMemeber": Number, --
                     // post data with new currentmember
                     //    update team list
    //delete team
                      // get team , delete
                      //    update team list


  }




})();
