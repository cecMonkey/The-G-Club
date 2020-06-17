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



        clubCtrl.$inject = ['$state', '$scope', '$stateParams', 'clubService'];

        function clubCtrl($state, $scope, $stateParams, clubService) {
            var vm = this;
            var mobileView = 992;

            vm.club = {};
            vm.club_id = {};

            clubService.entryList().$loaded().then(function(res) {
                vm.entries = res;
                console.log(vm.entries);
            });

            vm.updateEquipment = function() {
            if (vm.club_id != null)
                vm.club.date_updated = firebase.database.ServerValue.TIMESTAMP;
                vm.club.$save();
            }, function(error) {
                vm.error = error;
            };

            vm.loadEquipment = function() {
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
