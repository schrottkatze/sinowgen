import NoiseMapGenerator from "./NoiseMapGenerator";
import Map from "../../util/Map";
import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";

export default class MoistureMapGenerator extends NoiseMapGenerator {
  private heatMap: Map<number>;

  constructor(settings: NoiseGeneratorSettings, width: number, height: number, heatMap: Map<number>) {
    super(settings, width, height);
    this.heatMap = heatMap;

    this.map = this.generateMap();
  }

  protected generateMap(): Map<number> {
    return this.map.forEach((value, position) => {
      // TODO: Make algorithm depend on heat map
      return (this.noiseGenerator.makeNoise(position.getScaled(this.settings.scale)) + 1) / 2 * 255;
    });
  }
}
