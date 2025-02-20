////////////////////////////////////////////////////////////////////////////////////////
//Document Ready
////////////////////////////////////////////////////////////////////////////////////////
var selectedPdServiceId; // 제품(서비스) 아이디
var selectedVersionId; // 선택된 버전 아이디
//상단 메뉴 변수
var timeStatus_info, req_state, issue_info, resource_info;
var reqStatusDataTable;
var dataTableRef;

var selectedIssue;    //선택한 이슈
var selectedIssueKey; //선택한 이슈 키

var labelType, useGradients, nativeTextSupport, animate; //투입 인력별 요구사항 관여 차트
var tot_ver_count, active_ver_count, req_count, subtask_count, resource_count;// , req_in_action;
var top5ReqLinkedIssue = [];

var stateInfo;

function execDocReady() {

	var pluginGroups = [
		["../reference/light-blue/lib/vendor/jquery.ui.widget.js",
			"../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Templates_js_tmpl.js",
			"../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Load-Image_js_load-image.js",
			"../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Canvas-to-Blob_js_canvas-to-blob.js",
			"../reference/light-blue/lib/jquery.iframe-transport.js",
			"../reference/light-blue/lib/jquery.fileupload.js",
			"../reference/light-blue/lib/jquery.fileupload-fp.js",
			"../reference/light-blue/lib/jquery.fileupload-ui.js",
			//d3 변경
			"../reference/jquery-plugins/d3-5.16.0/d3.min.js",
			"../reference/jquery-plugins/c3-0.7.20/c3.min.css",
			"../reference/jquery-plugins/c3-0.7.20/c3.js",
			//chart Colors
			"./js/common/colorPalette.js",
			//timeline
			"../reference/jquery-plugins/info-chart-v1/js/D.js",
			"./js/dashboard/chart/timeline_custom.js",
			"./js/dashboard/chart/infographic_custom.css",
			//echarts
			"../reference/jquery-plugins/echarts-5.4.3/dist/echarts.min.js",
			"./js/common/chart/eCharts/barChartOnPolar.js",
			"./js/dashboard/api/dashboardApi.js"
		],

		["../reference/jquery-plugins/select2-4.0.2/dist/css/select2_lightblue4.css",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/css/multiselect-lightblue4.css",
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select-bluelight.css",
			"../reference/jquery-plugins/select2-4.0.2/dist/js/select2.min.js",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.quicksearch.js",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.multi-select.js",
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select.min.js"],

		["../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
			"../reference/light-blue/lib/bootstrap-datepicker.js",
			"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js",
			"../reference/lightblue4/docs/lib/widgster/widgster.js",
			"../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js",
			// 제품-버전-투입인력 차트
			"../reference/jquery-plugins/d3-sankey-v0.12.3/d3-sankey.min.js",
			// 투입 인력별 요구사항 관여 차트
			"../reference/jquery-plugins/Jit-2.0.1/jit.js",
			"../reference/jquery-plugins/Jit-2.0.1/Examples/css/Treemap.css",
			"./js/common/chart/others/treemap.js"
		],

		["../reference/jquery-plugins/dataTables-1.10.16/media/css/jquery.dataTables_lightblue4.css",
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
		]
		// 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
	];

	loadPluginGroupsParallelAndSequential(pluginGroups)
		.then(function () {

			console.log('모든 플러그인 로드 완료');

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
			$('.widget').widgster();
			setSideMenu("sidebar_menu_dashboard");

			//제품(서비스) 셀렉트 박스 이니시에이터
			makePdServiceSelectBox();
			//버전 멀티 셀렉트 박스 이니시에이터
			makeVersionMultiSelectBox();
			// 상태 정보
			getStateInfo();

			$('.dashboard-top-section').matchHeight({
				target: $('.dashboard-top-section-scope')
			});

			$('button').on('click', function() {
				// Caching
				var self = $('.active');

				// Check if another element exists after the currently active one otherwise
				// find the parent and start again
				if (self.next().length) {
					self
						.removeClass('active')
						.next()
						.addClass('active');
				} else {
					self
						.removeClass('active')
						.parent()
						.find('span:first')
						.addClass('active');
				}
			});
		})
		.catch(function () {
			console.error('플러그인 로드 중 오류 발생');
		});
}

////////////////////////////////////////////////////////////////////////////////////////
//제품 서비스 셀렉트 박스
////////////////////////////////////////////////////////////////////////////////////////
function makePdServiceSelectBox() {
	//제품 서비스 셀렉트 박스 이니시에이터
	$(".chzn-select").each(function () {
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
			200: function (data) {
				//////////////////////////////////////////////////////////
				for (var k in data.response) {
					var obj = data.response[k];
					var newOption = new Option(obj.c_title, obj.c_id, false, false);
					$("#selected_pdService").append(newOption).trigger("change");
				}
				//////////////////////////////////////////////////////////
			}
		}
	});


	$("#selected_pdService").on("select2:open", function () {
		//슬림스크롤
		makeSlimScroll(".select2-results__options");
	});

	// --- select2 ( 제품(서비스) 검색 및 선택 ) 이벤트 --- //
	$("#selected_pdService").on("select2:select", function (e) {
		// 제품( 서비스 ) 선택했으니까 자동으로 버전을 선택할 수 있게 유도
		// 디폴트는 base version 을 선택하게 하고 ( select all )
		//~> 이벤트 연계 함수 :: Version 표시 jsTree 빌드
		bind_VersionData_By_PdService();

		console.log("선택된 제품(서비스) c_id = " + $("#selected_pdService").val());
	});
} // end makePdServiceSelectBox()

