import {DistrictMap} from './DistrictMap'

class MapDisplay {
  map: DistrictMap;
  svgDivId: string;
  constructor(svgDivId: string) {
    this.svgDivId = svgDivId;

    this.map = new DistrictMap("svg", this.onEnter, this.onExit, this.onClick);
  }
  onEnter(d: any) {
    console.log("Enter: ", d)
  }
  onExit(d: any) {
    console.log("Exit: ", d)
  }
  onClick(d: any) {
    console.log("Click: ", d)
  }
}

const d = new MapDisplay("svg");
