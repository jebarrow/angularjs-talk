describe('Service: coordinatorService', function () {

    var $injector,
        rootScope,
        service;

    beforeEach(function () {
        module('app');
        $injector = angular.injector(['app']);
        service = $injector.get('coordinatorService');
        rootScope = $injector.get('$rootScope');
        spyOn(rootScope, '$broadcast');
    });

    describe('coordinatorService broadcastNewTodo', function () {
        it('broadcasts a handleNewTodo', function () {
            service.broadcastNewTodo();
            expect(rootScope.$broadcast).toHaveBeenCalledWith('handleNewTodo');
        });
    });

    describe('coordinatorService broadcastItemUpdated', function () {
        it('broadcasts a handleTodoUpdated', function () {
            service.broadcastItemUpdated();
            expect(rootScope.$broadcast).toHaveBeenCalledWith('handleTodoUpdated');
        });
    });

    describe('coordinatorService setCurrentTodoAndBroadcast', function () {
        it('sets the current todo id and broadcasts a handleNewTodo', function () {
            var newId = 'test';
            service.setCurrentTodoAndBroadcast(newId);
            expect(rootScope.$broadcast).toHaveBeenCalledWith('handleNewTodo');
            expect(service.currentTodoId).toEqual(newId);
        });
    });

});