app.controller('MainController', function ($scope, $location, RegisterService, AuthenticationService, SessionService) {
    $scope.loading = false;
    $scope.oppData = [];

    $scope.title = 'VShapeUp Application 2.0'

    $scope.loading = false;

    $scope.login = function (user) {
        $scope.loading = true;
        AuthenticationService.login(user)
            .then(function (ret) {
                user.username = '';
                user.password = '';
                $location.path("/");
            }, function (ret) {
                alert(ret);
            })
            .finally(function () {
                $scope.loading = false;
            });
    };

    $scope.logout = function () {
        if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            SessionService.unset('authenticated');
            SessionService.unset('username');
            SessionService.unset('fullname');
            $location.path('/');
        }
    };

    $scope.isAuthenticate = function () {
        return SessionService.get('authenticated');
    };

    $scope.getUsername = function () {
        return SessionService.get('username');
    };

    $scope.getFullname = function () {
        return SessionService.get('fullname');
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    RegisterService.getOPPData()
        .then(function (ret) {
            //console.log(ret);
            $scope.oppData = ret;
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            //$scope.loading = false;
        });

})