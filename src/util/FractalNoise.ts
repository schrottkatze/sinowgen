import * as openSimplex from "open-simplex-noise";
import {Noise2D} from "open-simplex-noise/lib/2d";
import Position from "./Position";

export default class FractalNoise {
    private readonly noise2d: Noise2D;

    constructor(private seed: number, private octaves: number) {
        this.noise2d = openSimplex.makeNoise2D(seed);
    }

    private static clip(val: number): number {
        let result = val;
        if (val <= -1) result = -0.999;
        if (val >= 1) result = 1;
        return result;
    }

    makeNoise(pos: Position): number {
        let r = 0;

        for (let i = 0; i < this.octaves; ++i) {
            const factor = 2 ** i;
            r += this.noise2d(pos.x * factor, pos.y * factor) / factor;
        }

        return FractalNoise.clip(r);
    }
}
