import {app} from "./App";
import SimpleBiomeGenerator from "./biomes/SimpleBiomeGenerator";
import FractalNoise from "./util/FractalNoise";
import {Map} from "./Types";
import Color from "./util/Color"
import MapUtils from "./util/MapUtils";

export default class WorldGenerator {
    private readonly heightMap: Map<number>;

    private readonly finalColorMap: Map<Color>;

    constructor(private biomeGen: SimpleBiomeGenerator, worldNoiseScalar: number) {
        this.heightMap = WorldGenerator.generateNoiseMap(
            (noiseVal) => noiseVal * worldNoiseScalar,
            app.seed,
            app.scale,
            app.width,
            app.height,
            app.detail
        );

        this.finalColorMap = MapUtils.map2d<number, Color>(
            this.heightMap,
            val => this.biomeGen.getBiome(val)
        );
    }

    private static generateNoiseMap(
        generator: (noiseVal: number) => number,
        noiseSeed: number,
        noiseScale: number,
        width: number,
        height: number,
        noiseDepth: number
    ): Map<number> {
        const noise = new FractalNoise(noiseSeed, noiseDepth);
        let noiseMap: Map<number> = [];

        for (let x = 0; x < width; ++x) {
            noiseMap[x] = [];
            for (let y = 0; y < height; ++y) {
                noiseMap[x][y] = generator(noise.makeNoise(x * noiseScale, y * noiseScale));
            }
        }

        return noiseMap;
    }

    public getColorMap(): Map<Color> {
        return this.finalColorMap;
    }
}
