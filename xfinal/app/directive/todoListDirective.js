(function() {
    'use strict';

    angular
        .module('app')
        .directive('todoList', todoListDirective);
    todoListDirective.$inject = ['templateService'];

    function todoListDirective(templateService) {
        return {
            restrict: 'A',
            templateUrl: templateService.getTemplate('directive', 'todo-list.html'),
            scope: {},
        }
    };
})();