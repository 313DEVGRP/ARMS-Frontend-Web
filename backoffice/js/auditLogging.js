////////////////////////////////////////////////////////////////////////////////////////
//Page 전역 변수
////////////////////////////////////////////////////////////////////////////////////////
var dataTableRef;
var windowCount = 0;
var linuxCount = 0;
var unixCount = 0;
var etcCount = 0;
var footerCheck = 0;
var selectedStorData;
var datatableCallback_DuplicateDefence = 0;
var searchString; // 검색어
var searchRangeType; //날짜 검색 기준. 모든날짜 / 1일 / 7일 / 1달 / 1년 등...
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
            "../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js",
            "../reference/jquery-plugins/unityping-0.1.0/dist/jquery.unityping.min.js",
            "../reference/lightblue4/docs/lib/widgster/widgster.js"
        ],
        [
            // 하이라이트
            "../reference/jquery-plugins/highlight.js-11.10.0/highlight.js.lib/highlight.min.js",
            "../reference/jquery-plugins/highlight.js-11.10.0/highlight.js.lib/src/styles/arta.css",
            // 검색엔진
            "../arms/css/searchEngine.css",
            "../arms/js/searchEngine/searchApiModule.js",
            //날짜 검색
            "../reference/light-blue/lib/bootstrap-datepicker.js",
            "../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
            "../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js"
        ]
        // 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
    ];

    loadPluginGroupsParallelAndSequential(pluginGroups)
        .then(function () {
            console.log("모든 플러그인 로드 완료");
            //상단 메뉴
            $(".widget").widgster();
            setSideMenu("sidebar_menu_system", "sidebar_menu_system_logging");

            setTimeout(function () {
                var script = document.createElement("script");
                script.src = "../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/vfs_fonts.js";
                script.defer = true; // defer 속성 설정
                document.head.appendChild(script);
            }, 2000); // 2초 후에 실행됩니다.


            //highlight 기동
            hljs.highlightAll();
            //검색 관련 이벤트리스너활성화
            eventListenersActivator();
            //날짜검색 이벤트리스너
            date_range_filter_event();
            dateTimePicker();
            //검색결과_집계
            result_aggs_event();

            //페이지 로드 시 - 상단 검색 확인
            checkQueryStringOnUrl();
        })
        .catch(function (e) {
            console.error("플러그인 로드 중 오류 발생");
        });
}

/////////////////////////
//이벤트 리스너 활성화 - 검색결과 선택 시
/////////////////////////
function eventListenersActivator() {
    // 검색창에 검색어를 넣고 엔터를 눌렀을 때.
    $("#search-input").on("keyup", function (event) {
        if (event.keyCode === 13) {
            console.log("[searchEngine.js :: search_start] :: 입력값 => " + $("#search-input").val());
            $("#search-button").click(); //검색시작 트리거 역할
        }
    });

    $("#search-button").on("click", function (event) {
        $("#nav-search-input").val("");
        let searchTerm = $("#search-input").val();

        검색어_유효성_체크(searchTerm); // 여기서 전역변수인 검색어 세팅

        if (searchString) {
            console.log("[searchEngine :: search-button] :: 검색어 -> " + searchString);
            setParameter("searchString", searchString);
            let rangeDate = SearchApiModule.getRangeDate();
            search_with_date(checkAndAppendWildcard(searchString), rangeDate);
        } else {
            setParameter("searchString", ""); // 검색어 url 초기화
            console.log("[searchEngine :: search-button] :: 검색어가 없거나 빈값 입니다.");
        }
    });

    //검색 결과 리스트 클릭 이벤트
    $(".search_main_wrapper .search_result_group .search_result_items").on("click", function (event) {
        console.log($(event.target).closest(".search-result")[0]);
        var clicked_content_id = $(event.target).closest(".search-result").find(".search_head").attr("id");
        if (!clicked_content_id.includes("no_search_result")) {
            let section_and_order = getDataSectionAndOrder(clicked_content_id);
            SearchApiModule.mapDataToModal(section_and_order["search_section"], section_and_order["order"]);
        }
    });
}

