angular.module('app.modals', [])

// Modal router
.controller('ModalController', ['$scope', '$modal', function($scope, $modal) {

    $scope.openModal = function (modal) {
        
        switch(modal) {
            case 'login':
                var modalInstance = $modal.open({
                  templateUrl: 'app/views/modal/loginModal.html',
                  controller: 'LoginModalController'
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

// Login Modal Controller
.controller('LoginModalController', ['$scope', '$http', '$window', '$modalInstance', 'AuthorizationService',
    function($scope, $http, $window, $modalInstance, auth) {

        $scope.credentials = { username: null, password: null };
        
        $scope.alerts = [];
        
        // submit login credentials and handle success/failure
        $scope.submit = function () {
            if ($scope.credentials.username != null && $scope.credentials.password != null) {
                $http.post('/authenticate', $scope.credentials)
                  .success(function (data, status, headers, config) {
                    // Add token and role to session
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.role = auth.role = data.role;
                    auth.isLoggedIn = true;

                    // Show success message
                    $scope.alerts = [];
                    $scope.alerts.push({type: 'success', msg:'Welcome!'});
                    $modalInstance.close();
                  })
                  .error(function (data, status, headers, config) {
                    // Erase the token and role if the user fails to log in
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.role;
                    auth.role = 'unauthenticated';
                    auth.isLoggedIn = false;
                    
                    // Clear username and password
                    $scope.credentials.username = null;
                    $scope.credentials.password = null;
                    
                    // Show error message
                    $scope.alerts = [];
                    $scope.alerts.push({type: 'danger', msg: 'Error: Invalid username or password.'});
                  });
            } else {
                // Show error message
                $scope.alerts = [];
                $scope.alerts.push({type: 'danger', msg: 'Error: Please enter both username and password.'});
            }
        };
        
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }
])

// Contact Modal Controller
.controller('ContactModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.voiceStream = {};
    
}]);

