(function() {
    'use strict';

     angular
        .module('app.garage')
        .controller('loginCtrl', loginCtrl)
        .controller('coachesCtrl', coachesCtrl)
        .controller('equipmentCtrl', equipmentCtrl)
        .controller('coachCtrl', coachCtrl)

        loginCtrl.$inject = ['$state', '$scope', '$stateParams', 'equipmentService'];

        function loginCtrl($state, $scope, $stateParams, equipmentService) {

            var vm = this;
            var password = 'sportball'

            vm.login = function(pw) {
                if (pw == password) {
                    $state.go('garage');
                }
            }, function(error) {
                  vm.error = error;
            };

        }

        coachesCtrl.$inject = ['$state', '$scope', '$stateParams', 'equipmentService'];

        function coachesCtrl($state, $scope, $stateParams, equipmentService) {

            var vm = this;
            vm.newEquipment = {};
            vm.newCoach = {};

            equipmentService.equipmentList().$loaded().then(function(res) {
                res.sort(function(a, b){
                    return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                });
                vm.equipment = res;
            });

            equipmentService.coaches().$loaded().then(function(res) {
                res.sort(function(a, b){
                    return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                });
                vm.coaches = res;
            });

            vm.sortEquipment = function() {
                equipmentService.equipmentList().$loaded().then(function(res) {
                    res.sort(function(a, b){
                        return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                    });
                    vm.equipment = res;
                });
            };

            vm.sortCoaches = function() {
                equipmentService.coaches().$loaded().then(function(res) {
                    res.sort(function(a, b){
                        return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                    });
                    vm.coaches = res;
                });
            };



            /*vm.removeCoach = function(row) {
                  equipmentService.removeCoach(row.entity.$id);
            }, function(error) {
                  vm.error = error;
            };

            vm.editCoach = function(row) {
                  $state.go('coach', {'rowEntity': row.entity});
            };*/

            vm.addEquipment = function() {
                equipmentService.addEquipment(vm.newEquipment);
                vm.newEquipment = null;
                vm.sortEquipment();
            }, function(error) {
                vm.error = error;
            };

            vm.addCoach = function() {
                equipmentService.addCoach(vm.newCoach);
                vm.newCoach = null;
                vm.sortCoaches();
            }, function(error) {
                vm.error = error;
            };

            vm.changeLocation = function(eq) {
                console.log(eq);
                equipmentService.updateEquipment(eq);
            };

        }

        equipmentCtrl.$inject = ['$state', '$scope', '$stateParams', 'equipmentService'];

        function equipmentCtrl($state, $scope, $stateParams, equipmentService) {
            var vm = this;
            var mobileView = 992;

            vm.equipment = {};
            vm.equipment_id = {};

            vm.updateEquipment = function() {
            if (vm.equipment_id != null)
                vm.equipment.date_updated = firebase.database.ServerValue.TIMESTAMP;
                vm.equipment.$save();
            }, function(error) {
                vm.error = error;
            };

            vm.loadEquipment = function(id) {
                equipmentService.equipment(id).$loaded().then(function(res) {
                          vm.equipment = res;
                    });
            };

            vm.addEquipment = function() {
                equipmentService.addEquipment(vm.equipment).then(function(id) {
                    vm.equipment_id = id;
                    vm.loadEquipment(id);
                });
                $state.go('garage');
            }, function(error) {
                vm.error = error;
            };

            if ($stateParams.rowEntity != undefined) {
                vm.equipment_id = $stateParams.rowEntity.$id;
                vm.loadEquipment($stateParams.rowEntity.$id);
            } else {
                vm.equipment_id = null;
            };

        }

        coachCtrl.$inject = ['$state', '$scope', '$stateParams', 'equipmentService'];

        function coachCtrl($state, $scope, $stateParams, equipmentService) {
            var vm = this;
            var mobileView = 992;

            vm.coach = {};
            vm.coach_id = null;

            equipmentService.coaches().$loaded().then(function(res) {
                vm.totalCount = res.length;
            });

            vm.updateCoach = function() {
            if (vm.coach_id != null)
                vm.coach.date_updated = firebase.database.ServerValue.TIMESTAMP;
                vm.coach.$save();
            }, function(error) {
                vm.error = error;
            };

            vm.loadCoach = function(id) {
                equipmentService.coach(id).$loaded().then(function(res) {
                          vm.coach = res;
                    });
            };

            vm.addCoach = function() {
                equipmentService.addCoach(vm.coach).then(function(id) {
                    vm.coach_id = id;
                    vm.loadCoach(id);
                });
                $state.go('garage');
            }, function(error) {
                vm.error = error;
            };

        }

})();
