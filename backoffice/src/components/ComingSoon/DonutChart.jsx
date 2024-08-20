import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const COLOR = ['fill-blue-100', 'fill-700'];

function DonutChart({ data, width = 250, height = 250, className }) {
  const radius = Math.min(width, height) / 2;
  const arc = d3
    .arc()
    .innerRadius(radius / 1.13) // 도넛의 내부 반지름
    .outerRadius(radius - 10); // 도넛의 외부 반지름
  const pie = d3.pie();

  const donutRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(donutRef?.current);
    svg.selectAll('*').remove();
    const arcs = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('class', (d, i) => COLOR[i]);
  }, [data]);

  return (
    <svg width={width} height={height} className={className}>
      <g transform={`translate(${width / 2}, ${height / 2})`} ref={donutRef} />
    </svg>
  );
}

export default DonutChart;
