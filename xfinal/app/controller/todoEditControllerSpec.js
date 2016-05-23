describe('Controller: todoEditController', function () {
    var $scope,
        ctrl,
        coordinatorServiceMock,
        todosMock;
    var newId = '00000000-0000-0000-0000-000000000000';

    beforeEach(function () {

        coordinatorServiceMock = jasmine.createSpyObj('coordinatorServiceMock', ['setCurrentTodoAndBroadcast']);
        todosMock = jasmine.createSpyObj('todosMock', ['get', 'delete', 'update', 'save']);

        module('app');

        inject(function ($rootScope, $controller) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();

            ctrl = $controller('todoEditController', {
                todos: todosMock,
                coordinatorService: coordinatorServiceMock,
                $scope: $scope
            });
        });

    });

    describe('todoEditController ctor', function () {
        it('should init todo and master', function () {
            var initTodo = { id: newId };
            expect(ctrl.todo).toEqual(initTodo);
            expect(ctrl.master).toEqual(initTodo);
        });
    });

    describe('todoEditController getResource', function () {
        it('should call todos get', function () {
            var testData = 'test';
            ctrl.getResource(testData);
            expect(todosMock.get).toHaveBeenCalled();
        });
    });

    describe('todoEditController delete', function () {
        it('should call todos delete', function () {
            var testData = 'test';
            ctrl.delete(testData);
            expect(todosMock.delete).toHaveBeenCalled();
        });
    });

    describe('todoEditController update', function () {
        it('should call todos update', function () {
            var testForm = { $valid: true };
            ctrl.todo.id = 'not-new';
            ctrl.update(testForm);
            expect(todosMock.update).toHaveBeenCalled();
        });
        it('should call todos save', function () {
            var testForm = { $valid: true };
            ctrl.todo.id = newId;
            ctrl.update(testForm);
            expect(todosMock.save).toHaveBeenCalled();
        });

        describe('todoEditController delete', function () {
            it('should call todos delete', function () {
                var testData = 'test';
                ctrl.delete(testData);
                expect(todosMock.delete).toHaveBeenCalled();
            });
        });
    });

});