///////////////////////////////////////
// 검색_데이터 집계 이벤트리스너
///////////////////////////////////////
function result_aggs_event() {
    // 필터-드롭다운
    $("#data-result-group").on("click", function (event) {
        console.log("[searchEngine :: 모든 결과] :: 드롭다운 :: 로그집계 top5 보여주기");

        let rangeDate = SearchApiModule.getRangeDate();
        //검색어 체크 (없다면, 검색창 확인하여 세팅)
        if (searchString) {
            getTop5LogName(searchString, rangeDate);
        } else {
            let no_aggs_data = {
                ko: "집계 데이터 없음",
                en: "No aggregate data",
                jp: "集計データなし"
            }[getCookie("locale") || "ko"];

            $("#log-agg-top5").html("");
            var setting = `<a style="text-align: center;">${no_aggs_data}</a>`;
            $("#log-agg-top5").html(setting);
        }
    });
}

//////////////////////////////
// 검색_날짜필터 이벤트리스너
//////////////////////////////
function date_range_filter_event() {
    $("#date-range-group .dropdown-menu li:not(:last)").on("click", function (event) {
        // console.log($(event.target));
        var rangeTypeId = $(event.target).closest("a").attr("id");
        var rangeText = $("#" + rangeTypeId).text();
        $("#date-range").text(rangeText); // 드롭다운 타이틀 변경

        searchRangeType = rangeTypeId; // 검색 레인지 타입아이디
        SearchApiModule.setRangeDateAsync(rangeTypeId)
            .then(() => {
                //날짜 구간 세팅
                let rangeDate = SearchApiModule.getRangeDate();
                let start = rangeDate["start-date"] ? SearchApiModule.setMidnightToZero(rangeDate["start-date"]) : "";
                let end = rangeDate["end-date"]
                    ? new Date(rangeDate["end-date"]).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
                    : "";
                let rangeText = start + " ~ " + end;
                let blannk = `&nbsp;&nbsp;`;
                if (searchRangeType === "all-time") {
                    rangeText = "";
                    blannk = ``;
                }
                $("#filter_list").html("");
                $("#filter_list").append(`<li style="margin: 0 3px"><a>${blannk}${rangeText}</a></li>`);

                if (searchString) {
                    //검색 실행
                    search_with_date(checkAndAppendWildcard(searchString), rangeDate);
                }
            })
            .catch((error) => {
                console.error("[searchEngine :: 날짜검색 이벤트리스너] :: 검색 오류 발생 =>", error);
            });
        console.log(rangeTypeId);
    });

    // 기간 설정 선택
    $("#date-range-group .dropdown-menu li:last").on("click", function (event) {
        var rangeTypeId = $(event.target).closest("a").attr("id");
        var rangeText = $("#" + rangeTypeId).text();
        $("#date-range").text(rangeText); // 드롭다운 타이틀 변경

        $("#date_timepicker_start").val("");
        $("#date_timepicker_end").val("");
    });
}

/////////////////////////
// 페이지 날짜 포함 검색
/////////////////////////
function search_with_date(search_string, range_date) {
    let start_date = null;
    let end_date = null;
    if (range_date) {
        if (range_date["start-date"]) {
            start_date = range_date["start-date"];
        }
        if (range_date["end-date"]) {
            end_date = range_date["end-date"];
        }
    }

    $(".spinner").html(
        '<img src="./img/loading.gif" alt="로딩" style="width: 16px;"> ' +
        {
            ko: "검색 결과 로딩 중입니다...",
            en: "Search results are loading...",
            jp: "検索結果を読み込んでいます..."
        }[getCookie("locale") || "ko"]
    );

    $.ajax({
        url: "/engine-search-api/engine/search/log/with-date",
        type: "GET",
        data: { "search_string": search_string, "page" : 0, "size": 10,"from": start_date, "to" : end_date },
        dataType: "json",
        success: function(result) {
            console.log("[searchEngine :: search_with_date] :: fluentd_search_results  실행");

            const current_page = 1; //현재 페이지 초기화
            const items_per_Page = 10; //페이지당 아이템 수
            SearchApiModule.setSearchResult("log", result, current_page, items_per_Page);
        }
    });
    getTop5LogName(search_string,range_date);
    // getTop5HostIp(search_string, range_date);
    // getTop5OsType(search_string, range_date);
}

