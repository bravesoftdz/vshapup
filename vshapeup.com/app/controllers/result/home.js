app.controller('ResultHomeController', function ($scope, $rootScope, $window, $route, $q, $routeParams, $location, ResultService, BrowserService, SessionService) {
    $scope.loading = false;
    $scope.showPic = false;
    $scope.url = "";
    $scope.data = [];
    $scope.editOPPNo = $routeParams.oppNo;

    $scope.dtColumnDefs = [];
    $scope.dtOptions = $rootScope.createDataTableOptionsWithoutSort();

    console.log($scope.showPic);

    $scope.refresh = function () {
        $scope.loading = true;
        ResultService.getAllChallenger($scope.editOPPNo)
        .then(function (data) {
            $scope.data = data;
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.getRegisterChallenger = function () {
        $scope.loading = true;
        ResultService.getRegisterChallenger($scope.editOPPNo)
        .then(function (data) {
            console.log(data);
            $scope.data = data;
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.getCompleteChallenger = function () {
        $scope.loading = true;
        ResultService.getCompleteChallenger($scope.editOPPNo)
        .then(function (data) {
            console.log(data);
            $scope.data = data;
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.getInCompleteChallenger = function () {
        $scope.loading = true;
        ResultService.getInCompleteChallenger($scope.editOPPNo)
        .then(function (data) {
            console.log(data);
            $scope.data = data;
        }, function (err) {
            alert(err);
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

    $scope.printPDF = function (userNo) {
        $scope.loading = true;
        ResultService.printPDF(userNo)
        .then(function (ret) {
            SessionService.set("PDF", ret);
            console.log(ret);
            $location.path('#!/picture');
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });

    };

    $scope.printAll = function () {
        $scope.loading = true;
        ResultService.printAll()
        .then(function (ret) {
            console.log(ret);
            window.open(ret);
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });

    };

    $scope.printAllChallenger = function () {
        $scope.loading = true;
        ResultService.printAllChallenger()
        .then(function (ret) {
            console.log(ret);
            window.open(ret);
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });

    };

    $scope.refresh();

    $scope.setToChallenge = function (userNo) {
        $scope.loading = true;
        ResultService.setToChallenge(userNo)
        .then(function (data) {
            alert(data);
            $route.reload();
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.setToUnChallenge = function (userNo) {
        $scope.loading = true;
        ResultService.setToUnChallenge(userNo)
        .then(function (data) {
            alert(data);
            $route.reload();
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.setToComplete = function (userNo) {
        $scope.loading = true;
        ResultService.setToComplete(userNo)
        .then(function (data) {
            alert(data);
            $route.reload();
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };

    $scope.setToInComplete = function (userNo) {
        $scope.loading = true;
        ResultService.setToInComplete(userNo)
        .then(function (data) {
            alert(data);
            $route.reload();
        }, function (err) {
            alert(err);
        })
        .finally(function () {
            $scope.loading = false;
        });
    };
})