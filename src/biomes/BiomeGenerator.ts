import { app } from "../App";
import FractalNoise from "../noise/FractalNoise";

export default class BiomeGenerator {
  public temperatureMap: number[][];
  public moistureMap: number[][];

  constructor(
    private biomeDepth: number,
    private biomeSeed?: number,
    private biomeScale?: number
  ) {
    biomeSeed = biomeSeed || app.seed;
    biomeScale = biomeScale || app.scale;

    console.log("Generating Biome Maps");
    this.temperatureMap = this.generateNoiseMap(1, app.seed + 10);
    this.temperatureMap = this.applyHeat(this.temperatureMap);
    console.log("Temperature map complete");
    this.moistureMap = this.generateNoiseMap(255, app.seed + 20);
    console.log("Moisture map complete");
    console.log(this.moistureMap);
  }

  generateNoiseMap(scalar: number, seed?: number): number[][] {
    seed = seed || app.seed;
    let r: number[][] = [];

    const fracNoise = new FractalNoise(seed, 8);

    console.log(scalar);
    for (let x = 0; x < app.width; ++x) {
      r[x] = [];
      for (let y = 0; y < app.height; ++y) {
        r[x][y] = Math.floor(
          fracNoise.makeNoise(x * app.scale, y * app.scale) * scalar
        ); /* *
          scalar */
      }
    }

    return r;
  }

  getPixel(x: number, y: number): [number, number, number] {
    // return [this.temperatureMap[x][y], this.moistureMap[x][y], 255];
    return [this.temperatureMap[x][y], 0, this.moistureMap[x][y]];
  }

  applyHeat(temperatureMap: number[][]): number[][] {
    for (let x = 0; x < app.width; ++x) {
      for (let y = 0; y < app.height; ++y) {
        // temperatureMap[x][y] +=
        //   (-0.5 / app.height) * (y - app.height / 2) ** 2 + app.height / 8;
        temperatureMap[x][y] +=
          Math.cos(y * Math.PI * (2 / app.height) + Math.PI) * 50 + 50;
      }
    }
    return temperatureMap;
  }
}
