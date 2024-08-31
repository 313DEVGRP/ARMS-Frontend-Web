var selectId; // 제품 아이디
var selectName; // 제품 이름
var dataTableRef; // 데이터테이블 참조 변수
var selected_alm_server_id;
var selected_alm_server_name;
var alm_server_list = {};
var req_state_category_list = {};
var select_state_id;

const reqStateToIconMapping = {     // 요구사항 상태에 아이콘 매핑
    "10": '<i class="fa fa-folder-o text-danger"></i>',
    "11": '<i class="fa fa-fire" style="color: #E49400;"></i>',
    "12": '<i class="fa fa-fire-extinguisher text-success"></i>',
    "13": '<i class="fa fa-folder text-primary"></i>'
};

////////////////////////////////////////////////////////////////////////////////////////
//Document Ready
////////////////////////////////////////////////////////////////////////////////////////
function execDocReady() {
    let pluginGroups = [
        [
            "../reference/jquery-plugins/select2-4.0.2/dist/css/select2_lightblue4.css",
            "../reference/jquery-plugins/select2-4.0.2/dist/js/select2.min.js",
            "../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js",
            "../reference/lightblue4/docs/lib/widgster/widgster.js",
            "../reference/jquery-plugins/timerStyles.js"
        ],
        [
            "../reference/jquery-plugins/jstree-v.pre1.0/_lib/jquery.cookie.js",
            "../reference/jquery-plugins/jstree-v.pre1.0/_lib/jquery.hotkeys.js",
            "../reference/jquery-plugins/jstree-v.pre1.0/jquery.jstree.js",
        ],
        [
            "../reference/jquery-plugins/dataTables-1.10.16/media/css/jquery.dataTables_lightblue4.css",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Responsive/css/responsive.dataTables_lightblue4.css",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Select/css/select.dataTables_lightblue4.css",
            "../reference/jquery-plugins/dataTables-1.10.16/media/js/jquery.dataTables.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Responsive/js/dataTables.responsive.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/Select/js/dataTables.select.min.js",
            "../reference/jquery-plugins/dataTables-1.10.16/extensions/RowGroup/js/dataTables.rowsGroup.min.js",
        ],
        [
            "../reference/gojs/go-debug.js",
            "../arms/js/mapping/gojs_setup.js"
        ]
    ];

    loadPluginGroupsParallelAndSequential(pluginGroups)
        .then(function () {
            //사이드 메뉴 처리
            $(".widget").widgster();
            setSideMenu("sidebar_menu_jira", "sidebar_menu_state_mapping");

            //coming soon
            $("#count-down").TimeCircles(
                {
                    circle_bg_color: "#f8f8f8",
                    use_background: true,
                    bg_width: .2,
                    fg_width: 0.013,
                    time: {
                        Days: { color: "#f8f8f8" },
                        Hours: { color: "#f8f8f8" },
                        Minutes: { color: "#f8f8f8" },
                        Seconds: { color: "#f8f8f8" }
                    }
                }
            );

            //ALM 서버 셀렉트 박스 이니시에이터
            make_alm_server_select_box();
            gojs.init();

            save_req_state_btn_click();
            update_req_state_btn_click();
            delete_req_state_btn_click();
            default_state_setting_btn_click();
            // --- 에디터 설정 --- //

            var waitCKEDITOR = setInterval(function () {
                try {
                    if (window.CKEDITOR) {
                        if (window.CKEDITOR.status === "loaded") {
                            CKEDITOR.replace("popup_view_state_description_editor", { skin: "office2013" });
                            clearInterval(waitCKEDITOR);
                        }
                    }
                } catch (err) {
                    console.log("CKEDITOR 로드가 완료되지 않아서 초기화 재시도 중...");
                }
            }, 313 /*milli*/);

            $("#text").on("input", function () {
                var searchString = $(this).val();
                $("#alm_server_tree").jstree("search", searchString);
            });

            init_data_load();
        })
        .catch(function (e) {
            console.error("플러그인 로드 중 오류 발생");
            console.error(e);
        });
}

