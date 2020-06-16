(function() {
    'use strict';

    angular
        .module('app.garage')
        .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    function configFunction($stateProvider) {
        $stateProvider

        .state('login', {
            url: '/',
            controller: 'loginCtrl as vm',
            templateUrl: 'app/garage/login.html'

        })

        .state('garage', {
            url: '/garage',
            controller: 'coachesCtrl as vm',
            templateUrl: 'app/garage/garage.html'

        })

        .state('equipment', {
            url: '/garage/equipment',
            params: {
                rowEntity: null,
              },
            controller: 'equipmentCtrl as vm',
            templateUrl: 'app/garage/equipment.html'
        })

        .state('coach', {
            url: '/garage/coach',
            params: {
                rowEntity: null,
              },
            controller: 'coachCtrl as vm',
            templateUrl: 'app/garage/coach.html'
        })

    }

})();
