app.factory('BrowserService', function ($window) {
    return {
        openNewTab: function () {
            var newTabWindow = $window.open();
            return newTabWindow;
        },
        updateTabLocation: function (tabLocation, tab) {
            if (!tabLocation) {
                tab.close();
            }
            tab.location.href = tabLocation;
        }
    };
});