///////////////////////
// ALM 서버 셀렉트 박스
//////////////////////
function make_alm_server_select_box() {
    //제품 서비스 셀렉트 박스 이니시에이터
    $(".chzn-select").each(function() {
        $(this).select2($(this).data());
    });

    //ALM 서버 셀렉트 박스 데이터 바인딩
    $.ajax({
        url: "/auth-user/api/arms/jiraServerPure/getNodesWithoutRoot.do",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        progress: true,
        statusCode: {
            200: function(data) {
                console.log(data.result);
                //////////////////////////////////////////////////////////
                for (var k in data.result) {
                    var obj = data.result[k];
                    alm_server_list[obj.c_id] = obj;
                    var newOption = new Option(obj.c_title, obj.c_id, false, false);
                    $("#selected_alm_server").append(newOption).trigger("change");
                }

                jSuccess("ALM 서버 조회가 완료 되었습니다.");
            }
        },
        error: function (e) {
            jError("ALM 서버 조회 중 에러가 발생했습니다. :: " + e);
        }
    });

    $("#selected_alm_server").on("select2:open", function() {
        //슬림스크롤
        makeSlimScroll(".select2-results__options");
    });

    // --- select2 ( 제품(서비스) 검색 및 선택 ) 이벤트 --- //
    $("#selected_alm_server").on("select2:select", function(e) {
        $("#cloud_project_tree").hide();
        $("#select-project-div").hide();
        $("#select-issuetype-div").hide();
        $("#select-project").text("선택되지 않음");
        $("#select-issuetype").text("선택되지 않음");
        selected_alm_server_id = $("#selected_alm_server").val();
        selected_alm_server_name = $("#selected_alm_server").select2("data")[0].text;
        $("#select-alm-server").text(selected_alm_server_name);

        let alm_server_data = alm_server_list[selected_alm_server_id];
        let alm_server_type = alm_server_data.c_jira_server_type;

        if (alm_server_type === "클라우드") {
            $("#cloud_project_tree").show();
            $("#select-project-div").show();
            $("#select-issuetype-div").show();

            build_alm_server_jstree(selected_alm_server_id);
            init_data_load();
        }
        else {
            mapping_data_load(selected_alm_server_id, alm_server_type);
        }
    });
} // end make_alm_server_select_box()

