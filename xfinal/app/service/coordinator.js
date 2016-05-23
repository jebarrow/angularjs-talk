(function () {
    "use strict";
    angular
        .module('app')
        .service('coordinatorService', coordinator);
    function coordinator($rootScope) {
        var service = {

            currentTodoId: {},

            setCurrentTodoAndBroadcast: function (id) {
                this.currentTodoId = id;
                this.broadcastNewTodo();
            },

            broadcastItemUpdated: function() {
                $rootScope.$broadcast('handleTodoUpdated');
            },

            broadcastNewTodo: function() {
                $rootScope.$broadcast('handleNewTodo');
            }
        };
        return service;
    };
})();
