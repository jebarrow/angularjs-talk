(function () {
    'use strict';

    angular
        .module('app')
        .controller('todoListController', todoListController);

    todoListController.$inject = ['$http', '$scope'];
    function todoListController($http, $scope) {
        var vm = this;
        vm.todoList = [];
        vm.delete = del;
        updateList();
        function updateList(f) {
          $http.get("/api/todo")
          .then(function(response) {
            vm.todoList = response.data;
          });
        }

        function del(id){
          $http.delete("/api/todo/" + id)
          .then(function(response){
            alert(response.statusText);
            updateList();
          })
        }
    };

})();
