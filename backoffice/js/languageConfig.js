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

            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jsuites.js",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/index.js",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jsuites.css",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.css",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.datatables.css",
            "../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.theme.css",
            "/arms/js/common/jspreadsheet/spreadsheet.js",
            "/arms/css/jspreadsheet/custom_sheet.css"
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
function drawExcel(target) {
    var columnList = [
        { type: "text", title: "구분", wRatio: 0.16},
        { type: "text", title: "키 (ID)", wRatio: 0.21},
        { type: "text", title: "KR (한국어)", wRatio: 0.21},
        { type: "text", title: "EN (영어)", wRatio: 0.21},
        { type: "text", title: "JP (일본어)",  wRatio: 0.21}
    ];
    var customOption = {
        search: true,
        allowInsertRow: false,
        allowInsertColumn: false,
        updateTable: function(instance, cell, col, row, val, id) {
            cell.style.textAlign = "left";
            cell.style.whiteSpace = "normal";
        }
    };

    SpreadsheetFunctions.setTargetId(target);
    SpreadsheetFunctions.setDefaultTargetRect();

    SpreadsheetFunctions.setColumns(columnList);
    SpreadsheetFunctions.setColumnWidth(SpreadsheetFunctions.getTargetRect("width"));
    SpreadsheetFunctions.setOptions(customOption);
    SpreadsheetFunctions.startObserver();

    $.getJSON('./mock/language_config.json')
      .done(function(jsonData) {
          let fetchedExcelData = jsonData.map(arr => arr.slice(0, -1)); // map() 은 동기함수
          SpreadsheetFunctions.setExcelData(fetchedExcelData);
          SpreadsheetFunctions.drawExcel(SpreadsheetFunctions.getTargetId());
      })
      .fail(function(jqxhr, textStatus, error) {
          console.error("Error loading JSON file: " + textStatus + ", " + error);
      });
}

var SpreadsheetFunctions = (function () {
    let targetId = { "v" : "", "jq" : ""};
    let targetRect = {"width" : 0, "height" : 0};
    let excelData;    // 엑셀 데이터
    let excelColumns;  // 엑셀 컬럼
    let customOptions;// 엑셀 커스텀 옵션들 :: 정의 안할 경우 default


    var setDefaultTargetRect = function () {
        let defaultWidth = $(getTargetId("jq")).width();
        let defaultHeight = $(getTargetId("jq")).height();
        setTargetRect(defaultWidth, defaultHeight);
    };
    var setTargetRect = function(width, height) {
        targetRect.width = width;
        targetRect.height = height;
    };

    var getTargetRect = function (type) {
        if (type === "width") {
            return targetRect.width;
        } else if (type  === "height") {
            return targetRect.height;
        } else {
            return targetRect;
        }
    };

    var setTargetId = function (target) {
        targetId.v = target;
        targetId.jq = "#"+target;
    };

    var getTargetId = function (type) {
        if (type === "jq") {
            return targetId.jq;
        } else {
            return targetId.v;
        }
    };

    var setExcelData = function(data) {
        excelData = data;
    };
    var getExcelData = function () {
        return excelData;
    };
    var setColumns = function(columns) {
        excelColumns = columns;
    };
    var getColumns = function () {
        return excelColumns;
    };

    var setColumnWidth = function (width) {
        if (excelColumns) {
            excelColumns = excelColumns.map(column => ({
                ...column, width: (width * column.wRatio) -1
            }));
        }
    };

    function setColumnWidthAsync(width) {
        return new Promise((resolve) => {
            if (excelColumns) {
                excelColumns = excelColumns.map(column => ({
                    ...column, width: (width * column.wRatio) - 1
                }));
            }
            resolve(); // 컬럼 너비 설정이 완료된 후 resolve 호출
        });
    }

    var setOptions = function(options) {
        customOptions = options;
    };
    var getOptions = function() {
        return customOptions ? customOptions : null;
    };


    var resizeObserver = new ResizeObserver(function(entries) {
        for (let entry of entries) {
            setTargetRect(entry.contentRect.width, entry.contentRect.height);
            handleResize(entry.target.id, getTargetRect("width"), getTargetRect("height"));
        }
    });

    // 모달요소 크기 변화 관찰(Observer)
    function startObserver() {
        resizeObserver.observe($(getTargetId("jq"))[0]);
    }

    function handleResize(id, width, height) {
        if (id === getTargetId() && height !== 0) {
            if (excelData) {
                drawResizedExcel(getTargetId());
            } else {
                console.log("Spreadsheet.handleResize :: 엑셀 데이터 없음");
            }

        } else {
          console.log("Spreadsheet.handleResize :: id 불일치 또는 height 가 0 입니다.");
        }
    }

    function drawResizedExcel(target) {
        let $targetId = "#"+target;

        if($($targetId).length > 0 && $($targetId)[0].jexcel) {
            $($targetId)[0].jexcel.destroy();
        }

        setColumnWidthAsync(getTargetRect("width") - 50).then(() => {
            $($targetId).spreadsheet($.extend({}, {
                columns: getColumns(),
                data: getExcelData()
            }, getOptions()));

            let jexcel_content_height = getTargetRect("height") - 40 - 30 - 35 - 34;
            $($targetId + " .jexcel_content").css("max-height", jexcel_content_height);
            $($targetId + " .jexcel_content").css("width", "100%");
        });
    }

    function drawExcel(target) {
        let $targetId = "#"+target;

        if($($targetId).length > 0 && $($targetId)[0].jexcel) {
            $($targetId)[0].jexcel.destroy();
        }

        $($targetId).spreadsheet($.extend({}, {
            columns: getColumns(),
            data: getExcelData()
        }, getOptions()));

        let jexcel_content_height = getTargetRect("height") - 40 - 30 - 35 - 34;
        $($targetId + " .jexcel_content").css("max-height", jexcel_content_height);
        $($targetId + " .jexcel_content").css("width", "100%");

    }

    return {
        setTargetId,   getTargetId,
        setTargetRect, getTargetRect, setDefaultTargetRect,
        setExcelData,  getExcelData,
        setColumns,    getColumns,   setColumnWidth,
        setOptions,    getOptions,

        startObserver, drawExcel
    };
})();