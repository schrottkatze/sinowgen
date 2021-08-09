import p5, { Color } from "p5";
import { BiomeColorSet } from "./interfaces/BiomeColorSet";

let instance = new p5((p: p5) => {
  // let height = window.innerHeight;
  // let width = window.innerWidth;

  let height = 1000;
  let width = 1650;

  const seed = 10;
  // const detail = 3;
  // const falloff = 0.5;

  p.setup = () => {
    p.createCanvas(width, height);
    p.background(20, 0, 0);
    p.noStroke();

    p.noiseSeed(seed);
    // p.noiseDetail(detail, falloff);
  };

  let iter = 0;

  let size = 0.5;

  p.draw = () => {
    let s = 1 / 300;
    for (let x = 0; x < width / size; ++x) {
      for (let y = 0; y < height / size; ++y) {
        // let h = Math.floor(p.noise(x * s, y * s) * 50) * 2;
        let h = p.noise(x * s, y * s) * 100;

        robinBiomeMap(h);

        p.ellipse(x * size, y * size, size, size);
      }
    }
    p.noLoop();
  };

  function addBiome(
    h: number,
    thresholds: {
      min: number;
      height: number;
    },
    colors: BiomeColorSet
  ): void {
    if (h >= thresholds.min && h <= thresholds.min + height) {
      const relHeight = (h - thresholds.min) / thresholds.height;

      const colDiffs = {
        r: colors.high.r - colors.low.r,
        g: colors.high.g - colors.low.g,
        b: colors.high.b - colors.low.b,
      };

      const r = Math.floor(colDiffs.r * relHeight + colors.low.r);
      const g = Math.floor(colDiffs.g * relHeight + colors.low.g);
      const b = Math.floor(colDiffs.b * relHeight + colors.low.b);

      p.fill(r, g, b);
    }
  }

  function robinBiomeMap(h: number): void {
    // Ocean
    addBiome(
      h,
      { min: 0, height: 35 },
      { low: { r: 0, g: 0, b: 139 }, high: { r: 135, g: 206, b: 250 } }
    );

    // Desert/beach
    addBiome(
      h,
      { min: 35, height: 10 },
      { low: { r: 189, g: 183, b: 107 }, high: { r: 238, g: 232, b: 170 } }
    );

    // Forest
    addBiome(
      h,
      { min: 45, height: 15 },
      { low: { r: 34, g: 139, b: 34 }, high: { r: 144, g: 238, b: 144 } }
    );

    // Mountain
    addBiome(
      h,
      { min: 60, height: 40 },
      { low: { r: 105, g: 105, b: 105 }, high: { r: 255, g: 250, b: 250 } }
    );
  }
});
