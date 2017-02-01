'use strict';

angular.module('Authentication')

    .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'REGIONSMAP', 'REGIONS', '$timeout',
        function ($scope, $rootScope, $location, AuthenticationService, REGIONSMAP, REGIONS, $timeout) {

            $scope.loginform = {};
            $scope.loginform.region = 'NorthAmerica';

            $scope.regions = REGIONS
                .split(',').map(function (region) {
                    return {name: region};
                });

            // reset login status
            AuthenticationService.ClearCredentials();
            $scope.vm = {
                formData: {
                    username: 'user',
                    password: 'pass'
                }
            };

            $scope.login = function () {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.vm.formData.username, $scope.vm.formData.password, REGIONSMAP[$scope.loginform.region], function (response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials($scope.vm.formData.username, $scope.vm.formData.password, $scope.loginform.region, response.orgId);
                        $location.path('/');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]);