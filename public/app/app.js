var app = angular.module('app', ['ngRoute',
                                 'ngAnimate',
                                 'ui.bootstrap', 
                                 'app.controllers']);

// app configuration
app.config(['$routeProvider', '$locationProvider',
    
    // routes
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'app/views/landing.html',
                controller  : 'LandingController'
            })
            .when('/routes', {
                templateUrl : 'app/views/routes.html',
                controller  : 'RoutesController'
            })
            .when('/vehicles', {
                templateUrl : 'app/views/vehicles.html',
                controller  : 'VehiclesController'
            })
            .otherwise({
                redirectTo : '/'
            })
            
        // remove # from url in html5 compliant browsers
        if(window.history && window.history.pushState){
            $locationProvider.html5Mode(true);
        }
    }   
]);
