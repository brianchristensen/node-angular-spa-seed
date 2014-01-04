angular.module('app.controllers', []);

// Join Controller
angular.module('app.controllers').controller('JoinController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.formData = {};

    // when creating a new channel, send the channel name to the node API
    $scope.createChannel = function() {
	    $http.post('/api/channels', $scope.formData)
		    .success(function(data) {
			    $scope.formData = {}; // clear the form so our user is ready to enter another
			    $scope.channels = data;
			    console.log(data);
			    $location.path("/talk");
		    })
		    .error(function(data) {
			    console.log('Error: ' + data);
		    });
    };
}]);

// Talk Controller
angular.module('app.controllers').controller('TalkController', ['$scope', '$http', function($scope, $http) {
    $scope.voiceStream = {};
    
}]);
