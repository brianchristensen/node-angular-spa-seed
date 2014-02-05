angular.module('app.directives', [])

// Elements having this attribute will display for users with an authorized role and hide for unauthorized users
.directive('hfAuthorized', ['AuthorizationService', function (auth) {
    return {
        restrict: 'A',
        scope: {
            hfAuthorized: "="
        },
        link: function(scope, element, attrs) {
            scope.$watch(function () { return auth.role },
                function(loggedIn) {
                    var authorized = false;
                    var authList = scope.hfAuthorized;
                    
                    angular.forEach(authList, function(role) {
                        if(role.toLowerCase().indexOf(auth.role.toLowerCase()) >= 0 ) authorized = true;;
                    });
                    
                    if (authorized) {
                        if(element.hasClass('ng-hide')) {
                            element.removeClass('ng-hide');
                        }                            
                    }
                    else {
                        element.addClass('ng-hide');
                    }
                });
        }
    }
}])
