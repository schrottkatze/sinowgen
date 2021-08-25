import { app } from "./App";
import BiomeGenerator from "./biomes/BiomeGenerator";
import FractalNoise from "./noise/FractalNoise";
import { Color, Map } from "./Types";
import Util from "./Util";

export default class WorldGenerator {
  private heightMap: Map<number>;

  /*

  later also for temp/moisture based worldgen!!


  private tempMap: Map<number>;
  private moistureMap: Map<number>;

  */

  private finalColorMap: Map<Color>;

  constructor(private biomeGen: BiomeGenerator, worldNoiseScalar: number) {
    this.heightMap = WorldGenerator.generateNoiseMap(
      (noiseVal) => noiseVal * worldNoiseScalar,
      app.seed,
      app.scale,
      app.width,
      app.height,
      app.detail
    );

    /*


    later for temp/moisture based worldgen!


    this.tempMap = WorldGenerator.generateNoiseMap(
      (noiseVal) => noiseVal * worldNoiseScalar,
      app.seed,
      app.scale,
      app.width,
      app.height,
      app.detail
    );

    this.moistureMap = WorldGenerator.generateNoiseMap(
      (noiseVal) => noiseVal * worldNoiseScalar,
      app.seed,
      app.scale,
      app.width,
      app.height,
      app.detail
    );

    */

    this.finalColorMap = Util.map2d<number, Color>(
      this.heightMap,
      (val, indices) => this.biomeGen.getBiome(val)
    );
  }

  private static generateNoiseMap(
    generator: (noiseVal: number) => number,
    noiseSeed: number,
    noiseScale: number,
    width: number,
    height: number,
    noiseDepth: number
  ): Map<number> {
    const noise = new FractalNoise(noiseSeed, noiseDepth);
    let r: Map<number> = [];

    for (let x = 0; x < width; ++x) {
      r[x] = [];
      for (let y = 0; y < height; ++y) {
        r[x][y] = generator(noise.makeNoise(x * noiseScale, y * noiseScale));
      }
    }

    return r;
  }

  public getColorMap(): Map<Color> {
    return this.finalColorMap;
  }
}
