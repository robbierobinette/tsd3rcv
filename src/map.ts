import * as d3 from 'd3'
import * as topojson from '@types/topojson'

var svg = d3.select("svg");
var path = d3.geoPath();

console.log("map.ts");
d3.json("us2018.topo.json")
  .then((data: any) => {
    console.log("in 'then'.");
    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(data, data.objects.states).features)
      .enter().append("path")
      .attr("d", path);

    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(data, data.objects.states, function (a: any, b: any) {
        return a !== b;
      })));
  });
