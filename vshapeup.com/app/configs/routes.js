app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home/home.html',
            controller: 'HomeController'
        })
        .when('/register/:oppNo', {
            templateUrl: 'app/views/register/home.html',
            controller: 'RegisterHomeController'
        })           
        .when('/result/:oppNo', {
            templateUrl: 'app/views/result/home.html',
            controller: 'ResultHomeController'
        })
        .when('/result/edit/:userNo', {
            templateUrl: 'app/views/result/edit.html',
            controller: 'ResultEditController'
        })
        .when('/picture', {
            templateUrl: 'app/views/result/result.html',
            controller: 'ResultPictureController'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(false).hashPrefix('!');
});