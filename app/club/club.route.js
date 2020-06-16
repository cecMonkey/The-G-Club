(function() {
    'use strict';

    angular
        .module('app.gclub')
        .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    function configFunction($stateProvider) {
        $stateProvider

        .state('entrance', {
            url: '/',
            controller: 'entryCtrl as vm',
            templateUrl: 'app/club/entrance.html'

        })

        .state('club', {
            url: '/club',
            controller: 'clubCtrl as vm',
            templateUrl: 'app/club/club.html'

        })

    }

})();
