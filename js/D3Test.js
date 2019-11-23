"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var width = 600, height = 400;
var colorScale = ['orange', 'lightblue', '#B19CD9'];
var xCenter = [100, 300, 500];
var numNodes = 100;
var nodes = d3.range(numNodes).map(function (d, i) {
    return {
        radius: Math.random() * 25,
        category: i % 3
    };
});
var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(function (d) {
    return xCenter[d.category];
}))
    .force('collision', d3.forceCollide().radius(function (d) {
    return d.radius;
}))
    .on('tick', ticked);
function ticked() {
    var u = d3.select('#viz')
        .selectAll('circle')
        .data(nodes);
    u.enter()
        .append('circle')
        .attr('r', function (d) {
        return d.radius;
    })
        .style('fill', function (d) {
        return colorScale[d.category];
    })
        .merge(u)
        .attr('cx', function (d) {
        return d.x;
    })
        .attr('cy', function (d) {
        return d.y;
    });
    u.exit().remove();
}
