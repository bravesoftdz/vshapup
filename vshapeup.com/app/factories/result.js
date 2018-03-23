app.factory('ResultService', function ($http, $location, $q, $sce, SessionService, HttpService) {
    return {
        getAllChallenger: function (oppNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetAllChallenger",
                data: JSON.stringify({
                    oppNo: oppNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length !== 0) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่พบข้อมูลที่ค้นหา");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถค้นหาได้!");
            });

            return deferred.promise;
        },
        getResultPage: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetResultPage",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length !== 0) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่พบข้อมูลที่ค้นหา");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถค้นหาได้!");
            });

            return deferred.promise;
        },
        getRegisterChallenger: function (oppNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetRegisterChallenger",
                data: JSON.stringify({
                    oppNo: oppNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length !== 0) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่พบข้อมูลที่ค้นหา");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถค้นหาได้!");
            });

            return deferred.promise;
        },
        printPDF: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/PrintResultPDF",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //responseType: 'arraybuffer'
            })
            .success(function (result) {
                fileData = result.d;
                //UTF8_STR = new Uint8Array(result.d);
                deferred.resolve(fileData);
                //BINARY_ARR = UTF8_STR.buffer;

                //var file = new Blob([BINARY_ARR], { type: 'image/png' });
                //var fileURL = URL.createObjectURL(file);
                //deferred.resolve(fileURL);
            })
            .error(function (data, status, headers, config) {
                deferred.reject("ไม่สามารถออกรายงานได้");
            });

            return deferred.promise;
        },
        print: function (userNo, page) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/PrintResult",
                data: JSON.stringify({
                    userNo: userNo,
                    page: page
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
                deferred.resolve(fileURL);
            })
            .error(function (data, status, headers, config) {
                deferred.reject("ไม่สามารถออกรายงานได้");
            });

            return deferred.promise;
        },
        printAll: function () {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/PrintAllResult",
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
        printAllChallenger: function () {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/PrintAllChallenger",
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
        setToChallenge: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/SetToChallenge",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data == 'OK') {
                    deferred.resolve('บันทึกข้อมูลเรียบร้อย');
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;
        },
        setToUnChallenge: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/SetToUnChallenge",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data == 'OK') {
                    deferred.resolve('บันทึกข้อมูลเรียบร้อย');
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;

        },
        getChallenger: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetChallenger",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data !== null) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่พบข้อมูลที่ค้นหา");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถค้นหาได้!");
            });

            return deferred.promise;
        },
        editChallenger: function (challenger) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/EditChallenger",
                data: JSON.stringify({
                    challenger: challenger

                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data != 'FAILED') {
                    deferred.resolve("บันทึกข้อมูลเรียบร้อย");
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;
        },
        addCompo: function (userNo, compo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/AddCompo",
                data: JSON.stringify({
                    userNo: userNo,
                    compo: compo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data == 'OK') {
                    deferred.resolve("บันทึกข้อมูลเรียบร้อย");
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;
        },
        deleteCompo: function (userNo, measureDate) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/DeleteCompo",
                data: JSON.stringify({
                    userNo: userNo,
                    measureDate: measureDate
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data == 'OK') {
                    deferred.resolve("ลบข้อมูลเรียบร้อย");
                } else {
                    deferred.reject("ไม่สามารถลบได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถลบได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;
        },
        setToComplete: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/SetToComplete",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data == 'OK') {
                    deferred.resolve('บันทึกข้อมูลเรียบร้อย');
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;
        },
        setToInComplete: function (userNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/SetToInComplete",
                data: JSON.stringify({
                    userNo: userNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = result.d;
                if (data == 'OK') {
                    deferred.resolve('บันทึกข้อมูลเรียบร้อย');
                } else {
                    deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถบันทึกได้ กรุณาตรวจสอบอีกครั้ง!");
            });

            return deferred.promise;

        },
        getCompleteChallenger: function (oppNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetCompleteChallenger",
                data: JSON.stringify({
                    oppNo: oppNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length !== 0) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่พบข้อมูลที่ค้นหา");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถค้นหาได้!");
            });

            return deferred.promise;
        },
        getInCompleteChallenger: function (oppNo) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                headers: HttpService.getAjaxHeader(),
                url: HttpService.getBaseUrl() + "/GetInCompleteChallenger",
                data: JSON.stringify({
                    oppNo: oppNo
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .success(function (result) {
                var data = JSON.parse(result.d);
                if (data.length !== 0) {
                    deferred.resolve(data);
                } else {
                    deferred.reject("ไม่พบข้อมูลที่ค้นหา");
                }
            })
            .error(function (data) {
                deferred.reject("ไม่สามารถค้นหาได้!");
            });

            return deferred.promise;
        },
    };
});