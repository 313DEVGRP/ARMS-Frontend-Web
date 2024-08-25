var selectedPdServiceId; // 제품(서비스) 아이디
var selectedVersionIds; // 선택된 버전 아이디
var selectedAlmProjectIds; // 선택된 ALM Project 아이디
var previousStartDate = null;
var previousEndDate = null;
var pdServiceListData;
var versionListData;

var resourceDataTable; //
var selectedIndex; // 데이터테이블 선택한 인덱스
var selectedPage; // 데이터테이블 선택한 인덱스

var table;
var mockData = {assignees : "", excelMock: ""};//
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
			"../reference/lightblue4/docs/lib/widgster/widgster.js",
			"../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js",
			"../reference/jquery-plugins/timerStyles.js"
		],
		[
			"../reference/jquery-plugins/select2-4.0.2/dist/css/select2_lightblue4.css",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/css/multiselect-lightblue4.css",
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select-bluelight.css",
			"../reference/jquery-plugins/select2-4.0.2/dist/js/select2.min.js",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.quicksearch.js",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.multi-select.js",
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select.min.js",
			//날짜 검색
			"../reference/light-blue/lib/bootstrap-datepicker.js",
			"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
			"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js"
		],
		[	// lightblue4
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
		],
		[
			"../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jsuites.js",
			"../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/index.js",
			"../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jsuites.css",
			"../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.css",
			"../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.datatables.css",
			"../reference/jquery-plugins/jspreadsheet-ce-4.13.1/dist/jspreadsheet.theme.css",
			"./js/common/jspreadsheet/spreadsheet.js",
			"./css/jspreadsheet/custom_sheet.css",
			//chart Colors
			"./js/common/colorPalette.js",
			"./js/common/table.js",
			"./js/report/resourceTable.js"
			// 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.(그룹 최대 4개)
		]

	];

	loadPluginGroupsParallelAndSequential(pluginGroups)
		.then(function() {

			console.log('모든 플러그인 로드 완료');

			//사이드 메뉴 처리
			$('.widget').widgster();
			setSideMenu("sidebar_menu_report", "sidebar_menu_report_full_data");

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

			//제품(서비스) 셀렉트 박스 이니시에이터
			makePdServiceSelectBox();
			//버전 멀티 셀렉트 박스 이니시에이터
			makeVersionMultiSelectBox();
			// ALM 프로젝트 멀티 셀렉트 박스 이니시에이터
			makeProjectMultiSelectBox();
			//날짜
			dateTimePicker();

			// 높이 조정
			$('.top-menu-div').matchHeight({
				target: $('.top-menu-div-default')
			});

			mockData.excelMock = [
					{
					"제품(서비스) 키": "25",
					"제품(서비스) 명": "ALM RMS",
					"버전 키": "77",
					"버전 명": "24년8월",
					"작업자 명": "YHS",
					"C_REQ_LINK": "3",
					"요구사항 구분": "요구사항",
					"ALM 이슈 제목": "요구사항 이슈입니다. 해결해주세요",
					"ALM 이슈 상태": "진행 중(in-progress)",
					"ALM 이슈 우선순위": "높음",
					"ALM 이슈 생성일": "2024/08/01",
					"ALM 이슈 수정일": "2024/08/05",
					"ALM 이슈 해결일": "",
					"ALM 이슈 삭제여부": ""
				},
				{
					"제품(서비스) 키": "25",
					"제품(서비스) 명": "ALM RMS",
					"버전 키": "76",
					"버전 명": "24년7월",
					"작업자 명": "HSH",
					"C_REQ_LINK": "6",
					"요구사항 구분": "요구사항",
					"ALM 이슈 제목": "요구사항 이슈입니다. 해결해주세요",
					"ALM 이슈 상태": "해결됨(resolved)",
					"ALM 이슈 우선순위": "높음",
					"ALM 이슈 생성일": "2024/07/21",
					"ALM 이슈 수정일": "2024/08/01",
					"ALM 이슈 해결일": "2024/08/05",
					"ALM 이슈 삭제여부": ""
				}
			];

			// 테이블 초기화
			table = initTable();

		})
		.catch(function(e) {
			console.error('플러그인 로드 중 오류 발생');
			console.error(e);
		});

}//.execDocReady

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
				pdServiceListData = [];
				for (var k in data.response) {
					var obj = data.response[k];
					pdServiceListData.push({ "pdServiceId": obj.c_id, "pdServiceName": obj.c_title });
					var newOption = new Option(obj.c_title, obj.c_id, false, false);
					$("#selected_pdService").append(newOption).trigger("change");
				}
				//////////////////////////////////////////////////////////
				console.log("[fullDataSheet :: makePdServiceSelectBox] :: pdServiceListData => ");
				console.table(pdServiceListData);
			}
		}
	});

	$("#selected_pdService").on("select2:open", function() {
		//슬림스크롤
		makeSlimScroll(".select2-results__options");
	});

	// --- select2 ( 제품(서비스) 검색 및 선택 ) 이벤트 --- //
	$("#selected_pdService").on("select2:select", function(e) {
		selectedPdServiceId = $("#selected_pdService").val();
		//refreshDetailChart(); 변수값_초기화();
		// 제품( 서비스 ) 선택했으니까 자동으로 버전을 선택할 수 있게 유도
		// 디폴트는 base version 을 선택하게 하고 ( select all )
		//~> 이벤트 연계 함수 :: Version 표시 jsTree 빌드
		bind_VersionData_By_PdService();
	});
} // end makePdServiceSelectBox()

