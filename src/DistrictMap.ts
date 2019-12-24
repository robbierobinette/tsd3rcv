import * as d3 from 'd3'
import * as topojson from 'topojson'
import {FeatureCollection} from 'GeoJSON'


export class DistrictMap {
  svg: any;
  projection = d3.geoAlbersUsa();
  path = d3.geoPath().projection(this.projection);

  constructor(svgDivId: string) {
    this.svg = d3.select(svgDivId);
    console.log("DistrictMap");
    var url = "us2018.topo.json";
    const mapPromise = d3.json(url);
    mapPromise.then((data: any) => this.constructMap(data))
  }


  constructMap(data: any) {
    console.log("simplified map2");

    const stateFeatureCollection = topojson.feature(data, data.objects.states) as unknown as FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>


    const districtFeatureCollection = topojson.feature(data, data.objects.districts) as unknown as FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>

    this.svg.append("path")
      .attr("d", this.path(stateFeatureCollection))
      .attr("fill", "lightgray");

    this.svg.append("g")
      .attr("class", "districts")
      .attr("clip-path", "url(#clip-land)")
      .selectAll("path")
      .data(districtFeatureCollection.features)
      .enter()
      .append("path")
      .attr("d", this.path)
      .attr("fill", "none")
      .attr("stroke", "#00f")
      .attr("stroke-width", "0.5px")
      .append("title")
      .text(function(d: any) { return d.id; })

  }

}

