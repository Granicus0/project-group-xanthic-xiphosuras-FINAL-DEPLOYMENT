import * as d3 from 'd3';
import React, { useEffect, useState,useRef } from 'react';

export function LiveLinechart({data}) {
    const svgRef = useRef(null);
    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0, display: 'none', value: { x: '', y: '' } });
    const width = window.innerWidth * 0.8;
    const height = 350;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear SVG content

        if (data.length === 0) return; // No data to display

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.iteration))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.loss)])
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => xScale(d.iteration))
            .y(d => yScale(d.loss))
            .curve(d3.curveMonotoneX);

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.iteration))
            .attr("cy", d => yScale(d.loss))
            .attr("r", 4)
            .attr("fill", "steelblue")
            .on('mouseover', (event, d) => {
                setTooltip({
                  x: xScale(d.iteration),
                  y: yScale(d.loss),
                  display: 'block',
                  value: { x: d.iteration, y: d.loss }
                });
              })
              .on('mousemove', event => {
                setTooltip(prevState => ({
                  ...prevState,
                  x: event.pageX + 10,
                  y: event.pageY - 50
                }));
              })
              .on('mouseout', () => {
                setTooltip(prevState => ({
                  ...prevState,
                  display: 'none'
                }));
              });

        // Add Axes
        const xAxis = d3.axisBottom(xScale).ticks(5);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(xAxis)
            .call(g => g.select('.domain').remove());

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis)
            .call(g => g.select('.domain').remove());

        
        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${xScale(0)},0)`)
            .call(d3.axisLeft(yScale).tickSize(-width + margin.left + margin.right).tickFormat('').tickSizeOuter(0))
            .selectAll('.tick line')
            .attr('stroke', '#CCCCCC');

    }, [data, height, margin.left, margin.bottom, width]);
  return (
    <>
        <div style={{ position: 'relative' }}>
            <svg ref={svgRef} width={width} height={height}>
                <g className='x-axis' ref={xAxisRef} />
                <g className='y-axis' ref={yAxisRef} />
            </svg>
            <div
                style={{
                position: 'absolute',
                display: tooltip.display,
                left: tooltip.x,
                top: tooltip.y,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '5px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                pointerEvents: 'none'
                }}
            >
                <p>X: {tooltip.value.x}</p>
                <p>Y: {tooltip.value.y}</p>
            </div>
        </div>
    </>
  );
}