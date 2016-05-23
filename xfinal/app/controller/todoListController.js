(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoListController', todoListController);

    todoListController.$inject = ['todos', 'coordinatorService', '$scope'];
    function todoListController(todos, coordinatorService, $scope) {
        var vm = this;
        vm.todoList = [];
        vm.addTodo = addTodo;
        vm.showTodo = showTodo;
        vm.updateList = updateList;
        vm.delete = del;


        updateList();

        function updateList(f) {
            vm.todoList = todos.query(f);
        }

        function addTodo() {
            coordinatorService.setCurrentTodoAndBroadcast('new');
        }

        function showTodo(id) {
            coordinatorService.setCurrentTodoAndBroadcast(id);
        }

        function del(id) {
            var todo = { id: id };
            todos.delete(todo, function () {
                coordinatorService.broadcastItemUpdated();
                vm.todo = { id: 'new' };
            });
            coordinatorService.setCurrentTodoAndBroadcast('new');
        };


        $scope.$on('handleTodoUpdated', function () {
            vm.updateList(function () {
                vm.current = vm.todoList.length - 1;
            });
        });
    };

})();