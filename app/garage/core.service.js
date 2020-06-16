(function() {
  'use strict';

  angular
    .module('app.garage')
    .factory('DataService', DataService)

    DataService.$inject = ['$firebaseArray', '$firebaseObject'];

    function DataService($firebaseArray, $firebaseObject){
      var root        = firebase.database();
      var storageRef  = firebase.storage().ref();

      var service = {
        root:       root,
        storageRef: storageRef,
        profiles:   $firebaseArray(root.ref('profiles/'))
      };

      return service;
    }

})();