function bind_VersionData_By_PdService() {
	$("#multiple-version option").remove();
	$.ajax({
		url: "/auth-user/api/arms/pdService/getVersionList.do?c_id=" + $("#selected_pdService").val(),
		type: "GET",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function(data) {
				//////////////////////////////////////////////////////////
				var pdServiceVersionIds = [];
				versionListData = [];
				for (var k in data.response) {
					var obj = data.response[k];
					pdServiceVersionIds.push(obj.c_id);
					versionListData.push({"c_id" : obj.c_id, "c_title" : obj.c_title,
																"start_date" : obj.c_pds_version_start_date,
																"end_date" : obj.c_pds_version_end_date});
					var newOption = new Option(obj.c_title, obj.c_id, true, false);
					$("#multiple-version").append(newOption);
				}
				selectedVersionIds = pdServiceVersionIds.join(",");

				$("#multiple-version")
					.multipleSelect("refresh")
					.multipleSelect("checkAll");

				// 시작일 종료일 세팅(datetimepicker)
				setEdgeDateRange(versionListData);
				// 선택 된 제품 버전에 해당하는 ALM 프로젝트 조회
				fetchJiraProjects(selectedPdServiceId, selectedVersionIds);
				if (data.length > 0) {
					console.log("display 재설정.");
				}
			}
		}
	});
}

////////////////////////////////////////
//버전 멀티 셀렉트 박스
////////////////////////////////////////
function makeVersionMultiSelectBox() {
	//버전 선택시 셀렉트 박스 이니시에이터
	$("#multiple-version").multipleSelect({
		filter: true,
		// selectBox 닫혔을 때
		onClose: function() {
			var versionTag = $("#multiple-version").val();
			console.log("[ fullDataSheet :: makeVersionMultiSelectBox ] :: versionTag");
			console.log(versionTag);
			selectedVersionIds = versionTag.join(",");

			if (versionTag === null || versionTag == "") {
				alert("버전이 선택되지 않았습니다.");
				return;
			}

			let filteredVersionData = versionListData.filter(item => versionTag.includes(item.c_id.toString()));
			// 시작일 종료일 세팅(datetimepicker)
			setEdgeDateRange(filteredVersionData);
			fetchJiraProjects(selectedPdServiceId, selectedVersionIds);

			$("#multiple-version").siblings(".ms-parent").css("z-index", 1000);
		},
		// selectBox 열렸을 때
		onOpen: function() {
			$("#multiple-version").siblings(".ms-parent").css("z-index", 9999);
		}
	});
}

