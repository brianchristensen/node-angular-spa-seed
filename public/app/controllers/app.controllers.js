angular.module('app.controllers', [])

// Navbar Controller
.controller('NavController', ['$scope', function($scope) {
    angular.element(document).ready(function() {
        // Changes gray 'active' color to the link clicked
        $('ul.nav > li').click(function (e) {
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active');                
        });
        
        // If the home button (brand icon) is clicked, remove gray active color from all navbar links
        $('.navbar-brand').click(function (e) {
            $('ul.nav > li').removeClass('active');               
        });
    });
}])

// Landing Controller
.controller('LandingController', ['$scope', '$http', function($scope, $http) {
    $scope.voiceStream = {};
    
}])

// Routes Controller
.controller('RoutesController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
    $scope.formData = {};

    // when creating a new channel, send the channel name to the node API
    $scope.createChannel = function() {
	    $http.post('/api/channels', $scope.formData)
		    .success(function(data) {
			    $scope.formData = {}; // clear the form so our user is ready to enter another
			    $scope.channels = data;
			    console.log(data);
			    $location.path("/sum");
		    })
		    .error(function(data) {
 		        
		    });
    };
}])

// Vehicles Controller
.controller('VehiclesController', ['$scope', '$http', function($scope, $http) {
    $scope.voiceStream = {};
    
}])

// Error Controller
.controller('ErrorController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
    $scope.error = { msg: $window.sessionStorage.error };
    
}])

// Logout Controller
.controller('LogoutController', ['$scope', '$window', '$location', 'AuthorizationService',
     function($scope, $window, $location, auth) {
        
        $scope.logout = function () {     
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.role;
            auth.role = 'unauthenticated';
            auth.isLoggedIn = false
            
            $location.path('/');
        }
}])  


