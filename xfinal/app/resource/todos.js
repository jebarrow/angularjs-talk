(function () {
    'use strict';
    angular
        .module('app')
        .factory('todos', todos);
    todos.$inject = ['$resource'];
    function todos($resource) {
        return $resource('/api/ToDo/:id', { id: '@id' },
            {
                'update': {
                     method: 'PUT'
                }
            });
    }
})();