function init_data_load() {
    Promise.all([get_arms_state_category_list(), get_arms_state_list()])
        .then(([arms_state_category_list, arms_state_list]) => {

            for (var k in arms_state_category_list) {
                var obj = arms_state_category_list[k];
                req_state_category_list[obj.c_id] = obj;
            }

            console.log('ARMS Category State List:', req_state_category_list);
            console.log('ARMS State List:', arms_state_list);

            let data = generate_gojs_mapping_data(req_state_category_list, arms_state_list, null, null);
            gojs.load(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

function mapping_data_load(alm_server_id, alm_server_type, project_id, issueType_c_id) {
    if (!alm_server_type) {
        alm_server_id = alm_server_id || selected_alm_server_id;

        if (!alm_server_id) {
            alert("선택된 서버가 없습니다.");
            return;
        }

        let alm_server_data = alm_server_list[alm_server_id];
        alm_server_type = alm_server_data.c_jira_server_type;
    }

    if (alm_server_type === "클라우드") {
        if (!project_id|| !issueType_c_id) {
            alert("선택된 프로젝트 이슈유형이 없습니다.");
            return;
        }

        Promise.all([get_arms_state_list(), get_project_status_list(project_id, issueType_c_id)])
            .then(([arms_state_list, alm_status_list]) => {
                console.log('ARMS State List:', arms_state_list);
                console.log('ALM Status List:', alm_status_list);

                if (alm_status_list.length === 0) {
                    alert("프로젝트의 이슈유형에 연결된 상태가 없습니다. 서버 데이터 확인이 필요합니다.");
                    let data = {};
                    gojs.load(data);
                    return;
                }

                let data = generate_gojs_mapping_data(req_state_category_list, arms_state_list, alm_status_list, alm_server_type);
                gojs.load(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
    else {
        Promise.all([get_arms_state_list(), get_alm_status_list(alm_server_id)])
            .then(([arms_state_list, alm_status_list]) => {
                console.log('ARMS State List:', arms_state_list);
                console.log('ALM Status List:', alm_status_list);

                let gojs_mapping_data = generate_gojs_mapping_data(req_state_category_list, arms_state_list, alm_status_list, alm_server_type);
                gojs.load(gojs_mapping_data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
}

function generate_gojs_mapping_data(req_state_category_list, arms_state_list, alm_status_list, alm_server_type) {
    const node_data_array = [];
    const link_data_array = [];

    const category_x_position = 0;
    const arms_state_x_position = 300;
    const alm_status_x_position = 600;

    const y_spacing = 50;
    const category_y_spacing = 50;

    let category_y_position = 0;
    let arms_state_y_position = 0;
    let alm_status_y_position = 0;

    const category_nodes = {};
    const arms_state_nodes = {};
    let alm_status_nodes = {};

    if (req_state_category_list && Array.isArray(Object.entries(req_state_category_list))) {
        Object.entries(req_state_category_list).forEach(([key, value]) => {
            const category_type = "arms-category";
            const category_node_key = category_type+ "-"+key;
            const node = {
                key: category_node_key,
                text: `${value.c_title}`,
                type: category_type,
                c_id: key,
                category: 'Loading',
                loc: `${category_x_position} ${category_y_position}`
            };

            node_data_array.push(node);
            category_nodes[key] = node;
            category_y_position += category_y_spacing;
        });
    }

    if (arms_state_list && Array.isArray(Object.entries(arms_state_list))) {
        arms_state_list.forEach((state) => {
            const arms_state_type = "arms-state";
            const arms_node_key = arms_state_type + "-" + state.c_id;
            const node = {
                key: arms_node_key,
                text: `${state.c_title}`,
                type: arms_state_type,
                c_id: state.c_id,
                category: 'NoAdd',
                loc: `${arms_state_x_position} ${arms_state_y_position}`
            };

            if (state.reqStateCategoryEntity) {
                node.mapping_id = state.reqStateCategoryEntity.c_id;
            }
            else {
                node.maping_id = null;
            }

            node_data_array.push(node);
            arms_state_nodes[state.c_id] = node;
            arms_state_y_position += y_spacing;
        });
    }

    if (alm_status_list && Array.isArray(alm_status_list)) {
        alm_status_list.forEach((status) => {
            const alm_status_type = "alm-status";
            const alm_node_key = alm_status_type + "-" + status.c_id;
            const node = {
                key: alm_node_key,
                text: `${status.c_issue_status_name}`,
                server_type: alm_server_type,
                type: alm_status_type,
                c_id: status.c_id,
                mapping_id: status.c_req_state_mapping_link,
                category: 'End',
                loc: `${alm_status_x_position} ${alm_status_y_position}`
            };

            node_data_array.push(node);
            alm_status_nodes[status.c_id] = node;
            alm_status_y_position += y_spacing;
        });
    }

    // 링크 데이터 생성
    node_data_array.forEach((node) => {
        if (node.type === 'arms-state' && node.mapping_id) {
            const fromNode = category_nodes[node.mapping_id];
            if (fromNode) {
                link_data_array.push({ from: fromNode.key, to: node.key, fromNode: fromNode, toNode: node, oldFromNode: fromNode, oldToNode: node });
            }
        } else if (node.type === 'alm-status' && node.mapping_id) {
            const fromNode = arms_state_nodes[node.mapping_id];
            if (fromNode) {
                link_data_array.push({ from: fromNode.key, to: node.key, fromNode: fromNode, toNode: node, oldFromNode: fromNode, oldToNode: node });
            }
        }
    });

    // 암스 상태 노드 정렬
    const sorted_arms_state_nodes = Object.values(arms_state_nodes).sort((a, b) => {
        const mappingAExists = a.mapping_id !== undefined && a.mapping_id !== null;
        const mappingBExists = b.mapping_id !== undefined && b.mapping_id !== null;

        // mapping_id가 없는 데이터는 아래쪽에 배치
        if (!mappingAExists) return 1;
        if (!mappingBExists) return -1;

        // 매핑 기준 상태 카테고리 노드 조회
        const category_node_a = category_nodes[a.mapping_id];
        const category_node_b = category_nodes[b.mapping_id];

        // 매핑된 상태 카테고리가 없으면 아래 쪽에 배치
        if (category_node_a === undefined) return 1;
        if (category_node_b === undefined) return -1;

        // 상태 카테고리 y 좌표를 기준 정렬
        return get_y_position(category_node_a) - get_y_position(category_node_b);
    });

    arms_state_y_position = 0;
    if (sorted_arms_state_nodes && Array.isArray(sorted_arms_state_nodes)) {
        sorted_arms_state_nodes.forEach((node) => {
            node.loc = `${arms_state_x_position} ${arms_state_y_position}`;
            arms_state_y_position += y_spacing;
        });
    }

    // ALM 상태 노드 ARMS에 매핑된 노드 기준으로 정렬
    const sorted_alm_status_nodes = Object.values(alm_status_nodes).sort((a, b) => {
        const mappingAExists = a.mapping_id !== undefined && a.mapping_id !== null;
        const mappingBExists = b.mapping_id !== undefined && b.mapping_id !== null;

        // mapping_id가 없는 데이터는 아래쪽에 배치
        if (!mappingAExists) return 1;
        if (!mappingBExists) return -1;

        // 매핑 기준 ARMS 상태 노드 조회
        const state_node_a = arms_state_nodes[a.mapping_id];
        const state_node_b = arms_state_nodes[b.mapping_id];

        // 매핑된 ARMS 상태가 없으면 아래 쪽에 배치
        if (state_node_a === undefined) return 1;
        if (state_node_b === undefined) return -1;

        // ARNS 상태 y 좌표를 기준 정렬
        return get_y_position(state_node_a) - get_y_position(state_node_b);
    });

    alm_status_y_position = 0;
    if (sorted_alm_status_nodes && Array.isArray(sorted_alm_status_nodes)) {
        sorted_alm_status_nodes.forEach((node) => {
            node.loc = `${alm_status_x_position} ${alm_status_y_position}`;
            alm_status_y_position += y_spacing;
        });
    }

    return {
        class: 'GraphLinksModel',
        nodeDataArray: node_data_array,
        linkDataArray: link_data_array
    };
}

// y 좌표를 추출하는 헬퍼 함수
function get_y_position(node) {
    return parseFloat(node.loc.split(" ")[1]);
}

function get_arms_state_list() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/auth-user/api/arms/reqState/getNodesWithoutRoot.do",
            type: "GET",
            dataType: "json",
            progress: true,
            statusCode: {
                200: function (data) {
                    resolve(data.result);
                }
            },
            error: function (e) {
                jError("ARMS 상태 조회 중 에러가 발생했습니다.");
                reject(e);
            }
        });
    });
}

function get_alm_status_list(selected_alm_server_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/auth-user/api/arms/jiraServer/getJiraIssueStatus.do?c_id=" + selected_alm_server_id,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            progress: true,
            statusCode: {
                200: function(result) {
                    console.log(result);
                    resolve(result.response);
                    jSuccess("ALM 서버 상태 조회가 완료 되었습니다.");
                }
            },
            error: function (e) {
                jError("ALM 서버 상태 조회 중 에러가 발생했습니다. :: " + e);
                reject(e);
            }
        });
    });
}

function get_project_status_list(project_id, issueType_c_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/auth-user/api/arms/jiraProject/getIssueStatusListByIssueType.do?c_id=" + project_id
                                                                                + "&issueTypeId=" + issueType_c_id,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            progress: true,
            statusCode: {
                200: function(result) {
                    console.log(result);
                    resolve(result.response);
                    jSuccess("ALM 프로젝트 상태 조회가 완료 되었습니다.");
                }
            },
            error: function (e) {
                jError("ALM 프로젝트 상태 조회 중 에러가 발생했습니다. :: " + e);
                reject(e);
            }
        });
    });
}

