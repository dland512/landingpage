var app = angular.module('landingPage')

app.factory('contactService', ['$http', function ($http) {
    return {
        sendContact: function (email) {
            var data = {
                email: email
            }

            return $http.post('/contact', data)
        }
    }
}])
