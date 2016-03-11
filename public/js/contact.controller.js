var app = angular.module('landingPage')

app.controller('contactCtrl', ['$scope', 'landingPageService', function ($scope, service) {

    $scope.sendContact = function() {
        if(!$scope.names) {
            $scope.contactResult = 'r'
        }
        else {
            $scope.contactResult = 'p'
            
            service.sendContact($scope.email)
            .success(function(data) {
                $scope.contactResult = 's'
            })
            .error(function(data) {
                $scope.contactResult = 'f'
            })
        }
    }
}])
