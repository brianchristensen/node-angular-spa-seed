angular.module('app.services', [])
    
// authentication http interceptor service
.factory('AuthenticationInterceptor', ['$q', '$window', '$location', 'ErrorService',
    function($q, $window, $location, err) {
        return {
            'request': function (config) { // attach token to every request
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            'response': function (response) { 
                // handle good responses
                
                return response || $q.when(response);
            },
            'responseError': function (response) { 
                if (response.status === 401) {   // handle unauthorized   
                    if (response.data[0].msg) err.msg = response.data[0].msg;
                    else err.msg = response.data;       
                    
                    $location.path("/error");
                }
                else if (response.status === 500) { // generic server errors and token/login errors
                    if (response.data === "Error: jwt expired") {
                        err.msg = "Your session has expired.  Please login again.";
                    }
                    else if (response.data === "Error: No Authorization header was found") {
                        err.msg = "Please login to the application.";
                    }
                    else {
                        err.msg = "Oops, our servers have encountered an issue!  Please try again later.";
                    }                
                    
                    $location.path("/error");  // change above error to response.data to see technical error details
                }
                
                return $q.reject(response); // necessary or else error promises will not be hit
            }
        };
    }
])

// authorization service used to inject contextual session info into controllers
.factory('AuthorizationService', [function () {
    return {
        isLoggedIn: null,
        role: 'unauthenticated'
    }
}])

// error service used to store the most recent error(s)
.factory('ErrorService', [function () {
    return {
        msg: null
    }
}])