//////////////////////////////////////////////////////////////////
// 페이지 누를때 동작 - 검색 (search_section 별 페이지 검색)
//////////////////////////////////////////////////////////////////
function section_search(search_section, page, range_date) {
    var search_string = checkAndAppendWildcard(searchString);
    var pageSize = 10;

    let start_date = null;
    let end_date = null;
    if (range_date) {
        if (range_date["start-date"]) {
            start_date = range_date["start-date"];
        }
        if (range_date["end-date"]) {
            end_date = range_date["end-date"];
        }
    }

    $(".spinner").html(
        '<img src="./img/loading.gif" alt="로딩" style="width: 16px;"> ' +
        {
            ko: "검색 결과 로딩 중입니다...",
            en: "Search results are loading...",
            jp: "検索結果を読み込んでいます..."
        }[getCookie("locale") || "ko"]
    );

    $.ajax({
        url: "/engine-search-api/engine/search/" + search_section + "/with-date",
        type: "GET",
        data: { search_string: search_string, page: page, size: pageSize, from: start_date, to: end_date },
        dataType: "json",
        success: function (result) {
            console.log("[searchEngine :: search] :: search_section => " + search_section);
            console.log("[searchEngine :: search] :: search_result => ");
            console.log(result);
            let showPage = page + 1; // 보여주는 페이지
            SearchApiModule.setSearchResult(search_section, result, showPage, pageSize);
            let pageStart = Math.floor(page / 10) * 10 + 1;
            SearchApiModule.updateButtons(search_section, showPage, pageStart);
        }
    });
}

function getTop5LogName(search_string, range_date) {
    console.log("[searchEngine :: getTop5LogName] 실행");
    $(".spinner").html(
        '<img src="./img/loading.gif" alt="로딩" style="width: 16px;"> ' +
        {
            ko: "집계 결과 로딩 중입니다...",
            en: "Loading aggregation results...",
            jp: "集計結果を読み込み中です..."
        }[getCookie("locale") || "ko"]
    );

    let start_date = null;
    let end_date = null;
    if (range_date) {
        if (range_date["start-date"]) {
            start_date = range_date["start-date"];
        }
        if (range_date["end-date"]) {
            end_date = range_date["end-date"];
        }
    }

    $.ajax({
        url: "/engine-search-api/engine/search/log/aggs-top5",
        type: "GET",
        data: { search_string: search_string, from: start_date, to: end_date },
        dataType: "json",
        success: function (result) {
            console.log("[searchEngine :: search_with_date] :: log-aggs-top5 => 집계 실행");
            console.log(result);
            if (result) {
                var resultArr = result["검색결과"]["group_by_@log_name"];
                var appendHtml = ``;

                var total = 0;
                resultArr.forEach((element) => {
                    total += parseInt(element["개수"]);
                });
                console.log("[searchEngine :: getTop5LogName] :: log-aggs-top5 :: total => ", total);
                $("#log-agg-top5").html("");
                let no_aggs_data = {
                    ko: "집계 데이터 없음",
                    en: "No aggregate data",
                    jp: "集計データなし"
                }[getCookie("locale") || "ko"];
                var setting = `<ul>`;
                if (total === 0) {
                    setting += `<li><a style="text-align: center;">${no_aggs_data}</a></li>`;
                } else {
                    resultArr.forEach((element) => {
                        var ratio = +((parseInt(element["개수"]) / total) * 100).toFixed(1);
                        setting += `<li>
							<div style="margin: 5px 10px; display: flex; justify-content: space-between" >
								<p style="color: #a4c6ff; margin-bottom: 0px">${element["필드명"]}</p>
								<p style="color: #2D8515; margin-bottom: 0px">${element["개수"]}(${ratio}%)</p>
							</div>
							<div class="progress progress-small" style="margin: 0 10px 5px 10px">
								<div class="progress-bar progress-bar-inverse" style="width: ${ratio}%;"></div>
							</div>												
						</li>`;
                    });
                    setting += `</ul>`;
                }
                $("#log-agg-top5").html(setting);
            } else {
                $("#log-agg-top5").html(
                    `<a style="text-align: center;">${no_aggs_data}</a>`
                );
            }
        }
    });
}

