app.factory('HttpService', function () {
    return {
        getBaseUrl: function () {
            return "VShapeUpService.asmx";
        },
        getAjaxHeader: function () {
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            return headers;
        }
    };
});