define(['app'], function(app)
{
    console.log(app.name);


    app.service('appService', function($http) {
        function getDate(id){
            console.log('get');
            $http.get('/auth.py').then(function(data, status, headers) {
                console.log('get success');
                console.log(data);
            }, function(error){
                console.log('get fail');
                console.log(error);
            });
        }

        function saveMessage(message) {
            console.log('put');
            var headers = { 'Authorization': authToken };

            $http.post('/add-msg.py', message, { headers: headers } ).success(function(response) {
                console.log('put success');
            }).error(function() {
                console.log('put fail');
            });
        };

        return{
            getDate: getDate,
            saveMessage: saveMessage
        }
    });

    app.controller('HomeViewController',
        [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                heading: 'Welcome'
            };
        }
        ]);
});