////////////////////////////////////////////////////////////////////////////////////////
//Page 전역 변수
////////////////////////////////////////////////////////////////////////////////////////
var selectId; // 제품 아이디
var selectName; // 제품 이름
var selectedIndex; // 데이터테이블 선택한 인덱스
var selectedPage; // 데이터테이블 선택한 인덱스
var selectVersion; // 선택한 버전 아이디
var dataTableRef; // 데이터테이블 참조 변수
var datatableCallback_DuplicateDefence = 0;
var windowCount = 0;
var linuxCount = 0;
var unixCount = 0;
var etcCount = 0;
var footerCheck = 0;
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
			"../reference/light-blue/lib/nvd3/lib/d3.v2.js",
			"../reference/light-blue/lib/nvd3/nv.d3.custom.js",
			"../reference/light-blue/lib/nvd3/src/models/scatter.js",
			"../reference/light-blue/lib/nvd3/src/models/axis.js",
			"../reference/light-blue/lib/nvd3/src/models/legend.js",
			"../reference/light-blue/lib/nvd3/src/models/stackedArea.js",
			"../reference/light-blue/lib/nvd3/src/models/stackedAreaChart.js",
			"../reference/light-blue/lib/nvd3/src/models/line.js",
			"../reference/light-blue/lib/nvd3/src/models/pie.js",
			"../reference/light-blue/lib/nvd3/src/models/pieChartTotal.js",
			"../reference/light-blue/lib/nvd3/stream_layers.js",
			"../reference/light-blue/lib/nvd3/src/models/lineChart.js",
			"../reference/light-blue/lib/nvd3/src/models/multiBar.js",
			"../reference/light-blue/lib/nvd3/src/models/multiBarChart.js"
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
			"../reference/jquery-plugins/unityping-0.1.0/dist/jquery.unityping.min.js",
			"../reference/jquery-plugins/cron-editor-master/css/jquery-ui-mad.css",
			"../reference/jquery-plugins/cron-editor-master/js/jquery-ui.js",
			"../reference/jquery-plugins/cron-editor-master/js/jquery.croneditor_mad.js"
		],

		[
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Responsive/css/responsive.dataTables_lightblue4.css",
			"../reference/jquery-plugins/dataTables-1.10.16/media/js/jquery.dataTables.min.js",
			"../reference/jquery-plugins/dataTables-1.10.16/media/css/jquery.dataTables_lightblue4.css",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Responsive/js/dataTables.responsive.min.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Select/css/select.dataTables_lightblue4.css",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Select/js/dataTables.select.min.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/RowGroup/js/dataTables.rowsGroup.min.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/dataTables.buttons.min.js",

			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/buttons.html5.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/buttons.print.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/jszip.min.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/pdfmake.min.js",
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/vfs_fonts.js"
		]
		// 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
	];

	loadPluginGroupsParallelAndSequential(pluginGroups)
		.then(function () {
			console.log("모든 플러그인 로드 완료");

			// 사이드 메뉴 색상 설정
			$(".widget").widgster();
			setSideMenu("sidebar_menu_system", "sidebar_menu_system_generalconfig");

			// turn the div into a cron editor
			cronInit();

			service_name_select_option_init();

			//서비스 데이터 테이블 로드
			var waitDataTable = setInterval(function () {
				try {
					if (!$.fn.DataTable.isDataTable("#targetInfoTable")) {
						dataTableLoad();
						clearInterval(waitDataTable);
					}
				} catch (err) {
					console.log("서비스 데이터 테이블 로드가 완료되지 않아서 초기화 재시도 중...");
				}
			}, 313 /*milli*/);

		})
		.catch(function () {
			console.error("플러그인 로드 중 오류 발생");
		});

}

