describe('Controller: todoListController', function () {
    var $scope,
        ctrl,
        coordinatorServiceMock,
        todosMock;


    beforeEach(function () {

        coordinatorServiceMock = jasmine.createSpyObj('coordinatorServiceMock', ['setCurrentTodoAndBroadcast']);
        todosMock = jasmine.createSpyObj('todosMock', ['query']);

        module('app');

        inject(function ($rootScope, $controller) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();

            ctrl = $controller('todoListController', {
                todos: todosMock,
                coordinatorService: coordinatorServiceMock,
                $scope: $scope
            });
        });
    });

    describe('todoListController ctor', function () {
        it('should call todos.query()', function () {
            expect(todosMock.query).toHaveBeenCalled();
        });
    });

    describe('todoListController addTodo', function () {
        it('should call coordinatorService.setCurrentTodoAndBroadcast()', function () {
            ctrl.addTodo();
            expect(coordinatorServiceMock.setCurrentTodoAndBroadcast).toHaveBeenCalledWith('new');
        });
    });

    describe('todoListController showTodo', function () {
        it('should call coordinatorService.setCurrentTodoAndBroadcast()', function () {
            var testData = 'test';
            ctrl.showTodo(testData);
            expect(coordinatorServiceMock.setCurrentTodoAndBroadcast).toHaveBeenCalledWith(testData);
        });
    });

    describe('todoListController showTodo', function () {
        it('should call coordinatorService.setCurrentTodoAndBroadcast()', function () {
            var testData = 'test';
            ctrl.showTodo(testData);
            expect(coordinatorServiceMock.setCurrentTodoAndBroadcast).toHaveBeenCalledWith(testData);
        });
    });
});