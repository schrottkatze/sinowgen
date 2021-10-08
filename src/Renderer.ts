import p5 from "p5";
import { Map } from "./Types";
import Color from "./util/Color";

export default class Renderer {
  constructor(private colorMap: Map<Color>) {}

  render(p: p5) {
    for (let x = 0; x < this.colorMap.length; ++x) {
      for (let y = 0; y < this.colorMap[x].length; ++y) {
        p.set(x, y, this.colorMap[x][y].getAsArray());
      }
    }

    p.updatePixels();
  }
}
