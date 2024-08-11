function sampleDonut() {
	var chartDom = document.getElementById('main');
	var myChart = echarts.init(chartDom);
	var option;

	option = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center'
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				padAngle: 1,
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: 1048, name: 'Search Engine' },
					{ value: 735, name: 'Direct' },
					{ value: 580, name: 'Email' },
					{ value: 484, name: 'Union Ads' }
				]
			}
		]
	};

	option && myChart.setOption(option);
}

function donutChart_fullDataSheet(targetId, data) {
	var chartDom = document.getElementById(targetId);
	var myChart = echarts.init(chartDom);
	var option;

	let keysToExtract = ["open", "in-progress", "resolved", "closed"];

	let noDataArr= [
		{ value: 0, name: 'open' },
		{ value: 0, name: 'in-progress' },
		{ value: 0, name: 'resolved' },
		{ value: 0, name: 'closed' }
	];

	let colorSet = [
		"rgba(219, 42, 52, 0.6)", // 열림
		"rgba(228, 148, 0, 0.6)", // 진행중
		"rgba(45, 133, 21, 0.6)", // 해결됨
		"rgba(36, 119, 255,0.6)"  // 닫힘
	];

	let dataArr = []
	if (!data || Object.keys(data).length === 0) {
		console.log("donutChart_fullDataSheet 의 데이터가 존재하지 않거나, key가 없습니다.");
		dataArr = noDataArr;

	} else {
		dataArr = keysToExtract.map(key => {
			return {
				name: key,
				value: data[key] || 0, // 값이 없을 경우 0으로 설정합니다.
				itemStyle: { color:colorSet[keysToExtract.indexOf(key)] }
			};
		});
	}


	let etcInfo = {
		total: data.total,
		folder: data.folder
	};

	option = {
		tooltip: {
			trigger: 'item',
			//formatter: '{b}: {c} ({d}%)' // b는 항목 이름, c는 값, d는 퍼센트
			formatter: function(params) {
				// params 객체에서 해당 항목의 색상을 가져와서 HTML을 생성합니다.
				return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
                    ${params.name}: ${params.value} (${params.percent}%)
                `;
			}
		},
		grid: {
			bottom: '50%'
		},
		legend: {
			top: "80%",
			left: 'center',
			textStyle: {
				fontSize: 12,   // 폰트 크기 설정
				color: '#FFF'   // 폰트 색상 설정
			}
		},
		series: [
			{
				name: '',
				type: 'pie',
				radius: ['35%', '50%'],
				center: ['50%', '40%'],
				avoidLabelOverlap: false,
				padAngle: 2,
				label: {
					show: true,
					position: 'inner',  // 레이블을 차트 섹션 바깥에 표시
					formatter: '{d}%',  // 항목 이름과 값을 표시
					fontSize: 13,      // 레이블 폰트 크기
					color: '#FFF',     // 레이블 폰트 색상
					// textBorderColor: '#FFF', // 텍스트 테두리 색상 (흰색)
					// textBorderWidth: 1   // 텍스트 테두리 두께
				},
				labelLine: {
					show: false
				},
				data: dataArr
			},
		],
		graphic: [
			{
				type: 'text',
				left: 'center',
				top: '38.5%', // 차트의 중심에 위치하게 설정
				style: {
					text: `Total: ${etcInfo.total}`,  // 중앙에 표시될 텍스트
					textAlign: 'center',
					fill: '#FFF',  // 텍스트 색상
					fontSize: 14,  // 텍스트 크기
					fontWeight: 'bold'
				}
			}
		]
	};

	option && myChart.setOption(option);

	window.addEventListener('resize', function () {
		myChart.resize();
	});
}