////////////////////////////////////////
// ALM 프로젝트 select 이벤트 핸들링
////////////////////////////////////////
function makeProjectMultiSelectBox () {
	// ALM 프로젝트 선택 시 셀렉트 박스 이니시에이터
	$("#multiple-alm-project").multipleSelect({
		filter: true,
		onClose: function() {
			let projectIds = $("#multiple-alm-project").val();
			selectedAlmProjectIds = projectIds.join(",");

			if (selectedAlmProjectIds === null || selectedAlmProjectIds == "") {
				alert("ALM 프로젝트가 선택되지 않았습니다.");
				return;
			}

			let optionalParams = {
				startDate: $('#date_timepicker_start').val(),
				endDate: $('#date_timepicker_end').val()
			};

			if (!isAllVersionsSelected()) {
				optionalParams.pdServiceVersionIds = selectedVersionIds;
			}

			optionalParams.almProjectIds = selectedAlmProjectIds;

			fetchAssignees(selectedPdServiceId, optionalParams);

			fetchExcelData(selectedPdServiceId, optionalParams);

			$("#multiple-alm-project").siblings(".ms-parent").css("z-index", 1000);
		},
		onOpen: function() {
			$("#multiple-alm-project").siblings(".ms-parent").css("z-index", 9999);
		}
	});
}

////////////////////////////////////////
// 검색 조건을 선택하여 API 호출 시, 제품 버전이 모두 선택되어 있는지 체크하는 함수
// 모두 선택 된 경우, query param 으로 보낼 필요가 없기 때문
////////////////////////////////////////
function isAllVersionsSelected() {
	if (!selectedVersionIds) {
		return false;
	}
	return $("#multiple-version option").length === selectedVersionIds.split(",").length;
}

////////////////////////////////////////
// 검색 조건을 선택하여 API 호출 시, ALM 프로젝트가 모두 선택되어 있는지 체크하는 함수
// 모두 선택 된 경우, query param 으로 보낼 필요가 없기 때문
////////////////////////////////////////
function isAllProjectsSelected() {
	if (!selectedAlmProjectIds) {
		return false;
	}
	return $("#multiple-alm-project option").length === selectedAlmProjectIds.split(",").length;
}

////////////////////////////////////////
// 선택 된 제품, 제품 버전 ID 값을 서버에 전달하여 관련 ALM 프로젝트 목록 조회
////////////////////////////////////////
function fetchJiraProjects(pdServiceId, versionIds = null) {
	let url = "/auth-user/api/arms/jiraProjectPure/getJiraProjects.do?pdServiceId=" + pdServiceId;

	let optionalParams = {
		startDate: $('#date_timepicker_start').val(),
		endDate: $('#date_timepicker_end').val()
	};

	if (versionIds) {
		url += "&pdServiceVersionIds=" + versionIds;
	}

	if (!isAllVersionsSelected()) {
		optionalParams.pdServiceVersionIds = versionIds;
	}

	$("#multiple-alm-project option").remove();

	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: function(data) {
			console.log("[Jira Projects] Data:", data);
			let projectIds = [];
			for (var k in data.response) {
				let obj = data.response[k];
				projectIds.push(obj.c_id);
				let newOption = new Option(obj.c_title, obj.c_id, true, false);
				$("#multiple-alm-project").append(newOption);
			}
			selectedAlmProjectIds = projectIds.join(",");

			$("#multiple-alm-project")
				.multipleSelect("refresh")
				.multipleSelect("checkAll");

			optionalParams.almProjectIds = selectedAlmProjectIds;

			fetchAssignees(selectedPdServiceId, optionalParams);

			fetchExcelData(selectedPdServiceId, optionalParams);

		},
		error: function(xhr, status, error) {
			console.error("[Jira Projects] Error:", error);
		}
	});
}

