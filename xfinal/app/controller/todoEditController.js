(function () {
    'use strict';
    var newId = '00000000-0000-0000-0000-000000000000';
    angular
        .module('app')
        .controller('todoEditController', todoEditController);

    todoEditController.$inject = ['todos', 'coordinatorService', '$scope'];
    function todoEditController(todos, coordinatorService, $scope) {
        var vm = this;
        vm.todo = { id: newId };
        vm.master = vm.todo;
        vm.getResource = getResource;
        vm.delete = del;
        vm.update = update;
        vm.reset = reset;
        vm.addTodo = addTodo;

        function getResource(id) {
            todos.get({ id: id }, function(todo) {
                vm.todo = todo;
                vm.todo.startDate = new Date(todo.startDate);
                vm.todo.stopDate = new Date(todo.stopDate);
                vm.master = todo;
            });
        };
        
        function del(form) {
            todos.delete(vm.todo, function () {
                coordinatorService.broadcastItemUpdated();
                vm.todo = { id: newId };
                form.$setPristine();
                form.$setUntouched();
            });
        };

        function update(form) {
            if (!form.$valid) return;
            if (vm.todo.id === newId) {
                todos.save(vm.todo, function (todo) {
                    vm.getResource(todo.id);
                    coordinatorService.broadcastItemUpdated();
                });
            } else {
                todos.update(vm.todo, function (todo) {
                    vm.getResource(todo.id);
                    if (form) {
                        form.$setPristine();
                        form.$setUntouched();
                    } coordinatorService.broadcastItemUpdated();
                });
            }
        };

        function reset(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            vm.todo = angular.copy(vm.master);
        };

        function addTodo(form) {
            vm.todo = {
                id: newId,
            };
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
        }
        
        $scope.$on('handleNewTodo', function () {
            var id = coordinatorService.currentTodoId;
            if (id === newId) {
                vm.todo = {
                    id: newId,
                };
            } else {
                vm.getResource(id);
            }
        });
    };
})();