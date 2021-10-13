import SimpleBiome from "./SimpleBiome";
import Color from "../util/Color";

export default class SimpleBiomeGenerator {
  constructor(private readonly biomeList: SimpleBiome[]) {
  }

  public getBiome(height: number): Color {
    for (let i = 0; i < this.biomeList.length; ++i) {
      let biomeColorValue = this.biomeList[i].getColorForHeightPos(height);
      if (biomeColorValue) return biomeColorValue;
    }

    return new Color(255, 0, 0, 255);
  }
}