////////////////////////////////////////
// 모든 검색 필터(제품, 제품 버전, ALM 프로젝트, 날짜 등) 선택이 완료 된 경우, 데이터를 조회한다.
////////////////////////////////////////
function fetchAssignees(pdServiceId, optionalParams = {}) {
	if (!pdServiceId) {
		jError("제품(서비스)가 선택되지 않았습니다.");
		return false;
	}

	let urlBuilder = new UrlBuilder()
		.setBaseUrl('/auth-user/api/arms/report/full-data/assignees')
		.addQueryParam('pdServiceId', pdServiceId);

	const { pdServiceVersionIds = null, almProjectIds = null, startDate = null, endDate = null, emailAddress = null } = optionalParams;

	const optionalQueryParams = { pdServiceVersionIds, almProjectIds, startDate, endDate, emailAddress };

	Object.entries(optionalQueryParams).forEach(([key, value]) => {
		if (value) {
			urlBuilder.addQueryParam(key, value);
		}
	});

	const url = urlBuilder.build();

	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: function(data) {
			console.log(data.response);
			table.redrawTable(data.response);
		},
		error: function(xhr, status, error) {
			console.error(error);
		}
	});
}

function fetchExcelData(pdServiceId, optionalParams = {}) {

	if (!pdServiceId) {
		jError("제품(서비스)가 선택되지 않았습니다.");
		return false;
	}

	let urlBuilder = new UrlBuilder()
		.setBaseUrl(`/auth-user/api/arms/report/full-data/T_ARMS_REQADD_${pdServiceId}/excel-data`)
		.addQueryParam('pdServiceId', pdServiceId)
		.addQueryParam('page', 0)
		.addQueryParam('size', 1000);

	const { pdServiceVersionIds = null, almProjectIds = null, startDate = null, endDate = null, emailAddress = null } = optionalParams;

	const optionalQueryParams = { pdServiceVersionIds, almProjectIds, startDate, endDate, emailAddress };

	Object.entries(optionalQueryParams).forEach(([key, value]) => {
		if (value) {
			urlBuilder.addQueryParam(key, value);
		}
	});

	const url = urlBuilder.build();
	console.log("[ reportFullData :: fetchExcelData ] ::requestURL => ", url);
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: function(data) {
			console.log("[ reportFullData :: fetchExcelData ] :: excelData => start ");
			console.log(data.response);
			console.log("[ reportFullData :: fetchExcelData ] :: excelData <== end ");
			//drawExcel("spreadsheet", data.response);
		},
		error: function(xhr, status, error) {
			console.error(error);
		}
	});
}


////////////////////////////////////////
// 기간 설정 세팅
////////////////////////////////////////
function dateTimePicker() {
	$('#date_timepicker_start').datetimepicker({
		format: 'Y-m-d', // 날짜 및 시간 형식 지정
		formatDate: 'Y/m/d',
		timepicker: false,
		theme: 'dark',
		lang: "kr",
		onShow: function(ct) {
			this.setOptions({
				maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
			});
		},
		onChangeDateTime: function(dp, $input) {
			let newStartDate = $input.val();
			if (previousEndDate !== newStartDate) {
				previousEndDate = newStartDate;

				let optionalParams = {
					startDate: newStartDate,
					endDate: $("#date_timepicker_end").val()
				};

				if (!isAllVersionsSelected()) {
					optionalParams.pdServiceVersionIds = selectedVersionIds;
				}

				optionalParams.almProjectIds = selectedAlmProjectIds;

				fetchAssignees(selectedPdServiceId, optionalParams);

				fetchExcelData(selectedPdServiceId, optionalParams);
			}
		}
	});
	$('#date_timepicker_end').datetimepicker({
		format: 'Y-m-d', // 날짜 및 시간 형식 지정
		formatDate: 'Y/m/d',
		timepicker: false,
		theme: 'dark',
		lang: "kr",
		onShow: function(ct) {
			this.setOptions({
				minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
			});
		},
		onChangeDateTime: function(dp, $input) {
			let newEndDate = $input.val();
			if (previousStartDate !== newEndDate) {
				previousStartDate = newEndDate;

				let optionalParams = {
					startDate: $("#date_timepicker_start").val(),
					endDate: newEndDate
				};

				if (!isAllVersionsSelected()) {
					optionalParams.pdServiceVersionIds = selectedVersionIds;
				}

				optionalParams.almProjectIds = selectedAlmProjectIds;

				fetchAssignees(selectedPdServiceId, optionalParams);

				fetchExcelData(selectedPdServiceId, optionalParams);
			}
		}
	});
}


