import NoiseMapGenerator from "./NoiseMapGenerator";
import Map from "../../util/Map";
import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";
import Color from "../../util/Color";
import FractalNoise from "../../util/FractalNoise";
import SimpleBiomeGenerator from "../../simple/SimpleBiomeGenerator";

export default class HeightMapGenerator extends NoiseMapGenerator {
  private terrainShapeGenerator: FractalNoise;

  constructor(
      detailGeneratorSettings: NoiseGeneratorSettings,
      private terrainShapeGeneratorSettings: NoiseGeneratorSettings,
      width: number,
      height: number,
  ) {
    super(detailGeneratorSettings, width, height);
    this.terrainShapeGenerator = new FractalNoise(
        terrainShapeGeneratorSettings.seed,
        terrainShapeGeneratorSettings.detail,
    );

    this.map = this.generateMap();
  }

  public getColorMap(biomeGen: SimpleBiomeGenerator): Map<Color> {
    let colorMap: Map<Color>;

    colorMap = this.map.forEach(value => {
      if (value) return biomeGen.getBiome(value);
      else return new Color(255, 0, 0, 255);
    });

    return colorMap;
  }

  protected generateMap(): Map<number> {
    return this.map.forEach<number>(((value, position) => {
      let noiseGeneralHeightValue = this.terrainShapeGenerator.makeNoise(position.getScaled(this.terrainShapeGeneratorSettings.scale));
      let noiseDetailHeightValue = this.noiseGenerator.makeNoise(position.getScaled(this.settings.scale));

      if (this.terrainShapeGeneratorSettings.relevance && this.settings.relevance) {
        noiseGeneralHeightValue *= this.terrainShapeGeneratorSettings.relevance;
        noiseDetailHeightValue *= this.settings.relevance;
      }

      return (noiseGeneralHeightValue + noiseDetailHeightValue + 1) / 2 * 100;
    }));
  }
}