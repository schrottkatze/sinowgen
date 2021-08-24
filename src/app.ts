import p5, { Color } from "p5";

import FractalNoise from "./noise/FractalNoise";
// import gBiomeMap from "./biomes/gBiomeMap";
import BiomeGenerator from "./biomes/BiomeGenerator";
// import robinBiomeMap from "./biomes/robinBiomeMap";
import { makeNoise2D } from "open-simplex-noise";
import { textChangeRangeIsUnchanged } from "typescript";
import WorldGenerator from "./WorldGenerator";
import SimpleBiome from "./biomes/SimpleBiome";
import { biomeMaps } from "./biomes/BiomeMaps";

class App {
  public readonly scale = 0.005;
  public readonly noiseFactor = 100;

  public readonly height = 1080;
  public readonly width = 1080;

  public readonly seed = Math.floor(Math.random() * 100000 + 1);
  public readonly detail = 8;

  private instance: p5;
  constructor() {
    this.instance = new p5((p: p5) => {
      p.setup = () => this.setup(p);
      p.draw = () => this.draw(p);
    });
  }

  public setup(p: p5): void {
    p.createCanvas(this.width, this.height);
    p.background(0, 0, 0);
    p.noStroke();
  }

  public draw(p: p5): void {
    const fracNoise = new FractalNoise(this.seed, this.detail);

    // const world = new WorldGenerator();
    const biomeMap = biomeMaps.robinBiomeMap;

    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        let h =
          fracNoise.makeNoise(x * this.scale, y * this.scale) *
          this.noiseFactor;

        // p.set(x, y, robinBiomeMap(h));
        // p.set(x, y, gBiomeMap(h));
        p.set(x, y, biomeMap.getBiome(h));
        // p.set(x, y, [0, h, 0, 255]);
      }
    }

    p.updatePixels();
    console.log("Rendering complete!");
    p.noLoop();
  }
}

export const app = new App();

// let height = window.innerHeight - 4;
// let width = window.innerWidth;
