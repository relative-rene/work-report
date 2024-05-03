import React, { useEffect } from 'react';
import * as d3 from 'd3';
/**
 * Core functions for building axises
 * d3.axisTop();
 * d3.axisRight();
 * d3.axisBottom();
 * d3.axisLeft(); 
 */
const BarChart = ({ data }) => {
    useEffect(() => {
        const svgWidth = 500;
        const svgHeight = 300;
        const barPadding = 5;
        const barWidth = (svgWidth / data.length);
        const svg = d3.select("svg")
            .attr('width', svgWidth)
            .attr('height', svgHeight);
        // Scale to make data fit viewport
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, svgHeight]);
        const xScale = d3.scaleLinear()
            .domain([0,d3.max(data)])
            .range([0,svgWidth]);

        const x_axis  = d3.axisBottom().scale(xScale);
        const y_axis = d3.axisLeft().scale(yScale);
        svg.append("g")
            .attr('transform', "translate(50,10)")
            .call(y_axis);
        const xAxisTranslate = svgHeight - 20;
        svg.append('g')
            .attr("transform", "translate(50, " + xAxisTranslate+ ")")
            .call(x_axis); 
        // Bars
        const barChart = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr('y', function (d) {
                // return svgHeight - d; regular
                return svgHeight - yScale(d.set_weight);
            })
            .attr("height", function (d) {
                // return d; regular
                return yScale(d.set_weight)// scaled
            })
            .attr('width', barWidth - barPadding)
            .attr("transform", function (d, i) {
                var translate = [barWidth * i, 0];
                return "translate(" + translate + ")";
            });


        // Adding Labels
        const text = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d) {
                return d.exercise_name;
            })
            .attr("y", function (d, i) {
                return svgHeight - yScale(d) - 2;
            })
            .attr("x", function (d, i) {
                return barWidth * i;
            })
            .attr("fill", "#A64C38");
    }, []);
    return <svg className="bar-chart" />;
}



export default BarChart;