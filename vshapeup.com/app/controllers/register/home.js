app.controller('RegisterHomeController', function ($scope, $route, $routeParams,RegisterService) {
    $scope.loading = false;
    $scope.reg = {};
    $scope.compo = {};
    $scope.editOPPNo = $routeParams.oppNo;

    $scope.register = function (reg, compo) {

        $scope.loading = true;
        RegisterService.insertChallenger(reg, compo, $scope.editOPPNo)
        .then(function (success) {
            alert("เลขประจำตัวของคุณคือ [" + success + "] ");
            $route.reload();
        }, function (error) {
            alert(error);
        })
        .finally(function () {
            $scope.loading = false;
        });

    };

    $scope.print = function () {
        $scope.loading = true;
        RegisterService.print()
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

    $scope.clear = function () {
        if (confirm('ต้องการล้างหน้าจอใช่หรือไม่?')) {
            $route.reload();
        };
    };

})