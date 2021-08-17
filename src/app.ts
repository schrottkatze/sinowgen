import p5, { Color } from "p5";
import { BiomeColorSet } from "./interfaces/BiomeColorSet";

import gBiomeMap from "./biomeMaps/gBiomeMap";
import robinBiomeMap from "./biomeMaps/robinBiomeMap";

let instance = new p5((p: p5) => {
  let height = window.innerHeight - 4;
  let width = window.innerWidth;

  // let height = 250;
  // let width = 250;

  const seed = 10;
  // const detail = 3;
  // const falloff = 0.5;

  p.setup = () => {
    p.createCanvas(width, height);
    p.background(20, 0, 0);
    p.noStroke();

    // p.noiseSeed(seed);
    // p.noiseDetail(detail, falloff);
  };

  let debug = 0;

  let iter = 0;

  p.draw = () => {
    let scale = 0.005;
    // iterate through every pixel on screen
    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        // get value 1-100 with noise
        let h = p.noise(x * scale, y * scale) * 100;

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
