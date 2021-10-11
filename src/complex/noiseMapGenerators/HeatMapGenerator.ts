import NoiseMapGenerator from "./NoiseMapGenerator";
import Map from "../../util/Map";
import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";

export default class HeatMapGenerator extends NoiseMapGenerator {
  private heightMap: Map<number>;

  constructor(settings: NoiseGeneratorSettings, width: number, height: number, heightMap: Map<number>) {
    super(settings, width, height);
    this.heightMap = heightMap;

    this.map = this.generateMap();
  }

  protected generateMap(): Map<number> {
    return this.map.forEach((value, position) => {
      // TODO: make algorithm depend on height map
      return (this.noiseGenerator.makeNoise(position.getScaled(this.settings.scale)) + 1) / 2 * 255;
    });
  }
}