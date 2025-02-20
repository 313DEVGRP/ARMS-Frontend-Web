////////////////////////////////////////////////////////////////////////////////////////
//Page 전역 변수
////////////////////////////////////////////////////////////////////////////////////////
var selectId; // 제품 아이디
var selectName; // 제품 이름
var selectedIndex; // 데이터테이블 선택한 인덱스
var selectedPage; // 데이터테이블 선택한 인덱스
var dataTableRef; // 데이터테이블 참조 변수
var selectedDetailId = ""; // 선택한 디테일 아이디
var selectedDetailName = ""; // 선택한 디테일 이름

////////////////////////////////////////////////////////////////////////////////////////
//Document Ready
////////////////////////////////////////////////////////////////////////////////////////
function execDocReady() {

	var pluginGroups = [
		[	"../reference/light-blue/lib/vendor/jquery.ui.widget.js",
			"../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Templates_js_tmpl.js",
			"../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Load-Image_js_load-image.js",
			"../reference/light-blue/lib/vendor/http_blueimp.github.io_JavaScript-Canvas-to-Blob_js_canvas-to-blob.js",
			"../reference/light-blue/lib/jquery.iframe-transport.js",
			"../reference/light-blue/lib/jquery.fileupload.js",
			"../reference/light-blue/lib/jquery.fileupload-fp.js",
			"../reference/light-blue/lib/jquery.fileupload-ui.js"],

		[	"../reference/jquery-plugins/select2-4.0.2/dist/css/select2_lightblue4.css",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/css/multiselect-lightblue4.css",
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select-bluelight.css",
			"../reference/jquery-plugins/select2-4.0.2/dist/js/select2.min.js",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.quicksearch.js",
			"../reference/jquery-plugins/lou-multi-select-0.9.12/js/jquery.multi-select.js",
			"../reference/jquery-plugins/multiple-select-1.5.2/dist/multiple-select.min.js"],

		[	"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.min.css",
			"../reference/light-blue/lib/bootstrap-datepicker.js",
			"../reference/jquery-plugins/datetimepicker-2.5.20/build/jquery.datetimepicker.full.min.js",
			"../reference/lightblue4/docs/lib/widgster/widgster.js",
			"../reference/lightblue4/docs/lib/slimScroll/jquery.slimscroll.min.js"],

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
			"../reference/jquery-plugins/dataTables-1.10.16/extensions/Buttons/js/jszip.min.js",
			"../reference/jquery-plugins/swiper-11.1.4/swiper-bundle.min.js",
			"../reference/jquery-plugins/swiper-11.1.4/swiper-bundle.min.css",
			"./js/common/swiperHelper.js",
			"./css/customSwiper.css"
		]
		// 추가적인 플러그인 그룹들을 이곳에 추가하면 됩니다.
	];

	loadPluginGroupsParallelAndSequential(pluginGroups)
		.then(function() {

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
			setSideMenu("sidebar_menu_product", "sidebar_menu_product_manage");

			// 파일 업로드 관련 레이어 숨김 처리
			$(".body-middle").hide();

			// 데이터 테이블 로드 함수
			var waitDataTable = setInterval(function () {
				try {
					if (!$.fn.DataTable.isDataTable("#pdservice_table")) {
						dataTableLoad();
						clearInterval(waitDataTable);
					}
				} catch (err) {
					console.log("서비스 데이터 테이블 로드가 완료되지 않아서 초기화 재시도 중...");
				}
			}, 313 /*milli*/);

			// --- 에디터 설정 --- //
			var waitCKEDITOR = setInterval(function () {
				try {
					if (window.CKEDITOR) {
						if(window.CKEDITOR.status == "loaded"){
							// 제품
							CKEDITOR.replace("modal_product_add_editor",{ skin: "office2013" }); // 제품 추가 팝업
							CKEDITOR.replace("modal_product_edit_editor",{ skin: "office2013" }); // 제품 편집 팝업

							// 제품 디테일
							CKEDITOR.replace("modal_product_detail_add_editor",{ skin: "office2013" }); // 제품 기획서 등록 팝업
							CKEDITOR.replace("modal_product_detail_edit_editor",{ skin: "office2013" }); // 제품 기획서 편집 팝업
							CKEDITOR.replace("stats_pdservice_detail_editor",{ skin: "office2013" });// 제품 기획서 클릭 시 우측 상세보기
							CKEDITOR.replace("report_pdservice_detail_editor",{ skin: "office2013" }); //제품 기획서 클릭 시 우측  편집하기

							clearInterval(waitCKEDITOR);
						}
					}
				} catch (err) {
					console.log("CKEDITOR 로드가 완료되지 않아서 초기화 재시도 중...");
				}
			}, 313 /*milli*/);
			$("#popup_editview_pdservice_name").tooltip();

			tab_click_event();

			select2_setting();

			file_upload_setting();

			init_versionList();

			product_save_btn_click(); // 제품 등록

			product_update_btn_click(); // 제품 편집

			product_delete_btn_click(); // 제품 삭제

			product_detail_save_btn_click(); // 제품 디테일 추가

			product_detail_update_btn_click(); // 제품 디테일 편집

			product_detail_delete_btn_click(); // 제품 디테일 삭제

			popup_size_setting(); // 모달 클릭 시 height 조절

			drawio();

			// 스크립트 실행 로직을 이곳에 추가합니다.
			var 라따적용_클래스이름_배열 = [
				'.ladda-new-pdservice',
				'.ladda-edit-pdservice',
				'.ladda-delete-pdservice',
				'.ladda-new-pdservice-detail',
				'.ladda-delete-pdservice-detail',
				'.ladda-edit-pdservice-detail',
			];

			laddaBtnSetting(라따적용_클래스이름_배열);

		})
		.catch(function() {
			console.error('플러그인 로드 중 오류 발생');
		});
}

