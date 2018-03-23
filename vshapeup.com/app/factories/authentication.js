app.factory('AuthenticationService', function ($http, $location, $q, SessionService, HttpService) {
    return {
        login: function (user) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/Login",
                data: JSON.stringify(user),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length != 0) {

                    var user = data[0];
                    SessionService.set('authenticated', true);
                    SessionService.set('username', user.UserNo);
                    SessionService.set('fullname', user.FullName);

                    deferred.resolve(data);
                } else {
                    deferred.reject("คุณกรอก Username หรือ Password ไม่ถูกต้อง!!");
                }
            })
            .error(function (data, status, headers, config) {
                deferred.reject("ไม่สามารถเข้าระบบได้ เนื่องจาก\n" + data.ExceptionMessage);
            });

            return deferred.promise;

        },
        logout: function () {
            SessionService.unset('authenticated');
            SessionService.unset('username');
            SessionService.unset('fullname');
        }
    };
});