function build_alm_server_jstree(selected_alm_server_id) {
    var jQueryElementID = "#alm_server_tree";
    var serviceNameForURL = "/auth-user/api/arms/jiraServerProjectPure/getJiraProjectPure.do?c_id=" + selected_alm_server_id;

    jstree_build(jQueryElementID, serviceNameForURL);
}

////////////////////////////////////////////////////////////////////////////////////////
// -- jstree build 설정 -- //
////////////////////////////////////////////////////////////////////////////////////////
function jstree_build(jQueryElementID, serviceNameForURL) {
    console.log("mapping :: jstree_build : ( jQueryElementID ) → " + jQueryElementID);
    console.log("mapping :: jstree_build : ( serviceNameForURL ) → " + serviceNameForURL);

    console.log("mapping :: jstree_build : ( href ) → " + $(location).attr("href"));
    console.log("mapping :: jstree_build : ( protocol ) → " + $(location).attr("protocol"));
    console.log("mapping :: jstree_build : ( host ) → " + $(location).attr("host"));
    console.log("mapping :: jstree_build : ( pathname ) → " + $(location).attr("pathname"));
    console.log("mapping :: jstree_build : ( search ) → " + $(location).attr("search"));
    console.log("mapping :: jstree_build : ( hostname ) → " + $(location).attr("hostname"));
    console.log("mapping :: jstree_build : ( port ) → " + $(location).attr("port"));

    $(jQueryElementID)
        .jstree({
            plugins: ["themes", "json_data", "ui", "crrm", "dnd", "search", "types"],
            themes: { theme: ["lightblue4"] },
            json_data: {
                ajax: {
                    url: serviceNameForURL,
                    cache: false,
                    data: function (n) {
                        // the result is fed to the AJAX request `data` option
                        console.log("[ common :: jsTreeBuild ] :: json data load = " + JSON.stringify(n));
                        return {
                            c_id: n.attr ? n.attr("id").replace("node_", "").replace("copy_", "") : 1
                        };
                    },
                    success: function (n) {
                        jSuccess("프로젝트 조회 완료");
                        n.forEach(project => {
                            project.attr.rel = "project";
                            project.attr.title = project.c_title;
                            project.children = [];
                            project.jiraIssueTypeEntities.forEach(issueType => {
                                // 하위 작업 이슈유형 제거 처리
                                if (issueType.c_contents !== "-1" || issueType.c_desc !== "true") {
                                    project.children.push({
                                        attr: { rel: "issueType", id: "issueType_" + issueType.c_id, title: issueType.c_issue_type_name },
                                        data: [issueType.c_issue_type_name],
                                        text: issueType.c_issue_type_name,
                                    });
                                }
                            });
                        });

                        $(jQueryElementID).jstree("search", $("#text").val());
                    }
                }
            },
            search: {
                show_only_matches: true,
                search_callback: function (str, node) {
                    return node.data().search(str);
                }
            },
            types: {
                max_depth: -2,
                max_children: -2,
                valid_children: ["project"],
                types: {
                    default: {
                        // I want this type to have no children (so only leaf nodes)
                        // In my case - those are files
                        valid_children: "none",
                        // If we specify an icon for the default type it WILL OVERRIDE the theme icons
                        icon: {
                            image: "../reference/jquery-plugins/jstree-v.pre1.0/themes/attibutes.png"
                        }
                    },
                    project: {
                        valid_children: ["issueType"],
                        icon: {
                            image: "../reference/jquery-plugins/jstree-v.pre1.0/themes/ic_app.png"
                        }
                    },
                    issueType: {
                        valid_children: "none",
                        icon: {
                            image: "../reference/jquery-plugins/jstree-v.pre1.0/themes/toolbar_new.png"
                        }
                    }
                }
            },
        })
        .bind("select_node.jstree", function (event, data) {
            if ($.isFunction(jstree_click)) {
                console.log("[ jstree_build :: select_node ] :: data.rslt.obj.data('id')" + data.rslt.obj.attr("id"));
                console.log("[ jstree_build :: select_node ] :: data.rslt.obj.data('rel')" + data.rslt.obj.attr("rel"));
                console.log("[ jstree_build :: select_node ] :: data.rslt.obj.data('class')" + data.rslt.obj.attr("class"));
                console.log("[ jstree_build :: select_node ] :: data.rslt.obj.children('a')" + data.rslt.obj.children("a"));
                console.log("[ jstree_build :: select_node ] :: data.rslt.obj.children('ul')" + data.rslt.obj.children("ul"));
                jstree_click(data.rslt.obj);
            }
        })
        .bind("loaded.jstree", function (event, data) {
            $(jQueryElementID).slimscroll({
                height: "200px"
            });
        });

    $("#mmenu input, #mmenu button").click(function () {
        switch (this.id) {
            case "add_default":
            case "add_folder":
                $(jQueryElementID).jstree("create", null, "last", {
                    attr: {
                        rel: this.id.toString().replace("add_", "")
                    }
                });
                break;
            case "search":
                $(jQueryElementID).jstree("search", document.getElementById("text").value);
                break;
            case "text":
                break;
            default:
                $(jQueryElementID).jstree(this.id);
                break;
        }
    });

    $("#mmenu .form-search").submit(function (event) {
        event.preventDefault();

        $(jQueryElementID).jstree("search", document.getElementById("text").value);
    });
}

