import * as openSimplex from "open-simplex-noise";
import { Noise2D } from "open-simplex-noise/lib/2d";
import Position from "./Position";

export default class FractalNoise {
  private readonly noise2d: Noise2D;

  constructor(private seed: number, private detail?: number) {
    this.noise2d = openSimplex.makeNoise2D(seed);
  }

  makeNoise(pos: Position): number {
    let r = 0;

    for (let i = 0; i < (this.detail || 4); ++i) {
      const factor = Math.pow(2, i);
      r += (this.noise2d(pos.x * factor, pos.y * factor) + 1) / 2 / factor;
    }

    return r / 2;
  }
}