function drawio() {

    // 로컬 스토리지 초기화
    localStorage.clear();

	$("#btn_modal_product_detail_add_drawio, #btn_product_detail_edit_drawio, #btn_modal_product_detail_edit_drawio").on("click", function () {
		if (this.id === 'btn_modal_product_detail_add_drawio') {
			if(selectId == "" || selectId == undefined){
				jError("제품(서비스)을 선택해 주세요.");
				return false;
			}
			window.open('/reference/drawio?id='+selectId+ '&type=create&splash=0&armsType=product', '_blank');
		} else if (this.id === 'btn_product_detail_edit_drawio') {
			if(selectedDetailId == "" || selectedDetailId == undefined){
				jError("제품(서비스) 산출물을 선택해 주세요.");
				return false;
			}
			window.open('/reference/drawio?id=' + selectedDetailId + '&type=update&splash=0&armsType=product', '_blank');
		} else if(this.id === "btn_modal_product_detail_edit_drawio") {
			if(selectedDetailId == "" || selectedDetailId == undefined){
				jError("제품(서비스) 산출물을 선택해 주세요.");
				return false;
			}
			window.open('/reference/drawio?id=' + selectedDetailId + '&type=update&splash=0&armsType=product', '_blank');
		} else {
			jError("drawio was clicked but id is not matched");
			return false;
		}
	});
}

function setDrawioImage(localStorageKey, localStorageValue, mode) {
	var imageSrcArray = Array(1).fill(localStorageValue);

	if (mode === "create") {
		addImageToSwiper(imageSrcArray, 'modal_product_detail_add_pdservice_detail_drawio_swiper_container');
		$("#modal_product_detail_add_pdservice_detail_drawio_swiper").show();
	}

	if (mode === "update") {
		addImageToSwiper(imageSrcArray, 'product_detail_update_pdservice_detail_drawio_swiper_container');
		$("#product_detail_update_pdservice_detail_drawio_swiper").show();
		addImageToSwiper(imageSrcArray, 'modal_product_detail_edit_pdservice_detail_drawio_swiper_container');
		$("#modal_product_detail_edit_pdservice_detail_drawio_swiper").show();
		addImageToSwiper(imageSrcArray, 'product_detail_view_pdservice_detail_drawio_swiper_container');
		$("#product_detail_view_pdservice_detail_drawio_swiper").show();
	}

}

function setDefaultBtnText() {
    changeBtnText('#btn_modal_product_detail_add_drawio', 'drawio 등록하러 가기');
    changeBtnText('#btn_modal_product_detail_edit_drawio', 'drawio 편집하러 가기');
    changeBtnText('#btn_product_detail_edit_drawio', 'drawio 편집하러 가기');

    changeBtnText('#modal_product_detail_add_drawio_time', '');
    changeBtnText('#modal_product_detail_edit_drawio_time', '');
    changeBtnText('#product_detail_edit_drawio_time', '');
}