function jstree_click(data) {

    let rel = data.attr('rel');
    if (rel === "project") {
        $(".jstree-clicked").removeClass("jstree-clicked");
        console.log(rel);
        return;
    }
    else {
        let project_title = data.parent().parent().attr("title");
        $("#select-project").text(project_title);
        let issueType_title = data.attr("title");
        $("#select-issuetype").text(issueType_title);

        let project_c_id = data.parent().parent().attr("id").replace("node_", "").replace("copy_", "");
        let issueType_c_id = data.attr("id").replace("issueType_", "").replace("copy_", "");
        mapping_data_load(null, null, project_c_id, issueType_c_id);
    }
}

///////////////////////////////////
// 팝업 띄울 때, UI 일부 수정되도록
///////////////////////////////////
function popup_modal(popup_type, state_id, state_name) {
    $('#my_modal1').modal('show');

    const container = $('#popup_view_state_category_div');
    container.empty();

    for (const key in req_state_category_list) {
        if (req_state_category_list.hasOwnProperty(key)) {
            const item = req_state_category_list[key];

            const label = $('<label>', {
                class: 'btn btn-disabled',
                style: 'margin-right: 5px;'
            });

            switch (item.c_title) {
                case '열림':
                    label.addClass('edit-red');
                    break;
                case '진행중':
                    label.addClass('edit-orange');
                    break;
                case '해결됨':
                    label.addClass('edit-green');
                    break;
                case '닫힘':
                    label.addClass('edit-blue');
                    break;
            }

            const input = $('<input>', {
                type: 'radio',
                name: 'popup_view_state_category_options',
                value: item.c_id
            });

            label.append(input);
            label.append(item.c_category_icon + " " +item.c_title + " ");

            container.append(label);
        }
    }

    $("#popup_view_state_category_div label").removeClass("active");
    $("input[name='popup_view_state_category_options']:checked").prop("checked", false);
    $("#popup_view_state_name").val("");
    CKEDITOR.instances.popup_view_state_description_editor.setData("상태 관련 설명 등을 기록합니다.");

    $("#delete_req_state").addClass("hidden");
    $("#update_req_state").addClass("hidden");
    $("#save_req_state").addClass("hidden");
    $("#change_state_div").addClass("hidden");
    $("#state_title_div").removeClass("hidden");
    $("#state_category_div").removeClass("hidden");
    $("#state_contents_div").removeClass("hidden");

    if (popup_type === "save_popup") {
        $("#my_modal1_title").text("ARMS 상태 등록 팝업");
        $("#my_modal1_description").text("A-RMS 요구사항의 상태를 등록합니다.");

        // 모달 등록, 수정별 버튼 초기화
        $("#save_req_state").removeClass("hidden");
    }
    else if (popup_type === "update_popup") {
        $("#my_modal1_title").text("ARMS 상태 수정 팝업");
        $("#my_modal1_description").text("A-RMS 요구사항의 상태를 수정합니다.");

        $("#update_req_state").removeClass("hidden");

        $.ajax({
            url: "/auth-user/api/arms/reqState/getNode.do?c_id=" + state_id,
            type: "get",
            statusCode: {
                200: function (data) {
                    console.log(data);

                    $("#popup_view_state_c_id").val(data.c_id);
                    $("#popup_view_state_name").val(data.c_title);
                    CKEDITOR.instances.popup_view_state_description_editor.setData(data.c_contents);
                    let state_category_value = null;
                    if (data.reqStateCategoryEntity) {
                        state_category_value = data.reqStateCategoryEntity.c_id;
                    }

                    update_radio_buttons("#popup_view_state_category_div", state_category_value);
                    // jSuccess('"' + reqTitle + '"' + " 상태 카테고리가 변경되었습니다.");
                }
            }
        });
    }
    else if (popup_type === "delete_popup") {
        $("#my_modal1_title").text("ARMS 상태 삭제 팝업");
        $("#my_modal1_description").text("A-RMS 요구사항의 상태를 삭제하고 요구사항의 상태를 바꿀 상태를 선택합니다.");

        $("#state_title_div").addClass("hidden");
        $("#state_category_div").addClass("hidden");
        $("#state_contents_div").addClass("hidden");
        $("#delete_req_state").removeClass("hidden");
        $("#change_state_div").removeClass("hidden");

        $("#popup_view_state_c_id").val(state_id);
        $("#popup_view_change_state_name").val(state_name);

        $("#popup_view_change_state_div").empty();
        get_arms_req_state_list()
            .then((state_list) => {
                let option_html = `<option value=""></option>`;

                for (var k in state_list) {
                    var state = state_list[k];
                    if (state_id !== state.c_id){
                        option_html += `<option value="${state.c_id}">${state.c_title}</option>`;
                    }
                }

                $("#popup_view_change_state_div").append(`<select
									class="select-block-level chzn-select darkBack"
									id="select-change-state"
									tabIndex="-1">
									${option_html}
								</select>`);

                $(".chzn-select").each(function () {
                    // $(this).select2($(this).data());
                    $(this).select2({
                        ...$(this).data(),
                        minimumResultsForSearch: -1 // 검색 기능 제거
                    });
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
}

function update_radio_buttons(container_selector, value) {
    $(container_selector + " label").removeClass("active");
    $(container_selector + " input[type='radio']:checked").prop("checked", false);

    let radio_buttons = $(container_selector + " input[type='radio']");
    radio_buttons.each(function () {
        if (value && $(this).val() == value) {
            $(this).parent().addClass("active");
            $(this).prop("checked", true);
        }
    });
}

function save_req_state_btn_click() {
    $("#save_req_state").off().click(function() {
        let state_name = $("#popup_view_state_name").val().trim();
        if (!state_name) {
            alert("상태의 이름이 입력되지 않았습니다.");
            return;
        }
        let state_category_value = $("#popup_view_state_category_div input[name='popup_view_state_category_options']:checked").val();
        if (!state_category_value) {
            alert("상태 카테고리가 선택되지 않았습니다.");
            return;
        }
        let state_description = CKEDITOR.instances["popup_view_state_description_editor"].getData();

        let data = {
            ref : 2,
            c_type : "default",
            c_state_category_mapping_id : state_category_value,
            c_title : state_name,
            c_contents : state_description
        };

        $.ajax({
            url: "/auth-user/api/arms/reqState/addStateNode.do",
            type: "POST",
            data: data,
            statusCode: {
                200: function () {
                    jSuccess('"' + state_name + '"' + " 상태가 생성되었습니다.");
                    $("#close_modal_popup").trigger("click");

                    init_mapping_diagram();
                }
            }
        });
    });
}

function update_req_state_btn_click() {
    $("#update_req_state").off().click(function() {
        let state_name = $("#popup_view_state_name").val().trim();
        if (!state_name) {
            alert("상태의 이름이 입력되지 않았습니다.");
            return;
        }
        let state_category_value = $("#popup_view_state_category_div input[name='popup_view_state_category_options']:checked").val();
        if (!state_category_value) {
            alert("상태 카테고리가 선택되지 않았습니다.");
            return;
        }
        let state_description = CKEDITOR.instances["popup_view_state_description_editor"].getData();

        update_arms_state($("#popup_view_state_c_id").val(), state_category_value, state_name, state_description)
            .then((result) => {
                console.log(result);
                $("#close_modal_popup").trigger("click");

                init_mapping_diagram();
            })
            .catch((error) => {
                // 오류가 발생한 경우 처리합니다.
                console.error('Error fetching data:', error);
            });
    });
}

function delete_req_state_btn_click() {
    $("#delete_req_state").off().click(function() {

        let state_id_before_change = $("#popup_view_state_c_id").val();
        let state_id_to_change = $('#select-change-state').val(); // 변경할 선택된 상태 아이디
        if (!state_id_to_change) {
            alert("변경할 상태 선택이 필요합니다.");
            return false;
        }

        let state_name = $("#popup_view_change_state_name").val().trim();
        let change_state_name = $("#select-change-state option:selected").text().trim();

        let isDelete = confirm(state_name + " 상태를 삭제 하고 " + change_state_name + " 상태로 변환하시겠습니까?");
        if (!isDelete) {
            return false;
        }

        remove_arms_state(state_id_before_change, state_name, state_id_to_change)
            .then((result) => {
                console.log(result);
                $("#close_modal_popup").trigger("click");

                init_mapping_diagram();
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    });
}

function init_mapping_diagram() {
    // 선택된 서버가 있을  Mapping 화면 재로드
    if ($("#selected_alm_server").val()) {
        let selected_alm_server_c_id = $("#selected_alm_server").val();
        let alm_server_data = alm_server_list[selected_alm_server_c_id];
        let alm_server_type = alm_server_data.c_jira_server_type;

        if (alm_server_type === "클라우드") {
            $("#select-project").text("선택되지 않음");
            $("#select-issuetype").text("선택되지 않음");
            $("#cloud_project_tree").show();
            $("#select-project-div").show();
            $("#select-issuetype-div").show();
            build_alm_server_jstree(selected_alm_server_c_id);
            let data = {};
            gojs.load(data);
        }
        else {
            mapping_data_load(selected_alm_server_c_id, alm_server_type);
        }
    }
}

function update_arms_state(state_c_id, state_category_mapping_id, state_name, state_contents) {

    return new Promise((resolve, reject) => {

        let data = {
            c_id : state_c_id,
            c_state_category_mapping_id : state_category_mapping_id,
        };

        if (state_contents) {
            data.c_contents = state_contents;
        }

        if (state_name) {
            data.c_title = state_name;
        }

        $.ajax({
            url: "/auth-user/api/arms/reqState/updateNode.do",
            type: "PUT",
            data: data,
            statusCode: {
                200: function (result) {
                    resolve(result);
                }
            },
            error: function (e) {
                jError("상태 수정 중 오류가 발생하였습니다.");
                reject(e);
            }
        });
    });
}

function remove_arms_state(state_c_id, state_name, state_id_to_change) {
    return new Promise((resolve, reject) => {

        let data = {
            c_id : state_c_id,
            stateIdToChange : state_id_to_change
        };

        $.ajax({
            url: "/auth-user/api/arms/reqState/removeNodeAndChangeState.do",
            type: "DELETE",
            data: data,
            statusCode: {
                200: function (data) {
                    jSuccess('"' + state_name + '"' + " 상태가 삭제되었습니다.");
                    resolve(data);
                }
            },
            error: function (e) {
                jError("상태 삭제 중 오류가 발생하였습니다.");
                reject(e);
            }
        });
    });
}

function update_alm_status(issue_status_c_id, req_state_c_id) {
    return new Promise((resolve, reject) => {

        let data = {
            c_id : issue_status_c_id,
            c_req_state_mapping_link : req_state_c_id,
        };

        $.ajax({
            url: "/auth-user/api/arms/jiraIssueStatus/updateNode.do",
            type: "PUT",
            data: data,
            statusCode: {
                200: function (result) {
                    resolve(result);
                }
            },
            error: function (e) {
                jError("ALM 상태 수정 중 오류가 발생하였습니다.");
                reject(e);
            }
        });
    });
}

function fn_urlHandler(data) {
    select_state_id = data;
}

function req_state_data_table() {
    $("#default_state_setting_modal").modal("show");

    var columnList= [
        { title:"설정",
            data: "c_id",
            className: "dt-body-left texe-align-center",
            render: function (data, type, row,meta) {
                if (type === "display") {
                    if(isEmpty(data)) {
                        return `<div class="no-issueStatus-data${meta.row}" style="white-space: nowrap; text-align: center">
                                    <input type="radio" name="c_id" value="' + ${data} + '"> </div>`;
                    }
                    else {
                        return `<div class="issueStatus-data${meta.row}" style="white-space: nowrap; text-align: center">
                                    <input type="radio" name="c_id" value="' + ${data} + '" onclick="fn_urlHandler(${data})">
                                </div>`;
                    }
                }
                return data;
            },
        },
        { title:"상태 이름",
            data: "c_title",
            render: function (data, type, row, meta) {
                if (type === "display") {
                    if (isEmpty(data)) {
                        return "<div style='color: #808080'>N/A</div>";
                    } else {
                        return '<div style="white-space: nowrap;">' + data + "</div>";
                    }
                }
                return data;
            },
            className: "dt-body-left",
            visible: true
        },
    ];
    var rowsGroupList = null; //그룹을 안쓰려면 null 처리
    var columnDefList = [];
    var selectList = {};
    var orderList = [[1, "asc"]];
    var buttonList = [];
    var jquerySelector = "#req_state_table";
    var ajaxUrl = "/auth-user/api/arms/reqState/getReqStateListFilter.do";
    var jsonRoot = "";
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
    // ----- 데이터 테이블 빌드 이후 스타일 구성 ------ //
    //datatable 좌상단 datarow combobox style
    $(".dataTables_length").find("select:eq(0)").addClass("darkBack");
    $(".dataTables_length").find("select:eq(0)").css("min-height", "30px");

    $(jquerySelector+' tbody').off('click', 'tr');
}

function dataTableDrawCallback(tableInfo) {
    console.log("[ mapping :: dataTableDrawCallback ] :: tableInfo");
    console.log(tableInfo);

    var className = "issueStatus";

    var tableData = tableInfo.aoData;
    if(!isEmpty(tableData)) {
        tableData.forEach(function (rowInfo, index) {
            if( !isEmpty(rowInfo._aData) ) {
                var tableRowData = rowInfo._aData;
                console.log(tableRowData);
                var rowIsDefault = tableRowData.c_check;
                var rowNameClass = "." + className + "-data" + index;

                var appendHtml = rowNameClass+">input";
                if (rowIsDefault === "true") {
                    $(appendHtml).prop("checked", "true");
                }
            }
        });
    }
}

//데이터 테이블 ajax load 이후 콜백.
function dataTableCallBack(settings, json) {
    console.log("Data Table loaded in initComplete", settings);
    console.log(json);
}

function default_state_setting_btn_click() {
    $("#save_default_state_setting").off().click(function() {
        if( isEmpty(select_state_id) ){
            jError("설정된 값이 없거나, 변경된 데이터가 없습니다.");
            return;
        }

        $.ajax({
            url: "/auth-user/api/arms/reqState/defaultSetting.do",
            type: "PUT",
            data: { c_id: select_state_id },
            statusCode: {
                200: function (result) {
                    console.log(result);
                    jSuccess("상태 기본 설정이 완료되었습니다.");
                }
            },
            error: function (e) {
                jError("상태 기본 설정 중 오류가 발생하였습니다.");
            }
        });
    });
}