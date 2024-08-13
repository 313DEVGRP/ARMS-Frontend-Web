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
		],
		[
			//날짜 검색
			"../reference/light-blue/lib/bootstrap-datepicker.js",
			"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
			"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js",
			//
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
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select.min.js"
		],
		[
			// lightblue4
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
			//chart Colors
			"./js/common/colorPalette.js",
			// Apache Echarts
			"../reference/jquery-plugins/echarts-5.4.3/dist/echarts.min.js",
			"./js/common/chart/eCharts/donutChart.js",
			// c3 차트(도넛)
			"../reference/jquery-plugins/d3-5.16.0/d3.min.js",
			"../reference/jquery-plugins/c3-0.7.20/c3.min.css",
			"../reference/jquery-plugins/c3-0.7.20/c3.js",
			"./js/common/chart/d3/donutChart.js"
		]
		// 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
	];

	loadPluginGroupsParallelAndSequential(pluginGroups)
		.then(function() {

			console.log('모든 플러그인 로드 완료');

			//사이드 메뉴 처리
			$('.widget').widgster();
			setSideMenu("sidebar_menu_report", "sidebar_menu_full_data_sheet");


			//제품(서비스) 셀렉트 박스 이니시에이터
			makePdServiceSelectBox();
			//버전 멀티 셀렉트 박스 이니시에이터
			makeVersionMultiSelectBox();
			//날짜
			datetTimePicker();

			// 높이 조정
			$('.top-menu-div').matchHeight({
				target: $('.top-menu-div-default')
			});

			let mock = {
				"total": 5,
				"folder": 4,
				"in-progress": 1,
				"open": 2,
				"resolved": 1,
				"closed": 1
			};

			// 스크립트 실행 로직을 이곳에 추가합니다.
			for (let i = 0; i < 1; i++) {
				let targetId = "donut" + i;
				console.log($(".card").width());
				let cardWidth = $(".card").width();
				drawDonutChart_report(targetId, mock, cardWidth);
			}
			let mock1 = {
				"total": 5,
				"in-progress": 2,
				"open": 1,
				"resolved": 1,
				"closed": 1
			};
			donutChart_fullDataSheet("donut1", mock1);


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
				console.log("[analysisScope :: makePdServiceSelectBox] :: pdServiceListData => ");
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
					versionListData.push(obj);
					var newOption = new Option(obj.c_title, obj.c_id, true, false);
					$(".multiple-select").append(newOption);
				}
				var versionTag = $(".multiple-select").val();
				console.log("[ analysisScope :: bind_VersionData_By_PdService ] :: versionTag");

				console.log(pdServiceVersionIds);
				selectedVersionId = pdServiceVersionIds.join(",");
				console.log("bind_VersionData_By_PdService :: selectedVersionId");
				console.log(selectedVersionId);


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
		onClose: function() {
			console.log("onOpen event fire!\n");

			var checked = $("#checkbox1").is(":checked");
			var endPointUrl = "";
			var versionTag = $(".multiple-select").val();
			console.log("[ analysisScope :: makeVersionMultiSelectBox ] :: versionTag");
			console.log(versionTag);
			selectedVersionId = versionTag.join(",");

			if (versionTag === null || versionTag == "") {
				alert("버전이 선택되지 않았습니다.");
				return;
			}

			$(".ms-parent").css("z-index", 1000);
		},
		onOpen: function() {
			console.log("open event");
			$(".ms-parent").css("z-index", 9999);
		}
	});
}

////////////////////////////////////////
// 검색날짜 기간 설정 세팅
////////////////////////////////////////
function datetTimePicker() {
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