//////////////////////////////////////////////////
// 클릭한 아이디에서 section과 결과순서 가져오기
//////////////////////////////////////////////////
function getDataSectionAndOrder(id) {
    const targetId = id;
    // discovery-host | log (아이디에서 section order 뽑기)
    const matches = targetId.match(/hits_order_(discovery|discovery-host|log)_(\d+)/);
    let returnVal = { search_section: null, order: null };

    if (matches) {
        returnVal["search_section"] = matches[1];
        returnVal["order"] = matches[2];
        console.log("[searchEngine :: getDataSectionAndOrder] :: section -> " + matches[1] + ", order -> " + matches[2]);
        return returnVal;
    } else {
        console.log("[searchEngine :: getDataSectionAndOrder] No Match Found :: id -> " + targetId);
        return returnVal;
    }
}

////////////////////////////////////////
// 페이지 로드 시, 상단 검색어 기입 확인
////////////////////////////////////////
function checkQueryStringOnUrl() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var searchTerm = urlParams.get("searchString");

    if (searchTerm) {
        $("#search-input").val(searchTerm);
        $("#search-button").click();
    } else {
        console.log("[searchEngine :: checkQueryStringOnUrl] :: 상단_검색 검색어가 없습니다.");
    }
}

function changePage(search_section, page) {
    console.log("[searchEngine :: chagne] :: search_section -> " + search_section + ", page -> " + page);
    let requestPage = page - 1;
    if (requestPage < 0) {
        requestPage = 0;
    }
    section_search(search_section, requestPage, SearchApiModule.getRangeDate());
}

////////////////////////////
// 검색날짜 기간 설정 세팅
////////////////////////////
function dateTimePicker() {
    $("#date_timepicker_start").datetimepicker({
        format: "Y-m-d", // 날짜 및 시간 형식 지정
        formatDate: "Y/m/d",
        timepicker: false,
        theme: "dark",
        lang: "kr",
        onSelectTime: function (current_time, $input) {
            $("#date_timepicker_end").datetimepicker("setOptions", { minDate: current_time });
        },
        onShow: function (ct) {
            this.setOptions({
                maxDate: $("#date_timepicker_end").val() ? $("#date_timepicker_end").val() : false
            });
        }
    });
    $("#date_timepicker_end").datetimepicker({
        format: "Y-m-d", // 날짜 및 시간 형식 지정
        formatDate: "Y/m/d",
        timepicker: false,
        theme: "dark",
        lang: "kr",
        onSelectTime: function (current_time, $input) {
            $("#date_timepicker_start").datetimepicker("setOptions", { maxDate: current_time });
        },
        onShow: function (ct) {
            this.setOptions({
                minDate: $("#date_timepicker_start").val() ? $("#date_timepicker_start").val() : false
            });
        }
    });
}

////////////////////////////
// 검색날짜 기간 설정 모달 -
////////////////////////////
function customRangeSetting() {
    console.log("[searchEngine :: customRangeSetting] :: 실행");
    searchRangeType = "custom-range";
    SearchApiModule.setRangeDateAsync("custom-range")
        .then(() => {
            let rangeDate = SearchApiModule.getRangeDate();
            let start = rangeDate["start-date"]
                ? new Date(rangeDate["start-date"]).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
                : "";
            let end = rangeDate["end-date"]
                ? new Date(rangeDate["end-date"]).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
                : "";
            let rangeText = start + " ~ " + end;
            $("#filter_list").html("");
            $("#filter_list").append(`<li style="margin: 0 3px"><a>${rangeText}</a></li>`);

            if (searchString) {
                console.log("[searchEngine :: customRangeSetting] :: searchString => " + searchString);
                search_with_date(checkAndAppendWildcard(searchString), rangeDate);
            }
        })
        .catch((error) => {
            console.error("[searchEngine :: 날짜검색 이벤트리스너] :: 검색 오류 발생 =>", error);
        });
}

function 검색어_유효성_체크(search_string) {
    if (search_string && $.trim(search_string) !== "" && !/^\*+$/.test($.trim(search_string))) {
        let searchTerm = $.trim(search_string);
        searchString = searchTerm;
    } else {
        // url 검색어 param 초기화
        setParameter("searchString", "");
        searchString = null;
        console.log("[searchEngine :: 검색어_유효성_체크 ] :: 검색어가 유효하지 않습니다.");
    }
}

function checkAndAppendWildcard(searchTerm) {
    // 검색어의 마지막 문자가 *인지 확인
    if (searchTerm.slice(-1) !== "*") {
        // *이 없다면 *을 추가하여 반환
        return searchTerm + "*";
    }
    // *이 이미 있으면 검색어를 그대로 반환
    return searchTerm;
}