////////////////////////////////////////////////////////////////////////////////////////
// --- 데이터 테이블 설정 --- //
////////////////////////////////////////////////////////////////////////////////////////
function dataTableLoad() {
	// 데이터 테이블 컬럼 및 열그룹 구성
	var columnList = [
		{
			title: '<input type="checkbox" name="checkall" id="checkall">',
			data: "c_id",
			render: function (data, type, row) {
				if (type === "display") {
					return '<input type="checkbox" class="editor-active" name="c_id" value="' + data + '">';
				}
				return data;
			},
			className: "dt-body-center",
			visible: true
		},
		{
			name: "host_name",
			title: "<span data-locale='status.datatable.target_list.host_name'>Host Name</span>",
			data: "host_name",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "<div class='no-data'>N/A</div>";
					} else {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true
		},
		{
			name: "ip_address",
			title: "<span data-locale='status.datatable.target_list.ip_address'>IP</span>",
			data: "ip_address",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "";
					} else {
						var ipAddress = $("<div />").addClass("ajax-data").css({ whiteSpace: "nowrap" }).text(data);

						if (data.length > 15) {
							ipAddress
								.addClass("ipAddress_data")
								.attr("data-placement", "top")
								.attr("data-original-title", data)
								.text(getStrLimit(data, 15));
						}

						return ipAddress[0].outerHTML;
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "port",
			title: "<span data-locale='status.datatable.target_list.port'>접속포트</span>",
			data: "port",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "";
					} else {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "host_type",
			title: "<span data-locale='status.datatable.target_list.host_type'>Host Type</span>",
			data: "host_type",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "";
					} else {
						var hostType = data && data.toUpperCase();

						if (hostType === "DB") {
							return (
								"<div class='ajax-data' style='white-space: nowrap'><i class='fa fa-database'></i>&nbsp;" +
								data +
								"</div>"
							);
						} else {
							return (
								"<div class='ajax-data' style='white-space: nowrap'><i class='fa fa-server'></i>&nbsp;" +
								data +
								"</div>"
							);
						}
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: false,
			orderable: false
		},
		{
			name: "os_type",
			title: "<span data-locale='status.datatable.target_list.os_type'>OS Type</span>",
			data: "os_type",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (data == "WINDOW") {
						return "<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/windowIcon.png' width='15px' height='15px'>Windows</div>";
					} else if (data == "LINUX") {
						return "<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/linuxIcon.png' width='15px' height='15px'>Linux</div>";
					} else if (data == "UNIX") {
						return "<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/solarisIcon.png' width='15px' height='15px'>Unix</div>";
					} else if (isEmpty(data)) {
						return "";
					} else {
						return "<div style='white-space: nowrap;color: grey;'>" + data + "</label>";
					}
				}

				return data;
			},
			className: "dt-body-left",
			visible: false,
			orderable: false
		},
		{
			name: "user_name",
			title: "<span data-locale='status.datatable.target_list.user_name'>접속계정</span>",
			data: "user_name",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "";
					} else {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: false,
			orderable: false
		},
		{
			name: "ops_mode",
			title: "<span data-locale='status.datatable.target_list.ops_mode'>운영구분</span>",
			data: "ops_mode",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "";
					} else {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "collect_yn",
			title: "<span data-locale='status.datatable.target_list.collect_yn'>수집여부</span>",
			data: "collect_yn",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (data == "Y") {
						return "<div style='white-space: nowrap; color: #2D8515;'><i class='fa fa-link'></i> In progress</div>";
					} else if (data == "C") {
						return "<div style='white-space: nowrap; color: #2376FF;'><i class='fa fa-thumbs-up'></i> Completed</div>";
					}
					return "<div style='white-space: nowrap; color: #DB2A34;'><i class='fa fa-unlink'></i> Suspended</div>";
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "status",
			title: "<span data-locale='status.datatable.target_list.status'>수집상태</span>",
			data: "host_status",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (data == "1") {
						return "<div style='white-space: nowrap; color: #2D8515;'><span class='glyphicon glyphicon-ok-circle'></span> Success</div>";
					} else {
						return "<div style='white-space: nowrap; color: #DB2A34;'><span class='glyphicon glyphicon-ban-circle'></span> Fail</label>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "dbms_type",
			title: "<span data-locale='status.datatable.target_list.dbms_type'>DB 종류</span>",
			data: "dbms_type",
			render: function (data, type, row, meta) {
				if (type === "display") {
					var dbmsType = data && data.toLowerCase();

					if (dbmsType === "oracle") {
						return (
							"<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/oracle.png' width='15px' height='15px'>" +
							data +
							"</div>"
						);
					} else if (dbmsType === "mssql") {
						return (
							"<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/mssql.png' width='15px' height='15px'>" +
							data +
							"</div>"
						);
					} else if (dbmsType === "mysql") {
						return (
							"<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/mysql.png' width='15px' height='15px'>" +
							data +
							"</div>"
						);
					} else if (dbmsType === "mariadb") {
						return (
							"<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/mariadb.png' width='15px' height='15px'>" +
							data +
							"</div>"
						);
					} else if (dbmsType === "postgresql") {
						return (
							"<div class='ajax-data' style='white-space: nowrap'><img src='../../mad/img/targetInfo/postgresql.png' width='15px' height='15px'>" +
							data +
							"</div>"
						);
					} else {
						return "";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "dbid",
			title: "<span data-locale='status.datatable.target_list.dbid'>DB ID</span>",
			data: "dbid",
			render: function (data, type, row, meta) {
				if (type === "display") {
					var dbmsType;

					if (isEmpty(data)) {
						return "";
					}

					if (!isEmpty(row.dbms_type)) {
						dbmsType = row.dbms_type.toString().toLowerCase();
					}

					if (dbmsType === "oracle") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					} else if (dbmsType === "mssql") {
						return "";
					} else if (dbmsType === "mysql") {
						return "";
					} else if (dbmsType === "mariadb") {
						return "";
					} else if (dbmsType === "postgresql") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "sid",
			title: "<span data-locale='status.datatable.target_list.sid'>SID</span>",
			data: "sid",
			render: function (data, type, row, meta) {
				if (type === "display") {
					var dbmsType;

					if (isEmpty(data)) {
						return "";
					}

					if (!isEmpty(row.dbms_type)) {
						dbmsType = row.dbms_type.toString().toLowerCase();
					}

					if (dbmsType === "oracle") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					} else if (dbmsType === "mssql") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					} else if (dbmsType === "mysql") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					} else if (dbmsType === "mariadb") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					} else if (dbmsType === "postgresql") {
						return "<div class='ajax-data' style='white-space: nowrap'>" + data + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		},
		{
			name: "update_at",
			title: "<span data-locale='status.datatable.target_list.update_at'>최종 수집 일자</span>",
			data: "update_at",
			render: function (data, type, row, meta) {
				if (type === "display") {
					if (isEmpty(data)) {
						return "";
					} else {
						return "<div class='ajax-data' style='white-space: nowrap'>" + timestampToDatepicker(data) + "</div>";
					}
				}
				return data;
			},
			className: "dt-body-left",
			visible: true,
			orderable: false
		}
	];

	var rowsGroupList = [1, 2]; //그룹을 안쓰려면 null 처리
	var columnDefList = [
		{
			className: "select-checkbox",
			targets: 0,
			orderable: false,
			searchable: false,
		}
	];
	var selectList = {
		style: "multi",
		selector: "td:first-child"
	}; //멀티 선택일 때는 {style: 'multi'}
	var orderList = [[1, "asc"]];
	var buttonList = [
	];

	var jquerySelector = "#targetInfoTable";
	var ajaxUrl = "/auth-user/api/mad/host/getNodesWithoutRoot.do";
	var jsonRoot = "result";

	dataTableRef = dataTable_build(
		jquerySelector,
		ajaxUrl,
		jsonRoot,
		columnList,
		rowsGroupList,
		columnDefList,
		selectList,
		orderList,
		buttonList
	);
}

// 데이터 테이블 구성 이후 꼭 구현해야 할 메소드 : 열 클릭시 이벤트
function dataTableClick(tempDataTable, selectedData) {
	console.log(selectedData);
}

function dataTableDrawCallback(tableInfo) {
	$("#targetInfoTable").DataTable().columns.adjust().responsive.recalc();
}

// 데이터 테이블 데이터 렌더링 이후 콜백 함수.
function dataTableCallBack(settings, json) {
	$("input[name='targetHostId']").click(function () {
		var allPages = dataTableRef.cells().nodes();
		if ($("#checkall").val() == "on") {
			$("#checkall").prop("checked", false);
		}
	});

	$("#checkall").click(function () {
		var allPages = dataTableRef.cells().nodes();

		if ($(this).prop("checked")) {
			dataTableRef.rows().select();
			$(allPages).find("input[type='checkbox']").prop("checked", true);
		} else {
			dataTableRef.rows().deselect();
			$(allPages).find("input[type='checkbox']").prop("checked", false);
		}
	});

	$(".ipAddress_data").tooltip({
		html: true,
		template:
			"<div class='tooltip' role='tooltip'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>"
	});

	//////////////////////////////////////////////
	console.log("datatableCallback_DuplicateDefence =" + datatableCallback_DuplicateDefence);
	if (datatableCallback_DuplicateDefence < 2) {
		var collectY = 0;
		var collectN = 0;
		var statusYsum = 0;
		var statusNsum = 0;
		var table = $("#targetInfoTable").DataTable();
		var dataCount = $("#targetInfoTable").DataTable().column(1).data().length;

		table
			.rows()
			.data()
			.each(function (row, index) {
				var collectYn = row.collect_yn;
				var osType = row.os_type && row.os_type.toUpperCase();
				// console.log("[ targetInfo :: dataTableCallBack ] :: Data in index: " + index + " is: " + collectYn);

				if (["Y", "C"].includes(collectYn)) {
					// 수집중 or 수집완료 항목
					collectY = collectY + 1;

					if (row.host_status === "1") {
						statusYsum = statusYsum + 1;
					} else {
						statusNsum = statusNsum + 1;
					}
				} else {
					collectN = collectN + 1;
				}

				if (osType == "WINDOW") {
					windowCount = windowCount + 1;
				} else if (osType == "LINUX") {
					linuxCount = linuxCount + 1;
				} else if (osType == "UNIX") {
					unixCount = unixCount + 1;
				} else {
					etcCount = etcCount + 1;
				}
			});

		console.log("collectY: " + collectY);
		$("#collectSum").html(dataCount);

		$("#discoverSum").html(collectY);

		$("#statusY").html(statusYsum + " <span class='font12'> ea</span>");
		$("#statusN").html(statusNsum + " <span class='font11'> ea</span>");

		$("#collectY_label").html(collectY + " 개");
		$("#collectY_display").css("width", (collectY / dataCount) * 100 + "%");

		$("#collectN_label").html(collectN + " 개");
		$("#collectN_display").css("width", (collectN / dataCount) * 100 + "%");

		osStat();

		datatableCallback_DuplicateDefence++;
	}
}

function dataTableDrawCallback(tableInfo) {
	console.log(tableInfo);
}


////////////////////////////////////////////////////////////////////////////////////////
// --- 크론 컨트롤 --- //
////////////////////////////////////////////////////////////////////////////////////////

function cronInit() {
	var croneditor = cronCreator("0 * * * * *");
	croneditor.initByCronArr();
	croneditor.drawCronByCronArr();
}

function popupLayer_CronBtn() {
	$("#popup_Btn_Cron_Init").click(function () {
		cronInit();
	});

	$("#popup_Btn_Cron_Simulate").click(function () {
		var cronExpression = $("#popup_cron_expression").val();
		if (cronExpression === null || cronExpression === undefined || cronExpression === "") {
			jError(
				{
					ko: "클론 표현식을 입력해주세요.",
					en: "Please enter a clone expression.",
					jp: "クローン式を入力してください。"
				}[getCookie("locale") || "ko"]
			);
			return;
		}

		$.ajax({
			url: `/auth-user/schedules/simulate`,
			withCredentials: true,
			type: "post",
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify({
				cronExpression: cronExpression
			}),
			statusCode: {
				200: function (d) {
					console.log("cron_predict->" + JSON.stringify(d));
					if (d.response.length > 1) {
						$(".chat-message-body").show();
					}
					$(".chat-message-body .text").empty();

					$.each(d.response, function (index, value) {
						if (index < 5) {
							var newSpan = $("<span>")
								.css({
									color: "#f8f8f8",
									display: "block"
								})
								.attr("id", "result_" + index);

							var divElement = $(".text");
							divElement.append(newSpan);

							newSpan.delay(index * 300).queue(function (next) {
								$(this).unityping({
									string: [value],
									typingSpeed: 9000,
									startDelay: 10,
									backSpeed: 100,
									backDelay: 500
								});
								next();
							});
						}
					});
				}
			},
			error: function (e) {}
		});
	});

	$("#collectScheduleSetting").click(function () {
		$(".chat-message-body").hide();
		$(".chat-message-body .text").empty();
		$("#popup_service_name").find(".btn.active").removeClass("active");
		$("input:radio[name='popup_service_name_select_option']").first().parent().addClass("active");
		$("input:radio[name='popup_service_name_select_option']").first().prop("checked", true);
		get_schedule("target-info-app");
	});

	$("#popup_Btn_Cron_Save").click(function () {
		var serviceName = "";
		var cronExpression = $("#popup_cron_expression").val();

		const btn_defaults = $("#popup_service_name .btn-default");

		for (let i = 0; i < btn_defaults.length; i++) {
			const btn = btn_defaults[i];
			if (btn.classList.contains("active")) {
				const radioButton = btn.querySelector('input[type="radio"]');
				serviceName = radioButton.value;
			}
		}

		if (cronExpression === null || cronExpression === undefined || cronExpression === "") {
			jError(
				{
					ko: "클론 표현식을 입력해주세요.",
					en: "Please enter a clone expression.",
					jp: "クローン式を入力してください。"
				}[getCookie("locale") || "ko"]
			);
			return;
		}

		$.ajax({
			url: `/auth-user/schedule/apply/${serviceName}`,
			withCredentials: true,
			type: "post",
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify({
				cronExpression: cronExpression,
				targetUrl: "http://mad-engine:8080/engine/" + serviceName + "/start"
			}),
			statusCode: {
				200: function () {
					if (serviceName.indexOf("target-info-app") > -1) {
						Chat.sendMessage(" 애플리케이션 수집을 시작 하였습니다. ");
					}
					if (serviceName.indexOf("target-info-db") > -1) {
						Chat.sendMessage(" 데이터베이스 수집을 시작 하였습니다. ");
					}
					get_schedule(serviceName);
					jSuccess(
						{
							ko: "저장되었습니다.",
							en: "Saved.",
							jp: "保存されました。"
						}[getCookie("locale") || "ko"]
					);
				},
				400: function (d) {
					jError(d.responseJSON.error.message);
				}
			},
			error: function (e) {}
		});
	});
}

function service_name_select_option_init() {
	$("input:radio[name='popup_service_name_select_option']:input[value='target-info-app']").parent().addClass("active");
	$("input:radio[name='popup_service_name_select_option']:input[value='target-info-app']").prop("checked", true);
	get_schedule("target-info-app");

	$("input:radio[name='popup_service_name_select_option']").change(function () {
		get_schedule(this.value);
	});

	$("#main-tab li:first-child").hide();
	$("#tabs-second").hide();
	$("#popup_cron_expression").prop("readOnly", "false");
}

function get_schedule(serviceName) {
	$.ajax({
		url: "/auth-user/schedules/" + serviceName,
		withCredentials: true,
		type: "get",
		contentType: "application/json;charset=UTF-8",
		statusCode: {
			200: executeOnce // 클로저 함수를 200 상태 코드 핸들러로 사용
		},
		beforeSend: function () {
			//$("#regist-pdService").hide(); 버튼 감추기
		},
		complete: function () {
			//$("#regist-pdService").show(); 버튼 보이기
		},
		error: function (e) {
			//jError("타겟 인포 수정 중 문제가발생했습니다.");
		}
	});
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

let executeOnce = (function () {
	let executed = false;

	return function(data) {
		// 한 번만 실행되는 코드

		let croneditor = cronCreator(data.response.cronExpression === null ? "0 * * * * *" : data.response.cronExpression);
		console.log(data.response.cronExpression);
		if (data.response.cronExpression === null) {
			$("#popup_Btn_Cron_Save").text("신규 저장");
			$("#popup_Btn_Cron_Save").removeClass("btn-success").addClass("btn-primary");
		} else {
			$("#popup_Btn_Cron_Save").text("변경 저장");
			$("#popup_Btn_Cron_Save").removeClass("btn-primary").addClass("btn-success");
		}

		if (executed) {
			croneditor.initByCronArr();
			croneditor.drawCronByCronArr();
			return;
		}
		executed = true;
		croneditor.drawEachMinutes();
		croneditor.drawEachHours();
		croneditor.drawEachDays();
		croneditor.drawEachMonths();
		croneditor.drawEachWeek();
		croneditor.drawCronByCronArr();
	};
})();
//


////////////////////////////////////////////////////////////////////////////////////////
// --- 유틸 --- //
////////////////////////////////////////////////////////////////////////////////////////

function mockData(stream_names, points_count) {
	return stream_layers(stream_names.length, points_count, 0.1).map(function (data, i) {
		return {
			key: stream_names[i],
			values: data.map(function (d, j) {
				return {
					y: 0 //just a coefficient
				};
			})
		};
	});
}

function osStat() {
	var testData = mockData(["Windows", "Linux", "UNIX", "ETC"], 25); // just 25 points, since there are lots of charts
	var pieFooter = d3.select("#data-chart-footer");
	var pieChart;

	nv.addGraph(function () {
		/*
		 * we need to display total amount of visits for some period
		 * calculating it
		 * pie chart uses y-property by default, so setting sum there.
		 */
		console.log("testData.length = " + testData.length);
		testData[0].y = windowCount;
		testData[1].y = linuxCount;
		testData[2].y = unixCount;
		testData[3].y = etcCount;

		var chart = nv.models
			.pieChartTotal()
			.x(function (d) {
				return d.key;
			})
			.margin({ top: 0, right: 20, bottom: 20, left: 20 })
			.values(function (d) {
				return d;
			})
			.color(COLOR_VALUES)
			.showLabels(true)
			.showLegend(false)
			.tooltipContent(function (key, y, e, graph) {
				return "<h4>" + key + "</h4>" + "<p>" + roundToPrecision((100 * y) / sum, 1) + "%</p>";
			})
			.total(function (count) {
				return "<div class='visits'>" + count + "<br/> HOST </div>";
			})
			.donut(true);
		chart.pie.margin({ top: 10, bottom: -20 });

		var sum = d3.sum(testData, function (d) {
			return d.y;
		});

		if (footerCheck == 0) {
			pieFooter
				.append("div")
				.classed("controls", true)
				.selectAll("div")
				.data(testData)
				.enter()
				.append("div")
				.classed("control", true)
				.style("border-top", function (d, i) {
					return "3px solid " + COLOR_VALUES[i];
				})
				.html(function (d) {
					//return "<div class='key'>" + d.key + "</div>" + "<div class='value'>" + Math.floor(100 * d.y / sum) + "%</div>";
					return (
						"<div class='key'>" +
						d.key +
						"</div>" +
						"<div class='value'>" +
						Math.floor(d.y) +
						"<span class='font11'> ea ( " +
						Math.floor((100 * d.y) / sum) +
						"% )</span></div>"
					);
				});
			footerCheck = footerCheck + 1;
		}

		d3.select("#sources-chart-pie svg").datum([testData]).transition(500).call(chart);
		nv.utils.windowResize(chart.update);

		d3.selectAll(".nv-label text").each(function (d, i) {
			d3.select(this).style("fill", colors[i]);
			d3.select(this).style("font-weight", 500);
			d3.select(this).style("font-size", 11);
		});

		pieChart = chart;

		return chart;
	});
}