////////////////////////////////////////////////////////////////////////////////////////
// 탭 클릭 이벤트 처리
////////////////////////////////////////////////////////////////////////////////////////
function tab_click_event() {
	$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
		var target = $(e.target).attr("href"); // activated tab
		console.log(target);

		if(target == "#stats") {
			hideProductDetailEditBtn();
			hideProductDetailRemoveBtn();
			hideDropzoneArea();
		}
		if (target == "#report") {
			showProductDetailEditBtn();
			hideProductDetailRemoveBtn();
			showDropzoneArea();
		}
		if (target == "#delete") {
			hideProductDetailEditBtn();
			showProductDetailRemoveBtn();
			hideDropzoneArea();

			if (isEmpty(selectId)) {
				jError("선택된 제품(서비스)가 없습니다. 오류는 무시됩니다.");
			} else {
				$("#delete_text").text($("#selected_pdservice_detail").text());
			}
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// 파일 업로드 관련 Dropzone.js UI 노출
////////////////////////////////////////////////////////////////////////////////////////
function showDropzoneArea() {
	$(".pdservice-detail-image-row").show();
	$(".file-delete-btn").show();
	if (selectId == undefined || selectedDetailId == "") {
		$(".body-middle").hide();
	} else {
		$(".body-middle").show();
	}
}
////////////////////////////////////////////////////////////////////////////////////////
// 파일 업로드 관련 Dropzone.js UI 숨김
////////////////////////////////////////////////////////////////////////////////////////
function hideDropzoneArea() {
	$(".pdservice-detail-image-row").hide();
	$(".file-delete-btn").hide();
	if (selectId == undefined) {
		$(".body-middle").hide();
	} else {
		$(".body-middle").show();
	}
}
////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 편집 버튼 노출
////////////////////////////////////////////////////////////////////////////////////////
function showProductDetailEditBtn() {
	$("#div_modal_product_detail").removeClass("hidden");
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 편집 버튼 숨김
////////////////////////////////////////////////////////////////////////////////////////
function hideProductDetailEditBtn() {
	$("#div_modal_product_detail").addClass("hidden");
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 삭제 버튼 노출
////////////////////////////////////////////////////////////////////////////////////////
function showProductDetailRemoveBtn() {
	$("#div_product_detail_delete").removeClass("hidden");
}
////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 삭제 버튼 숨김
////////////////////////////////////////////////////////////////////////////////////////
function hideProductDetailRemoveBtn() {
	$("#div_product_detail_delete").addClass("hidden");
}


////////////////////////////////////////////////////////////////////////////////////////
// --- 신규 제품(서비스) 등록 팝업 및 팝업 띄울때 사이즈 조정 -- //
////////////////////////////////////////////////////////////////////////////////////////
function popup_size_setting(){
	console.log("popup_size_setting() is activated");

	$("#btn_modal_product_detail_edit").click(function () {
		if (selectId == "" || selectId == undefined) {
			jError("선택된 제품(서비스)가 없습니다.");
			return false;
		}

		if (selectedDetailId == "" || selectedDetailId == undefined) {
			jError("선택된 제품(서비스) 산출물이 없습니다.");
			return false;
		}
		var height = $(document).height() - 900;

		$(".modal-body")
			.find(".cke_contents:eq(0)")
			.css("height", height + "px");
	});
	$("#btn_modal_product_add").click(function () {
		var height = $(document).height() - 900;
		//모달 초기화
		$("#modal_product_add").on("hidden.bs.modal", function (e) {
			$(this).find('form')[0].reset();
			$("#modal_product_add_pdservice_owner").val(null).trigger("change");
			$("#modal_product_add_pdservice_reviewers").val(null).trigger("change");
			CKEDITOR.instances.modal_product_add_editor.setData("<p>제품(서비스)의 기획서 및 Project Charter 의 내용을 기록합니다.</p>"); //에디터 초기화
		});

		var reviewerCount = 1;

		$("#modal_product_add_pdservice_reviewers").trigger("change");

		$("#modal_product_add_pdservice_reviewer").css("height", "20px");
		setTimeout(function () {
			var heightValue = 40;
			var resultValue = heightValue + 20 * reviewerCount;
			$("#modal_product_add_pdservice_reviewer").css("height", resultValue + "px");
		}, 250);

		$(".modal-body")
			.find(".cke_contents:eq(0)")
			.css("height", height + "px");

	});

	// 팝업하여 편집
	$("#btn_modal_product_edit").click(function () {
		if (selectId == "" || selectId == undefined) {
			jError("선택된 제품(서비스)가 없습니다.");
			return false;
		}
		var height = $(document).height() - 900;
		$(".modal-body")
			.find(".cke_contents:eq(0)")
			.css("height", height + "px");

		var multifyValue = 1 + $('#modal_product_edit_pdservice_reviewers option').length;

		$("#modal_product_edit_pdservice_reviewers").trigger("change");

		$("#modal_product_edit_pdservice_reviewer").css("height", "20px");
		setTimeout(function () {
			var heightValue = 40;
			var resultValue = heightValue + 20 * multifyValue;
			$("#modal_product_edit_pdservice_reviewer").css("height", resultValue + "px");
		}, 250);
	});

}


////////////////////////////////////////////////////////////////////////////////////////
// --- select2 (사용자 자동완성 검색 ) 설정 --- //
////////////////////////////////////////////////////////////////////////////////////////
function select2_setting() {
	$(".js-data-example-ajax").select2({
		maximumSelectionLength: 5,
		width: "resolve",
		ajax: {
			url: function (params) {
				return "/auth-user/search-user/" + params.term;
			},
			dataType: "json",
			delay: 250,
			processResults: function (data, params) {
				params.page = params.page || 1;

				return {
					results: data,
					pagination: {
						more: params.page * 30 < data.total_count
					}
				};
			},
			cache: true
		},
		placeholder: "리뷰어 설정을 위한 계정명을 입력해 주세요",
		minimumInputLength: 1,
		templateResult: formatUser,
		templateSelection: formatUserSelection
	});
}

////////////////////////////////////////////////////////////////////¸////////////////////
// --- select2 (사용자 자동완성 검색 ) templateResult 설정 --- //
////////////////////////////////////////////////////////////////////////////////////////
function formatUser(jsonData) {
	console.log("formatUser");
	console.log(jsonData)
	var $container = $(
		"<div class='select2-result-jsonData clearfix'>" +
		"<div class='select2-result-jsonData__meta'>" +
		"<div class='select2-result-jsonData__username'><i class='fa fa-flash'></i></div>" +
		"<div class='select2-result-jsonData__id'><i class='fa fa-star'></i></div>" +
		"</div>" +
		"</div>"
	);

	$container.find(".select2-result-jsonData__username").text(jsonData.username);
	$container.find(".select2-result-jsonData__id").text(jsonData.id);

	return $container;
}

////////////////////////////////////////////////////////////////////////////////////////
// --- select2 (사용자 자동완성 검색 ) templateSelection 설정 --- //
////////////////////////////////////////////////////////////////////////////////////////
function formatUserSelection(jsonData) {
	console.log("formatUserSelection");
	console.log(jsonData);

	if (jsonData._resultId) {
		let defaultHeight = 40;
		if (jsonData._resultId.includes("modal_product_add_pdservice_reviewers")) {
			let modalElement = $("#modal_product_add_pdservice_reviewers");
			let reviewerCount = modalElement.children("option").length;
			let height = defaultHeight + (20 * reviewerCount);
			$("#modal_product_add_pdservice_reviewer").css("height", height + "px");
		} else if (jsonData._resultId.includes("modal_product_edit_pdservice_reviewer")) {
			let modalElement = $("#modal_product_add_pdservice_reviewers");
			let reviewerCount = modalElement.children("option").length;
			let height = defaultHeight + (20 * reviewerCount);
			$("#modal_product_edit_pdservice_reviewer").css("height", height + "px");
		}
	}

	if (jsonData.id == "") {
		jsonData.text = "placeholder";
	} else {
		if (jsonData.username == undefined) {
			jsonData.text = jsonData.id;
		} else {
			jsonData.text = "[" + jsonData.username + "] - " + jsonData.id;
		}
	}
	return jsonData.text;
}

////////////////////////////////////////////////////////////////////////////////////////
// --- file upload --- //
////////////////////////////////////////////////////////////////////////////////////////
function file_upload_setting() {
	var $fileupload = $("#fileupload");
	$fileupload.fileupload({
		autoUpload: false,
		sequentialUploads: true,
		url: "/auth-user/api/arms/pdServiceDetail/uploadFileToNode.do",
		dropZone: $("#dropzone")
	});

	$("#fileupload").bind("fileuploadsubmit", function (e, data) {
		var input = $("#fileIdlink");
		data.formData = { pdServiceDetailId: input.val() };
		if (!data.formData.pdServiceDetailId) {
			data.context.find("button").prop("disabled", false);
			input.focus();
			return false;
		}
	});

}

////////////////////////////////////////////////////////////////////////////////////////
// --- 데이터 테이블 설정 --- //
////////////////////////////////////////////////////////////////////////////////////////
function dataTableLoad() {
	// 데이터 테이블 컬럼 및 열그룹 구성
	var columnList = [
		{ name: "c_id", title: "제품(서비스) 아이디", data: "c_id", visible: false },
		{
			name: "c_title",
			title: "제품(서비스) 이름",
			data: "c_title",
			render: function (data, type, row, meta) {
				if (type === "display") {
					return '<label style="color: #a4c6ff">' + data + "</label>";
				}
				return data;
			},
			className: "dt-body-left",
			visible: true
		}
	];
	var rowsGroupList = [];
	var columnDefList = [];
	var selectList = {};
	var orderList = [[0, "asc"]];
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

	var jquerySelector = "#pdservice_table";
	var ajaxUrl = "/auth-user/api/arms/pdServicePure/getPdServiceMonitor.do";
	var jsonRoot = "response";
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

	$("#copychecker").on("click", function () {
		dataTableRef.button(".buttons-copy").trigger();
	});
	$("#printchecker").on("click", function () {
		dataTableRef.button(".buttons-print").trigger();
	});
	$("#csvchecker").on("click", function () {
		dataTableRef.button(".buttons-csv").trigger();
	});
	$("#excelchecker").on("click", function () {
		dataTableRef.button(".buttons-excel").trigger();
	});
	$("#pdfchecker").on("click", function () {
		dataTableRef.button(".buttons-pdf").trigger();
	});
}


// 데이터 테이블 구성 이후 꼭 구현해야 할 메소드 : 열 클릭시 이벤트
function dataTableClick(tempDataTable, selectedData) {
	selectedIndex = selectedData.selectedIndex;
	selectedPage = selectedData.selectedPage;
	selectId = selectedData.c_id;
	selectName = selectedData.c_title;
	pdServiceDataTableClick(selectedData.c_id);
}

////////////////////////////////////////////////////////////////////////////////////////
//제품의 게시글 리스트를 로드하는 함수 ( 게시글 추가, 갱신, 삭제 시 호출 )
////////////////////////////////////////////////////////////////////////////////////////
function productServiceDetailDataLoad(selectId) {
	return new Promise((resolve, reject) => {
		$.ajax("/auth-user/api/arms/pdServiceDetail/getNodes.do/" + selectId).done(function (json) {
			$("#version_accordion").jsonMenu("set", json.response, { speed: 5000 });
			showDefaultTab();
			dropzoneDataClear();
			setDefaultBtnText();
			drawioImageClear();
			resolve();
		});
	});
}


////////////////////////////////////////////////////////////////////////////////////////
// 제품 선택 시, 제품 디테일 GET API 호출 후 목록을 그려주는 함수
////////////////////////////////////////////////////////////////////////////////////////
function draw(main, menu) {
	main.html("");

	var data = `
			   <button type="button"
					class="btn btn-primary btn-block btn-sm"
					id="btn_modal_product_detail_add"
					data-toggle="modal"
					data-target="#modal_product_detail_add"
					onclick="product_detail_add_clear();"
					style="margin-bottom: 10px !important; margin-top: 10px;">
					제품(서비스) 산출물 등록하기
				</button>
				<div class="gradient_bottom_border" style="width: 100%; height: 2px; margin-bottom: 10px;"></div>`;

	for (var i = 0; i < menu.length; i++) {
		data += `
           <div class="panel">
               <div class="panel-heading">
                   <a class="accordion-toggle collapsed"
                            data-toggle="collapse"
                            id="pdservice_detail_link_${menu[i].c_id}"
                            style="color: #a4c6ff; text-decoration: none; cursor: pointer;"
                            onclick="detailClick(this, ${menu[i].c_id});
                            return false;">
                       ${menu[i].c_title}
                   </a>
               </div>
           </div>`;
	}

	main.html(data);
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 추가 팝업 실행 시 데이터 초기화 및 팝업 사이즈 조절
////////////////////////////////////////////////////////////////////////////////////////
function product_detail_add_clear () {
	var height = $(document).height() - 900;

	//모달 초기화
	$("#modal_product_detail_add").on("hidden.bs.modal", function (e) {
		// $(this).find('form')[0].reset();
		$('#modal_product_detail_add_pdservice_detail_name').val("");
		CKEDITOR.instances.modal_product_detail_add_editor.setData("<p>제품(서비스)의 기획서 및 Project Charter 의 내용을 기록합니다.</p>"); //에디터 초기화
	});

	$(".modal-body")
		.find(".cke_contents:eq(0)")
		.css("height", height + "px");

	if(localStorage.getItem("create-drawio-"+selectId) && localStorage.getItem("create-drawio-time-"+selectId)) {
		changeBtnText('#btn_modal_product_detail_add_drawio', 'drawio 등록 완료');
		changeBtnText('#modal_product_detail_add_drawio_time', localStorage.getItem("create-drawio-time-"+selectId));
	}

	if(localStorage.getItem("create-drawio-image-raw-"+selectId)) {
		setDrawioImage("create-drawio-image-raw-"+selectId, localStorage.getItem("create-drawio-image-raw-"+selectId), "create");
	}
}

function drawioImageClear() {
	$("#product_detail_view_pdservice_detail_drawio_swiper").hide();
	$("#product_detail_update_pdservice_detail_drawio_swiper").hide();
	$("#modal_product_detail_edit_pdservice_detail_drawio_swiper").hide();
	$("#modal_product_detail_add_pdservice_detail_drawio_swiper").hide();
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 목록에서 선택 시 상세보기 및 편집하기 데이터 바인딩
////////////////////////////////////////////////////////////////////////////////////////
function detailClick(element, c_id) {
	return new Promise((resolve, reject) => {
		showDefaultTab();
		dropzoneDataClear();
		hideDropzoneArea();
		setDefaultBtnText();
		drawioImageClear();

		$("a[id^='pdservice_detail_link_']").each(function() {
			this.style.background = "";
			if (c_id == this.id.split("_")[3]) {
				this.style.background = "rgba(229, 96, 59, 0.3)";
				this.style.color = "rgb(164, 198, 255)";
				this.style.textDecoration = "none";
				this.style.cursor = "pointer";
			}
		});

		$.ajax({
			url: "/auth-user/api/arms/pdServiceDetail/getNode.do", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
			data: { c_id: c_id },
			method: "GET",
			dataType: "json"
		}).done(function(json) {

			selectedDetailId = json.c_id;
			selectedDetailName = json.c_title;

			$("#fileIdlink").val(json.c_id);

			$("#modal_product_detail_edit_pdservice_name").val(selectName);
			$("#stats_pdservice_name").val(selectName);
			$("#stats_pdservice_name").val(selectName);
			$("#report_pdservice_name").val(selectName);
			$("#report_pdservice_name").val(selectName);

			$("#modal_product_detail_edit_pdservice_detail_name").val(json.c_title);
			$("#stats_pdservice_detail_name").val(json.c_title);
			$("#stats_pdservice_detail_name").val(json.c_title);
			$("#report_pdservice_detail_name").val(json.c_title);
			$("#report_pdservice_detail_name").val(json.c_title);


			CKEDITOR.instances.stats_pdservice_detail_editor.setData(json.c_contents); // 상세 보기
			CKEDITOR.instances.report_pdservice_detail_editor.setData(json.c_contents); // 편집 하기
			CKEDITOR.instances.modal_product_detail_edit_editor.setData(json.c_contents); // 모달 편집 하기

			if (json.c_drawio_image_raw != null && json.c_drawio_image_raw != "") {
				setDrawioImage("", json.c_drawio_image_raw, "update");
			}

			$("#selected_pdservice_detail").text(json.c_title);
			$("#modal_product_detail_edit_pdservice_detail_name").val(json.c_title);

			$(".list-group-item-detail-edit .chat-message-body").css({ "border-left": "" });
			$(".list-group-item-detail-edit .arrow").css({ "border-right": "" });

			if (localStorage.getItem("update-drawio-" + c_id) && localStorage.getItem("update-drawio-time-" + c_id)) {
				changeBtnText("#btn_modal_product_detail_edit_drawio", "drawio 편집 완료");
				changeBtnText("#btn_product_detail_edit_drawio", "drawio 편집 완료");
				changeBtnText("#modal_product_detail_edit_drawio_time", localStorage.getItem("update-drawio-time-" + c_id));
				changeBtnText("#product_detail_edit_drawio_time", localStorage.getItem("update-drawio-time-" + c_id));
			}

			if (localStorage.getItem("update-drawio-image-raw-" + c_id)) {
				setDrawioImage("update-drawio-image-raw-" + c_id, localStorage.getItem("update-drawio-image-raw-" + c_id), "update");
			}

			reloadDetailFileData(json.c_id)
				.then(() => {
					resolve();
				});
		}).fail(function(xhr, status, errorThrown) {
			console.log(xhr + status + errorThrown);
		}).always(function(xhr, status) {
			$("#text").html("요청이 완료되었습니다!");
			console.log(xhr + status);
		});
	});
}

function init_versionList() {
	var menu;
	$.fn.jsonMenu = function (action, items, options) {
		$(this).addClass("json-menu");
		if (action == "add") {
			menu.body.push(items);
			draw($(this), menu);
		} else if (action == "set") {
			menu = items;
			draw($(this), menu);
		}
		return this;
	};
}
//데이터 테이블 ajax load 이후 콜백.
function dataTableCallBack(settings, json) {
}

function dataTableDrawCallback(tableInfo) {
	$("#" + tableInfo.sInstance)
		.DataTable()
		.columns.adjust()
		.responsive.recalc();
}

////////////////////////////////////////////////////////////////////////////////////////
//제품(서비스) 클릭할 때 동작하는 함수
////////////////////////////////////////////////////////////////////////////////////////
function pdServiceDataTableClick(c_id) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: "/auth-user/api/arms/pdServicePure/getPdServiceWithDetail.do", // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
			data: { c_id: c_id }, // HTTP 요청과 함께 서버로 보낼 데이터
			method: "GET", // HTTP 요청 메소드(GET, POST 등)
			dataType: "json", // 서버에서 보내줄 데이터의 타입
			beforeSend: function() {
				$(".loader").removeClass("hide");
			}
		})
			// HTTP 요청이 성공하면 요청한 데이터가 done() 메소드로 전달됨.
			.done(function(apiResult) {
				let pdServicePure = apiResult.response.pdServicePure;
				let pdServiceDetails = apiResult.response.pdServiceDetails;
				let pdServiceTitle = pdServicePure.c_title;
				let pdServiceOwner = pdServicePure.c_pdservice_owner;
				let pdServiceReviewers = [
					pdServicePure.c_pdservice_reviewer01,
					pdServicePure.c_pdservice_reviewer02,
					pdServicePure.c_pdservice_reviewer03,
					pdServicePure.c_pdservice_reviewer04,
					pdServicePure.c_pdservice_reviewer05
				];

				$("#version_accordion").jsonMenu("set", pdServiceDetails, { speed: 5000 });
				selectedDetailId = "";
				selectedDetailName = "";

				$(".list-group-item-detail").html(generateSelectedPdServiceUI(pdServiceTitle));

				$("#modal_product_edit_pdservice_name").val(pdServiceTitle);

				$("#modal_product_detail_add_pdservice_name").val(pdServiceTitle);

				$("#modal_product_edit_pdservice_owner").val(null).trigger("change");

				if (pdServiceOwner && pdServiceOwner !== "none") {
					var newOption = new Option(pdServiceOwner, pdServiceOwner, true, true);
					$("#modal_product_edit_pdservice_owner").append(newOption).trigger("change");
				}

				$("#modal_product_edit_pdservice_reviewers").val(null).trigger("change");

				var selectedReviewerArr = [];
				pdServiceReviewers.forEach(function(reviewer) {
					if (reviewer && reviewer !== "none") {
						selectedReviewerArr.push(reviewer);
						if ($("#modal_product_edit_pdservice_reviewers").find("option[value='" + reviewer + "']").length === 0) {
							var newOption = new Option(reviewer, reviewer, true, true);
							$("#modal_product_edit_pdservice_reviewers").append(newOption).trigger("change");
						}
					}
				});

				$("#modal_product_edit_pdservice_reviewers").val(selectedReviewerArr).trigger("change");

				CKEDITOR.instances.modal_product_edit_editor.setData(pdServicePure.c_pdservice_contents); // 편집하기

				// ------------------------- 제품 선택 시, 제품 디테일 모든 값 초기화  --------------------------------//
				productDetailNameClear();
				productDetailEditorClear();
				showDefaultTab();
				dropzoneDataClear();
				productDetailArrowClear();
				setDefaultBtnText();
				drawioImageClear();
				resolve();
			})
			.fail(function(xhr, status, errorThrown) {
				console.log(xhr + status + errorThrown);
				reject();
			})
			.always(function(xhr, status) {
				console.log(xhr + status);
				$(".loader").addClass("hide");
			});
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일 UI 초기화
////////////////////////////////////////////////////////////////////////////////////////
function productDetailArrowClear() {
	$("#selected_pdservice_detail").text("선택되지 않음");
	$("#list-group-item-detail-edit-arrow").css({ "top": "10px", "left": "-7px", "border-right": "5px solid #a4c6ff" });
	$(".list-group-item-detail-edit .chat-message-body").css({"margin-left": "0px", "padding": "0px 10px 0px 10px", "border-left": "2px solid #a4c6ff"});
}

////////////////////////////////////////////////////////////////////////////////////////
// 상세보게 tab 을 기본으로 초기화
////////////////////////////////////////////////////////////////////////////////////////
function showDefaultTab() {
	$("a[href=\"#stats\"]").tab("show");
}

////////////////////////////////////////////////////////////////////////////////////////
// Dropzone.js 데이터 초기화
////////////////////////////////////////////////////////////////////////////////////////
function dropzoneDataClear() {
	$("table tbody.files").empty();
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일명 관련 data 초기화
////////////////////////////////////////////////////////////////////////////////////////
function productDetailNameClear() {
	$("#selected_pdservice_detail").text("선택되지 않음");
	$("#modal_product_detail_edit_pdservice_detail_name").val("");

	$("#stats_pdservice_name").val("");
	$("#report_pdservice_name").val("");

	$("#stats_pdservice_detail_name").val("");
	$("#report_pdservice_detail_name").val("");
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일명 관련 ckeditor 초기화
////////////////////////////////////////////////////////////////////////////////////////
function productDetailEditorClear() {
	CKEDITOR.instances.modal_product_detail_add_editor.setData("<p>제품(서비스)의 기획서 및 Project Charter 의 내용을 기록합니다.</p>");
	CKEDITOR.instances.modal_product_detail_edit_editor.setData("<p>제품(서비스)의 기획서 및 Project Charter 의 내용을 기록합니다.</p>");
	CKEDITOR.instances.stats_pdservice_detail_editor.setData("<p>제품(서비스)의 기획서 및 Project Charter 의 내용을 기록합니다.</p>");
	CKEDITOR.instances.report_pdservice_detail_editor.setData("<p>제품(서비스)의 기획서 및 Project Charter 의 내용을 기록합니다.</p>");
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품 디테일명 저장 버튼 이벤트 처리
////////////////////////////////////////////////////////////////////////////////////////
function product_detail_save_btn_click() {
	$("#btn_modal_product_detail_add_submit").click(function() {

        let title = $('#modal_product_detail_add_pdservice_detail_name').val();
	    if (!title) {
	        alert('제품(서비스) 산출물 이름을 작성해 주세요');
	        return;
	    }

		var requestParams = {
			ref: 2,
			c_type: "default",
			c_title: title,
			c_contents: CKEDITOR.instances.modal_product_detail_add_editor.getData()
		};

		var drawioXML = localStorage.getItem("create-drawio-" + selectId);
		if(drawioXML !== null) {
			requestParams.c_drawio_contents = drawioXML;
		}

		var drawioThumbnail = localStorage.getItem("create-drawio-image-raw-" + selectId);
		if(drawioThumbnail !== null) {
			requestParams.c_drawio_image_raw = drawioThumbnail;
		}

		$.ajax({
			url: "/auth-user/api/arms/pdServiceDetail/addNode.do/" + selectId,
			type: "POST",
			data: requestParams,
			progress: true,
			statusCode: {
				200: function (data) {
					$("#btn_modal_product_detail_add_close").trigger("click");
					reloadDetailData(selectId, data.response.c_id, data.response.c_id)
						.then(() => {
							localStorage.removeItem("create-drawio-" + selectId);
							localStorage.removeItem("create-drawio-image-raw-" + selectId);
							localStorage.removeItem("create-drawio-time-" + selectId);
							removeDrawIOConfig();
							jSuccess("신규 제품 디테일 등록이 완료 되었습니다.");
						});
				}
			},
			beforeSend: function () {
				$("#btn_modal_product_detail_add_submit").hide();
			},
			complete: function () {
				$("#btn_modal_product_detail_add_submit").show();
			},
			error: function (e) {
				jError("신규 제품 디테일 등록 중 에러가 발생했습니다.");
			}
		});

		// 버튼 원상복구
		changeBtnText('#btn_modal_product_detail_add_drawio', 'drawio 등록하러 가기');
		changeBtnText('#modal_product_detail_add_drawio_time', '');
	});
}
////////////////////////////////////////////////////////////////////////////////////////
// 신규 제품(서비스) 등록 버튼
////////////////////////////////////////////////////////////////////////////////////////
function product_save_btn_click() {
	$("#btn_modal_product_add_submit").click(function () {
		var reviewers01 = "none";
		var reviewers02 = "none";
		var reviewers03 = "none";
		var reviewers04 = "none";
		var reviewers05 = "none";

		if ($("#modal_product_add_pdservice_reviewers").select2("data")[0] != undefined) {
			reviewers01 = $("#modal_product_add_pdservice_reviewers").select2("data")[0].text;
		}
		if ($("#modal_product_add_pdservice_reviewers").select2("data")[1] != undefined) {
			reviewers02 = $("#modal_product_add_pdservice_reviewers").select2("data")[1].text;
		}
		if ($("#modal_product_add_pdservice_reviewers").select2("data")[2] != undefined) {
			reviewers03 = $("#modal_product_add_pdservice_reviewers").select2("data")[2].text;
		}
		if ($("#modal_product_add_pdservice_reviewers").select2("data")[3] != undefined) {
			reviewers04 = $("#modal_product_add_pdservice_reviewers").select2("data")[3].text;
		}
		if ($("#modal_product_add_pdservice_reviewers").select2("data")[4] != undefined) {
			reviewers05 = $("#modal_product_add_pdservice_reviewers").select2("data")[4].text;
		}

		const cTitle = $("#modal_product_add_pdservice_name").val();

		$.ajax({
			url: "/auth-user/api/arms/pdService/addPdServiceNode.do",
			type: "POST",
			data: {
				ref: 2,
				c_title: cTitle,
				c_type: "default",
				c_pdservice_owner: $("#modal_product_add_pdservice_owner").select2("data")[0].text,
				c_pdservice_reviewer01: reviewers01,
				c_pdservice_reviewer02: reviewers02,
				c_pdservice_reviewer03: reviewers03,
				c_pdservice_reviewer04: reviewers04,
				c_pdservice_reviewer05: reviewers05,
				c_pdservice_contents: CKEDITOR.instances.modal_product_add_editor.getData()
			},
			statusCode: {
				200: function () {
					//모달 팝업 끝내고
					$("#btn_modal_product_add_close").trigger("click");
					//데이터 테이블 데이터 재 로드
					reloadDataWithSameOrdering(cTitle);
					jSuccess("신규 제품 등록이 완료 되었습니다.");
				}
			},
			beforeSend: function () {
				$("#btn_modal_product_add_submit").hide();
			},
			complete: function () {
				$("#btn_modal_product_add_submit").show();
			},
			error: function (e) {
				jError("신규 제품 등록 중 에러가 발생했습니다.");
			}
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// 신규 제품(서비스) 삭제 버튼
////////////////////////////////////////////////////////////////////////////////////////
function product_delete_btn_click(){
	$("#btn_modal_product_delete").click(function () {
		if (selectId == "" || selectId == undefined) {
			jError("제품(서비스)을 선택해 주세요.");
			return false;
		}
		var deletedPdServiceName = selectName;
		$.ajax({
			url: "/auth-user/api/arms/pdService/removeAll.do/" + selectId,
			type: "post",
			statusCode: {
				200: function () {
					reloadDataWithSameOrdering("");
					$(".list-group-item-detail").html(generateUnselectedPdServiceUI());
					$("#version_accordion").html("");
					productDetailNameClear();
					productDetailEditorClear();
					showDefaultTab();
					dropzoneDataClear();
					productDetailArrowClear();
					selectId = ""; // 제품 아이디
					selectName = ""; // 제품 이름
					selectedDetailId = ""; // 선택한 디테일 아이디
					selectedDetailName = ""; // 선택한 디테일 이름
					$("#btn_modal_product_edit_close").trigger("click");
					jSuccess(deletedPdServiceName + " 데이터가 삭제되었습니다.");
				}
			}
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// 신규 제품(서비스) 디테일 삭제 버튼
////////////////////////////////////////////////////////////////////////////////////////
function product_detail_delete_btn_click(){
	$("#btn_product_detail_delete").click(function () {
		if (selectedDetailId == "") {
			jError("제품(서비스) 디테일을 선택해 주세요.");
			return false;
		}
		var tempSelectId = selectId;
		$.ajax({
			url: "/auth-user/api/arms/pdServiceDetail/deleteNode.do/" + selectedDetailId,
			type: "post",
			statusCode: {
				200: function() {
					productDetailNameClear();
					productDetailEditorClear();
					productDetailArrowClear();
					productServiceDetailDataLoad(tempSelectId)
						.then(() => {
							selectedDetailId = "";
							selectedDetailName = "";
							jSuccess($("#report_pdservice_detail_name").val() + " 데이터가 삭제되었습니다.");
						});
				}
			}
		});
	});
}

////////////////////////////////////////////////////////////////////////////////////////
// 제품(서비스) 기획서 변경 저장 버튼
////////////////////////////////////////////////////////////////////////////////////////
function product_detail_update_btn_click() {
	// 모달에서 편집하기
	$("#btn_modal_product_detail_edit_submit").click(function () {
		var detailName = $("#modal_product_detail_edit_pdservice_detail_name").val().trim();
		var tempSelectId = selectId;
		var tempSelectDetailId = selectedDetailId;

		if(selectedDetailId == "" || selectedDetailName == "") {
			jError("선택된 제품(서비스) 산출물이 없습니다.");
			return false;
		}

		if (detailName == "") {
			jError("제품(서비스) 산출물명을 입력해 주세요.");
			return false;
		}

		var requestParams = {
			c_id: selectedDetailId,
			c_title: detailName,
			c_contents: CKEDITOR.instances.modal_product_detail_edit_editor.getData()
		};

		var drawioXML = localStorage.getItem("update-drawio-" + selectedDetailId);
		if(drawioXML !== null) {
			requestParams.c_drawio_contents = drawioXML;
		}

		var drawioThumbnail = localStorage.getItem("update-drawio-image-raw-" + selectedDetailId);
		if(drawioThumbnail !== null) {
			requestParams.c_drawio_image_raw = drawioThumbnail;
		}

		$.ajax({
			url: "/auth-user/api/arms/pdServiceDetail/updateNode.do",
			type: "put",
			data: requestParams,
			statusCode: {
				200: function() {
					$("#btn_modal_product_detail_edit_close").trigger("click");
					reloadDetailData(tempSelectId, selectedDetailId, tempSelectDetailId)
						.then(() => {
							localStorage.removeItem("update-drawio-" + tempSelectDetailId);
							localStorage.removeItem("update-drawio-image-raw-" + tempSelectDetailId);
							localStorage.removeItem("update-drawio-time-" + tempSelectDetailId);
							removeDrawIOConfig();
							jSuccess(detailName + "의 데이터가 변경되었습니다.");
						});
				}
			}
		});

		// 버튼 원상복구
        changeBtnText('#btn_modal_product_detail_edit_drawio', 'drawio 편집하러 가기');
        changeBtnText('#modal_product_detail_edit_drawio_time', '');
	});

	// 편집하기
	$("#btn_product_detail_edit_submit").click(function () {
		var detailName = $("#report_pdservice_detail_name").val().trim();
		var tempSelectId = selectId;
		var tempSelectDetailId = selectedDetailId;
		if(selectedDetailId == "" || selectedDetailName == "") {
			jError("선택된 제품(서비스) 산출물이 없습니다.");
			return false;
		}

		if (detailName == "") {
			jError("제품(서비스) 산출물명을 입력해 주세요.");
			return false;
		}

		var requestParams = {
			c_id: selectedDetailId,
			c_title: detailName,
			c_contents: CKEDITOR.instances.report_pdservice_detail_editor.getData()
		};

		var drawioXML = localStorage.getItem("update-drawio-" + selectedDetailId);
		if(drawioXML !== null) {
			requestParams.c_drawio_contents = drawioXML;
		}

		var drawioThumbnail = localStorage.getItem("update-drawio-image-raw-" + selectedDetailId);
		if(drawioThumbnail !== null) {
			requestParams.c_drawio_image_raw = drawioThumbnail;
		}

		$.ajax({
			url: "/auth-user/api/arms/pdServiceDetail/updateNode.do",
			type: "put",
			data: requestParams,
			statusCode: {
				200: function() {
					reloadDetailData(tempSelectId, selectedDetailId, tempSelectDetailId)
						.then(() => {
							localStorage.removeItem("update-drawio-" + tempSelectDetailId);
							localStorage.removeItem("update-drawio-image-raw-" + tempSelectDetailId);
							localStorage.removeItem("update-drawio-time-" + tempSelectDetailId);
							removeDrawIOConfig();
							jSuccess(detailName + "의 데이터가 변경되었습니다.");
						});
				}
			}
		});

		// 버튼 원상복구
		changeBtnText("#btn_product_detail_edit_drawio", "drawio 편집하러 가기");
		changeBtnText("#product_detail_edit_drawio_time", "");
	});

}

////////////////////////////////////////////////////////////////////////////////////////
// 팝업에서 제품(서비스) 변경 저장 버튼
////////////////////////////////////////////////////////////////////////////////////////
function product_update_btn_click() {
	$("#btn_modal_product_edit_submit").click(function () {
		var owner = "none";
		if ($("#modal_product_edit_pdservice_owner").select2("data")[0] != undefined) {
			owner = $("#modal_product_edit_pdservice_owner").select2("data")[0].text;
		}

		var reviewers01 = "none";
		var reviewers02 = "none";
		var reviewers03 = "none";
		var reviewers04 = "none";
		var reviewers05 = "none";
		if ($("#modal_product_edit_pdservice_reviewers").select2("data")[0] != undefined) {
			reviewers01 = $("#modal_product_edit_pdservice_reviewers").select2("data")[0].text;
		}
		if ($("#modal_product_edit_pdservice_reviewers").select2("data")[1] != undefined) {
			reviewers02 = $("#modal_product_edit_pdservice_reviewers").select2("data")[1].text;
		}
		if ($("#modal_product_edit_pdservice_reviewers").select2("data")[2] != undefined) {
			reviewers03 = $("#modal_product_edit_pdservice_reviewers").select2("data")[2].text;
		}
		if ($("#modal_product_edit_pdservice_reviewers").select2("data")[3] != undefined) {
			reviewers04 = $("#modal_product_edit_pdservice_reviewers").select2("data")[3].text;
		}
		if ($("#modal_product_edit_pdservice_reviewers").select2("data")[4] != undefined) {
			reviewers05 = $("#modal_product_edit_pdservice_reviewers").select2("data")[4].text;
		}

		const cTitle = $("#modal_product_edit_pdservice_name").val();
		$.ajax({
			url: "/auth-user/api/arms/pdService/updateNode.do",
			type: "put",
			data: {
				c_id: $("#pdservice_table").DataTable().rows(".selected").data()[0].c_id,
				c_title: cTitle,
				c_pdservice_owner: owner,
				c_pdservice_reviewer01: reviewers01,
				c_pdservice_reviewer02: reviewers02,
				c_pdservice_reviewer03: reviewers03,
				c_pdservice_reviewer04: reviewers04,
				c_pdservice_reviewer05: reviewers05,
				c_pdservice_contents: CKEDITOR.instances.modal_product_edit_editor.getData()
			},
			statusCode: {
				200: function () {
					//모달 팝업 끝내고
					$("#btn_modal_product_edit_close").trigger("click");
					reloadDataWithSameOrdering(cTitle);
					jSuccess($("#modal_product_edit_pdservice_name").val() + "의 데이터가 변경되었습니다.");
					pdServiceDataTableClick(selectId);
				}
			}
		});
	});
}


////////////////////////////////////////////////////////////////////////////////////////
// 최초 dataTable_build 시 정렬 기준을 dataTableRef.ajax.reload 때마다 가져와서 세팅한다.
// 일관 된 정렬을 보장하기 위한 함수이다.
////////////////////////////////////////////////////////////////////////////////////////
function reloadDataWithSameOrdering(cTitle) {
	const currentOrder = dataTableRef.order();
	dataTableRef.ajax.reload(function() {
		dataTableRef.order(currentOrder).draw();
		if(cTitle === "") return false;
		$("#pdservice_table tbody tr").each(function() {
			const rowTitle = $(this).find("td label").text();
			if (rowTitle === cTitle) {
				$(this).click();
				return false;
			}
		});
	});
}

function generateSelectedPdServiceUI(title) {
	var html = `<div class="chat-message">
				<div class="chat-message-body" style="margin-left: 0px !important;">
					<span class="arrow" style="top: 35% !important;"></span>
					<span class="sender" style="padding-bottom: 5px; padding-top: 3px;"> 선택된 제품(서비스) :  </span>
				<span class="text" style="color: #a4c6ff;">
				` + title +
		`
				</span>
				</div>
				</div>
				 `;
	return html;
}

function generateUnselectedPdServiceUI() {
	var html = `<div class="chat-message">
								<div class="chat-message-body" style="margin-left: 0px !important; padding: 0px 10px 0px 10px !important;border-left: 2px solid #a4c6ff;">
									<span id="" class="arrow" style="top: 10px !important; border-right: 5px solid #a4c6ff"></span>
									<div class="sender" style="padding-bottom: 5px; padding-top: 5px">선택된 제품(서비스) :
										<span id="" style="color: #a4c6ff">선택되지 않음</span>
									</div>
								</div>
							</div>
				 `;
	return html;
}


async function reloadDetailData(pdServiceId, pdServiceDetailId, tempSelectDetailId) {
	try {
		await pdServiceDataTableClick(pdServiceId);
		await productServiceDetailDataLoad(pdServiceId);
		await detailClick(document.getElementById("pdservice_detail_link_" + pdServiceDetailId), tempSelectDetailId);
	} catch (e) {
		console.error("Error:", e);
	}
}

async function reloadDetailFileData(pdServiceDetailId) {
	try {
		await getFileList(pdServiceDetailId);
	} catch (e) {
		console.error("Error:", e);
	}
}

function getFileList(pdServiceDetailId) {
	new Promise((resolve, reject) => {
		var $fileupload = $("#fileupload");
		$.ajax({
			url: "/auth-user/api/arms/pdServiceDetail/getFilesByNode.do",
			data: { fileIdLink: pdServiceDetailId },
			dataType: "json",
			context: $fileupload[0]
		}).done(function(result) {
			$(this).fileupload("option", "done").call(this, null, { result: result.response });
			$(".file-delete-btn").hide(); // 파일 리스트에서 delete 버튼 display none 처리 -> 편집하기 tab 에서만 보여준다.
			resolve();
		});
	});
}