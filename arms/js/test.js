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
			//d3 변경
			"../reference/jquery-plugins/d3-5.16.0/d3.min.js",
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

			//사이드 메뉴 처리
			$('.widget').widgster();
			//setSideMenu("sidebar_menu_product", "sidebar_menu_version_manage");

			// 스크립트 실행 로직을 이곳에 추가합니다.
			const svg = d3.select('#matrix');
			const width = +svg.attr('width') - 100;
			const height = +svg.attr('height') - 100;

			const colors = [
				'rgb(255, 77, 77)', // 긴급하고 중요한 일
				'rgb(77, 255, 77)', // 긴급하지 않지만 중요한 일
				'rgb(61, 61, 61)', // 긴급하지도 중요하지도 않은 일
				'rgb(179, 115, 0)', // 긴급하지만 중요하지 않은 일
			];

			const MATRIX_X = 50;
			const MATRIX_Y = 50;

			const priority = [
				{
					x: MATRIX_X + width / 2,
					y: MATRIX_Y,
					color: colors[0],
					text: '긴급하고 중요한 일',
					index: 1,
				},
				{
					x: MATRIX_X + width / 2,
					y: MATRIX_Y + height / 2,
					color: colors[3],
					text: '긴급하지만 중요하지 않은 일',
					index: 2,
				},
				{
					x: MATRIX_X,
					y: MATRIX_Y,
					color: colors[1],
					text: '긴급하지 않지만 중요한 일',
					index: 3,
				},
				{
					x: MATRIX_X,
					y: MATRIX_Y + height / 2,
					color: colors[2],
					text: '긴급하지도 중요하지도 않은 일',
					index: 4,
				},
			];

			// 매트릭스 그리기
			svg
				.append('rect')
				.attr('x', MATRIX_X)
				.attr('y', MATRIX_Y)
				.attr('width', 800)
				.attr('height', 600)
				.attr('rx', 8)
				.attr('class', 'rectangle');

			// 사각형 그리기
			priority.forEach((q) => {
				svg
					.append('rect')
					.attr('x', q.x + 10)
					.attr('y', q.y + 10)
					.attr('width', 30)
					.attr('height', 30)
					.attr('rx', 8)
					.attr('fill', q.color)
					.attr('opacity', 0.4);

				svg
					.append('text')
					.attr('x', q.x + 21)
					.attr('y', q.y + 30)
					.attr('class', 'text')
					.text(q.index);

				svg
					.append('text')
					.attr('x', q.x + 45)
					.attr('y', q.y + 30)
					.attr('class', 'text')
					.text(q.text);
			});

			// 경계 그리기
			const BORDER_X = 25;
			const BORDER_Y = 25;
			const borders = [
				{ x1: BORDER_X, y1: MATRIX_Y, x2: BORDER_X, y2: MATRIX_Y + height },
				{
					x1: BORDER_X,
					y1: MATRIX_Y,
					x2: BORDER_X - 10,
					y2: MATRIX_Y + 10,
				},
				{
					x1: MATRIX_X,
					y1: MATRIX_Y + BORDER_Y + height,
					x2: MATRIX_X + width,
					y2: MATRIX_Y + BORDER_Y + height,
				},
				{
					x1: MATRIX_X + width,
					y1: MATRIX_Y + BORDER_Y + height,
					x2: MATRIX_X + width - 10,
					y2: MATRIX_Y + BORDER_Y + height + 10,
				},
				{
					x1: MATRIX_X,
					y1: MATRIX_Y + height / 2,
					x2: MATRIX_X + width,
					y2: MATRIX_Y + height / 2,
				},
				{
					x1: MATRIX_X + width / 2,
					y1: MATRIX_Y,
					x2: MATRIX_X + width / 2,
					y2: height + 20,
				},
			];

			borders.forEach((b) => {
				svg
					.append('line')
					.attr('class', 'border')
					.attr('x1', b.x1)
					.attr('y1', b.y1)
					.attr('x2', b.x2)
					.attr('y2', b.y2);
			});

			// 축 레이블 추가
			svg
				.append('text')
				.attr('x', MATRIX_X + width / 2)
				.attr('y', MATRIX_Y - 10 + height)
				.attr('text-anchor', 'middle')
				.attr('class', 'text')
				.text('D-7');

			svg
				.append('text')
				.attr('x', MATRIX_X + 15)
				.attr('y', MATRIX_Y - 10 + height)
				.attr('class', 'text')
				.text('D-30');

			svg
				.append('text')
				.attr('x', MATRIX_X - 15 + width)
				.attr('y', MATRIX_Y - 10 + height)
				.attr('class', 'text')
				.attr('text-anchor', 'end')
				.style('fill', colors[0])
				.text('D-day');

			svg
				.append('text')
				.attr('x', MATRIX_X + width / 2 + width / 4)
				.attr('y', MATRIX_Y * 2 + height - 5)
				.attr('text-anchor', 'middle')
				.attr('class', 'text')
				.text('긴급함');

			svg
				.append('text')
				.attr('x', MATRIX_X + width / 2 - width / 4)
				.attr('y', MATRIX_Y * 2 + height - 5)
				.attr('text-anchor', 'middle')
				.attr('class', 'text')
				.text('긴급하지 않음');

			svg
				.append('text')
				.attr('x', -(MATRIX_X + height / 2 - height / 4))
				.attr('y', BORDER_Y - 10)
				.attr('class', 'text')
				.attr('text-anchor', 'middle')
				.style('transform', 'rotate(-90deg)')
				.text('중요함');

			svg
				.append('text')
				.attr('x', -(MATRIX_X + height / 2 + height / 4))
				.attr('y', BORDER_Y - 10)
				.attr('class', 'text')
				.attr('text-anchor', 'middle')
				.style('transform', 'rotate(-90deg)')
				.text('중요하지 않음');

			/**
			 * 1사분면 (긴급하고 중요한 일)
			 *    - x축: MATRIX_X + width / 2 ~ MATRIX_X + width
			 *    - y축: MATRIX_Y ~ MATRIX_Y + height / 2
			 * 2사분면 (긴급하지 않지만 중요한 일)
			 *    - x축: MATRIX_X ~ MATRIX_X + width / 2
			 *    - y축: MATRIX_Y ~ MATRIX_Y + height / 2
			 * 3사분면 (긴급하지도 중요하지도 않은 일)
			 *    - x축: MATRIX_X ~ MATRIX_X + width / 2
			 *    - y축: MATRIX_Y + height / 2 ~ MATRIX_Y + height
			 * 4사분면 (긴급하지만 중요하지 않은 일)
			 *    - x축: MATRIX_X + width / 2 ~ MATRIX_X + width
			 *    - y축: MATRIX_Y + height / 2 ~ MATRIX_Y + height
			 */
			const quadrants = [
				{
					x1: MATRIX_X + width / 2,
					y1: MATRIX_Y,
					x2: MATRIX_X + width,
					y2: MATRIX_Y + height / 2,
				},
				{
					x1: MATRIX_X,
					y1: MATRIX_Y,
					x2: MATRIX_X + width / 2,
					y2: MATRIX_Y + height / 2,
				},
				{
					x1: MATRIX_X,
					y1: MATRIX_Y + height / 2,
					x2: MATRIX_X + width / 2,
					y2: MATRIX_Y + height,
				},
				{
					x1: MATRIX_X + width / 2,
					y1: MATRIX_Y + height / 2,
					x2: MATRIX_X + width,
					y2: MATRIX_Y + height,
				},
			];

			[
				{ x: 248, y: 420 },
				{ x: 328, y: 575 },
				{ x: 474, y: 233 },
				{ x: 739, y: 270 },
				{ x: 645, y: 400 },
				{ x: 310, y: 537 },
				{ x: 437, y: 632 },
				{ x: 422, y: 529 },
				{ x: 837, y: 593 },
				{ x: 227, y: 145 },
				{ x: 626, y: 256 },
				{ x: 386, y: 55 },
				{ x: 736, y: 89 },
				{ x: 117, y: 72 },
				{ x: 406, y: 224 },
				{ x: 148, y: 227 },
				{ x: 131, y: 302 },
				{ x: 145, y: 294 },
				{ x: 625, y: 585 },
				{ x: 361, y: 268 },
				{ x: 618, y: 639 },
				{ x: 753, y: 168 },
				{ x: 185, y: 561 },
				{ x: 607, y: 134 },
				{ x: 804, y: 540 },
				{ x: 711, y: 534 },
				{ x: 684, y: 307 },
				{ x: 402, y: 74 },
				{ x: 156, y: 461 },
				{ x: 545, y: 311 },
				{ x: 533, y: 272 },
				{ x: 225, y: 92 },
				{ x: 110, y: 316 },
				{ x: 428, y: 390 },
				{ x: 574, y: 395 },
				{ x: 754, y: 67 },
				{ x: 424, y: 510 },
				{ x: 774, y: 217 },
				{ x: 664, y: 244 },
				{ x: 814, y: 144 },
				{ x: 604, y: 245 },
				{ x: 128, y: 609 },
				{ x: 67, y: 237 },
				{ x: 582, y: 52 },
				{ x: 369, y: 192 },
				{ x: 419, y: 273 },
				{ x: 618, y: 267 },
				{ x: 628, y: 588 },
				{ x: 850, y: 293 },
				{ x: 587, y: 261 },
				{ x: 126, y: 518 },
				{ x: 523, y: 279 },
				{ x: 635, y: 240 },
				{ x: 707, y: 226 },
				{ x: 432, y: 187 },
				{ x: 394, y: 335 },
				{ x: 707, y: 190 },
				{ x: 53, y: 158 },
				{ x: 651, y: 258 },
				{ x: 426, y: 591 },
				{ x: 460, y: 428 },
				{ x: 427, y: 152 },
				{ x: 346, y: 107 },
				{ x: 592, y: 253 },
				{ x: 111, y: 476 },
				{ x: 343, y: 191 },
				{ x: 724, y: 210 },
				{ x: 698, y: 405 },
				{ x: 545, y: 222 },
				{ x: 263, y: 547 },
				{ x: 292, y: 228 },
				{ x: 273, y: 299 },
				{ x: 715, y: 503 },
				{ x: 652, y: 561 },
				{ x: 417, y: 587 },
				{ x: 151, y: 505 },
				{ x: 388, y: 145 },
				{ x: 648, y: 576 },
				{ x: 219, y: 623 },
				{ x: 131, y: 613 },
				{ x: 742, y: 493 },
				{ x: 751, y: 517 },
				{ x: 585, y: 335 },
				{ x: 279, y: 371 },
				{ x: 118, y: 174 },
				{ x: 773, y: 519 },
				{ x: 144, y: 550 },
				{ x: 112, y: 303 },
				{ x: 371, y: 268 },
				{ x: 166, y: 528 },
				{ x: 211, y: 446 },
				{ x: 143, y: 472 },
				{ x: 407, y: 394 },
				{ x: 690, y: 468 },
				{ x: 287, y: 259 },
				{ x: 324, y: 431 },
				{ x: 414, y: 346 },
				{ x: 513, y: 650 },
				{ x: 113, y: 207 },
				{ x: 142, y: 83 },
			].forEach((priority) => {
				const color = quadrants.findIndex(
					(q) =>
						priority.x >= q.x1 &&
						priority.x <= q.x2 &&
						priority.y >= q.y1 &&
						priority.y <= q.y2
				);

				svg
					.append('circle')
					.attr('cx', priority.x)
					.attr('cy', priority.y)
					.attr('r', 5)
					.attr('fill', colors[color]);
			});

		})
		.catch(function() {
			console.error('플러그인 로드 중 오류 발생');
		});
}