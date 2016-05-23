describe('Service: templateService', function () {
    beforeEach(module('app'));

    var $injector,
        myService;

    beforeEach(function () {
        $injector = angular.injector(['app']);
        myService = $injector.get('templateService');
    });

    describe('templateService getTemplate', function () {
        it('returns the appended URL', function () {
            var url = myService.getTemplate('foo','bar');
            expect(url).toEqual('app/view/foo/bar');
        });
    });
});
