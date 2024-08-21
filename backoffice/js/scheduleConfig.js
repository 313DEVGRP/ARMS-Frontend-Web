////////////////////////////////////////////////////////////////////////////////////////
//Page 전역 변수
////////////////////////////////////////////////////////////////////////////////////////
var selectId; // 제품 아이디
var selectName; // 제품 이름
var selectedIndex; // 데이터테이블 선택한 인덱스
var selectedPage; // 데이터테이블 선택한 인덱스
var selectVersion; // 선택한 버전 아이디
var dataTableRef; // 데이터테이블 참조 변수

////////////////////////////////////////////////////////////////////////////////////////
//Document Ready
////////////////////////////////////////////////////////////////////////////////////////
function execDocReady() {
    var pluginGroups = [
        [
            "../reference/light-blue/lib/vendor/jquery.ui.widget.js",
            "../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Templates_js_tmpl.js",
            "../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Load-Image_js_load-image.js",
            "../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Canvas-to-Blob_js_canvas-to-blob.js",
            "../reference/light-blue/lib/jquery.iframe-transport.js",
            "../reference/light-blue/lib/jquery.fileupload.js",
            "../reference/light-blue/lib/jquery.fileupload-fp.js",
            "../reference/light-blue/lib/jquery.fileupload-ui.js",
            "../reference/jquery-plugins/unityping-0.1.0/dist/jquery.unityping.min.js",
            "../reference/jquery-plugins/cron-editor-master/css/jquery-ui_arms.css",
            "../reference/jquery-plugins/cron-editor-master/js/jquery-ui.js",
            "../reference/jquery-plugins/cron-editor-master/js/jquery.croneditor_arms.js"
        ],

        [
            "../reference/jquery-plugins/select2-4.0.2/dist/css/select2_lightblue4.css",
            "../reference/jquery-plugins/lou-multi-select-0.9.12/css/multiselect-lightblue4.css",
            "../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select-bluelight.css",
            "../reference/jquery-plugins/select2-4.0.2/dist/js/select2.min.js",
            "../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.quicksearch.js",
            "../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.multi-select.js",
            "../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select.min.js"
        ],

        [
            "../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
            "../reference/light-blue/lib/bootstrap-datepicker.js",
            "../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js",
            "../reference/lightblue4/docs/lib/widgster/widgster.js",
            "../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jsuites.js",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/index.js",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jsuites.css",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.css",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.datatables.css",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.theme.css",
            "/arms/js/common/jspreadsheet/spreadsheet.js"
        ],

        [
            "../reference/jquery-plugins/dataTables-1.10.16/media/css/jquery.dataTables_lightblue4.css",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Responsive/css/responsive.dataTables_lightblue4.css",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Select/css/select.dataTables_lightblue4.css",
            "../reference/jquery-plugins/dataTables-1.10.16/media/js/jquery.dataTables.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Responsive/js/dataTables.responsive.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Select/js/dataTables.select.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/RowGroup/js/dataTables.rowsGroup.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/dataTables.buttons.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/buttons.html5.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/buttons.print.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/jszip.min.js"
        ]
        // 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
    ];

    loadPluginGroupsParallelAndSequential(pluginGroups)
        .then(function () {
            console.log('모든 플러그인 로드 완료');

            //vfs_fonts 파일이 커서 defer 처리 함.
            setTimeout(function () {
                var script = document.createElement("script");
                script.src = "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/vfs_fonts.js";
                script.defer = true; // defer 속성 설정
                document.head.appendChild(script);
            }, 5000); // 5초 후에 실행됩니다.

            //pdfmake 파일이 커서 defer 처리 함.
            setTimeout(function () {
                var script = document.createElement("script");
                script.src = "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/pdfmake.min.js";
                script.defer = true; // defer 속성 설정
                document.head.appendChild(script);
            }, 5000); // 5초 후에 실행됩니다.

            // 사이드 메뉴 색상 설정
            $(".widget").widgster();
            setSideMenu("sidebar_menu_config", "sidebar_menu_config_schedule");

            // 데이터 테이블 로드 함수
            var waitDataTable = setInterval(function () {
                try {
                    if (!$.fn.DataTable.isDataTable("#schedule_list_table")) {
                        dataTableLoad();
                        clearInterval(waitDataTable);
                    }
                } catch (err) {
                    console.log("서비스 데이터 테이블 로드가 완료되지 않아서 초기화 재시도 중...");
                }
            }, 313 /*milli*/);

            drawExcel("schedule_history_excel");
            // turn the div into a cron editor
            cronInit();

        })
        .catch(function (error) {
            console.error("플러그인 로드 중 오류 발생");
            console.log(error);
        });
}


