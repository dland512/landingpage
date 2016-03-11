var app = angular.module('landingPage')

app.factory('contactService', ['$http', function ($http) {
    return {
        sendContact: function (email) {
            return $http.post('/contact', { email: email })
        }
    }
}])
