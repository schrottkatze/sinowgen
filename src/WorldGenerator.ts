import { app } from "./App";
import BiomeGenerator from "./biomes/SimpleBiomeGenerator";
import FractalNoise from "./util/FractalNoise";
import { Color, Map } from "./Types";
import MapUtils from "./util/MapUtils";
import Distortion from "./util/Distortion";

export default class WorldGenerator {
  private heightMap: Map<number>;

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

    // this.heightMap = WorldGenerator.generateSquareMap(app.width, app.height);

    this.heightMap = Distortion.distortMap(
      this.heightMap,
      250,
      WorldGenerator.generateNoiseMap(
        (val) => val,
        50,
        0.005,
        app.width,
        app.height,
        8
      )
    );

    this.finalColorMap = MapUtils.map2d<number, Color>(
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

  private static generateSquareMap(width: number, height: number): Map<number> {
    let r: Map<number> = [];

    for (let x = 0; x < width; ++x) {
      r[x] = [];
      for (let y = 0; y < height; ++y) {
        if (x > 350 && y > 350 && x < 650 && y < 650) r[x][y] = 50;
        else r[x][y] = 0;
      }
    }

    return r;
  }

  public getColorMap(): Map<Color> {
    return this.finalColorMap;
  }
}
