import React from 'react';
import * as d3 from 'd3';

const PieChart = () => {
    React.useEffect(() => {
        const data = [
            { "platform": "Android", "percentage": 40.11 },
            { "platform": "Windows", "percentage": 36.69 },
            { "platform": "iOS", "percentage": 13.06 },
        ];
        const svgWidth = 500, svgHeight = 300, radius = Math.min(svgWidth, svgHeight) / 2;
        const svg = d3.select('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const g = svg.append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const pie = d3.pie().value(function (d) {
            return d.percentage;
        });
        var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        var arc = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) { return color(d.data.percentage); });

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d) { return d.data.platform + ":" + d.data.percentage + "%"; });

    }, []);
    return <svg className="pie-chart" />;

}

export default PieChart;