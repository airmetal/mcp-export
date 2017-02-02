'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('CloudServices', []);
angular.module('DC', [])
    .constant(
    'REGIONSMAP', {
        NorthAmerica: 'na',
        Europe: 'eu',
        Australia: 'au',
        Africa: 'mea',
        AsiaPacific: 'ap',
        SouthAmerica: 'latam',
        Canada: 'canada'
    }
).constant(
    'REGIONS', 'NorthAmerica,Europe,Australia,Africa,AsiaPacific,SouthAmerica,Canada'
);


angular.module('MCPExport', [
    'ngMaterial',
    'ngAnimate',
    'ngMessages',
    'ngAria',
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'Authentication',
    'DC',
    'CloudServices',
    'angular.filter'
])

    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'modules/authentication/views/login.html',
                hideMenus: true
            })

            .when('/', {
                controller: 'RegionController',
                templateUrl: 'modules/home/views/home.html'
            })

            .otherwise({redirectTo: '/login'});

        $httpProvider.useApplyAsync(true);

        //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }]);