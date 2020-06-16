(function() {
    'use strict';

    angular
        .module('app.garage')
        .factory('equipmentService', equipmentService)

    equipmentService.$inject = ['$firebaseArray', '$firebaseObject', 'DataService'];

    function equipmentService($firebaseArray, $firebaseObject, DataService) {

          var root = firebase.database();

          var service = {
              equipmentList: equipmentList,
              addEquipment: addEquipment,
              updateEquipment: updateEquipment,
              removeEquipment: removeEquipment,
              equipment: equipment,
              coaches: coaches,
              addCoach: addCoach,
              removeCoach: removeCoach,
              coach: coach
          };

          return service;

          function equipmentList() {
              return $firebaseArray(root.ref('equipment/'));
          }

          function addEquipment(obj) {
              obj.date_added = firebase.database.ServerValue.TIMESTAMP;
              obj.location = 'Office';
              return DataService.root.ref('equipment').push({name: obj.name, location: obj.location, date_added: obj.date_added});
          }

          function updateEquipment(obj) {
              obj.date_modified = firebase.database.ServerValue.TIMESTAMP;
              return DataService.root.ref('equipment/'+ obj.$id).update({location: obj.location, date_modified: obj.date_modified});
          }

          function removeEquipment(id) {
              return root.ref('equipment/'+ id).remove();
          }

          function equipment(id) {
              return $firebaseObject(root.ref('equipment/'+ id));
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
