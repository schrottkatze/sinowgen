import p5, { Color } from "p5";
import { BiomeColorSet } from "./interfaces/BiomeColorSet";

import gBiomeMap from "./biomeMaps/gBiomeMap";
import robinBiomeMap from "./biomeMaps/robinBiomeMap";

let instance = new p5((p: p5) => {
  let height = window.innerHeight - 4;
  let width = window.innerWidth;

  // let height = 250;
  // let width = 250;

  const seed = 11;
  // const detail = 128;
  // const falloff = 0.5;

  p.setup = () => {
    p.createCanvas(width, height);
    p.background(20, 0, 0);
    p.noStroke();

    p.noiseSeed(seed);
    // p.noiseDetail(detail, falloff);
  };

  let debug = 0;

  let iter = 0;

  p.draw = () => {
    // let scale = 0.125;
    let scale = 0.01;
    let noiseDifference = 0.326578;
    let noiseFactor = 100;
    // let scale = 1;
    // iterate through every pixel on screen

    // for (let x = 0; x < width; ++x) {
    //   for (let y = 0; y < height; ++y) {
    //     // get value 1-100 with noise
    //     // let h = p.noise(x * scale, y * scale) * 100;
    //     let n0 = p.noise(x * scale, y * scale) * noiseFactor;

    //     p.noiseSeed(seed + 5);
    //     let n1 =
    //       p.noise(
    //         x * scale * (noiseDifference + 1),
    //         y * scale * (noiseDifference + 1)
    //       ) * noiseFactor;x

    //     let h = (n0 + n1) / 2;

    //     // p.set(x, y, robinBiomeMap(h));
    //     // p.set(x, y, gBiomeMap(h));
    // p.set(x, y, [h, h, h, 255]);
    //   }
    // }
    let map0: number[][] = [];
    let map1: number[][] = [];

    p.noiseSeed(seed);
    for (let x = 0; x < width; ++x) {
      map0[x] = [];
      for (let y = 0; y < height; ++y) {
        map0[x][y] = p.noise(x * scale, y * scale);
      }
    }

    p.noiseSeed(seed * 2 - 15);
    for (let x = 0; x < width; ++x) {
      map1[x] = [];
      for (let y = 0; y < height; ++y) {
        map1[x][y] = p.noise(
          x * scale * (noiseDifference + 1),
          y * scale * (noiseDifference + 1)
        );
      }
    }

    let heightMap: number[][] = [];
    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        // heightMap[x][y] = (map0[x][y] + map1[x][y]) / 2;
        let h = (map0[x][y] - map1[x][y]) * 2 * noiseFactor;

        // p.set(x, y, [h, h, h, 255]);
        p.set(x, y, gBiomeMap(h));
      }
    }

    p.updatePixels();
    console.log("done");
    iter++;
    p.noLoop();
  };
});
