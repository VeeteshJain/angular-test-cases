'use strict';
define(['controllers/HomeViewController'], function(app)
{
	describe("The 'HomeViewController'", function()
	{
		var $rootScope;
		var $controller;
		var $scope;

		beforeEach(function()
		{
			module('app');

			inject
			([
				'$injector',
				'$rootScope',
				'$controller',

				function($injector, _$rootScope, _$controller)
				{
					$rootScope = _$rootScope;
					$scope = $rootScope.$new();
					$controller = _$controller;
				}
				]);
			var form = [
			{'id':123,'name':'abc1','type':'form'},
			{'id':456,'name':'abc2','type':'form'},
			{'id':789,'name':'abc3','type':'form'},
			{'id':321,'name':'abc4','type':'form'},
			{'id':654,'name':'abc5','type':'form'}
			];
			$controller('HomeViewController', {$scope: $scope});
		});

		it("should set the page heading to 'Welcome'", function()
		{
			expect($scope.page.heading).toBe('Welcome');
		});

		it('should have get Date service', function(){
			var appServiceMock = null,
			$httpBackend = null,
			authRequestHandler = null,
			$rootScope = null;
			inject(function($injector){
			// Set up the mock http service responses
			$httpBackend = $injector.get('$httpBackend');
			// backend definition common for all tests
			//authRequestHandler = $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'});
			// Get hold of a scope (i.e. the root scope)
			$rootScope = $injector.get('$rootScope');var form = [{'id':123,'name':'abc','type':'form'}]
			appServiceMock = $injector.get('appService');
		});
			spyOn(appServiceMock ,'getDate').and.callThrough();
			authRequestHandler = $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'});
			console.log(authRequestHandler);
			$httpBackend.expectGET('/auth.py');
			appServiceMock.getDate(12);
			$httpBackend.flush();

			/*authRequestHandler = $httpBackend.when('GET', '/auth.py').respond(404, '');
			console.log(authRequestHandler);
			$httpBackend.expectGET('/auth.py');
			appServiceMock.getDate(12);
			$httpBackend.flush();*/

			expect(appServiceMock.getDate).toHaveBeenCalled();
			expect(appServiceMock.getDate).toHaveBeenCalledWith(12);
		});
});
});
