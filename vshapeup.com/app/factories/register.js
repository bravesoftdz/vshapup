app.factory('RegisterService', function ($http, $location, $q, SessionService, HttpService) {
    return {
        getActiveOPPData: function () {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetActiveOPPData",
                data: JSON.stringify({}),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data != null) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่สามารถอ่านค่าจากตาราง OPPData!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถอ่านค่าจากตาราง OPPData!");
            });

            return deferred.promise;
        },
        getOPPData: function () {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetOPP",
                data: JSON.stringify({}),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length !== 0) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่สามารถอ่านค่าจากตาราง OPPData!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถอ่านค่าจากตาราง OPPData!");
            });

            return deferred.promise;
        },
        insertChallenger: function (challenger, compo, oppNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/InsertChallenger",
                data: JSON.stringify({
                    challenger: challenger,
                    compo: compo,
                    oppNo: oppNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data != 'FAILED') {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;
        },
        print: function () {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/PrintResult",
                data: JSON.stringify({

                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //responseType: 'arraybuffer'
            })
            .success(function (result) {
                fileData = result.d;
                UTF8_STR = new Uint8Array(result.d);
                BINARY_ARR = UTF8_STR.buffer;

                var file = new Blob([BINARY_ARR], { type: 'image/png' });
                var fileURL = URL.createObjectURL(file);
                ////window.open(fileURL);
                deferred.resolve(fileURL);
            })
            .error(function (data, status, headers, config) {
                deferred.reject("ไม่สามารถออกรายงานได้");
            });

            return deferred.promise;
        },
    };
});