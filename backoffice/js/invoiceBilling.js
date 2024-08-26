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
            "../reference/lightblue4/docs/js/charts.js"
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
            // timezone-picker
            "../reference/jquery-plugins/kevalbhatt-timezone-picker-2.0.0/dist/timezone-picker.min.js",
            "../reference/jquery-plugins/kevalbhatt-timezone-picker-2.0.0/dist/styles/timezone-picker.css"
        ]
        // 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
    ];

    loadPluginGroupsParallelAndSequential(pluginGroups)
        .then(function () {
            console.log("모든 플러그인 로드 완료");

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
            setSideMenu("sidebar_menu_system", "sidebar_menu_system_billing");

            BillingPlanObserver.setTarget("billing-plan-div","class");
            // BillingPlanObserver.startObserver();

            // 모달이 열릴 때 body 스크롤 허용
            $(document).on('shown.bs.modal', function () {
                $('body').removeClass('modal-open'); // 기본적으로 추가되는 클래스 제거
                $('body').css('overflow', 'auto');   // 스크롤 허용
            });
        })
        .catch(function (error) {
            console.error("플러그인 로드 중 오류 발생");
            console.log(error);
        });
}

var BillingPlanObserver = (function () {
    let targetElement;

    var setTarget = function (target, type) {
        if (type === "class") {
            targetElement = $(`.${target}`)[0];
        } else if (type === "id" ) {
            targetElement = $(`#${target}`)[0];
        } else {
            targetElement = $(`${target}`)[0];
        }
    };

    var getTarget = function () {
        return targetElement;
    }

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                console.log("화면에서 가려졌습니다.");
                $("#stickyBilling").addClass("in");
                $("#stickyBilling").css("display","block");
                $("#stickyBilling").css("margin-right","2.5641%");
            } else {
                console.log("화면에서 보입니다.");
                $("#stickyBilling").removeClass("in");
                $("#stickyBilling").css("display","none");
            }
        });
    },{ threshold: 0});

    function startObserver() {
        observer.observe(getTarget());

        $('#stickyBilling').modal({
            backdrop: false, // 백드롭 비활성화
            keyboard: true   // 키보드로 모달 닫기 가능
        });
    }
    return { setTarget , startObserver };
})();