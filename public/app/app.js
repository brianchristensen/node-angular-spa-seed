var app = angular.module('app', ['ngRoute',
                                 'ngAnimate',
                                 'app.controllers']);

// routes
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/join', {
                templateUrl : 'app/views/join.html',
                controller  : 'JoinController'
            })
            .when('/talk', {
                templateUrl : 'app/views/talk.html',
                controller  : 'TalkController'
            })
            .otherwise({
                redirectTo : '/join'
            })
    }
]);
