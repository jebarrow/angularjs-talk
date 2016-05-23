(function () {
    'use strict';
    angular
        .module('app')
        .config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider.when('/list',
        {
            templateUrl: function () {
                return '/final/app/view/todo.html';
            },
        })
        .otherwise({
            redirectTo: '/list'
        });
    }
})();