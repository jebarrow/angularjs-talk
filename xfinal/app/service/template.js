(function () {
    "use strict";
    angular
        .module('app')
        .service('templateService', templateService);
    templateService.$inject = [];
    function templateService() {
        var service = {
            baseUrl: 'app/view/',
            getTemplate: function (type, name) {
                return this.baseUrl + type + '/' + name;
            },
        };
        return service;
    };
})();
