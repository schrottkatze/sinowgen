import { Map } from "../Types";
import SimpleBiome from "./SimpleBiome";

export default class BiomeGenerator {
  constructor(private readonly biomeList: SimpleBiome[]) {}

  public getBiome(height: number): Color {
    for (let i = 0; i < this.biomeList.length; ++i) {
      let biomeColorCode = this.biomeList[i].getColorCodeForHeightPos(height);
      if (biomeColorCode) return biomeColorCode;
    }

    return [255, 0, 0, 255];
  }
}