////////////////////////////////////////
// 선택한 버전 - min,max 날짜 세팅
////////////////////////////////////////
function setEdgeDateRange(versionData) {

	if (!versionData || Object.keys(versionData).length === 0) {
		console.log("[ fullDataSheet :: setEdgeDateRange ] :: versionData 가 없습니다.");
		return false;
	}

	let minMaxDate = versionData.reduce((acc, curr) => {
		const startDate = new Date(curr.start_date);
		const endDate = new Date(curr.end_date);

		if (!acc.min || startDate < acc.min) {
			acc.min = startDate;
		}

		if (!acc.max || endDate > acc.max) {
			acc.max = endDate;
		}

		return acc;
	}, { min: null, max: null });
	console.log("[ fullDataSheet :: setEdgeDateRange ] :: " +
		"minMaxDate.min => " + minMaxDate.min+ ", minMaxDate.max => " +minMaxDate.max);

	const oneMonthAgo = new Date(minMaxDate.max);
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

	if (oneMonthAgo < minMaxDate.min) {
		oneMonthAgo.setTime(minMaxDate.min.getTime());
	}

	$('#date_timepicker_start').datetimepicker('setOptions', {
		minDate: minMaxDate.min,
		maxDate: minMaxDate.max,
		value: oneMonthAgo
	});

	$('#date_timepicker_end').datetimepicker('setOptions', {
		minDate: minMaxDate.min,
		maxDate: minMaxDate.max,
		value: minMaxDate.max
	});

	// $('#date_timepicker_start').datetimepicker('setOptions', { value: minMaxDate.min });
	// $('#date_timepicker_end').datetimepicker('setOptions', { value: minMaxDate.max });
}

////////////////////////////////////////
// resource 목록 정보
////////////////////////////////////////
var initTable = function() {
	var resourceTable = new $.fn.ResourceTable("#resource_table");

	resourceTable.dataTableBuild({
		rowGroup: [0],
		isAddCheckbox: true,
		autoWidth: false,
		idColumnIndex: 1
	});


	resourceTable.onAfterUpdate = function() {
		let optionalParams = {
			startDate: $("#date_timepicker_start").val(),
			endDate: $("#date_timepicker_end").val()
		};
		if (!isAllVersionsSelected()) {
			optionalParams.pdServiceVersionIds = selectedVersionIds;
		}

		optionalParams.almProjectIds = selectedAlmProjectIds;

		setTimeout(() => {
			let selectedIds = resourceTable.getSelectedIds();
			if (!resourceTable.isAllOrZeroRowsSelected() && selectedIds.length > 0) {
				optionalParams.emailAddress = selectedIds;
			}
			fetchExcelData(selectedPdServiceId, optionalParams);
		}, 0);
	};

	return {
		resourceTable: resourceTable,
		redrawTable: resourceTable.reDraw.bind(resourceTable)
	};
};

// -------------------- 데이터 테이블을 만드는 템플릿으로 쓰기에 적당하게 리팩토링 함. ------------------ //

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

