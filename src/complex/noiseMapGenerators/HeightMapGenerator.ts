import NoiseMapGenerator from "./NoiseMapGenerator";
import Map from "../../util/Map";
import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";
import Color from "../../util/Color";
import FractalNoise from "../../util/FractalNoise";
import SimpleBiomeGenerator from "../../simple/SimpleBiomeGenerator";

export default class HeightMapGenerator extends NoiseMapGenerator {
  private bigNoiseGen: FractalNoise;

  constructor(detailGeneratorSettings: NoiseGeneratorSettings, private bigNoiseGeneratorSettings: NoiseGeneratorSettings, width: number, height: number) {
    super(detailGeneratorSettings, width, height);
    this.bigNoiseGen = new FractalNoise(bigNoiseGeneratorSettings.seed, bigNoiseGeneratorSettings.detail);

    this.map = this.generateMap();
  }

  protected generateMap(): Map<number> {
    return this.map.forEach<number>(((value, position) => {
      let noiseGeneralHeightValue = this.bigNoiseGen.makeNoise(position.getScaled(this.bigNoiseGeneratorSettings.scale));
      let noiseDetailHeightValue = this.noiseGenerator.makeNoise(position.getScaled(this.settings.scale));

      if (this.bigNoiseGeneratorSettings.relevance && this.settings.relevance) {
        noiseGeneralHeightValue *= this.bigNoiseGeneratorSettings.relevance;
        noiseDetailHeightValue *= this.settings.relevance;
      }

      return (noiseGeneralHeightValue + noiseDetailHeightValue + 1) / 2 * 100;
    }));
  }

  public getColorMap(biomeGen: SimpleBiomeGenerator): Map<Color> {
    let colorMap: Map<Color>;

    colorMap = this.map.forEach(value => {
      // if (value) return new Color(value, value, value, 255);
      // else return new Color(255, 0, 0, 255);
      if (value) return biomeGen.getBiome(value);
      else return new Color(255, 0, 0, 255);
    });

    return colorMap;
  }
}