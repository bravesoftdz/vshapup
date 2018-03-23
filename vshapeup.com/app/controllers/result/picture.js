app.controller('ResultPictureController', function ($scope, $rootScope, $route, SessionService) {
    $scope.url = 'http://www.axmag.com/download/pdfurl-guide.pdf';


    //$scope.PDF = new Uint8Array(SessionService.get("PDF"));
    //console.log($scope.PDF);
    //console.log($scope.file_pic);

    //var UTF8_STR = new Uint8Array($scope.file_pic);
    //var BINARY_ARR = UTF8_STR.buffer;
      
    //var file = new Blob([BINARY_ARR], { type: 'image/png' });
    //var fileURL = URL.createObjectURL(file);

    //console.log(fileURL);
    //$scope.url = fileURL
});