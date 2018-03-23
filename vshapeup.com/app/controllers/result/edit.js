app.controller('ResultEditController', function ($scope, $rootScope, $route, $routeParams, ResultService) {

    $scope.loading = false;
    $scope.editUserNo = $routeParams.userNo;
    $scope.showPic = false;
    $scope.url = "";
    $scope.data = {};
    $scope.reg = {};
    $scope.compo = {};

    $scope.getChallenger = function (userNo) {
        $scope.loading = true;
        ResultService.getChallenger(userNo)
        .then(function (success) {
            $scope.reg = success;
            //$scope.compo = success.BodyCompositions[0];
            //console.log($scope.reg);
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.clear = function () {
        if (confirm('ต้องการล้างหน้าจอใช่หรือไม่?')) {
            $route.reload();
        };
    };

    $scope.addCompo = function (compo) {
        $scope.loading = true;
        ResultService.addCompo($scope.editUserNo, compo)
        .then(function (success) {
            alert(success);
            $route.reload();
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.deleteCompo = function (userNo, measureDate) {
        $scope.loading = true;
        ResultService.deleteCompo(userNo, measureDate)
        .then(function (success) {
            alert(success);
            $route.reload();
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.goback = function () {
        $route.reload();
    };

    $scope.print = function (userNo, page) {
        $scope.loading = true;
        ResultService.print(userNo, page)
        .then(function (ret) {
            $scope.url = ret;
            $scope.showPic = true;
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });

    };

    $scope.edit = function (reg) {

        $scope.loading = true;
        ResultService.editChallenger(reg)
        .then(function (success) {
            alert(success);
            $route.reload();
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });

    };

    $scope.getChallenger($scope.editUserNo);

});