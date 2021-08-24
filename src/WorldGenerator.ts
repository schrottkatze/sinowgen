import { app } from "./App";
import BiomeGenerator from "./biomes/BiomeGenerator";
import FractalNoise from "./noise/FractalNoise";
import { Map } from "./Types";

export default class WorldGenerator {
  private heightMap: Map;
  private tempMap: Map;
  private moistureMap: Map;

  constructor(private biomeGen: BiomeGenerator, worldNoiseScalar: number) {
    this.heightMap = WorldGenerator.generateNoiseMap(
      (noiseVal) => noiseVal * worldNoiseScalar,
      app.seed,
      app.scale,
      app.width,
      app.height,
      app.detail
    );
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
  }

  public static generateNoiseMap(
    generator: (noiseVal: number) => number,
    noiseSeed: number,
    noiseScale: number,
    width: number,
    height: number,
    noiseDepth: number
  ): Map {
    const noise = new FractalNoise(noiseSeed, noiseDepth);
    let r: Map = [];

    for (let x = 0; x < width; ++x) {
      r[x] = [];
      for (let y = 0; y < height; ++y) {
        r[x][y] = generator(noise.makeNoise(x * noiseScale, y * noiseScale));
      }
    }

    return r;
  }
}
