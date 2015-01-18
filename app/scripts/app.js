define([
    'routes',
    'services/dependencyResolverFor',
    'angular-ui-grid'
    ], function(config, dependencyResolverFor)
    {
        var gridTableModule = angular.module('gridTable', ['ui.grid', 'ui.grid.autoResize', 'ui.grid.edit']);
        var app = angular.module('app', ['ngRoute', 'gridTable']);

        app.config(
            [
            '$routeProvider',
            '$locationProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',

            function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
            {
               app.controller = $controllerProvider.register;
               app.directive  = $compileProvider.directive;
               app.filter     = $filterProvider.register;
               app.factory    = $provide.factory;
               app.service    = $provide.service;

               $locationProvider.html5Mode(true);

               if(config.routes !== undefined)
               {
                angular.forEach(config.routes, function(route, path)
                {
                    $routeProvider.when(path, {templateUrl:route.templateUrl, resolve:dependencyResolverFor(route.dependencies)});
                });
            }

            if(config.defaultRoutePaths !== undefined)
            {
                $routeProvider.otherwise({redirectTo:config.defaultRoutePaths});
            }
        }
        ]);
return app;
});