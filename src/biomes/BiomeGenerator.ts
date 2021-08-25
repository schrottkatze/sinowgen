import { app } from "../App";
import { Color, Map } from "../Types";
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

  private applyHeat(
    temperatureMap: number[][],
    heatLevel: number
  ): Map<number> {
    for (let x = 0; x < app.width; ++x) {
      for (let y = 0; y < app.height; ++y) {
        temperatureMap[x][y] += Math.abs(
          Math.cos(y * Math.PI * (2 / app.height) + Math.PI) * heatLevel +
            heatLevel
        );
      }
    }
    return temperatureMap;
  }
}
