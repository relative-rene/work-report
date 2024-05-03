// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineChart = ({ data }) => {
//     // function parseData(data) {
//     //     var arr = [];
//     //     for (var i in data.bpi) {
//     //         arr.push({
//     //             date: new Date(i), //date
//     //             value: +data.bpi[i] //convert string to number
//     //         });\
//     //     }
//     //     return arr;
//     // }
//     useEffect(() => { 
//         console.log('data', data);
//         const svgWidth = 600;
//         const svgHeight = 400;
//         const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//         const width = svgWidth - margin.left - margin.right;
//         const height = svgHeight - margin.top - margin.bottom;

//         const svg = d3.select("svg")
//             .attr('width', svgWidth)
//             .attr('height', svgHeight);

//         const g = svg.append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//         const x = d3.scaleTime().rangeRound([0, width]);

//         const y = d3.scaleLinear().rangeRound([height, 0]);

//         const line = d3.line()
//             .x(function (d) { return x(d.set_weight) })
//             .y(function (d) { return y(d.date_and_time) })
//         x.domain(d3.extent(data, function (d) { return d.date_and_time }));
//         y.domain(d3.extent(data, function (d) { return d.set_weight }));

//         g.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x))
//             .select(".domain")
//             .remove();

//         g.append("g")
//             .call(d3.axisLeft(y))
//             .append("text")
//             .attr("fill", "#000")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", "0.71em")
//             .attr("text-anchor", "end")
//             .text("Price ($)");

//         g.append("path")
//             .datum(data)
//             .attr("fill", "none")
//             .attr("stroke", "steelblue")
//             .attr("stroke-linejoin", "round")
//             .attr("stroke-linecap", "round")
//             .attr("stroke-width", 1.5)
//             .attr("d", line);          
//     }, []);
// return <svg className="line-chart" />;
// }



// export default LineChart;