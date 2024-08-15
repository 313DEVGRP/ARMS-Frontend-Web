var selectedPdServiceId; // 제품(서비스) 아이디
var selectedVersionId; // 선택된 버전 아이디

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
			"../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js"
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
			"./css/jspreadsheet/custom_icon.css",
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


			//제품(서비스) 셀렉트 박스 이니시에이터
			makePdServiceSelectBox();
			//버전 멀티 셀렉트 박스 이니시에이터
			makeVersionMultiSelectBox();
			//날짜
			dateTimePicker();

			// 높이 조정
			$('.top-menu-div').matchHeight({
				target: $('.top-menu-div-default')
			});
			mockData.assignees = [{
				"assignee_accountId": "616fc9fa327da40069b4ed4f",
				"assignee_emailAddress": "JY.J@abcde.com",
				"assignee_displayName": "JJY"
			},
				{
					"assignee_accountId": "712020:ecc44245-6be8-4962-9a66-888bdb4f8e3a",
					"assignee_emailAddress": "HS.Y@abcde.com",
					"assignee_displayName": "YHS"
				},
				{
					"assignee_accountId": "616f6f04860f78006bbafe38",
					"assignee_emailAddress": "SH.H@abcde.com",
					"assignee_displayName": "HSH"
				},
				{
					"assignee_accountId": "63b2a039159df2c252e826e9",
					"assignee_emailAddress": "DM.L@abcde.com",
					"assignee_displayName": "LDM"
				},
				{
					"assignee_accountId": "621ee5a449c90000701efe06",
					"assignee_emailAddress": "MG.L@abcde.com",
					"assignee_displayName": "LMG"
				}];
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
		drawExcel("spreadsheet", mockData.excelMock);
		// API 호출 후 redraw 방식
		table.redrawTable(mockData.assignees);
	});
} // end makePdServiceSelectBox()

function bind_VersionData_By_PdService() {
	$(".multiple-select option").remove();
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
					$(".multiple-select").append(newOption);
				}
				var versionTag = $(".multiple-select").val();
				selectedVersionId = pdServiceVersionIds.join(",");
				
				// 시작일 종료일 세팅(datetimepicker)
				setEdgeDateRange(versionListData);

				if (data.length > 0) {
					console.log("display 재설정.");
				}

				$(".multiple-select").multipleSelect("refresh");
			}
		}
	});
}

