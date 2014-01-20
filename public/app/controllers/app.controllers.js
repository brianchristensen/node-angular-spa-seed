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
.controller('RoutesController', ['$scope', '$http', '$location', function($scope, $http, $location) {
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
			    console.log('Error: ' + data);
		    });
    };
}])

// Vehicles Controller
.controller('VehiclesController', ['$scope', '$http', function($scope, $http) {
    $scope.voiceStream = {};
    
}])

// Modal window controller
.controller('ModalController', ['$scope', '$modal', function($scope, $modal) {

    $scope.openModal = function (modal) {
        
        switch(modal) {
            case 'logon':
                var modalInstance = $modal.open({
                  templateUrl: 'app/views/modal/logonModal.html',
                  controller: 'LogonModalController'
                });
                break;
            case 'contact':
                var modalInstance = $modal.open({
                  templateUrl: 'app/views/modal/contactModal.html',
                  controller: 'ContactModalController'
                });
                break;
        }
        
        modalInstance.result.then(function (e) {
            
        });
    };
}])

// Logon Modal Controller
.controller('LogonModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.voiceStream = {};
    
}])

// Contact Modal Controller
.controller('ContactModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.voiceStream = {};
    
}]);

