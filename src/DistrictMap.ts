import * as d3 from 'd3'
import * as topojson from 'topojson'
import {FeatureCollection} from 'GeoJSON'


export class DistrictMap {
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // too many uses of 'any'.  In scala it would not be required to forward declare the type, that would
  // be inferred by the compiler at instantiation time.
  //
  // Also, it takes 3+ lines of code to create a member variable, it would only require 1 in scala.
  svg: any;
  g: any;
  projection = d3.geoAlbersUsa();
  path = d3.geoPath().projection(this.projection);
  mouseEnterCallback: Function;
  mouseExitCallback: Function;
  mouseClickCallback: Function;
  obj = this;

  constructor(svgDivId: string, onMouseEnter: Function, onMouseExit: Function, onClick: Function) {
    this.svg = d3.select(svgDivId);
    this.mouseEnterCallback = onMouseEnter;
    this.mouseExitCallback = onMouseExit;
    this.mouseClickCallback = onClick;
    console.log("DistrictMap");
    const url = "us2018.topo.json";
    const mapPromise = d3.json(url);
    mapPromise.then((data: any) => this.constructMap(data))
  }


  constructMap(data: any) {
    const obj = this
    console.log("simplified map2");

    // TODO:  eliminate casting gymnastics
    const stateFeatureCollection = topojson.feature(data, data.objects.states) as unknown as FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>;
    const districtFeatureCollection = topojson.feature(data, data.objects.districts) as unknown as FeatureCollection<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>;
    this.svg.call(d3.zoom()
      .scaleExtent([1, 16])
      .on("zoom", () => obj.zoomed()));

    this.g = this.svg.append("g");
    console.log("constructMap.this:  ", this);
    console.log("this.g:  ", this.g);

    this.g.append("path")
      .attr("d", this.path(stateFeatureCollection))
      .attr("fill", "none")
      .attr("stroke", "#fff");

    this.g.selectAll("path")
      .data(districtFeatureCollection.features)
      .enter()
      .append("path")
      .attr("class", "districts")
      .attr("d", this.path)
      .attr("fill", "#eee")
      .attr("stroke", "#00f")
      .attr("stroke-width", "0.1px")
      .on("mouseover", function (this: any, d: any) {
        console.log("mouseover");
        d3.select(this).style("fill", "red");
        obj.mouseEnterCallback(d);
      })
      .on("mouseout", function (this: any, d: any) {
        console.log("mouseout");
        d3.select(this).style("fill", "#eee");
        obj.mouseExitCallback(d);
      })
      .on("mouseclick", (d: any) => {
        console.log("click");
        obj.mouseClickCallback(d);
      });


    function mouse_enter(d: any) {
      d3.select(this).style("fill", "red");
      console.log("Mouse enter: ", d);
    }

    function mouse_exit(d: any) {
      d3.select(this).style("fill", "#eee");
      console.log("Mouse exit: ", d);
    }
  }

  zoomed() {
    console.log("zoomed: this:  ", this);
    console.log("this.g:  ", this.g);
    this.g.attr("transform", d3.event.transform);
  }
}