////////////////////////////////////////////////////////////////////////////////////////
//버전 멀티 셀렉트 박스
////////////////////////////////////////////////////////////////////////////////////////
function makeVersionMultiSelectBox() {
	//버전 선택 셀렉트 박스 이니시에이터
	$(".multiple-select").multipleSelect({
		filter: true,
		bubbles: true,
		cancelable: true,
		onClose: function () {
			console.log("onOpen event fire!\n");
			const versionTag = $(".multiple-select").val();

			selectedPdServiceId = $("#selected_pdService").val();
			selectedVersionId = versionTag.join(',');

			DashboardApi.대시보드_톱메뉴_초기화();
			DashboardApi.대시보드_톱메뉴_세팅(selectedPdServiceId, selectedVersionId);

			statisticsMonitor(selectedPdServiceId,selectedVersionId);
			drawProductToManSankeyChart($("#selected_pdService").val(), selectedVersionId);
			drawManRequirementTreeMapChart($("#selected_pdService").val(), selectedVersionId);

			$(".ms-parent").css("z-index", 1000);
		},
		onOpen: function() {
			console.log("open event");
			$(".ms-parent").css("z-index", 9999);
		}
	});
}

function bind_VersionData_By_PdService() {
	$(".multiple-select option").remove();

	$.ajax({
		url: "/auth-user/api/arms/pdService/getVersionList.do?c_id=" + $("#selected_pdService").val(),
		type: "GET",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function (data) {
				//////////////////////////////////////////////////////////
				var pdServiceVersionIds = [];
				for (var k in data.response) {
					var obj = data.response[k];
					pdServiceVersionIds.push(obj.c_id);
					var newOption = new Option(obj.c_title, obj.c_id, true, false);
					$(".multiple-select").append(newOption);
				}

				selectedPdServiceId = $("#selected_pdService").val();
				selectedVersionId = pdServiceVersionIds.join(',');

				DashboardApi.대시보드_톱메뉴_초기화();
				DashboardApi.대시보드_톱메뉴_세팅(selectedPdServiceId,selectedVersionId);

				statisticsMonitor(selectedPdServiceId,selectedVersionId);
				drawProductToManSankeyChart($("#selected_pdService").val(), selectedVersionId);
				drawManRequirementTreeMapChart($("#selected_pdService").val(), selectedVersionId);

				if (data.length > 0) {
					console.log("display 재설정.");
				}

				$(".multiple-select").multipleSelect("refresh");
				//////////////////////////////////////////////////////////
			}
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////
//프로덕트의 요구사항 해결 추이
////////////////////////////////////////////////////////////////////////////////////////
function drawReqTimeSeries(data) {

	const data1 = [
		{ser1: 0.3, ser2: 4},
		{ser1: 2, ser2: 16},
		{ser1: 3, ser2: 8}
	];

	const data2 = [
		{ser1: 1, ser2: 7},
		{ser1: 4, ser2: 1},
		{ser1: 6, ser2: 8}
	];

	const margin = {top: 10, right: 10, bottom: 10, left: 10},
		width = 450 - margin.left - margin.right,
		height = 150 - margin.top - margin.bottom;

	const svg = d3.select("#chart_req_timeSeries")
		.append("svg")
		.attr("viewBox", [-10, 0, width + 30, height + 30])
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	const x = d3.scaleLinear().range([0,width]);
	const xAxis = d3.axisBottom().scale(x);
	svg.append("g")
		.attr("transform", `translate(0, ${height})`)
		.attr("class","myXaxis")
		.attr("stroke-width", 0.6)
		.style("font-size", "7px");

	const y = d3.scaleLinear().range([height, 0]);
	const yAxis = d3.axisLeft().scale(y);
	svg.append("g")
		.attr("class","myYaxis")
		.attr("stroke-width", 0.6)
		.style("font-size", "7px");

	function update(data) {

		x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
		svg.selectAll(".myXaxis").transition()
			.duration(3000)
			.call(xAxis);

		y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
		svg.selectAll(".myYaxis")
			.transition()
			.duration(3000)
			.call(yAxis);

		const u = svg.selectAll(".lineTest")
			.data([data], function(d){ return d.ser1 });

		u
			.join("path")
			.attr("class","lineTest")
			.transition()
			.duration(3000)
			.attr("d", d3.line()
				.x(function(d) { return x(d.ser1); })
				.y(function(d) { return y(d.ser2); }))
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.1)
	}

	update(data1)
}

// 1. 제품서비스로만 볼 경우
// 2. 버전만 따로 선택해서 보고싶은 경우
function statisticsMonitor(pdservice_id, pdservice_version_id) {
	console.log("[ dashboard :: statisticsMonitor ] :: 선택된 서비스 ===> " + pdservice_id);
	console.log("[ dashboard :: statisticsMonitor ] :: 선택된 버전 리스트 ===> " + pdservice_version_id);
	tot_ver_count = 0;
	active_ver_count = 0;
	req_count = 0;
	subtask_count = 0;
	resource_count = 0;

	//1. 좌상 게이지 차트 및 타임라인
	//2. Time ( 작업일정 ) - 버전 개수 삽입
	// d3.json은 d3.v4에서 사용 가능, d3.v5에선 ajax로 호출해서 사용
	$.ajax({
		url: "/auth-user/api/arms/pdService/getNodeWithVersionOrderByCidDesc.do?c_id=" + pdservice_id,
		type: "GET",
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function (json) {
				let versionData = json.pdServiceVersionEntities;
				let version_count = versionData.length;
				tot_ver_count = version_count;

				console.log("등록된 버전 개수 = " + version_count);
				if (version_count !== undefined) {

					if (version_count >= 0) {
						let today = new Date();

						$("#notifyNoVersion").slideUp();
						$("#project-start").show();
						$("#project-end").show();

						$("#versionGaugeChart").html(""); //게이지 차트 초기화
						var versionGauge = [];
						var versionTimeline = [];
						versionData.forEach(function (versionElement, idx) {

							if (pdservice_version_id.includes(versionElement.c_id)) {
								var gaugeElement = {
									"current_date": today.toString(),
									"version_name": versionElement.c_title,
									"version_id": versionElement.c_id,
									"start_date": (versionElement.c_pds_version_start_date === "start" ? today : versionElement.c_pds_version_start_date),
									"end_date": (versionElement.c_pds_version_end_date === "end" ? today : versionElement.c_pds_version_end_date)
								}
								versionGauge.push(gaugeElement);
							}
							var timelineElement = {
								"id" : versionElement.c_id,
								"title" : "버전: "+versionElement.c_title,
								"startDate" : (versionElement.c_pds_version_start_date === "start" ? today : versionElement.c_pds_version_start_date),
								"endDate" : (versionElement.c_pds_version_end_date === "end" ? today : versionElement.c_pds_version_end_date)
							};
							versionTimeline.push(timelineElement);
						});

						drawVersionProgress(versionGauge); // 버전 게이지
						Timeline.init($("#version-timeline-bar"), versionTimeline);
					}
				}
			}
		}
	});

	// 제품서비스 - status
//	getReqCount(pdservice_id, "");
	// 제품서비스별 담당자 통계
//	getAssigneeInfo(pdservice_id, "");

	// 상위 5명 - 요구사항 이슈 (우하1)
	getReqIssueTop5(pdservice_id, pdservice_version_id);
	// 상위 5명 - 요구사항 상태 누적 (우하2)
	//getIssueResponsibleStatusTop5(pdservice_id, pdservice_version_id);
	reqStatePerAssigneeTop5(pdservice_id, pdservice_version_id);

	// setTimeout(function () {
	// 	//Scope - (2) 요구사항에 연결된 이슈 총 개수
	// 	getLinkedIssueCount(pdservice_id, ""); // 연결된 이슈 총 개수, 평균 값 대입
	//
	// 	$('#inactive_version_count').text( tot_ver_count - active_ver_count );
	// },1000);

}

//////////////////////
// 게이지 차트
//////////////////////
function drawVersionProgress(data) {
	let gaugeChartColor = ColorPalette.d3Chart.gaugeChart;
	if (gaugeChartColor.length < 0) {
		gaugeChartColor = [
			"rgba(158, 1, 66, 0.8)",
			"rgba(213, 62, 79, 0.8)",
			"rgba(244, 109, 67, 0.8)",
			"rgba(253, 174, 97, 0.8)",
			"rgba(254, 224, 139, 0.8)",
			"rgba(230, 245, 152, 0.8)",
			"rgba(171, 221, 164, 0.8)",
			"rgba(102, 194, 165, 0.8)",
			"rgba(50, 136, 189, 0.8)",
			"rgba(94, 79, 162, 0.8)"
		];
	}
	var Needle,
		arc,
		arcEndRad,
		arcStartRad,
		barWidth,   // 색션의 두께
		chart,
		chartInset, // 가운데로 들어간 정도
		el,
		endPadRad,
		height,
		i,
		margin,		// 차트가 그려지는 위치 마진
		needle,		// 침
		numSections,// 색션의 수
		padRad,
		percToDeg, percToRad, degToRad, // 고정
		percent,
		radius, 	// 반지름
		ref,
		sectionIndx, // 색션 인덱스
		sectionPerc, // 색션의 퍼센트
		startPadRad,
		svg,
		totalPercent,
		width,
		versionId,
		versionName,
		waveName;

	percent = 0.55;
	barWidth = 25;
	padRad = 0;
	chartInset = 11;
	totalPercent = 0.75;

	margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	width = 220;
	height = width;
	radius = Math.min(width, height) / 2.2;

	// percToDeg percToRad degToRad 고정
	percToDeg = function (perc) {
		return perc * 360;
	};

	percToRad = function (perc) {
		return degToRad(percToDeg(perc));
	};

	degToRad = function (deg) {
		return (deg * Math.PI) / 180;
	};
	//
	svg = d3
		.select("#versionGaugeChart")
		.append("svg")
		.attr("viewBox", [70, 10, width -150, height -100])
		.append("g");

	chart = svg
		.append("g")
		.attr("transform", "translate(" + (width + margin.left) / 2 + ", " + (height + margin.top) / 2 + ")");

	var tooltip = d3
		.select("#versionGaugeChart")
		.append("div")
		.style("opacity", 0)
		.attr("class", "tooltip")
		.style("background-color", "white")
		.style("border", "solid")
		.style("border-width", "1px")
		.style("border-radius", "5px")
		.style("color", "black")
		.style("padding", "10px");

	var arc = d3
		.arc()
		.innerRadius(radius * 0.6)
		.outerRadius(radius);

	var outerArc = d3
		.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

	var totalDate;
	var startDDay;
	var endDDay;

	numSections = data.length; // 전체 색션의 수(버전의 수)
	sectionPerc = 1 / numSections / 2; //  '/ 2' for Half-circle

	var fastestStartDate;
	var latestEndDate;
	// 가장 빠른날짜, 가장 느린날짜 세팅
	for (var idx = 0; idx < data.length; idx++) {
		if (idx === 0) {
			fastestStartDate = data[idx].start_date;
			latestEndDate = data[idx].end_date;
		} else {
			if (data[idx].start_date < fastestStartDate) {
				fastestStartDate = data[idx].start_date;
			}
			if (data[idx].end_date > latestEndDate) {
				latestEndDate = data[idx].end_date;
			}
		}
	}

	$("#fastestStartDate").text(new Date(fastestStartDate).toLocaleDateString());
	$("#latestEndDate").text(new Date(latestEndDate).toLocaleDateString());

	startDDay = Math.floor(
		Math.abs((new Date(data[0].current_date) - new Date(fastestStartDate)) / (1000 * 60 * 60 * 24))
	);
	endDDay = Math.floor(
		Math.abs((new Date(latestEndDate) - new Date(data[0].current_date)) / (1000 * 60 * 60 * 24)) + 1
	);
	$("#startDDay").text("+ " + startDDay);
	$("#endDDay").text("- " + endDDay);

	totalDate = startDDay + endDDay;

	var mouseover = function (d) {
		var subgroupId = d.version_id;
		var subgroupName = d.version_name;
		var subgroupValue = new Date(d.start_date).toLocaleDateString() + " ~ " + new Date(d.end_date).toLocaleDateString();
		tooltip.html("버전명: " + subgroupName + "<br>" + "기간: " + subgroupValue).style("opacity", 1);

		d3.selectAll(".myWave").style("opacity", 0.2);
		d3.selectAll(".myStr").style("opacity", 0.2);
		d3.selectAll(".wave-" + subgroupId).style("opacity", 1);
	};

	var mousemove = function (d) {
		tooltip.style("left", d3.mouse(this)[0] + 120 + "px").style("top", d3.mouse(this)[1] + 150 + "px");
	};

	var mouseleave = function (d) {
		tooltip.style("opacity", 0);
		d3.selectAll(".myStr").style("opacity", 1);
		d3.selectAll(".myWave").style("opacity", 1);
	};

	for (sectionIndx = i = 1, ref = numSections; 1 <= ref ? i <= ref : i >= ref; sectionIndx = 1 <= ref ? ++i : --i) {
		arcStartRad = percToRad(totalPercent);
		arcEndRad = arcStartRad + percToRad(sectionPerc);
		totalPercent += sectionPerc;
		startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
		endPadRad = sectionIndx === numSections ? 0 : padRad / 2;
		versionId = data[sectionIndx - 1].version_id;
		versionName = data[sectionIndx - 1].version_name;

		var sectionData = data[sectionIndx - 1];

		var arc = d3
			.arc()
			.outerRadius(radius - chartInset)
			.innerRadius(radius - chartInset - barWidth)
			.startAngle(arcStartRad + startPadRad)
			.endAngle(arcEndRad - endPadRad);

		var section = chart.selectAll(".arc.chart-color" + sectionIndx + ".myWave.wave-" + versionId);

		section
			.data([sectionData])
			.enter()
			.append("g")
			.attr("class", "arc chart-color" + sectionIndx + " myWave wave-" + versionId)
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave)
			.append("path")
			.attr("fill", function (d) {
					return gaugeChartColor[(sectionIndx - 1) % gaugeChartColor.length];
			})
			.attr("stroke", "white")
			.style("stroke-width", "0.4px")
			.attr("d", arc);

		chart
			.selectAll(".arc.chart-color" + sectionIndx + ".myWave.wave-" + versionId)
			.append("text")
			.attr("class", "no-select")
			.text(function (d) {
				return getStrLimit(d.version_name, 9);
			})
			.attr("x", function (d) {
				return arc.centroid(d)[0];
			})
			.attr("y", function (d) {
				return arc.centroid(d)[1] + 2;
			})
			.style("font-size", "10px")
			.style("font-weight", "700")
			.attr("text-anchor", "middle");
	}

	Needle = (function () {
		function Needle(len, radius1) {
			this.len = len;
			this.radius = radius1;
		}

		Needle.prototype.drawOn = function (el, perc) {
			el.append("circle")
				.attr("class", "needle-center")
				.attr("cx", 0)
				.attr("cy", -10)
				.attr("r", this.radius)
				.attr("stroke", "white")
				.style("stroke-width", "0.3px");
			return el
				.append("path")
				.attr("class", "needle")
				.attr("d", this.mkCmd(perc))
				.attr("stroke", "white")
				.style("stroke-width", "0.3px");
		};

		Needle.prototype.animateOn = function (el, perc) {
			var self;
			self = this;
			return el
				.selectAll(".needle")
				.transition()
				.delay(500)
				.ease(d3.easeElasticOut)
				.duration(3000)
				.attrTween("progress", function () {
					return function (percentOfPercent) {
						var progress;
						progress = percentOfPercent * perc;
						return d3.select(".needle").attr("d", self.mkCmd(progress));
					};
				});
		};

		Needle.prototype.mkCmd = function (perc) {
			var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
			thetaRad = percToRad(perc / 2);
			centerX = 0;
			centerY = -10;
			topX = centerX - this.len * Math.cos(thetaRad);
			topY = centerY - this.len * Math.sin(thetaRad);
			leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
			leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
			rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
			rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
			return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
		};

		return Needle;
	})();

	needle = new Needle(35, 3);

	needle.drawOn(chart, 0);

	needle.animateOn(chart, startDDay / totalDate);
}

