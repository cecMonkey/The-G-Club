(function() {
    'use strict';

    angular
        .module('app.gclub')
        .factory('clubService', clubService)

    clubService.$inject = ['$firebaseArray', '$firebaseObject', 'DataService'];

    function clubService($firebaseArray, $firebaseObject, DataService) {

          var root = firebase.database();

          var service = {
              entryList: entryList,
              addEntry: addEntry,
              club: club
          };

          return service;

          function entryList() {
              return $firebaseArray(root.ref('entries/'));
          }

          function addEntry(obj) {
              obj.date_added = firebase.database.ServerValue.TIMESTAMP;
              return DataService.root.ref('entries').push({name: obj.name, entry: obj.entry, date_added: obj.date_added});
          }

          function club(id) {
              return $firebaseObject(root.ref('club/'+ id));
          }

    }

})();