/////////////////////////////////////////////////////
// 엑셀 그리기
/////////////////////////////////////////////////////
function drawExcel(targetId, data) {
	console.log("fullDataSheet :: drawExcel");
	console.log(data);
	let $targetId = "#" + targetId;

	if ($($targetId)[0].jexcel) {
		console.log($($targetId)[0].jexcel);
		$($targetId)[0].jexcel.destroy();
	}
	console.log("width=> " + $($targetId).width());
	var excelWidth = $($targetId).width() - 50;

	var columnList = [
		{ readOnly: true, type: "text", title: "제품(서비스) 키", wRatio: 0.1 }, //0
		{ readOnly: true, type: "text", title: "제품(서비스) 명", wRatio: 0.1 },
		{ readOnly: true, type: "text", title: "버전 키", wRatio: 0.05 },
		{ readOnly: true, type: "text", title: "버전 명", wRatio: 0.1 },
		{ readOnly: true, type: "text", title: "작업자", wRatio: 0.1 }, //4
		{ readOnly: true, type: "text", title: "C_REQ_LINK", wRatio: 0.08 },
		{ readOnly: true, type: "text", title: "요구사항 구분", wRatio: 0.1 }, // 요구사항 이슈, 연결이슈, 하위이슈
		{ readOnly: true, type: "text", title: "ALM 이슈 제목", wRatio: 0.2 },
		{ readOnly: true, type: "text", title: "ALM 이슈 상태", wRatio: 0.1 },
		{ readOnly: true, type: "text", title: "ALM 이슈 우선순위", wRatio: 0.1 }, //9
		{ readOnly: true, type: "calendar", title: "ALM 이슈 생성일", wRatio: 0.1 },
		{ readOnly: true, type: "calendar", title: "ALM 이슈 수정일", wRatio: 0.1 },
		{ readOnly: true, type: "calendar", title: "ALM 이슈 해결일", wRatio: 0.1 },
		{ readOnly: true, type: "text", title: "ALM 이슈 삭제여부", wRatio: 0.1 }
	];


	// 1. 제품(서비스) 이름
	// 2. 제품(서비스) 버전 ( 시작 날짜~ 종료 날짜 표시 )
	// 3. 연결된 ALM Project 이름
	// 4. 암스가 생성한 요구사항 제목
	// 5. 암스가 생성한 요구사항 상태 ( 암스의 상태 / 고객사 맵핑 상태 )
	// 6. 요구사항 이슈의 담당자
	// 7. ALM 에 생성된 요구사항 이슈의 상태 ( ALM 상태 )
	// 6. 요구사항 이슈의 하위 이슈 개수 / 연결 이슈 개수
	// 7. 요구사항 이슈의 생성된 날짜
	// 8. 요구사항 이슈의 최근 업데이트 날짜
	// 9. 요구사항 이슈의 해결된 날짜 / 닫힘이 된 날짜

	var columnList_수정_key제외 = [
		{ readOnly: true, type: "text", title: "제품(서비스)", wRatio: 0.1 },				//0
		{ readOnly: true, type: "text", title: "버전(일정)", wRatio: 0.1 }, 					//1 버전(시작일 ~ 종료일)
		{ readOnly: true, type: "text", title: "ALM Project", wRatio: 0.1 }, 				//2 ALM Project
		{ readOnly: true, type: "text", title: "요구사항 구분", wRatio: 0.1 }, 			//3 요구사항 이슈, 연결이슈, 하위이슈
		{ readOnly: true, type: "text", title: "A-RMS 요구사항", wRatio: 0.1 },  		//4 암스가 생성한 요구사항
		{ readOnly: true, type: "text", title: "A-RMS 요구사항 상태", wRatio: 0.1 }, //5 암스 요구사항 상태
		{ readOnly: true, type: "text", title: "ALM 이슈 제목", wRatio: 0.2 },				//6
		{ readOnly: true, type: "text", title: "ALM 이슈 상태", wRatio: 0.1 }, 			//7
		{ readOnly: true, type: "text", title: "ALM 이슈 담당자", wRatio: 0.1 }, 		//8
		{ readOnly: true, type: "calendar", title: "ALM 이슈 생성일", wRatio: 0.1 }, //9
		{ readOnly: true, type: "calendar", title: "ALM 이슈 수정일", wRatio: 0.1 }, //10
		{ readOnly: true, type: "calendar", title: "ALM 이슈 해결일", wRatio: 0.1 }, //11 해결된 날짜 또는 닫힌 날짜
	];

	var columnList_수정_키포함 = [
		{ readOnly: true, type: "text", title: "제품(서비스) 키", wRatio: 0.1 }, 		//0
		{ readOnly: true, type: "text", title: "제품(서비스)", wRatio: 0.1 },				//1
		{ readOnly: true, type: "text", title: "버전 키", wRatio: 0.1 },				  		//2
		{ readOnly: true, type: "text", title: "버전(일정)", wRatio: 0.1 }, 					//3 버전(시작일 ~ 종료일)
		{ readOnly: true, type: "text", title: "ALM Project 키", wRatio: 0.1 }, 			//4 ALM Project
		{ readOnly: true, type: "text", title: "ALM Project", wRatio: 0.1 }, 				//5 ALM Project
		{ readOnly: true, type: "text", title: "요구사항 구분", wRatio: 0.1 }, 			//6 요구사항 이슈, 연결이슈, 하위이슈
		{ readOnly: true, type: "text", title: "C_REQ_LINK", wRatio: 0.1 }, 				  //7
		{ readOnly: true, type: "text", title: "A-RMS 요구사항", wRatio: 0.1 },  	  //8 암스가 생성한 요구사항
		{ readOnly: true, type: "text", title: "A-RMS 요구사항 상태", wRatio: 0.1 }, //9 암스 요구사항 상태
		{ readOnly: true, type: "text", title: "ALM 이슈 제목", wRatio: 0.2 },				//10
		{ readOnly: true, type: "text", title: "ALM 이슈 상태", wRatio: 0.1 }, 	 		//11
		{ readOnly: true, type: "text", title: "ALM 이슈 담당자", wRatio: 0.1 }, 		//12
		{ readOnly: true, type: "calendar", title: "ALM 이슈 생성일", wRatio: 0.1 }, //13
		{ readOnly: true, type: "calendar", title: "ALM 이슈 수정일", wRatio: 0.1 }, //14
		{ readOnly: true, type: "calendar", title: "ALM 이슈 해결일", wRatio: 0.1 }, //15 해결된 날짜 또는 닫힌 날짜
	];
}

