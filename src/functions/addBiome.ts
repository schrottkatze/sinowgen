import { BiomeColorSet } from "../interfaces/BiomeColorSet";

export default function addBiome(
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

    return [r, g, b, 255];
  } else {
    return false;
  }
}
