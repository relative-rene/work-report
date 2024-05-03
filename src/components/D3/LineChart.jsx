import React, { useEffect } from "react";
import * as d3 from "d3";

function LineChart({ svgWidth, svgHeight, data }) {

    const buildGraph = async (propWidth, propHeight, propData) => {
        // get data
        // let sampleData = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
        // let parseTime = d3.timeParse("%Y-%m-%d");
        // sampleData.forEach((d) => {
        //     d.date = parseTime(d.date);
        //     d.value = +d.value;
        // });
        const parseTime = d3.timeParse("%Y-%m-%d");
        const dataset = propData.map((entry) => Object.assign({}, {
            ...entry,
            date_and_time: parseTime(entry.date_and_time.substring(0, 10)),
            set_weight: +entry.set_weight
        }));

        console.log('dataset', dataset);

        //     // set the dimensions and margins of the graph
        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const width = propWidth - margin.left - margin.right;
        const height = propHeight - margin.top - margin.bottom;

        //     console.log('width', width, 'height', height);
        //     // append the svg object to the body of the page
        const svg = d3.select(".line-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", "200 -100 3000 400");

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X axis and Y axis
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(dataset, (d) => d.date_and_time));
        y.domain([0, d3.max(dataset, (d) => d.set_weight)]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        svg.append("g")
            .call(d3.axisLeft(y));

        // add the Line
        var valueLine = d3.line()
            .x(d => x(d.date_and_time))
            .y(d => y(d.set_weight));

        svg.append("path")
            .data([dataset])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", valueLine)
    }

    useEffect(() => { buildGraph(svgWidth, svgHeight, data) }, []);


    return <svg className="line-chart"></svg>;
}

export default LineChart;
