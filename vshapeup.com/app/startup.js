app.run(function ($rootScope, $location, DTOptionsBuilder, SessionService) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!SessionService.get('authenticated')) {
            $location.path("/");
        }
    });


    $rootScope.createDataTableOptionsWithoutSort = function () {
        var dtOptions = DTOptionsBuilder.newOptions()
            //.withOption('aaSorting', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withBootstrap()
            .withBootstrapOptions({
                TableTools: {
                    classes: {
                        container: 'btn-group',
                        buttons: {
                            normal: 'btn btn-primary'
                        }
                    }
                },
                ColVis: {
                    classes: {
                        masterButton: 'btn btn-primary'
                    }
                }
            })
            //.withTableTools('lib/datatables/swf/copy_csv_xls_pdf.swf')
            //.withTableToolsButtons([
            //        'copy',
            //        'print', {
            //            'sExtends': 'collection',
            //            'sButtonText': 'Save',
            //            'aButtons': ['csv', 'xls', 'pdf']
            //        }
            //])
            .withDisplayLength(10)
            .withLanguage({
                "sEmptyTable": "ไม่พบข้อมูล",
                "sInfo": "แสดงข้อมูล _START_ ถึง _END_ จาก _TOTAL_ รายการ",
                "sInfoEmpty": "แสดงข้อมูล 0 ถึง 0 จาก 0 รายการ",
                "sInfoFiltered": "(ค้นหาจาก _MAX_ รายการ)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "แสดงหน้าละ _MENU_ รายการ",
                "sLoadingRecords": "กำลังโหลด...",
                "sProcessing": "กำลังประมวลผล...",
                "sSearch": "ค้นหา: ",
                "sZeroRecords": "ไม่พบข้อมูลที่ทำการค้นหา",
                "oPaginate": {
                    "sFirst": "<<",
                    "sLast": ">>",
                    "sNext": ">",
                    "sPrevious": "<"
                }
            });
        return dtOptions;
    };

    $rootScope.createDataTableOptions = function () {
        var dtOptions = DTOptionsBuilder.newOptions()
            .withOption('aaSorting', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withBootstrap()
            //.withBootstrapOptions({
            //    TableTools: {
            //        classes: {
            //            container: 'btn-group',
            //            buttons: {
            //                normal: 'btn btn-primary btn-sm'
            //            }
            //        }
            //    },
            //    ColVis: {
            //        classes: {
            //            masterButton: 'btn btn-primary btn-sm'
            //        }
            //    }
            //})
            //.withTableTools('lib/datatables/swf/copy_csv_xls_pdf.swf')
            //.withTableToolsButtons([
            //        'copy',
            //        'print', {
            //            'sExtends': 'collection',
            //            'sButtonText': 'Save',
            //            'aButtons': ['csv', 'xls', 'pdf']
            //        }
            //])
            .withDisplayLength(10)
            .withLanguage({
                "sEmptyTable": "ไม่พบข้อมูล",
                "sInfo": "แสดงข้อมูล _START_ ถึง _END_ จาก _TOTAL_ รายการ",
                "sInfoEmpty": "แสดงข้อมูล 0 ถึง 0 จาก 0 รายการ",
                "sInfoFiltered": "(ค้นหาจาก _MAX_ รายการ)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "แสดงหน้าละ _MENU_ รายการ",
                "sLoadingRecords": "กำลังโหลด...",
                "sProcessing": "กำลังประมวลผล...",
                "sSearch": "ค้นหา: ",
                "sZeroRecords": "ไม่พบข้อมูลที่ทำการค้นหา",
                "oPaginate": {
                    "sFirst": "<<",
                    "sLast": ">>",
                    "sNext": ">",
                    "sPrevious": "<"
                }
            });
        return dtOptions;
    };

    $rootScope.createDataTableOptions2 = function () {
        var dtOptions = DTOptionsBuilder.newOptions()
            .withOption('aaSorting', [0, 'desc'])
            .withPaginationType('full_numbers')
            .withBootstrap()
            //.withBootstrapOptions({
            //    TableTools: {
            //        classes: {
            //            container: 'btn-group',
            //            buttons: {
            //                normal: 'btn btn-primary btn-sm'
            //            }
            //        }
            //    },
            //    ColVis: {
            //        classes: {
            //            masterButton: 'btn btn-primary btn-sm'
            //        }
            //    }
            //})
            //.withTableTools('lib/datatables/swf/copy_csv_xls_pdf.swf')
            //.withTableToolsButtons([
            //        'copy',
            //        'print', {
            //            'sExtends': 'collection',
            //            'sButtonText': 'Save',
            //            'aButtons': ['csv', 'xls', 'pdf']
            //        }
            //])
            .withDisplayLength(10)
            .withLanguage({
                "sEmptyTable": "ไม่พบข้อมูล",
                "sInfo": "แสดงข้อมูล _START_ ถึง _END_ จาก _TOTAL_ รายการ",
                "sInfoEmpty": "แสดงข้อมูล 0 ถึง 0 จาก 0 รายการ",
                "sInfoFiltered": "(ค้นหาจาก _MAX_ รายการ)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "แสดงหน้าละ _MENU_ รายการ",
                "sLoadingRecords": "กำลังโหลด...",
                "sProcessing": "กำลังประมวลผล...",
                "sSearch": "ค้นหา: ",
                "sZeroRecords": "ไม่พบข้อมูลที่ทำการค้นหา",
                "oPaginate": {
                    "sFirst": "<<",
                    "sLast": ">>",
                    "sNext": ">",
                    "sPrevious": "<"
                }
            });
        return dtOptions;
    };
});