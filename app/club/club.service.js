(function() {
    'use strict';

    angular
        .module('app.gclub')
        .factory('clubService', clubService)

    clubService.$inject = ['$firebaseArray', '$firebaseObject', 'DataService'];

    function clubService($firebaseArray, $firebaseObject, DataService) {

          var root = firebase.database();

          var service = {
              clubList: clubList,
              addEntry: addEntry,
              club: club,
              coaches: coaches,
              addCoach: addCoach,
              removeCoach: removeCoach,
              coach: coach
          };

          return service;

          function clubList() {
              return $firebaseArray(root.ref('club/'));
          }

          function addEntry(obj) {
              obj.date_added = firebase.database.ServerValue.TIMESTAMP;
              return DataService.root.ref('entries').push({name: obj.name, entry: obj.entry, date_added: obj.date_added});
          }

          function club(id) {
              return $firebaseObject(root.ref('club/'+ id));
          }

          function coaches() {
              return $firebaseArray(root.ref('coaches/'));
          }

          function addCoach(obj) {
              obj.date_added = firebase.database.ServerValue.TIMESTAMP;
              return DataService.root.ref('coaches').push({name: obj.name, date_added: obj.date_added});
          }

          function removeCoach(id) {
              return root.ref('coaches/'+ id).remove();
          }

          function coach(id) {
              return $firebaseObject(root.ref('coaches/'+ id));
          }
    }

})();
