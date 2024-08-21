$.fn.croneditor = function (object) {
	var cronArr = object.cronArr;

	var drawCron = object.drawCron;
	var activeLi;


	function tabChange(executeId){
		switch (executeId) {
			// Seconds
			case "button-second-every":
				//cronArr[0] = "*";
				break;
			case "button-second-n":
				//cronArr[0] = "*/" + $("#tabs-second .slider").slider("value");
				break;

			// Minutes
			case "button-minute-every":
				cronArr[1] = "*";
				break;
			case "button-minute-n":
				cronArr[1] = "*/" + $("#tabs-minute .slider").slider("value");
				break;
			case "button-minute-each":
				cronArr[1] = drawCronForEach("minute");
				break;

			// Hours
			case "button-hour-every":
				cronArr[2] = "*";
				break;
			case "button-hour-n":
				cronArr[2] = "*/" + $("#tabs-hour .slider").slider("value");
				break;
			case "button-hour-each":
				cronArr[2] = drawCronForEach("hour");
				break;

			// Days
			case "button-day-every":
				cronArr[3] = "*";
				break;
			case "button-day-each":
				cronArr[3] = drawCronForEach("day");
				break;

			// Months
			case "button-month-every":
				cronArr[4] = "*";
				break;
			case "button-month-each":
				cronArr[4] = drawCronForEach("month");
				break;
			// Weeks
			case "button-week-every":
				cronArr[5] = "*";
				break;
			case "button-week-each":
				cronArr[5] = drawCronForEach("week");
				break;
		}
		drawCron();
	}

	$("#main-tab").on("click","li",function(){
		if(activeLi!==undefined){
			activeLi = $($("#main-tab li.active a").attr('href')).find('li.active').attr('id');
			console.log('before:'+activeLi);
			tabChange(activeLi);
		}
		console.log('after:'+activeLi);
		activeLi = $($(this).find('a').attr('href')).find('li.active').attr('id');
	});

	$(".tab-pane").on("click", "li", function () {

		if(this.id!==''){
			tabChange(this.id);
		}
	});

	$(".tab-pane").tabs({
		click: function (event, ui) {}
	});

	$("#clear").click(function () {
		$("#cronString").val("0 * * * * *");
		cronArr = ["0", "*", "*", "*", "*", "*"];
	});

	$("#tabs-second .slider").slider({
		min: 1,
		max: 59,
		slide: function (event, ui) {
			cronArr[0] = "*/" + ui.value;
			$("#tabs-second-n .preview").html("매 "+ui.value + " 초");
			drawCron();
		}
	});

	$("#tabs-minute .slider").slider({
		min: 1,
		max: 59,
		slide: function (event, ui) {
			cronArr[1] = "*/" + ui.value;
			$("#tabs-minute-n .preview").html("매 "+ui.value + " 분 간격");
			drawCron();
		}
	});

	$("#tabs-hour .slider").slider({
		min: 1,
		max: 23,
		slide: function (event, ui) {
			cronArr[2] = "*/" + ui.value;
			$("#tabs-hour-n .preview").html("매 "+ui.value + " 시간 간격");
			drawCron();
		}
	});

	$("#main-tab").find('li.active').trigger("click");

	function drawCronByCronArr() {
		let _cronArr = cronArr;
		let _index = 0;
		let _index_mapping = ["second", "minute", "hour", "day", "month", "week"];
		let _index_mapping_ko = ["초", "분", "시간", "일", "월", "week"];

		_cronArr.forEach(function (cronDiv) {
			let mapping_name = _index_mapping[_index];
			let cron_n_str = " " + _index_mapping_ko[_index];

			if (cronDiv.includes("/")) {
				$("#tabs-" + mapping_name + " .slider").slider("value", cronDiv.split("/")[1]);
				$("#tabs-" + mapping_name + " .preview").html(cronDiv.split("/")[1] + cron_n_str + " 간격");
				$("#button-" + mapping_name + "-n")
					.children()
					.trigger("click");

			} else if (cronDiv.includes("*")) {
				$("#button-" + mapping_name + "-every")
					.children()
					.trigger("click");
			} else {
				cronDiv.split(",").forEach(function (number) {
					let index = number;
					if (mapping_name === "day" || mapping_name === "month") {
						index = index - 1;
					}
					if($("#tabs-" + mapping_name + "-each .tabs-" + mapping_name + '-format input[type="checkbox"]')[index]!==undefined){
						$("#tabs-" + mapping_name + "-each .tabs-" + mapping_name + '-format input[type="checkbox"]')[index].checked = true;
					}
					$("#tabs-" + mapping_name + "-each .tabs-" + mapping_name + "-format label").each(function (a) {
						if (a == index) {
							$(this).addClass("ui-checkboxradio-checked ui-state-active");
						}
					});
				});
				$("#button-" + mapping_name + "-each")
					.children()
					.trigger("click");
			}
			_index++;
		});
	}

	function initByCronArr() {
		var _cronArr = cronArr;
		var _index = 0;
		var _index_mapping = ["second", "minute", "hour", "day", "month", "week"];
		let _index_mapping_ko = ["초", "분", "시간", "일", "월", "요일"];

		_cronArr.forEach(function (cronDiv) {
			var mapping_name = _index_mapping[_index];
			$("#tabs-" + mapping_name + " .slider").slider("value", 1);
			$("#tabs-" + mapping_name + " .preview").html(1 +" "+ _index_mapping_ko[_index] + " 간격");

			Array.prototype.slice.call($('#tabs-' + mapping_name + '-each .tabs-' + mapping_name + '-format input[type="checkbox"]'))
				.map(function(element){
					element.checked = false;
				});

			Array.prototype.slice.call($('#tabs-' + mapping_name + '-each .tabs-' + mapping_name + '-format label'))
				.map(function(element){
					$(element).removeClass('ui-state-active');
				});
			_index++;
		});
	}

	function drawCronForEach(_type) {
		const minuteArray = Array.prototype.slice
			.call($("#tabs-" + _type + "-each .tabs-" + _type + "-format input[type='checkbox']:checked"))
			.map(function (element) {
				return element.id.replace(_type + "-check", "");
			});
		return minuteArray.length === 0
			? "*"
			: minuteArray
					.sort(function (a, b) {
						return +a - +b;
					})
					.join(",");
	}

	function drawEachMinutes() {
		// minutes
		for (var i = 0; i < 60; i++) {
			var padded = i;
			if (padded.toString().length === 1) {
				padded = "0" + padded;
			}
			$(".tabs-minute-format").append(
				'<input type="checkbox" id="minute-check' + i + '"><label for="minute-check' + i + '">' + padded + "</label>"
			);
			if (i !== 0 && (i + 1) % 10 === 0) {
				$(".tabs-minute-format").append("<br/>");
			}
		}
		$(".tabs-minute-format input").button();
		$(".tabs-minute-format").buttonset();

		$('.tabs-minute-format input[type="checkbox"]').click(function () {
			var newItem = $(this).attr("id").replace("minute-check", "");
			if (cronArr[1] === "*") {
				cronArr[1] = $(this).attr("id").replace("minute-check", "");
			} else {
				// if value already in list, toggle it off
				var list = cronArr[1].split(",");
				if (list.indexOf(newItem) !== -1) {
					list.splice(list.indexOf(newItem), 1);
					cronArr[1] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				} else {
					// else toggle it on
					list.push(newItem);
					cronArr[1] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				}
				if (cronArr[1] === "") {
					cronArr[1] = "*";
				}
			}
			drawCron();
		});
	}

	function drawEachHours() {
		// hours
		for (var i = 0; i < 24; i++) {
			var padded = i;
			if (padded.toString().length === 1) {
				padded = "0" + padded;
			}
			$(".tabs-hour-format").append(
				'<input type="checkbox" id="hour-check' + i + '"><label for="hour-check' + i + '">' + padded + "</label>"
			);
			if (i !== 0 && (i + 1) % 12 === 0) {
				$(".tabs-hour-format").append("<br/>");
			}
		}

		$(".tabs-hour-format input").button();
		$(".tabs-hour-format").buttonset();

		$('.tabs-hour-format input[type="checkbox"]').click(function () {
			var newItem = $(this).attr("id").replace("hour-check", "");
			if (cronArr[2] === "*") {
				cronArr[2] = $(this).attr("id").replace("hour-check", "");
			} else {
				// if value already in list, toggle it off
				var list = cronArr[2].split(",");
				if (list.indexOf(newItem) !== -1) {
					list.splice(list.indexOf(newItem), 1);
					cronArr[2] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				} else {
					list.push(newItem);
					cronArr[2] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				}
				if (cronArr[2] === "") {
					cronArr[2] = "*";
				}
			}
			drawCron();
		});
	}

	function drawEachDays() {
		// days
		for (var i = 1; i < 32; i++) {
			var padded = i;
			if (padded.toString().length === 1) {
				padded = "0" + padded;
			}
			$(".tabs-day-format").append(
				'<input type="checkbox" id="day-check' + i + '"><label for="day-check' + i + '">' + padded + "</label>"
			);
			if (i !== 0 && i % 7 === 0) {
				$(".tabs-day-format").append("<br/>");
			}
		}

		$(".tabs-day-format input").button();
		$(".tabs-day-format").buttonset();

		$('.tabs-day-format input[type="checkbox"]').click(function () {
			var newItem = $(this).attr("id").replace("day-check", "");
			if (cronArr[3] === "*") {
				cronArr[3] = $(this).attr("id").replace("day-check", "");
			} else {
				var list = cronArr[3].split(",");
				if (list.indexOf(newItem) !== -1) {
					list.splice(list.indexOf(newItem), 1);
					cronArr[3] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				} else {
					list.push(newItem);
					cronArr[3] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				}
				if (cronArr[3] === "") {
					cronArr[3] = "*";
				}
			}
			drawCron();
		});
	}

	function drawEachMonths() {
		// months
		var months = [null, "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

		for (var i = 1; i < 13; i++) {
			var padded = i;
			if (padded.toString().length === 1) {
				//padded = "0" + padded;
			}
			$(".tabs-month-format").append(
				'<input type="checkbox" id="month-check' + i + '"><label for="month-check' + i + '">' + months[i] + "</label>"
			);
		}

		$(".tabs-month-format input").button();
		$(".tabs-month-format").buttonset();

		$('.tabs-month-format input[type="checkbox"]').click(function () {
			var newItem = $(this).attr("id").replace("month-check", "");
			if (cronArr[4] === "*") {
				cronArr[4] = $(this).attr("id").replace("month-check", "");
			} else {
				var list = cronArr[4].split(",");
				if (list.indexOf(newItem) !== -1) {
					list.splice(list.indexOf(newItem), 1);
					cronArr[4] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				} else {
					list.push(newItem);
					cronArr[4] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				}
				if (cronArr[4] === "") {
					cronArr[4] = "*";
				}
			}
			drawCron();
		});
	}

	function drawEachWeek() {
		// weeks
		var days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
		for (var i = 0; i < 7; i++) {
			var padded = i;
			if (padded.toString().length === 1) {
				//padded = "0" + padded;
			}

			$(".tabs-week-format").append(
				'<input type="checkbox" id="week-check' + i + '"><label for="week-check' + i + '">' + days[i] + "</label>"
			);
		}

		$(".tabs-week-format input").button();
		$(".tabs-week-format").buttonset();

		$('.tabs-week-format input[type="checkbox"]').click(function () {
			var newItem = $(this).attr("id").replace("week-check", "");
			if (cronArr[5] === "*") {
				cronArr[5] = $(this).attr("id").replace("week-check", "");
			} else {
				var list = cronArr[5].split(",");
				if (list.indexOf(newItem) !== -1) {
					list.splice(list.indexOf(newItem), 1);
					cronArr[5] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				} else {
					list.push(newItem);
					cronArr[5] = list
						.sort(function (a, b) {
							return +a - +b;
						})
						.join(",");
				}
				if (cronArr[5] === "") {
					cronArr[5] = "*";
				}
			}
			drawCron();
		});
	}

	// TODO: Refactor these methods into smaller methods
	return {
		drawEachMinutes: drawEachMinutes,
		drawEachHours: drawEachHours,
		drawEachDays: drawEachDays,
		drawEachMonths: drawEachMonths,
		drawEachWeek: drawEachWeek,
		drawCronByCronArr: drawCronByCronArr,
		initByCronArr: initByCronArr
	};
};
