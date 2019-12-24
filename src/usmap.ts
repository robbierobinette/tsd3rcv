import * as d3 from 'd3'
import * as topojson from 'topojson'
import {FeatureCollection} from 'GeoJSON'

var svg = d3.select("svg");
var path = d3.geoPath();

console.log("map.ts");
d3.json("https://d3js.org/us-10m.v1.json")
// d3.json("us2018.topo.json")
  .then((data: any) => {
    console.log("in 'then'.");
    const featureCollection = topojson.feature(data, data.objects.states) as unknown as FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>

    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(featureCollection.features)
      .enter()
        .append("path")
        .attr("d", path);
    // const p = path(topojson.mesh(data, data.objects.states, function (a: any, b: any) { return a !== b }))
    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(data, data.objects.states, function (a: any, b: any) {
        return a !== b;
      })));
  });
