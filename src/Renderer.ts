import p5 from "p5";
import { Color, Map } from "./Types";

export default class Renderer {
  constructor(private colorMap: Map<Color>) {}

  render(p: p5) {
    for (let x = 0; x < this.colorMap.length; ++x) {
      for (let y = 0; y < this.colorMap[x].length; ++y) {
        p.set(x, y, this.colorMap[x][y]);
      }
    }

    p.updatePixels();
  }
}
