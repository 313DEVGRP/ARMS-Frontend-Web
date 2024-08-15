+(function () {
	"use strict";

	var ResourceTable = function (selector) {
		$.fn.Table.call(this, selector);
		this.columns = [
			{
				name: "assignee_displayName",
				title: "작업자 명",
				data: "assignee_displayName",
				className: "dt-body-center",
				visible: true,
				render: function (data, type, row, meta) {
					if (type === "display") {
						return '<label style="color: #a4c6ff">' + data + "</label>";
					}
					return data;
				}
			},
			{
				name: "assignee_emailAddress",
				title: "작업자 메일",
				data: "assignee_emailAddress",
				className: "dt-body-center",
				visible: true,
				render: function (data, type, row, meta) {
					if (type === "display") {
						return '<label style="color: #a4c6ff">' + data +
							"</label>";
					}
					return data;
				}
			}
		];
	};

	ResourceTable.prototype = Object.create($.fn.Table.prototype);
	ResourceTable.prototype.constructor = ResourceTable;

	$.fn.ResourceTable = ResourceTable;

})(jQuery);