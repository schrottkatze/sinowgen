import p5, { Color } from "p5";
import { BiomeColorSet } from "./interfaces/BiomeColorSet";

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
        // let h =
        //   Math.floor(p.noise(x * scale, y * scale, iter * scale) * 33.3333333) *
        //   3;

        // get value 1-100 with noise
        let h = p.noise(x * scale, y * scale /*, iter * scale*/) * 100;

        // applies the biome map
        // robinBiomeMap(h);

        //draws the pixel
        // p.rect(x * size, y * size, size, size);

        p.set(x, y, robinBiomeMap(h));
        // p.set(x, y, [0, 255, 0, 255]);
      }
    }
    p.updatePixels();
    console.log("done");
    iter++;
    // p.noLoop();
  };

  function addBiome(
    h: number,
    thresholds: {
      min: number;
      height: number;
    },
    colors: BiomeColorSet
  ): number[] | false {
    if (h >= thresholds.min && h <= thresholds.min + thresholds.height) {
      const relHeight = (h - thresholds.min) / thresholds.height;

      const colDiffs = {
        r: colors.high.r - colors.low.r,
        g: colors.high.g - colors.low.g,
        b: colors.high.b - colors.low.b,
      };

      const r = Math.floor(colDiffs.r * relHeight + colors.low.r);
      const g = Math.floor(colDiffs.g * relHeight + colors.low.g);
      const b = Math.floor(colDiffs.b * relHeight + colors.low.b);

      // p.fill(r, g, b);
      return [r, g, b, 255];
    } else {
      return false;
    }
  }

  // function paulBiomeMap(h: number): number[] {
  //   let r: number[] | false = false;
  //   // Nodul
  //   r = addBiome(
  //     h,
  //     { min: 35, height: 5 },
  //     { low: { r: 235, g: 87, b: 35 }, high: { r: 255, g: 125, b: 40 } }
  //   );
  // }
  // j;
  function robinBiomeMap(h: number): number[] {
    let r: number[] | false = false;
    // Ocean
    r = addBiome(
      h,
      { min: 0, height: 35 },
      { low: { r: 0, g: 0, b: 139 }, high: { r: 135, g: 206, b: 250 } }
    );
    if (!!r) return r;

    // Desert/beach
    r = addBiome(
      h,
      { min: 35, height: 10 },
      { low: { r: 189, g: 183, b: 107 }, high: { r: 238, g: 232, b: 170 } }
    );
    if (!!r) return r;

    // Forest
    r = addBiome(
      h,
      { min: 45, height: 15 },
      { low: { r: 34, g: 139, b: 34 }, high: { r: 144, g: 238, b: 144 } }
    );
    if (!!r) return r;

    // Mountain
    r = addBiome(
      h,
      { min: 60, height: 40 },
      { low: { r: 105, g: 105, b: 105 }, high: { r: 255, g: 250, b: 250 } }
    );
    if (!!r) return r;

    // console.log(h);
    return [255, 0, 0, 255];
  }
});
