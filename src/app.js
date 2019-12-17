import * as d3 from "d3";
const width = 600, height = 400;
const colorScale = ['orange', 'lightblue', 'pink'];
const xCenter = [100, 300, 500];
const numNodes = 100;
class VoterBubble {
    constructor(index, category, radius) {
        this.index = index;
        this.category = category;
        this.radius = radius;
    }
}
const nodes = d3.range(numNodes).map(function (d, i) {
    return new VoterBubble(i, i % 3, 5);
});
var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('y', d3.forceY().y(200))
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
        .data(simulation.nodes());
    u.enter()
        .append('circle')
        .attr('r', function (d) {
        return d.radius;
    })
        .style('fill', function (d) {
        return colorScale[d.category];
    });
    u.merge(u)
        .attr('cx', function (d) {
        return d.x;
    })
        .attr('cy', function (d) {
        return d.y;
    });
    u.exit().remove();
}
//# sourceMappingURL=app.js.map