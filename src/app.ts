import p5, { Color } from "p5";
import FractalNoise from "./noise/FractalNoise";

import gBiomeMap from "./biomeMaps/gBiomeMap";
import robinBiomeMap from "./biomeMaps/robinBiomeMap";
import { makeNoise2D } from "open-simplex-noise";
import { textChangeRangeIsUnchanged } from "typescript";

const scale = 0.005;
const noiseDifference = 0.326578;
const noiseFactor = 100;

const height = 1080;
const width = 1080;

const seed = Math.floor(Math.random() * 100000 + 1);
const detail = 8;

class App {
  public static setup(p: p5): void {
    p.createCanvas(width, height);
    p.background(0, 0, 0);
    p.noStroke();
  }

  public static draw(p: p5): void {
    const fracNoise = new FractalNoise(seed, detail);

    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        let h = fracNoise.makeNoise(x * scale, y * scale) * noiseFactor;

        // p.set(x, y, robinBiomeMap(h));
        p.set(x, y, gBiomeMap(h));
      }
    }

    p.updatePixels();
    p.noLoop();
  }
}

let instance = new p5((p: p5) => {
  p.setup = () => {
    App.setup(p);
  };
  p.draw = () => {
    App.draw(p);
  };
});
// let height = window.innerHeight - 4;
// let width = window.innerWidth;
