var app = angular.module('app', ['ngRoute',
                                 'ngAnimate',
                                 'ui.bootstrap', 
                                 'app.controllers',
                                 'app.modals',
                                 'app.services',
                                 'app.directives']);

// app configuration
app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    
    // routes
    function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'app/views/landing.html',
                controller  : 'LandingController'
            })
            .when('/routes', {
                templateUrl : 'app/views/routes.html',
                controller  : 'RoutesController',
                authorized  : ['admin', 'user']
            })
            .when('/vehicles', {
                templateUrl : 'app/views/vehicles.html',
                controller  : 'VehiclesController',
                authorized  : ['admin']
            })
            .when('/error', {
                templateUrl : 'app/views/error.html',
                controller  : 'ErrorController'
            })
            .otherwise({
                redirectTo : '/'
            })
            
        // remove # from url in html5 compliant browsers
        if(window.history && window.history.pushState){
            $locationProvider.html5Mode(true);
        }
        
        // enable authentication middleware service
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    }   
])

// app bootstrap
app.run(['$rootScope', '$location', '$window', 'AuthorizationService', 'ErrorService',
    function ($rootScope, $location, $window, auth, err) {
    
        // prevent unauthorized route access
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var allowed = false;
            
            // no route authorization defined
            if (!next.authorized) { allowed = true; }
            // route authorization defined but user not logged in
            else if (auth.role === 'unauthenticated'){ err.msg = "Please login to view this resource."; }
            // check that users role is included in route authorization
            else { 
                angular.forEach(next.authorized, function(role) {
                    if(role.toLowerCase().indexOf(auth.role.toLowerCase()) >= 0 ) allowed = true;;
                });
                
                if (!allowed) err.msg = "You are not authorized to view this resource.";
            }
            
            if (allowed) { $location.path(next.originalPath); }
            else         { $location.path('/error'); }
        });
    }        
]);