////////////////////////////////////////////////////////////////////////////////////////
// --- 크론 컨트롤 --- //
////////////////////////////////////////////////////////////////////////////////////////
function cronInit() {
    var croneditor = cronCreator("0 * * * * *");
    croneditor.initByCronArr();
    croneditor.drawCronByCronArr();
    croneditor.drawEachMinutes();
    croneditor.drawEachHours();
    croneditor.drawEachDays();
    croneditor.drawEachMonths();
    croneditor.drawEachWeek();
    croneditor.drawCronByCronArr();
}

function cronCreator(value) {
    // 페이지 에러로 인한 주석 처리 : to.민규님
    let cronValue = value;
    $("#popup_cron_expression").val(value);

    let cronArr = value.split(" ");

    let croneditor = $(".cronDiv").croneditor({
        cronArr: cronArr,
        drawCron: function () {
            let newCron = cronArr.join(" ");
            $("#popup_cron_expression").val(newCron);
        }
    });
    return croneditor;
}



////////////////////////////////////////////////////////////////////////////////////////
// --- 데이터 테이블 설정 --- //
////////////////////////////////////////////////////////////////////////////////////////
function dataTableLoad() {
    // 데이터 테이블 컬럼 및 열그룹 구성
    var columnList = [
        { name: "c_id", title: "제품(서비스) 아이디", data: "c_id", visible: false },
        {
            name: "c_title",
            title: "JOB 이름",
            data: "c_title",
            render: function (data, type, row, meta) {
                if (type === "display") {
                    return '<label style="color: #a4c6ff">' + data + "</label>";
                }
                return data;
            },
            className: "dt-body-left",
            visible: true
        },
        {
            name: "c_job_status",
            title: "JOB 상태",
            data: "c_job_status",
            render: function (data, type, row, meta) {
                if (type === "display") {
                    return '<label style="color: #a4c6ff">' + data + "</label>";
                }
                return data;
            },
            className: "dt-body-left",
            visible: true
        },
        {
            name: "c_job_last_time",
            title: "JOB 마지막 실행 시간",
            data: "c_job_last_time",
            render: function (data, type, row, meta) {
                if (type === "display") {
                    return '<label style="color: #a4c6ff">' + data + "</label>";
                }
                return data;
            },
            className: "dt-body-left",
            visible: true
        },
        {
            name: "c_job_next_time",
            title: "JOB 다음 실행 시간",
            data: "c_job_next_time",
            render: function (data, type, row, meta) {
                if (type === "display") {
                    return '<label style="color: #a4c6ff">' + data + "</label>";
                }
                return data;
            },
            className: "dt-body-left",
            visible: true
        },
        {
            name: "c_job_duration",
            title: "JOB 평균 실행 시간",
            data: "c_job_duration",
            render: function (data, type, row, meta) {
                if (type === "display") {
                    return '<label style="color: #a4c6ff">' + data + "</label>";
                }
                return data;
            },
            className: "dt-body-left",
            visible: true
        }
    ];
    var rowsGroupList = [];
    var columnDefList = [];
    var selectList = {};
    var orderList = [[0, "asc"]];
    var buttonList = [
        "copy",
        "excel",
        "print",
        {
            extend: "csv",
            text: "Export csv",
            charset: "utf-8",
            extension: ".csv",
            fieldSeparator: ",",
            fieldBoundary: "",
            bom: true
        },
        {
            extend: "pdfHtml5",
            orientation: "landscape",
            pageSize: "LEGAL"
        }
    ];

    var jquerySelector = "#schedule_list_table";
    var ajaxUrl = "./mock/scheduleConfig_datatable.json";
    var jsonRoot = "response";
    var isServerSide = false;

    dataTableRef = dataTable_build(
        jquerySelector,
        ajaxUrl,
        jsonRoot,
        columnList,
        rowsGroupList,
        columnDefList,
        selectList,
        orderList,
        buttonList,
        isServerSide
    );

    $("#copychecker").on("click", function () {
        dataTableRef.button(".buttons-copy").trigger();
    });
    $("#printchecker").on("click", function () {
        dataTableRef.button(".buttons-print").trigger();
    });
    $("#csvchecker").on("click", function () {
        dataTableRef.button(".buttons-csv").trigger();
    });
    $("#excelchecker").on("click", function () {
        dataTableRef.button(".buttons-excel").trigger();
    });
    $("#pdfchecker").on("click", function () {
        dataTableRef.button(".buttons-pdf").trigger();
    });
}

