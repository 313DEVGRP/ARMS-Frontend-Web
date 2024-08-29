+(function () {
	"use strict";

	var ResourceTable = function (selector) {
		$.fn.Table.call(this, selector);
		this.columns = [
			{
				name: "displayName",
				title: "작업자 명",
				data: "displayName",
				className: "dt-body-left",
				visible: true,
				width:"60%",
				render: function (data, type, row, meta) {
					if (type === "display") {
						if (row["serverType"] === "클라우드") {
							return `<img src="./img/jira/mark-gradient-white-jira.svg" width="19px" style="margin-right:5px"></img><label style="color: #a4c6ff">${data}</label>`;
						} else if (row["serverType"] === "온프레미스") {
							return `<img src="./img/jira/mark-gradient-blue-jira.svg" width="19px" style="margin-right:5px"></img><label style="color: #a4c6ff">${data}</label`;
						} else if (row["serverType"] === "레드마인_온프레미스") {
							return `<img src="./img/redmine/logo.png" width="19px" style="margin-right:5px"></img><label style="color: #a4c6ff">${data}</label>`;
						} else {
							return '<label style="color: #a4c6ff">' + data + "</label>";
						}
					}
					return data;
				}
			},
			{
				name: "serverType",
				title: "서버타입",
				data: "serverType",
				className: "dt-body-center",
				visible: false,
				width: "40%",
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