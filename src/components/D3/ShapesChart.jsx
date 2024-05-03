import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ShapeChart = ({ dataset }) => {
    const ref = useRef();
    useEffect(() => {
        const svgWidth = 500, svgHeight = 300;
        
        const svg = d3.select("svg")
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('class', "svg-container");
            // line
        const line = svg.append("line")
            .attr("x1", 100)
            .attr("x2", 500)
            .attr("y1", 50)
            .attr("y2", 50)
            .attr("stroke", "blue")
            .attr("stroke-width", 5);
            // square
        const rect = svg.append("rect")
            .attr("x", 100)
            .attr("y", 100)
            .attr("width", 200)
            .attr("height", 100)
            .attr("fill", "pink");

        // circle
        const circle = svg.append("circle")
            .attr("cx", 200)
            .attr("cy", 300)
            .attr("r", 80)
            .attr("fill", "aqua")
    }, []);
    return <svg ref={ref}className="line-chart" />;
}



export default ShapeChart;