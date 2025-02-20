var selectedPdServiceId;           // 선택한 제품(서비스) 아이디
var selectedPdService;             // 선택한 제품(서비스) 이름
var selectedVersionId;             // 선택한 버전 아이디
var req_state_to_id_mapping = {};
var req_state_to_icon_mapping = {};
var req_state_map = {};
var board_data = [];

const reqKanbanTg = new tourguide.TourGuideClient({           // 상세 정보 투어 가이드
                        exitOnClickOutside: true,
                        autoScroll: false,
                        hidePrev: true,
                        hideNext: true,
                        showStepDots: false,
                        showStepProgress: false
                    });
////////////////////////////////////////////////////////////////////////////////////////
//Document Ready
////////////////////////////////////////////////////////////////////////////////////////
function execDocReady() {
    let pluginGroups = [
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
            "../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js",
            "../reference/jquery-plugins/unityping-0.1.0/dist/jquery.unityping.min.js",
            "../reference/light-blue/lib/bootstrap-datepicker.js",
            "../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
            "../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js",
            "../reference/lightblue4/docs/lib/widgster/widgster.js"
        ],

        [
            "../reference/jquery-plugins/jstree-v.pre1.0/_lib/jquery.cookie.js",
            "../reference/jquery-plugins/jstree-v.pre1.0/_lib/jquery.hotkeys.js",
            "../reference/jquery-plugins/jstree-v.pre1.0/jquery.jstree.js",
            "../reference/jquery-plugins/select2-4.0.2/dist/css/select2_lightblue4.css",
            "../reference/jquery-plugins/lou-multi-select-0.9.12/css/multiselect-lightblue4.css",
            "../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select-bluelight.css",
            "../reference/jquery-plugins/select2-4.0.2/dist/js/select2.min.js",
            "../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.quicksearch.js",
            "../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.multi-select.js",
            "../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select.min.js"
        ],
        [
            // 칸반 보드
            "../reference/jquery-plugins/jkanban-1.3.1/dist/jkanban.min.css",
            "../reference/jquery-plugins/jkanban-1.3.1/dist/jkanban.min.js",
            "../arms/js/reqKanban/kanban.js"
        ]
        // 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
    ];

    loadPluginGroupsParallelAndSequential(pluginGroups)
        .then(function () {
            //사이드 메뉴 처리
            $(".widget").widgster();
            setSideMenu("sidebar_menu_requirement", "sidebar_menu_requirement_kanban");

            //제품(서비스) 셀렉트 박스 이니시에이터
            makePdServiceSelectBox();

            //버전 멀티 셀렉트 박스 이니시에이터
            makeVersionMultiSelectBox();

            get_arms_req_state_list()
                .then((state_list) => {
                    board_data = [];
                    for (let k in state_list) {
                        let obj = state_list[k];
                        let state = { // 기본 보드 데이터
                            id: obj.c_id.toString(),
                            title: `${obj.reqStateCategoryEntity.c_category_icon} ${obj.c_title}`
                        }

                        board_data.push(state);
                        req_state_to_id_mapping[obj.c_title] = obj.c_id.toString();
                        req_state_to_icon_mapping[obj.c_title] = obj.reqStateCategoryEntity.c_category_icon;
                        req_state_map[obj.c_id] = obj;
                    }

                    // 칸반 보드 초기화
                    initKanban();
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

            $(window).resize(function() {
                adjustHeight();
            });

            // 검색
            $("#kanban_search").on("input", function () {
                let searchText = $(this).val().toLowerCase();
                // console.log("검색: " + searchText);

                $('.kanban-item').each(function() {
                    let itemText = $(this).find('.req_item').text().toLowerCase();
                    if (itemText.indexOf(searchText) !== -1) {
                        $(this).removeClass('hidden');
                    } else {
                        $(this).addClass('hidden');
                    }
                });

                if ($(this).val().length > 0) {
                    $('.kanban_search_clear').show();
                } else {
                    $('.kanban_search_clear').hide();
                }
            });

            $('.kanban_search_clear').click(function() {
                $('#kanban_search').val('').focus();
                $('.kanban-item').removeClass('hidden');
                $(this).hide();
            });

        })
        .catch(function (e) {
            console.error("플러그인 로드 중 오류 발생");
            console.error(e);
        });
}

///////////////////////
//제품 서비스 셀렉트 박스
//////////////////////
function makePdServiceSelectBox() {
    //제품 서비스 셀렉트 박스 이니시에이터
    $(".chzn-select").each(function() {
        $(this).select2($(this).data());
    });

    //제품 서비스 셀렉트 박스 데이터 바인딩
    $.ajax({
        url: "/auth-user/api/arms/pdService/getPdServiceMonitor.do",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        progress: true,
        statusCode: {
            200: function(data) {
                //////////////////////////////////////////////////////////
                for (var k in data.response) {
                    var obj = data.response[k];
                    var newOption = new Option(obj.c_title, obj.c_id, false, false);
                    $("#selected_pdService").append(newOption).trigger("change");
                }
                //////////////////////////////////////////////////////////
                jSuccess("제품(서비스) 조회가 완료 되었습니다.");
            }
        },
        error: function (e) {
            jError("제품(서비스) 조회 중 에러가 발생했습니다.");
        }
    });

    $("#selected_pdService").on("select2:open", function() {
        //슬림스크롤
        makeSlimScroll(".select2-results__options");
    });

    // --- select2 ( 제품(서비스) 검색 및 선택 ) 이벤트 --- //
    $("#selected_pdService").on("select2:select", function(e) {
        selectedPdServiceId = $("#selected_pdService").val();
        selectedPdService = $("#selected_pdService").select2("data")[0].text;

        $("#select-pdService").text(selectedPdService);
        let selectedHtml =
            `<div class="chat-message">
				<div class="chat-message-body" style="margin-left: 0px !important;">
					<span class="arrow" style="top: 35% !important;"></span>
					<span class="sender" style="padding-bottom: 5px; padding-top: 3px;"> 선택된 서버 :  </span>
					<span class="text" style="color: #a4c6ff;">
					` +
                        selectedPdService
                    + `
					</span>
				</div>
			</div>`;
        $("#reqSender").html(selectedHtml); // 선택된 제품(서비스)

        //refreshDetailChart(); 변수값_초기화();
        // 제품( 서비스 ) 선택했으니까 자동으로 버전을 선택할 수 있게 유도
        // 디폴트는 base version 을 선택하게 하고 ( select all )
        //~> 이벤트 연계 함수 :: Version 표시 jsTree 빌드
        bind_VersionData_By_PdService();
    });
} // end makePdServiceSelectBox()

////////////////////////////////////////
//버전 멀티 셀렉트 박스
////////////////////////////////////////
function makeVersionMultiSelectBox() {
    //버전 선택시 셀렉트 박스 이니시에이터
    $(".multiple-select").multipleSelect({
        filter: true,
        onClose: function () {
            let versions = [];
            let versionIds = [];
            $("#multi-version option:selected").map(function (a, item) {
                versions.push(item.innerText);
                versionIds.push(item.value);
            });
            $("#select-version").text(isEmpty(versions) ? "선택되지 않음" : versions.join(', '));
            selectedVersionId = versionIds;

            if (selectedVersionId.length === 0) {
                initKanban();
                return;
            }

            // 칸반 보드
            setKanban();
        }
    });
}

function bind_VersionData_By_PdService() {
    $(".multiple-select option").remove();
    $.ajax({
        url: "/auth-user/api/arms/pdService/getVersionList.do?c_id=" + selectedPdServiceId,
        type: "GET",
        dataType: "json",
        progress: true,
        statusCode: {
            200: function (data) {
                //////////////////////////////////////////////////////////
                let versions = [];
                let versionIds = [];
                for (var k in data.response) {
                    var obj = data.response[k];
                    versions.push(obj.c_title);
                    versionIds.push(obj.c_id);
                    var newOption = new Option(obj.c_title, obj.c_id, true, false);
                    $(".multiple-select").append(newOption);
                }
                $("#select-version").text(isEmpty(versions) ? "선택되지 않음" : versions.join(', '));

                if (data.length > 0) {
                    console.log("[ reqKanban :: bind_VersionData_By_PdService ] :: result = display 재설정.");
                }

                selectedVersionId = versionIds.join(",");
                console.log("bind_VersionData_By_PdService :: selectedVersionId");
                console.log(selectedVersionId);

                // 칸반 보드
                setKanban();

                $(".multiple-select").multipleSelect("refresh");
                //////////////////////////////////////////////////////////
            }
        },
        error: function (e) {
            jError("버전 조회 중 에러가 발생했습니다.");
        }
    });
}

function setKanban() {
    $.ajax({
        url: "/auth-user/api/arms/reqAdd/T_ARMS_REQADD_" +
            selectedPdServiceId +
            "/getReqAddListByFilter.do?c_req_pdservice_versionset_link=" +
            selectedVersionId +
            "&c_type=default",
        type: "GET",
        dataType: "json",
        progress: true,
        statusCode: {
            200: function (data) {

                // 요구사항 상태 별 리스트
                const reqListByState = data.reduce((reqList, item) => {

                    // 요구사항 상태 가져오기
                    const state = (item.reqStateEntity && item.reqStateEntity.c_title) || "상태 정보 없음";

                    // 요구사항 버전 가져오기
                    let versions = "버전 정보 없음";
                    if (!isEmpty(item.c_req_pdservice_versionset_link)) {
                        $("#req-versions").multipleSelect("setSelects", JSON.parse(item.c_req_pdservice_versionset_link));
                        versions = $("#req-versions").multipleSelect("getSelects", "text").join(', ');;
                    }

                    // 해당 상태의 리스트가 없으면 초기화
                    if (!reqList[state]) {
                        reqList[state] = [];
                    }

                    // 현재 상태에 해당하는 리스트에 아이템 추가
                    reqList[state].push({
                        id: "req_" + item.c_id,
                        title: `<span class="req_item">${item.c_title}</span>
                                <i class="fa fa-ellipsis-h show-info" data-id="req_${item.c_id}"></i>`,
                        version: item.c_req_pdservice_versionset_link,
                        info: {
                            reqVersions: versions,
                            reqPriority: (item.reqPriorityEntity && item.reqPriorityEntity.c_title) || "우선순위 정보 없음",
                            reqDifficulty: (item.reqDifficultyEntity && item.reqDifficultyEntity.c_title) || "난이도 정보 없음",
                            reqPlan: item.c_req_plan_time || "예상 일정 정보 없음",
                            reqSummary: item.c_title,
                        },
                        category: (item.reqStateEntity && item.reqStateEntity.reqStateCategoryEntity && item.reqStateEntity.reqStateCategoryEntity.c_title)
                });

                    return reqList;
                }, {});
                //console.log("[ reqKanban :: changeMultipleSelected ] :: 요구사항 상태 별 리스트 => ", JSON.stringify(reqListByState));

                // 칸반 보드 구성
                const reqBoardByState = Object.keys(req_state_to_id_mapping).map(state => ({
                                            id: req_state_to_id_mapping[state],                    // 요구사항 상태 별 id
                                            title: `${req_state_to_icon_mapping[state]} ${state}`, // 요구사항 제목
                                            item: reqListByState[state] || []                 // 요구사항 상태 별 리스트, null 또는 undefined 시 빈 배열로 대체
                                        }));

                // 칸반 보드 로드
                loadKanban(reqListByState, reqBoardByState);

                // 높이 조정
                adjustHeight();

                // 요구사항 개수 표시
                setReqCount(reqListByState);
                
            }
        },
        error: function (e) {
            jError("요구사항 조회 중 에러가 발생했습니다.");
        }
    });
}

function loadKanban(reqListByState, reqBoardByState) {

    $("#myKanban").empty();

    let kanban = new jKanban({
        element : '#myKanban',
        gutter  : '15px',
        responsivePercentage: true,
        dragBoards: false,
        boards  : reqBoardByState,
        dropEl: function (el, target, source) {
            // 보드 변경 시 상태 category에 맞게 변경
            el.dataset.category = req_state_map[target.parentNode.dataset.id].reqStateCategoryEntity.c_title;
            let reqId = el.dataset.eid;
            reqId = reqId.replace("req_", "");
            let reqTitle = el.innerText;
            let state = source.parentNode.dataset.id;
            let changeState = target.parentNode.dataset.id;
            let version = el.dataset.version

            console.log('[ reqKanban :: loadKanban ] :: 보드 이동', {
                element: el.dataset,
                fromBoard: state,
                toBoard: changeState
            });

            // 요구사항 상태 변경
            let reqData = {
                c_id: reqId,
                c_req_state_link: changeState,
                c_req_pdservice_versionset_link: version,
            };
            $.ajax({
                url: "/auth-user/api/arms/reqAdd/" + "T_ARMS_REQADD_" + selectedPdServiceId + "/updateDataBase.do",
                type: "POST",
                data: reqData,
                statusCode: {
                    200: function () {
                        console.log("[ reqKanban :: loadKanban ] :: 요구사항 상태 변경 -> ", changeState);
                        jSuccess('"' + reqTitle + '"' + " 요구사항 상태가 변경되었습니다.");
                        setReqCount();
                    }
                }
            });
        }
    });
    jSuccess("보드가 로드 되었습니다.");

    // 상세 정보 클릭 이벤트
    $(".show-info").on('click', function() {
        const reqId = $(this).data('id');

        let reqInfo;
        Object.values(reqListByState).forEach(stateList => {
            const reqItem = stateList.find(item => item.id === reqId);
            if (reqItem) {
                reqInfo = reqItem.info;
            }
        });

        let reqData = {
            reqId: reqId,
            reqInfo: reqInfo
        }

        TgGroup.modalReqKanban(reqData);
        reqKanbanTg.start();

        reqKanbanTg.onAfterExit(() => {
            $(`[data-id="${reqId}"]`).removeAttr('data-tg-tour');
            $(`[data-id="${reqId}"]`).removeAttr('data-tg-title');
        });
    });

    // 툴팁
    $('.req_item').hover(function() {

        let reqSummary = $(this).text(); // 요구사항 제목

        // req_item 요소
        let target = $(this);
        let reqItem = target[0].getBoundingClientRect()

        // 툴팁 요소
        let tooltip = $('<div class="req_item_tooltip"></div>')
                        .text(reqSummary)
                        .appendTo('body')
                        .fadeIn('slow');

        let tooltipWidth = tooltip.outerWidth();
        let tooltipHeight = tooltip.outerHeight();

        // 요소의 가운데 아래에 툴팁 위치 설정
        let topPosition = reqItem.bottom + window.scrollY + 5; // 페이지 스크롤을 고려하여 bottom 위치 사용
        let leftPosition = reqItem.left + window.scrollX + (target.outerWidth() - tooltipWidth) / 2; // 요소의 가운데 정렬
        if (leftPosition < 0) {
            leftPosition = 0; // 화면 왼쪽을 넘지 않도록 보정
        }
        tooltip.css({top: topPosition + 'px', left: leftPosition + 'px'});

    }, function() {
        // 툴팁 제거
        $('.req_item_tooltip').fadeOut('fast', function() {
            $(this).remove();
        });
    }).mousemove(function(e) {
        // 마우스 위치에 따라 툴팁 위치 조정
        /*$('.req_item_tooltip')
            .css({top: e.pageY + 20 + 'px', left: e.pageX - 20 + 'px'});*/
    });
}

function adjustHeight() {

    // 높이 조정
    $('.kanban_board').matchHeight({
        target: $('.kanban_sidebar')
    });

    let sidebarHeight = $('.kanban_sidebar').height();
    //console.log("사이드바: " + sidebarHeight);
    $('.kanban-drag').each(function() {
        this.style.setProperty('height', `calc(${sidebarHeight}px - 181px)`, 'important');
    });
}

function setReqCount() {

    get_arms_state_category_list()
        .then((category_list) => {
            let category_counts = {};
            for (var k in category_list) {
                var obj = category_list[k];
                category_counts[obj.c_title] = 0;
            }

            // 각 상태 카테고리 별 개수 카운트
            let board_class_name = '.kanban-board';
            let board_list = $('div').find(board_class_name).toArray();
            board_list.forEach(item => {
                let id = item.dataset.id;
                let $item = $(item.childNodes[1]).toArray();
                let node_list = $item[0].childNodes;
                node_list.forEach(node => {
                    let $node = $(node);
                    let node_info = $node[0].dataset.category;
                    category_counts[node_info] += 1;
                });
            });

            let 총합 = Object.values(category_counts).reduce((acc, currentValue) => acc + currentValue, 0);

            // 개수 표시
            $("#req-count").text(총합);
            $("#req-open-count").text(category_counts["열림"]);
            $("#req-progress-count").text(category_counts["진행중"]);
            $("#req-resolve-count").text(category_counts["해결됨"]);
            $("#req-close-count").text(category_counts["닫힘"]);

            // 통계 표시
            $("#req-open-stats").text(setStatsFormat(category_counts["열림"], 총합));
            $("#req-progress-stats").text(setStatsFormat(category_counts["진행중"], 총합));
            $("#req-resolve-stats").text(setStatsFormat(category_counts["해결됨"], 총합));
            $("#req-close-stats").text(setStatsFormat(category_counts["닫힘"], 총합));
        })
        .catch((error) => {
            // 오류가 발생한 경우 처리합니다.
            console.error('Error fetching data:', error);
        });
}

function setStatsFormat(값, 총합) {
    if (총합 == 0) {
        return 0;
    }
    return Math.round((값 / 총합) * 1000) / 10;
}

function initKanban() {
    KanbanBoard.init('myKanban', board_data);
    adjustHeight();
    setReqCount();
}