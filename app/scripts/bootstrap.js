require.config({
	baseUrl: '/scripts',
	paths: {
		'angular': '/bower_components/angular/angular',
		'angular-route': '/bower_components/angular-route/angular-route',
		'bootstrapComp': '/bower_components/bootstrap/bootstrapComp',
		'jquery': '/bower_components/jquery/dist/jquery',
		'angular-ui-grid': '/bower_components/angular-ui-grid/ui-grid',
	},
	shim: {
		'app': {
			deps: ['angular', 'angular-route', 'bootstrapComp']
		},
		'angular-route': {
			deps: ['angular']
		},
		'bootstrapComp': {
			deps: ['jquery']
		},
		'angular-ui-grid': {
			deps: ['angular']
		}
	}
});

require
(
	[
	'app'
	],
	function(app)
	{
		angular.bootstrap(document, ['app']);
	}
	);