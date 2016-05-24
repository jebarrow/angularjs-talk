(function () {
    'use strict';
    var newId = '00000000-0000-0000-0000-000000000000';
    angular
        .module('app')
        .controller('todoEditController', todoEditController);

    todoEditController.$inject = ['$http'];
    function todoEditController($http) {
        var vm = this;
        vm.todo = { id: newId };
        vm.master = vm.todo;
        vm.getResource = getResource;
        vm.update = update;
        vm.reset = reset;
        vm.addTodo = addTodo;

        function getResource(id) {
            $http.get.get("/api/todo")
            .then( function(response) {
                vm.todo = response.data;
                vm.todo.startDate = new Date(todo.startDate);
                vm.todo.stopDate = new Date(todo.stopDate);
                vm.master = todo;
            });
        };

        function update(form) {
            if (!form.$valid) return;
            if (vm.todo.id === newId) {
                $http.post("/api/todo/" + vm.todo.id, vm.todo)
                .then(function(response){
                  var todo = response.data;
                  vm.getResource(todo.id);
                });
            } else {
                $http.put("/api/todo/" + vm.todo.id, vm.todo)
                .then(function(response){
                  var todo = response.data;
                  vm.getResource(todo.id);
                  if (form) {
                      form.$setPristine();
                      form.$setUntouched();
                  }
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
    };
})();
