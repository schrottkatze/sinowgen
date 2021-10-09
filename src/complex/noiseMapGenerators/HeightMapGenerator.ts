import NoiseMapGenerator from "./NoiseMapGenerator";
import Map from "../../util/Map";
import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";
import Color from "../../util/Color";
import { app } from "../../App";

export default class HeightMapGenerator extends NoiseMapGenerator {
  constructor(settings: NoiseGeneratorSettings, width: number, height: number) {
    super(settings, width, height);
    this.map = this.generateMap(settings.scale);
  }

  protected generateMap(scale: number): Map<number> {
    let result: Map<number>;

    result = this.map.forEach<number>(((value, position) => {
      return this.noiseGenerator.makeNoise(position.getScaled(scale)) * 255;
    }));

    return result;
  }

  public testingGetColorMap(): Map<Color> {
    let colorMap: Map<Color>;

    colorMap = this.map.forEach(value => {
      if (value) return new Color(value, value, value, 255);
      else return new Color(255, 0 ,0 ,255);
    });

    return colorMap;
  }
}