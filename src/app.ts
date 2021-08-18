import p5, { Color } from "p5";
import FractalNoise from "./noise/FractalNoise";

import gBiomeMap from "./biomeMaps/gBiomeMap";
import robinBiomeMap from "./biomeMaps/robinBiomeMap";
import { makeNoise2D } from "open-simplex-noise";

let instance = new p5((p: p5) => {
  let height = window.innerHeight - 4;
  let width = window.innerWidth;

  const seed = 11;
  const detail = 8;

  p.setup = () => {
    p.createCanvas(width, height);
    p.background(20, 0, 0);
    p.noStroke();
  };

  let debug = 0;

  let iter = 0;

  p.draw = () => {
    let scale = 0.005;
    let noiseDifference = 0.326578;
    let noiseFactor = 100;

    const fracNoise = new FractalNoise(seed, detail);

    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        let h = fracNoise.makeNoise(x * scale, y * scale) * noiseFactor;

        // p.set(x, y, robinBiomeMap(h));
        p.set(x, y, gBiomeMap(h));
      }
    }

    p.updatePixels();
    console.log("done");
    iter++;
    p.noLoop();
  };
});