/////////////////////////////////////////////////
// 엑셀 그리기
/////////////////////////////////////////////////
function drawExcel(target, data) {
	var columnList = [
		{ type: "text", title: "이름", wRatio: 0.25, readOnly: true },
		{ type: "text", title: "키",   wRatio: 0.25, readOnly: true },
		{ type: "text", title: "연봉", wRatio: 0.5 }
	];


	var customOption = {
		pagination: 30,
		contextMenu: [],
		search: true,
		allowInsertRow: false,
		allowInsertColumn: false,
		updateTable: function(instace, cell, col, row, val, id) {
			cell.style.whiteSpace = "normal";
			cell.style.whiteSpace = "normal";
			if (col === 0 || col === 2 || col === 5) {
				cell.style.textAlign = "right";
				cell.style.color = "#a4c6ff";
			} else if (col === 1 || col === 4 || col === 7) {
				cell.style.textAlign = "left";
			}
		}
	};
	SpreadsheetFunctions.setTargetId(target);
	SpreadsheetFunctions.setDefaultTargetRect();

	SpreadsheetFunctions.setColumns(columnList);
	SpreadsheetFunctions.setColumnWidth(SpreadsheetFunctions.getTargetRect("width"));
	SpreadsheetFunctions.setOptions(customOption);
	SpreadsheetFunctions.startObserver();
	SpreadsheetFunctions.setExcelData(data);
	SpreadsheetFunctions.drawExcel(SpreadsheetFunctions.getTargetId());
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