////////////////////////////////////////////////////////////////////////////////////////
// 투입 인력별 요구사항 관여 차트 생성
////////////////////////////////////////////////////////////////////////////////////////
function drawManRequirementTreeMapChart(pdServiceLink, pdServiceVersionLinks) {
	const url = new UrlBuilder()
		.setBaseUrl('/auth-user/api/arms/dashboard/assignees-requirements-involvements')
		.addQueryParam('pdServiceLink', pdServiceLink)
		.addQueryParam('pdServiceVersionLinks', pdServiceVersionLinks)
		.addQueryParam('메인_그룹_필드', "pdServiceVersion")
		.addQueryParam('하위_그룹_필드들', "assignee.assignee_accountId.keyword,assignee.assignee_displayName.keyword")
		.addQueryParam('크기', 3)
		.addQueryParam('하위_크기', 0)
		.addQueryParam('컨텐츠_보기_여부', true)
		.build();

	$.ajax({
		url: url,
		type: "GET",
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function (apiResponse) {
				const data = apiResponse.response;
				if ($("#chart-manpower-requirement").children().length !== 0) {
					$("#chart-manpower-requirement").empty();
				}
				const treeMapInfos = {
					"id": "root",
					"name": "작업자별 요구사항 관여 트리맵",
					"data": {},
					"children": data
				};
				init(treeMapInfos);
			}
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품-버전-투입인력 차트 생성
////////////////////////////////////////////////////////////////////////////////////////
function drawProductToManSankeyChart(pdServiceLink, pdServiceVersionLinks) {
	function removeSankeyChart() {
		const svgElement = d3.select("#chart-product-manpower").select("svg");
		if (!svgElement.empty()) {
			svgElement.remove();
		}
	}

	const url = new UrlBuilder()
		.setBaseUrl('/auth-user/api/arms/dashboard/version-assignees')
		.addQueryParam('pdServiceLink', pdServiceLink)
		.addQueryParam('pdServiceVersionLinks', pdServiceVersionLinks)
		.addQueryParam('메인_그룹_필드', "pdServiceVersions")
		.addQueryParam('하위_그룹_필드들', "assignee.assignee_accountId.keyword,assignee.assignee_displayName.keyword")
		.addQueryParam('크기', pdServiceVersionLinks.split(",").length)
		.addQueryParam('하위_크기', 3)
		.addQueryParam("isReqType", "ISSUE")
		.addQueryParam('컨텐츠_보기_여부', true)
		.build();

	$.ajax({
		url: url,
		type: "GET",
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function (apiResponse) {
				removeSankeyChart();
				const data = apiResponse.response;
				SankeyChart.loadChart(data);
			}
		}
	});

}
var SankeyChart = (function ($) {
	"use strict";

	var initSvg = function () {
		var margin = { top: 10, right: 10, bottom: 10, left: 10 };
		var width = document.getElementById("chart-product-manpower").offsetWidth+100;
		var height = 500 - margin.top - margin.bottom;

		var vx = width + margin.left + margin.right;
		var vy = height + margin.top + margin.bottom;

		return d3
			.select("#chart-product-manpower") // 그려지는 위치
			.append("svg")
			.attr("viewBox", "0 0 " + vx + " " + vy)
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	};

	var drawEmptyChart = function () {
		var margin = { top: 10, right: 10, bottom: 10, left: 10 };
		var width = document.getElementById("chart-product-manpower").offsetWidth - margin.left - margin.right;
		var height = 500 - margin.top - margin.bottom;

		initSvg()
			.append("text")
			.style("font-size", "12px")
			.style("fill", "white")
			.style("font-weight", 5)
			.text("선택된 어플리케이션이 없습니다.")
			.attr("x", width / 2)
			.attr("y", height / 2);
	};

	var loadChart = function (data) {
		var margin = { top: 5, right: 5, bottom: 5, left: 5 };
		var width = document.getElementById("chart-product-manpower").offsetWidth - margin.left - margin.right;
		var height = 450 - margin.top - margin.bottom;

		var formatNumber = d3.format(",.0f");
		var format = function (d) {
			return formatNumber(d);
		};

		var iconXs = [10, 12, 11.5, 12];
		var nodeIcons = ['<i class="fa fa-cube"></i>', '<i class="fa fa-server"></i>', '<i class="fa fa-database"></i>'];
		var colors = ColorPalette.d3Chart.sankeyChart;

		var svg = initSvg();

		if (isEmpty(data.nodes)) {
			svg
				.append("text")
				.style("font-size", "13px")
				.style("fill", "white")
				.style("font-weight", 5)
				.text("해당 프로젝트에 매핑된 버전이 없습니다.")
				.attr("x", width / 2)
				.attr("y", height / 2);

			return;
		}

		var sankey = d3.sankey()
						.nodeWidth(36)
						.nodePadding(40)
						.size([width, height]);

		var graph = {
			nodes: [],
			links: []
		};
		var nodeMap = { };

		var color = d3.scaleOrdinal(colors);
		var iconX = d3.scaleOrdinal(iconXs);
		var nodeIcon = d3.scaleOrdinal(nodeIcons);

		data.nodes.forEach(function (nodeInfos) {
			graph.nodes.push(nodeInfos);
		});

		data.links.forEach(function (nodeLinks) {
			graph.links.push(nodeLinks);
		});

		graph.nodes.forEach(function (node) {
			nodeMap[node.id] = node;
		});

		graph.links = graph.links.map(function (link) {
			return {
				source: nodeMap[link.source],
				target: nodeMap[link.target],
				value: 1
			};
		});

		graph = sankey(graph);

		var link = svg
			.append("g")
			.selectAll(".link")
			.data(graph.links)
			.enter()
			.append("path")
			.attr("class", "link")
			.attr("d", d3.sankeyLinkHorizontal())
			.attr("stroke-width", function (d) {
				return d.width;
			});

		link.append("title").text(function (d) {
			return d.source.name + " → " + d.target.name + "\n" + format(d.value);
		});

		var node = svg.append("g").selectAll(".node").data(graph.nodes).enter().append("g").attr("class", "node");

		node
			.append("rect")
			.attr("x", function (d) {
				return d.x0;
			})
			.attr("y", function (d) {
				return d.y0;
			})
			.attr("height", function (d) {
				return d.y1 - d.y0;
			})
			.attr("width", sankey.nodeWidth())
			.style("fill", function (d) {
				return (d.color = color(d.type));
			})
			.style("cursor", "default")
			.style("stroke", function (d) {
				return d3.rgb(d.color).darker(2);
			})
			.append("title")
			.text(function (d) {
				return d.name + "\n" + format(d.value);
			});

		node
			.append("svg:foreignObject")
			.attr("x", function (d) {
				return d.x0 + iconX(d.type);
			})
			.attr("y", function (d) {
				return (d.y1 + d.y0 - 16) / 2;
			})
			.attr("height", "16px")
			.attr("width", "16px")
			.style("cursor", "default")
			.html((d) => nodeIcon(d.type));

		node
			.append("text")
			.attr("x", function (d) {
				return d.x0 > 0 ? d.x0 - 6 : d.x1 - d.x0 + 6;
			})
			.attr("y", function (d) {
				return (d.y1 + d.y0 - 18) / 2;
			})
			.attr("dy", "0.35em")
			.style("fill", function (d) {
				return (d.color = color(d.type));
			})
			.style("text-shadow", function (d) {
				return `0 1px 0 ${(d.color = color(d.type))}`;
			})
			.attr("text-anchor", function (d) {
				return d.x0 > 0 ? "end" : "start";
			})
			.text(function (d) {
				return `[${d.type}]`;
			})
			.filter(function (d) {
				return d.x < width / 2;
			})
			.attr("x", 6 + sankey.nodeWidth())
			.attr("text-anchor", "start");

		node
			.append("text")
			.attr("x", function (d) {
				return d.x0 > 0 ? d.x0 - 6 : d.x1 - d.x0 + 6;
			})
			.attr("y", function (d) {
				return (d.y1 + d.y0 + 18) / 2;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function (d) {
				return d.x0 > 0 ? "end" : "start";
			})
			.attr("transform", null)
			.text(function (d) {
				return d.name;
			})
			.filter(function (d) {
				return d.x < width / 2;
			})
			.attr("x", 6 + sankey.nodeWidth())
			.attr("text-anchor", "start");
	};

	return { loadChart, drawEmptyChart };
})(jQuery);


////////////////////////////////////////////////////////////////////////////////////////
// 요구사항별 투입 인력 및 상태값 데이터 테이블
////////////////////////////////////////////////////////////////////////////////////////
function dataTableLoad(selectId, endPointUrl) {
	var columnList = [
		{ name: "c_req_link", title: "요구사항 아이디", data: "c_req_link", visible: false },
		{ name: "c_issue_url", title: "요구사항 이슈 주소", data: "c_issue_url", visible: false },
		{
			name: "c_req_name",
			title: "요구사항",
			data: "c_req_name",
			render: function (data, type, row, meta) {
				if (isEmpty(data) || data === "unknown") {
					return "<div style='color: #808080'>N/A</div>";
				} else {
					return "<div style='white-space: nowrap; color: #a4c6ff'>" + data + "</div>";
				}
				return data;
			},
			className: "dt-body-left",
			visible: true
		},
		{ name: "c_issue_status_link", title: "요구사항 이슈 상태 아이디", data: "c_issue_status_link", visible: false },
		{
			name: "c_issue_status_name",
			title: "요구사항 이슈 상태",
			data: "c_issue_status_name",
			render: function (data, type, row, meta) {
				if (isEmpty(data) || data === "unknown") {
					return "<div style='color: #808080'>N/A</div>";
				} else {
					return "<div style='white-space: nowrap; color: #a4c6ff'>" + data + "</div>";
				}
				return data;
			},
			className: "dt-body-left",
			visible: true
		},
		{
			name: "c_issue_assignee",
			title: "요구사항 이슈 할당자",
			data: "c_issue_assignee",
			render: function (data, type, row, meta) {
				if (isEmpty(data) || data === "unknown") {
					return "<div style='color: #808080'>N/A</div>";
				} else {
					return "<div style='white-space: nowrap; color: #a4c6ff'>" + data + "</div>";
				}
				return data;
			},
			className: "dt-body-left",
			visible: true
		}
	];
	var rowsGroupList = [];
	var columnDefList = [
		{
			orderable: false,
			className: "select-checkbox",
			targets: 0
		}
	];
	var orderList = [[1, "asc"]];
	var jquerySelector = "#manpowerPerReqTable";
	var ajaxUrl = "/auth-user/api/arms/reqStatus" + endPointUrl;
	var jsonRoot = "";
	var scrollY = 160;
	var buttonList = [
		"copy",
		"excel",
		"print",
		{
			extend: "csv",
			text: "Export csv",
			charset: "utf-8",
			extension: ".csv",
			fieldSeparator: ",",
			fieldBoundary: "",
			bom: true
		},
		{
			extend: "pdfHtml5",
			orientation: "landscape",
			pageSize: "LEGAL"
		}
	];
	var selectList = {};
	var isServerSide = false;

	reqStatusDataTable = dataTable_build(
		jquerySelector,
		ajaxUrl,
		jsonRoot,
		columnList,
		rowsGroupList,
		columnDefList,
		selectList,
		orderList,
		buttonList,
		isServerSide,
		scrollY
	);
}

// 데이터 테이블 구성 이후 꼭 구현해야 할 메소드 : 열 클릭시 이벤트
function dataTableClick(tempDataTable, selectedData) {
}

// 데이터 테이블 데이터 렌더링 이후 콜백 함수.
function dataTableCallBack(settings, json) {
	console.log("check");
}

function dataTableDrawCallback(tableInfo) {
	$("#" + tableInfo.sInstance)
		.DataTable()
		.columns.adjust()
		.responsive.recalc();
}

function getStateInfo(){
    $.ajax({
        url:"/auth-user/api/arms/reqState/getNodesWithoutRoot.do",
        type:"GET",
        dataType:"json",
        progress: true,
        statusCode:{
            200: function(data){
                console.log("[ dashboard :: getStateInfo] :: ARMS에 등록된 상태 정보");
                stateInfo = data.result;
            }
        }
    });
}

function reqStatePerAssigneeTop5(pdservice_id, pdServiceVersionLinks) {

	var endPointUrl = "T_ARMS_REQADD_"+pdservice_id+"/getReqAddListByFilter.do";
	var ajaxUrl = "/auth-user/api/arms/dashboard/reqStatePerAssigneeTop5/"+endPointUrl;
	console.log("[ dashboard :: reqStatePerAssigneeTop5] :: pdServiceId => " + pdservice_id);
	console.log("[ dashboard :: reqStatePerAssigneeTop5] :: pdServiceVersionLinks => " + pdServiceVersionLinks);
	$.ajax({
		url: ajaxUrl,
		data: { pdServiceId : pdservice_id, pdServiceVersionLinks : pdServiceVersionLinks	},
		type: "GET",
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function(apiResponse) {
				var colorArr = ColorPalette.common.reqStateColor;

				var resultData = apiResponse.response;

                stateInfo.sort((a,b) => a.c_id - b.c_id); // c_id 기준 오름 차순 정렬
                var stateTitleList = stateInfo.map(state => state.c_title); // 상태 목록

				let keySumList = Object.keys(resultData).map(key => {
					let sum = Object.values(resultData[key]).reduce((acc, value) => acc + value, 0);
					return { key: key, sum: sum };
				});
				keySumList.sort((a, b) => b.sum - a.sum);

				var assigneeList = keySumList.map(item => item.key);
				var assigneeSize = assigneeList.length;

                var stateCount ={};
                stateInfo.forEach(state =>{
                    stateCount[state.c_id] = new Array(Object.keys(resultData).length).fill(0);
                });

                assigneeList.forEach((key,index) =>{
                    stateInfo.forEach(state => {
                        stateCount[state.c_id][index] = resultData[key][state.c_id] || 0;
                    });
                });

                var statusArr = Object.values(stateCount);

				var sampleSeries = {
					type: 'bar',
					data: "", // seriesArr1
					itemStyle: {
						color: ""
					},
					coordinateSystem: 'polar',
					name: "",
					stack: 'a',
					emphasis: {
						focus: 'series'
					}
				}

				var arrSeries = new Array(stateTitleList.length);

				for (let i=0; i< stateTitleList.length; i++) {
					let _temp = JSON.parse(JSON.stringify(sampleSeries));
					_temp.data = statusArr[i];
					_temp.itemStyle.color = colorArr[i];
					_temp.name = stateTitleList[i];
					arrSeries[i] = _temp;
				}

				drawBarOnPolar("polar_bar", assigneeList, stateTitleList, arrSeries);

			}
		}
	});
}

function getReqIssueTop5(pdservice_id, pdServiceVersionLinks) {

	var url = "/auth-user/api/arms/dashboard/reqIssueTop5/"+pdservice_id;

	$.ajax({
		type: "GET",
		url: url,
		data: { pdServiceVersionLinks : pdServiceVersionLinks	},
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		progress: true,
		statusCode: {
			200: function (apiResponse) {
				let data = apiResponse.response;
				console.log("[ dashboard :: getReqIssueTop5 ] ==> ");
				console.log(data);
				top5ReqLinkedIssue = []; // 초기화

				let index = 0;

				for (let key in data) {
					if (data.hasOwnProperty(key)) {
						let performance = {
							"manpowerId": index,
							"manpowerName": key,
							"issueCount": data[key],
							"relatedIssueCount" : 0
						};
						top5ReqLinkedIssue.push(performance);
						index++;
					}
				}
				top5ReqLinkedIssue.sort((a, b) => b.issueCount - a.issueCount);
				drawIssuePerManPower(top5ReqLinkedIssue);

			}
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// --- 투입 인력별 요구사항 차트 --- //
////////////////////////////////////////////////////////////////////////////////////////
function drawIssuePerManPower(data) {
	$("#issue-manpower-chart").html("");

	var width = 270,
		height = 430,
		margin = 10;

	var svg = d3
		.select("#issue-manpower-chart")
		.append("svg")
		.attr("viewBox", [-33, 20, width, height])
		.append("g");

	var subgroups = ["issueCount", "relatedIssueCount"];

	var groups = d3
		.map(data, function (d) {
			return d.manpowerName;
		})
		.keys();

	var finalMaxGroupValue = 0;
	data.forEach(function (d) {
		var totalSumCount = d.issueCount + d.relatedIssueCount
		if (totalSumCount > finalMaxGroupValue) {
			finalMaxGroupValue = totalSumCount;
		}
	});

	var x = d3.scaleLinear().domain([0, finalMaxGroupValue]).range([0, width]);
	var xAxisTicks = x.ticks().filter(function (tick) {
		return Number.isInteger(tick);
	});
	svg
		.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).tickValues(xAxisTicks).tickFormat(d3.format("d")).tickSizeOuter(0))
		.style("font-size", "18px");

	var y = d3.scaleBand().domain(groups).rangeRound([0, height]).paddingInner([0.25]).padding(0.5);
	svg
		.append("g")
		.call(d3.axisLeft(y).tickFormat((d) => (d.length > 8 ? d.slice(0, 8) + ".." : d)))
		.style("font-size", "20px").style("font-weight","700");

	var color = d3.scaleOrdinal().domain(subgroups).range(ColorPalette.d3Chart.horizontalChart);

	var stackedData = d3.stack().keys(subgroups)(data).concat(data);

	var tooltip = d3
		.select("#issue-manpower-chart")
		.append("div")
		.style("opacity", 0)
		.attr("class", "tooltip")
		.style("background-color", "white")
		.style("border", "solid")
		.style("border-width", "1px")
		.style("border-radius", "5px")
		.style("color", "black")
		.style("padding", "10px");

	var mouseover = function (d) {
		var boxSelector = d3.select(this.parentNode).datum().key;
		var subgroupName = d.data.manpowerName;
		var issueCount = d.data.issueCount;
		var relatedIssueCount = d.data.relatedIssueCount;

		tooltip
			.html(function (d) {
				if (boxSelector === "issueCount") {
					return "작업자: " + subgroupName + "<br>" + "요구사항: " + issueCount;
				}
				if (boxSelector === "relatedIssueCount") {
					return "작업자: " + subgroupName + "<br>" + "연결이슈: " + relatedIssueCount;
				}
			})
			.style("opacity", 1);

		d3.selectAll(".myGroup").style("opacity", 0.2);
		d3.selectAll("." + boxSelector).style("opacity", 1);
	};
	var mousemove = function () {
		tooltip.style("left", d3.mouse(this)[0] + 90 + "px").style("top", d3.mouse(this)[1] + "px");
	};
	var mouseleave = function () {
		tooltip.style("opacity", 0);
		d3.selectAll(".myGroup").style("opacity", 1);
	};

	var chart =
		svg
		.append("g")
		.selectAll("g")
		.data(stackedData)
		.enter()
		.append("g")
		.attr("fill", function (d) {
			return color(d.key);
		})
		.attr("class", function (d) {
			return "myGroup " + d.key;
		})
		.selectAll("rect")
		.data(function (d) {
			return d;
		})
		.enter();
	var typeRects = chart
		.append("g")
		.attr("class", function (d) {
			return "myType type-"+ d.data.manpowerId;
		})
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave);

	var rect =
		typeRects
		.append("rect")
		.attr("x", function (d) {
			return 0;
		})
		.attr("y", function (d) {
			return y(d.data.manpowerName);
		})
		.attr("height", function () {
			return y.bandwidth();
		})
		.attr("width", function (d) {
			return 0;
		})
		.attr("stroke", "white")
		.style("stroke-width", "0.5px")
		.transition()
		.delay(500)
		.ease(d3.easeElasticOut)
		.duration(1800)
		.attr("x", function (d) {
			return x(d[0]);
		})
		.attr("width", function (d) {
			return x(d[1]) - x(d[0]);
		})
		.delay(function (d, i) {
			return i * 70;
		});

	var text = typeRects
		.append("text")
		.style("font-size", "17px")
		.style("font-weight","700")
		.attr("class", function (d) {
			return "no-select";
		})
		.append("tspan")
		.text(function (d) {
			var hostCount;
			if(d[0] === 0 && d.data.issueCount !== 0) { // 시작지점 0이고, 요구사항 개수!= 0
				hostCount = d.data.issueCount;
			} else { // 그외 모두 연결이슈
				hostCount = d.data.relatedIssueCount;
			}
			if (hostCount) {
				return `${hostCount}개`;
			}
		})
		.attr("x", function (d) {
			return x(d[0]) + (x(d[1]) - x(d[0])) / 2;
		})
		.attr("dy", function (d, i) {
			return y(d.data.manpowerName) + y.bandwidth() / 2 + 5;
		})
		.style("text-anchor", "middle");
}
