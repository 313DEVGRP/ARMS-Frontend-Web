(function ($) {

    $.fn.calendar_yearview_blocks = function (options) {

        // Format string
        if (!String.prototype.formatString) {
            String.prototype.formatString = function () {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] !== 'undefined'
                        ? args[number]
                        : match
                        ;
                });
            };
        }

        // If the number less than 10, add a zero before it
        var prettyNumber = function (number) {
            return number < 10 ? '0' + number.toString() : number = number.toString();
        };

        var getDisplayDate = function (date_obj) {
            var pretty_month = prettyNumber(date_obj.getMonth() + 1);
            var pretty_date = prettyNumber(date_obj.getDate());
            return "{0}-{1}-{2}".formatString(date_obj.getFullYear(), pretty_month, pretty_date);
        };

        var start = function () {
            obj_timestamp = JSON.parse(settings.data);

            var wrap_chart = _this;
            var containerWidth = wrap_chart.width(); // 1. 컨테이너 너비 가져오기
            var gap = 2;
            var rectWidth = (containerWidth - gap * 51) / 52; // 52는 주의 개수, 간격을 고려하여 사각형의 너비를 계산
            var rectHeight = rectWidth; // 7은 요일의 개수, 동적으로 조절할 수 있습니다.

            var end_date = new Date(settings.final_date);
            var current_date = new Date();
            var start_date = new Date();
            start_date.setMonth(end_date.getMonth() - 12);

            var start_weekday = settings.start_monday === true?1:0;
            for (var i = 0; i < 7; i++) {
                var day = start_date.getDay();
                if (day === start_weekday) {
                    break;
                }
                else {
                    // Loop until start_weekday
                    start_date.setDate(start_date.getDate() + 1);
                }
            }
            var loop_html = "";

            // One year has 52 weeks
            // var step = 13; // Amount of pixels to move
            var step = Math.floor(containerWidth / 52); // Adjust the calculation based on your requirement

            var month_position = [];
            month_position.push({month_index: start_date.getMonth(), x: 0});
            var using_month = start_date.getMonth();
            for (var i = 0; i <= 52; i++) { // For each week, generate a column
                var g_x = i * step;

                var item_html = '<g transform="translate(' + g_x.toString() + ',0)">';

                for (var j = 0; j < 7; j++) { // For each weekday, generate a row

                    if (start_date > end_date) {
                        // Break the loop when today's date is found
                        break;
                    }

                    var y = j * step;

                    var month_in_day = start_date.getMonth();
                    var data_date = getDisplayDate(start_date);

                    // Check first day in week
                    if (j === start_weekday && month_in_day !== using_month) {
                        using_month = month_in_day;
                        month_position.push({month_index: using_month, x: g_x});
                    }

                    var match_today;
                    // Put a box around today's date
                    if (settings.stylize_today) {
                        match_today = current_date.getTime() === start_date.getTime() ? '" style="stroke:black;stroke-width:2;opacity:0.5"' : '';
                    } else {
                        match_today = "";
                    }

                    var items = [];
                    var count = 0;
                    var legend = '', items_str = '';
                    if (obj_timestamp[data_date]) {
                        if (obj_timestamp[data_date].items) {
                            items = obj_timestamp[data_date].items;
                            count = obj_timestamp[data_date].count;
							items_str = items.join(", ");
							items_str = items_str.replaceAll('&', '&amp;');
							items_str = items_str.replaceAll('"', '&quot;');
                        }
                        if (obj_timestamp[data_date].legend) {
                            legend = obj_timestamp[data_date].legend;
							legend = legend.replaceAll('&', '&amp;');
							legend = legend.replaceAll('"', '&quot;');
                        }
                    }

                    var item_name = items[0]?items[0]:false;
                    var color = getColorByCount(count);

                    item_html += '<rect class="day" width="' + rectWidth + '" height="' + rectHeight + '" y="' + y + '" fill="' + color + match_today + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '" rx="3" ry="3"/>';
                    /*
                    if (items.length === 2) { // Fill a triangle for the 2nd
                        var item_name_1 = items[1] ? items[1] : false;
                        var color_1 = settings.colors[item_name_1] ? settings.colors[item_name_1] : settings.colors['default'];
                        item_html += '<polygon points="' + (rectWidth / 2) + ',' + (y + rectHeight) + ' ' + 0 + ',' + y + ' ' + rectWidth + ',' + y + '" fill="' + color_1 + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '"/>';
                    } else if (items.length === 3) { // Fill 2 rectangles for 2nd and 3rd
                        var item_name_1 = items[1] ? items[1] : false;
                        var color_1 = settings.colors[item_name_1] ? settings.colors[item_name_1] : settings.colors['default'];
                        var item_name_2 = items[2] ? items[2] : false;
                        var color_2 = settings.colors[item_name_2] ? settings.colors[item_name_2] : settings.colors['default'];
                        item_html += '<polygon points="' + (rectWidth / 2) + ',' + (y + rectHeight - (rectHeight / 4)) + ' ' + 0 + ',' + y + ' ' + rectWidth + ',' + y + ' ' + rectWidth + ',' + (y + rectHeight - (rectHeight / 4)) + '" fill="' + color_1 + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '"/>';
                        item_html += '<polygon points="' + (rectWidth / 2) + ',' + (y + rectHeight - (rectHeight / 2)) + ' ' + 0 + ',' + (y + (rectHeight / 4)) + ' ' + rectWidth + ',' + (y + (rectHeight / 4)) + ' ' + rectWidth + ',' + (y + rectHeight - (rectHeight / 2)) + '" fill="' + color_2 + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '"/>';
                    } else if (items.length === 4) { // Fill 3 cubes for 2nd, 3rd, and 4th
                        var item_name_1 = items[1] ? items[1] : false;
                        var color_1 = settings.colors[item_name_1] ? settings.colors[item_name_1] : settings.colors['default'];
                        var item_name_2 = items[2] ? items[2] : false;
                        var color_2 = settings.colors[item_name_2] ? settings.colors[item_name_2] : settings.colors['default'];
                        var item_name_3 = items[3] ? items[3] : false;
                        var color_3 = settings.colors[item_name_3] ? settings.colors[item_name_3] : settings.colors['default'];
                        item_html += '<polygon points="' + (rectWidth / 2) + ',' + (y + rectHeight) + ' ' + 0 + ',' + (y + rectHeight - (rectHeight / 4)) + ' ' + (rectWidth / 4) + ',' + (y + rectHeight - (rectHeight / 4)) + ' ' + (rectWidth / 4) + ',' + (y + rectHeight) + '" fill="' + color_1 + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '"/>';
                        item_html += '<polygon points="' + (rectWidth / 2) + ',' + (y + rectHeight - (rectHeight / 4)) + ' ' + 0 + ',' + (y + (rectHeight / 2)) + ' ' + (rectWidth / 4) + ',' + (y + (rectHeight / 2)) + ' ' + (rectWidth / 4) + ',' + (y + rectHeight - (rectHeight / 4)) + '" fill="' + color_2 + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '"/>';
                        item_html += '<polygon points="' + (rectWidth / 4) + ',' + (y + rectHeight - (rectHeight / 2)) + ' ' + 0 + ',' + (y + (rectHeight / 4)) + ' ' + rectWidth + ',' + (y + (rectHeight / 4)) + ' ' + (rectWidth / 4) + ',' + (y + rectHeight - (rectHeight / 2)) + '" fill="' + color_3 + '" data-items="' + items_str + '" data-legend="' + legend + '" data-date="' + data_date + '"/>';
                    }
                    */
                    // Move on to the next day
                    start_date.setDate(start_date.getDate() + 1);
                }

                item_html += "</g>";

                loop_html += item_html;

            }

            // Trick
            if (month_position[1].x - month_position[0].x < 40) {
                // Fix ugly graph by removing the first item
                month_position.shift(0);
            }

            // Add labels for Months
            for (var i = 0; i < month_position.length; i++) {
                var item = month_position[i];
                var month_name = settings.month_names[item.month_index];
                loop_html += '<text x="' + item.x + '" y="-5" class="month">' + month_name + '</text>';
            }

            var wday_html = '';
            for (var i = 0; i < settings.day_names.length; i++) {
                var dx = calculateWdayDx(i, settings.start_monday);
                var dy = calculateWdayDy(i, settings.start_monday, rectHeight);
                wday_html += '<text text-anchor="middle" class="wday" dx="' + dx + '" dy="' + dy + '">' + settings.day_names[i] + '</text>';
            }
            loop_html += wday_html;

            // Fixed size  with width= 721 and height = 110
            var wire_html =
                // '<svg width="721" <!--height="140" --> style="min-height: 140px;">' +
                '<svg viewBox="0 0 ' + (containerWidth+10) + ' 140" preserveAspectRatio="xMinYMin meet" style="width: 100%; height: auto; min-height: 140px;">' +
                '<g transform="translate(25, 20)">' +
                loop_html +
                '</g>' + '"Your browser does not support inline SVG."' +
                '</svg>';

            wrap_chart.html(wire_html);

            _this.find('rect, polygon').on("mouseenter", mouseEnter);
            _this.find('rect, polygon').on("mouseleave", mouseLeave);
            _this.find('rect, polygon').on("click", mouseClick);
            appendTooltip();

        };

        // Function to calculate dx for Weekdays
        var calculateWdayDx = function(index, startMonday) {
            // Calculate dx based on startMonday and index
            var offset = startMonday ? -12 : -10;
            return offset;
        };

        function calculateWdayDy(index, startMonday, rectHeight) {
            return rectHeight * 2.1 * index +rectHeight;
        }

        var mouseLeave = function (evt) {
            $('.svg-tip').hide();
        };

        var mouseClick = function (evt) {
            var items = $(evt.target).attr('data-items');
            var date = $(evt.target).attr('data-date');
            $("#moreinfo").text("On {0}, following items are seen: {1}".formatString(date, items))
        };

        // Handle mouseEnter event when entering into rect element
        var mouseEnter = function (evt) {
            var target_offset = $(evt.target).offset();
            var items = $(evt.target).attr('data-items');
            var legend = $(evt.target).attr('data-legend');
            var date = $(evt.target).attr('data-date');

            var text = settings.tooltip_style === 'default' ? "{0}: <br />{1}".formatString(date, legend ? legend : items) : (legend ? legend : items);

            // Depending on settings, only show a tooltip when there's something to be shown
            if (items.length >= 1 ||  settings.always_show_tooltip === true) {
                var svg_tip = $('.svg-tip').show();
                svg_tip.html(text);
                var svg_width = Math.round(svg_tip.width() / 2 + 5);
                /*var svg_height = svg_tip.height() * 2 + 10;
                svg_tip.css({top: target_offset.top - svg_height - 5});
                svg_tip.css({left: target_offset.left - svg_width});*/
                var top = target_offset.top + $(evt.target).outerHeight() + 20;
                svg_tip.css({top: top, left: target_offset.left - svg_width});
            }
        };

        // Append tooltip to display when the mouse enters the rect element
        // Default is display:none
        var appendTooltip = function () {
            if ($('.svg-tip').length === 0) {
                $('body').append('<div class="svg-tip svg-tip-one-line" style="display:none" ></div>');
            }
        };

        // Default settings which can be overridden by the user
        var settings = $.extend({
            colors: {
                    'default': '#eeeeee'
            },
            month_names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            day_names: ['M', 'W', 'F', 'S'],
            start_monday: true,
            always_show_tooltip: false,
            stylize_today: false,
            final_date: new Date().toISOString().slice(0, 10),
            tooltip_style: 'default', // or 'custom'
            data: []
        }, options);

        function getColorByCount(count) {
            var colors = {
                0: 'rgba(235,237,240,0.8)', // 가장 연한 색
                1: 'rgba(155,233,168,0.8)',
                2: 'rgba(64,196,99,0.8)',
                3: 'rgba(48,161,78,0.8)',
                4: 'rgba(33,110,57,0.8)'  // 가장 짙은 색
            };

            if (count == 0) {
                return colors[0];
            }
            else if (count <= 5) {
                return colors[1];
            }
            else if (count <= 10) {
                return colors[2];
            }
            else if (count <= 15) {
                return colors[3];
            }
            else {
                return colors[4];
            }
        }

        var _this = $(this);

        start();

        $(window).on('resize', function() {
            // 리사이즈 이벤트 처리
            start();
        });

    };

}(jQuery));