// 데이터 테이블 구성 이후 꼭 구현해야 할 메소드 : 열 클릭시 이벤트
function dataTableClick(tempDataTable, selectedData) {
    console.log(selectedData);
}

// 데이터 테이블 데이터 렌더링 이후 콜백 함수.
function dataTableCallBack(settings, json) {
    console.log("check");
}

function dataTableDrawCallback(tableInfo) {
//	resourceDataTable.columns.adjust();
    console.log(tableInfo);
}


/////////////////////////////////////////////////
// 엑셀 그리기
/////////////////////////////////////////////////
function drawExcel(targetId) {
    console.log("generalConfig :: drawExcel");
    let $targetId = "#"+targetId;

    if($($targetId)[0].jexcel) {
        $($targetId)[0].jexcel.destroy();
    }

    var excel_width = $($targetId).width() - 50;

    // 컬럼 설정
    var columnList = [
        { type: "text", title: "Start Time", wRatio: 0.3},
        { type: "text", title: "End Time", wRatio: 0.3},
        { type: "text", title: "Duration", wRatio: 0.2},
        { type: "text", title: "Status", wRatio: 0.2}
    ];

    SpreadSheetFunctions.setColumns(columnList);
    SpreadSheetFunctions.setColumnWidth(excel_width);

    var customOption = {
        search: true,
        updateTable: function(instance, cell, col, row, val, id) {
            cell.style.textAlign = "left";
            cell.style.whiteSpace = "normal";
        }
    };

    SpreadSheetFunctions.setOptions(customOption);
    let data;
    $.getJSON('./mock/scheduleConfig_excel.json', function(jsonData) {
        data = jsonData.map(arr => arr.slice(0,-1));

        $($targetId).spreadsheet($.extend({}, {
            columns: SpreadSheetFunctions.getColumns(),
            data: data
        }, SpreadSheetFunctions.getOptions()));
        SpreadSheetFunctions.setExcelData(data);
        $("#modal_excel .jexcel_content").css("width","100%");
        $("#modal_excel .jexcel_content").css("max-height","420px");
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Error loading JSON file: " + textStatus + ", " + error);
    });

}

var SpreadSheetFunctions = (function () {

    let $tabFunction_data;   // 엑셀 데이터
    let $tabFunction_columns;// 엑셀 컬럼
    let $tabFunction_options;// 엑셀 (커스텀)옵션 :: 정의 안할 경우 default

    var setExcelData = function(data) {
        $tabFunction_data = data;
    };
    var getExcelData = function () {
        return $tabFunction_data;
    };
    var setColumns = function(columns) {
        console.log("setColumns start");
        $tabFunction_columns = columns;
        console.log("setColumns fin");
    };
    var getColumns = function () {
        return $tabFunction_columns;
    };
    var setOptions = function(options) {
        $tabFunction_options = options;
    };
    var getOptions = function() {
        return $tabFunction_options ? $tabFunction_options : null;
    };
    var setColumnWidth = function (width) {
        console.log("setColumnWidth start");
        if ($tabFunction_columns) {
            $tabFunction_columns = $tabFunction_columns.map(column => ({
                ...column, width: width * column.wRatio
            }));
        }
        console.log("setColumnWidth end");
    };

    function handleResize(id,width, height) {
        if (id ==="modal_excel" && height !== 0) {
            if ($tabFunction_data) {
                drawExcel("modal_excel");
            } else {
                console.log("엑셀 데이터 없음");
            }
        }
    }

    return {
        setExcelData, getExcelData,
        setColumns, getColumns,
        setOptions, getOptions,
        setColumnWidth,
    };
})();