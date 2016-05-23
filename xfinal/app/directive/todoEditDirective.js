(function () {
    'use strict';

    angular
        .module('app')
        .directive('todoEdit', todoEditDirective);
    todoEditDirective.$inject = ['templateService'];

    function todoEditDirective(templateService) {
        return {
            restrict: 'A',
            templateUrl: templateService.getTemplate('directive', 'todo-Edit.html'),
            scope: {},
        };
    };
})();