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
            "../reference/light-blue/lib/jquery.fileupload-ui.js"
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
            "../reference/lightblue4/docs/lib/jquery.sparkline/index.js",
            "../reference/lightblue4/docs/js/charts.js",
            "./js/common/jspreadsheet/spreadsheet.js"
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
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/jszip.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/pdfmake.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/vfs_fonts.js",
            // timezone-picker
            "../reference/jquery-plugins/kevalbhatt-timezone-picker-2.0.0/dist/timezone-picker.min.js",
            "../reference/jquery-plugins/kevalbhatt-timezone-picker-2.0.0/dist/styles/timezone-picker.css"
        ]
        // 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
    ];

    loadPluginGroupsParallelAndSequential(pluginGroups)
        .then(function () {
            console.log("모든 플러그인 로드 완료");

            // 사이드 메뉴 색상 설정
            $(".widget").widgster();
            setSideMenu("sidebar_menu_config", "sidebar_menu_config_language");

            drawExcel("modal_excel");
        })
        .catch(function (error) {
            console.error("플러그인 로드 중 오류 발생");
            console.log(error);
        });
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
        { type: "text", title: "설명", wRatio: 0.16},
        { type: "text", title: "리눅스", wRatio: 0.21},
        { type: "text", title: "윈도우", wRatio: 0.21},
        { type: "text", title: "윈도우 2008 R2 & SP2", wRatio: 0.21},
        { type: "text", title: "유닉스",  wRatio: 0.20},
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
    $.getJSON('./mock/engine_command.json', function(jsonData) {
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
    /*
        var resizeObserver = new ResizeObserver(function(entries) {
            for (let entry of entries) {
                var width = entry.contentRect.width;
                var height = entry.contentRect.height;
                handleResize(entry.target.id, width, height);
            }
        });

        // 모달요소 크기 변화 관찰
        resizeObserver.observe(document.getElementById('modal_excel'));*/

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
