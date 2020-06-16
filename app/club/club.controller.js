(function() {
    'use strict';

     angular
        .module('app.gclub')
        .controller('entryCtrl', entryCtrl)
        //.controller('coachesCtrl', coachesCtrl)
        .controller('clubCtrl', clubCtrl)
        .controller('coachCtrl', coachCtrl)

        entryCtrl.$inject = ['$state', '$scope', '$stateParams', 'clubService'];

        function entryCtrl($state, $scope, $stateParams, clubService) {

            var vm = this;

            vm.submit = function(name, entry) {
                
                    $state.go('garage');
            }, function(error) {
                  vm.error = error;
            };

            vm.submit = function(name, entry) {
                var obj = {};
                obj.name = name;
                obj.entry = entry
                clubService.addEntry(obj).then(function(id) {
                    //vm.loadCoach(id);
                });
               //console.log(name);
               //console.log(entry);
                $state.go('club');
            }, function(error) {
                vm.error = error;
            };

        }

        //coachesCtrl.$inject = ['$state', '$scope', '$stateParams', 'clubService'];

        /*function coachesCtrl($state, $scope, $stateParams, clubService) {

            var vm = this;
            vm.newEquipment = {};
            vm.newCoach = {};

            clubService.clubList().$loaded().then(function(res) {
                res.sort(function(a, b){
                    return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                });
                vm.club = res;
            });

            clubService.coaches().$loaded().then(function(res) {
                res.sort(function(a, b){
                    return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                });
                vm.coaches = res;
            });

            vm.sortEquipment = function() {
                clubService.clubList().$loaded().then(function(res) {
                    res.sort(function(a, b){
                        return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                    });
                    vm.club = res;
                });
            };

            vm.sortCoaches = function() {
                clubService.coaches().$loaded().then(function(res) {
                    res.sort(function(a, b){
                        return a.name == b.name ? 0 : +(a.name> b.name) || -1;
                    });
                    vm.coaches = res;
                });
            };



            vm.removeCoach = function(row) {
                  clubService.removeCoach(row.entity.$id);
            }, function(error) {
                  vm.error = error;
            };

            vm.editCoach = function(row) {
                  $state.go('coach', {'rowEntity': row.entity});
            };

            vm.addEquipment = function() {
                clubService.addEquipment(vm.newEquipment);
                vm.newEquipment = null;
                vm.sortEquipment();
            }, function(error) {
                vm.error = error;
            };

            vm.addCoach = function() {
                clubService.addCoach(vm.newCoach);
                vm.newCoach = null;
                vm.sortCoaches();
            }, function(error) {
                vm.error = error;
            };

            vm.changeLocation = function(eq) {
                console.log(eq);
                clubService.updateEquipment(eq);
            };

        }*/

        clubCtrl.$inject = ['$state', '$scope', '$stateParams', 'clubService'];

        function clubCtrl($state, $scope, $stateParams, clubService) {
            var vm = this;
            var mobileView = 992;

            vm.club = {};
            vm.club_id = {};

            vm.updateEquipment = function() {
            if (vm.club_id != null)
                vm.club.date_updated = firebase.database.ServerValue.TIMESTAMP;
                vm.club.$save();
            }, function(error) {
                vm.error = error;
            };

            vm.loadEquipment = function(id) {
                clubService.club(id).$loaded().then(function(res) {
                          vm.club = res;
                    });
            };

            vm.addEquipment = function() {
                clubService.addEquipment(vm.club).then(function(id) {
                    vm.club_id = id;
                    vm.loadEquipment(id);
                });
                $state.go('garage');
            }, function(error) {
                vm.error = error;
            };

            if ($stateParams.rowEntity != undefined) {
                vm.club_id = $stateParams.rowEntity.$id;
                vm.loadEquipment($stateParams.rowEntity.$id);
            } else {
                vm.club_id = null;
            };

        }

        coachCtrl.$inject = ['$state', '$scope', '$stateParams', 'clubService'];

        function coachCtrl($state, $scope, $stateParams, clubService) {
            var vm = this;
            var mobileView = 992;

            vm.coach = {};
            vm.coach_id = null;

            clubService.coaches().$loaded().then(function(res) {
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
                clubService.coach(id).$loaded().then(function(res) {
                          vm.coach = res;
                    });
            };

            vm.addCoach = function() {
                clubService.addCoach(vm.coach).then(function(id) {
                    vm.coach_id = id;
                    vm.loadCoach(id);
                });
                $state.go('garage');
            }, function(error) {
                vm.error = error;
            };

        }

})();
