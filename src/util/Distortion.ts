import { Map } from "../Types";
import MapUtils from "./MapUtils";

export default class Distortion {
  public static distortMap(
    baseMap: Map<number>,
    distortionFactor: number,
    distortionMap: Map<number>
  ): Map<number> {
    // let r: Map<number> = [...baseMap];
    let r: Map<number> = [];

    for (let x = 0; x <= baseMap.length; ++x) r[x] = [];

    for (let x = 0; x < baseMap.length; ++x) {
      for (let y = 0; y < baseMap[x].length; ++y) {
        let distortBy = Math.floor(
          distortionMap[x][y] * distortionFactor - distortionFactor / 2
        );

        let distortXTo: number;
        let distortYTo: number;

        if (x + distortBy > baseMap.length) {
          distortXTo = (x + distortBy) % baseMap.length;
        } else {
          distortXTo = x + distortBy;
        }

        if (y + distortBy > baseMap[x].length) {
          distortYTo = (y + distortBy) % baseMap.length;
        } else {
          distortYTo = y + distortBy;
        }

        r[distortXTo][distortYTo] = baseMap[x][y];
      }
    }

    r.splice(0, 1);

    for (let x = 0; x < r.length; ++x) {
      for (let y = 0; y < r[x].length; ++y) {
        const val = r[x][y];

        if (val == undefined) r[x][y] = baseMap[x][y];
      }
    }

    // MapUtils.map2d(r, (val, i) => (val ? val : baseMap[i[0]][i[1]]));
    console.log(r);

    return r;
  }
}