////////////////////////////////////////
//버전 멀티 셀렉트 박스
////////////////////////////////////////
function makeVersionMultiSelectBox() {
	//버전 선택시 셀렉트 박스 이니시에이터
	$(".multiple-select").multipleSelect({
		filter: true,
		// selectBox 닫혔을 때
		onClose: function() {
			console.log("onOpen event fire!\n");

			var checked = $("#checkbox1").is(":checked");
			var endPointUrl = "";
			var versionTag = $(".multiple-select").val();
			console.log("[ fullDataSheet :: makeVersionMultiSelectBox ] :: versionTag");
			console.log(versionTag);
			selectedVersionId = versionTag.join(",");

			if (versionTag === null || versionTag == "") {
				alert("버전이 선택되지 않았습니다.");
				return;
			}

			let filteredVersionData = versionListData.filter(item => versionTag.includes(item.c_id.toString()));
			// 시작일 종료일 세팅(datetimepicker)
			setEdgeDateRange(filteredVersionData);

			$(".ms-parent").css("z-index", 1000);
		},
		// selectBox 열렸을 때
		onOpen: function() {
			$(".ms-parent").css("z-index", 9999);
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
		onSelectTime: function(current_time, $input) {
			$('#date_timepicker_end').datetimepicker('setOptions', { minDate: current_time });
		},
		onShow: function(ct) {
			this.setOptions({
				maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
			});
		}
	});
	$('#date_timepicker_end').datetimepicker({
		format: 'Y-m-d', // 날짜 및 시간 형식 지정
		formatDate: 'Y/m/d',
		timepicker: false,
		theme: 'dark',
		lang: "kr",
		onSelectTime: function(current_time, $input) {
			$('#date_timepicker_start').datetimepicker('setOptions', { maxDate: current_time });
		},
		onShow: function(ct) {
			this.setOptions({
				minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
			});
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

	$('#date_timepicker_start').datetimepicker('setOptions', { value: minMaxDate.min });
	$('#date_timepicker_end').datetimepicker('setOptions', { value: minMaxDate.max });
}

////////////////////////////////////////
// resource 목록 정보
////////////////////////////////////////
var initTable = function () {
	 var resourceTable = new $.fn.ResourceTable("#resource_table");

	 resourceTable.dataTableBuild({
		rowGroup: [0],
		isAddCheckbox: true
	 });

	return {
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

	if($($targetId)[0].jexcel) {
		console.log($($targetId)[0].jexcel);
		$($targetId)[0].jexcel.destroy();
	}
	console.log("width=> " + $($targetId).width());
	var excelWidth=$($targetId).width() - 50;

	var columnList = [
		{ readOnly: true, type: "text", title: "제품(서비스) 키", wRatio: 0.1}, //0
		{ readOnly: true, type: "text", title: "제품(서비스) 명", wRatio: 0.1},
		{ readOnly: true, type: "text", title: "버전 키", wRatio: 0.05},
		{ readOnly: true, type: "text", title: "버전 명", wRatio: 0.1},
		{ readOnly: true, type: "text", title: "작업자", wRatio: 0.1}, //4
		{ readOnly: true, type: "text", title: "C_REQ_LINK", wRatio: 0.08},
		{ readOnly: true, type: "text", title: "요구사항 구분", wRatio: 0.1}, // 요구사항 이슈, 연결이슈, 하위이슈
		{ readOnly: true, type: "text", title: "ALM 이슈 제목", wRatio: 0.2},
		{ readOnly: true, type: "text", title: "ALM 이슈 상태",	wRatio: 0.1},
		{ readOnly: true, type: "text", title: "ALM 이슈 우선순위", wRatio: 0.1}, //9
		{ readOnly: true, type: "calendar", title: "ALM 이슈 생성일", wRatio: 0.1},
		{ readOnly: true, type: "calendar", title: "ALM 이슈 수정일", wRatio: 0.1},
		{ readOnly: true, type: "calendar", title: "ALM 이슈 해결일", wRatio: 0.1},
		{ readOnly: true, type: "text", title: "ALM 이슈 삭제여부", wRatio: 0.1}
	];

	SpreadSheetFunctions.setColumns(columnList);
	SpreadSheetFunctions.setColumnWidth(excelWidth);

	var customOptions = {
		pagination:10,
		contextMenu: [],
		updateTable: function(instace, cell, col, row, val, id) {
			cell.style.whiteSpace = "normal";
			if(col === 0 || col === 2 || col ===5) {
				cell.style.textAlign = "right";
				cell.style.color = "#a4c6ff";
			} else if (col === 1 || col === 4 || col === 7) {
				cell.style.textAlign = "left";
			}
		}
	};

	SpreadSheetFunctions.setExcelData(data);
	SpreadSheetFunctions.setOptions(customOptions);

	$($targetId).spreadsheet($.extend({}, {
		columns: SpreadSheetFunctions.getColumns(),
		data: SpreadSheetFunctions.getExcelData()
	}, SpreadSheetFunctions.getOptions()));
}

var SpreadSheetFunctions = ( function () {
	let $tabFunction_data;   // 엑셀 데이터
	let $tabFunction_columns;// 엑셀 컬럼
	let $tabFunction_options;// 엑셀 (커스텀)옵션 :: 정의 안할 경우 default
	let $sheetInstance;
	var setESheet = function(obj) {
		$sheetInstance = obj;
	};
	var setExcelData = function(data) {
		$tabFunction_data = data;
	};
	var getExcelData = function () {
		return $tabFunction_data;
	};
	var setColumns = function(columns) {
		console.log("setColumns");
		$tabFunction_columns = columns;
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
		$tabFunction_columns = $tabFunction_columns.map(column => ({
			...column, width: width * column.wRatio
		}));
	};

	var resizeObserver = new ResizeObserver(function(entries) {
		for (let entry of entries) {
			var width = entry.contentRect.width;
			var height = entry.contentRect.height;
			handleResize(entry.target.id, width, height);
		}
	});

	// 모달요소 크기 변화 관찰
	resizeObserver.observe(document.getElementById('spreadsheet'));

	function handleResize(id,width, height) {
		if (id ==="spreadsheet" && height !== 0) {
			console.log("handleResize")
			// if (Object.keys(인력별_연봉정보).length > 0) {
			// 	drawExcel("spreadsheet", 인력별_연봉정보);
			// } else {
			// 	console.log("인력별_연봉정보 데이터가 없습니다.");
			// }
		}
	}

	return {
		setExcelData, getExcelData,
		setColumns, getColumns,
		setOptions, getOptions,
		setColumnWidth
	};
})();