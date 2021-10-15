import {app} from "../App";
import SimpleBiomeGenerator from "./SimpleBiomeGenerator";
import FractalNoise from "../util/FractalNoise";
import Map from "../util/Map";
import Color from "../util/Color";
import GeneratorRegistry from "../complex/noiseMapGenerators/GeneratorRegistry";

export default class SimpleWorldGenerator {
    private readonly heightMap: Map<number>;

    private readonly finalColorMap: Map<Color>;

    constructor(private biomeGen: SimpleBiomeGenerator, worldNoiseScalar: number) {
        this.heightMap = SimpleWorldGenerator.generateNoiseMap(
            (noiseVal) => noiseVal * worldNoiseScalar,
        );

        this.finalColorMap = this.heightMap.forEach<Color>(value => {
            if (value) return this.biomeGen.getBiome(value);
            else throw new Error("No height value given for biome generator.");
        });
    }

    private static generateNoiseMap(
        generator: (noiseVal: number) => number,
    ): Map<number> {
        const noise = new FractalNoise(GeneratorRegistry.BASE_SEED, 8);
        let noiseMap = new Map<number>(app.WIDTH, app.HEIGHT);

        noiseMap = noiseMap.forEach<number>((value, position) => {
            return generator((noise.makeNoise(position.getScaled(GeneratorRegistry.BASE_SCALE)) + 1) / 2);

        });

        return noiseMap;
    }

    public getColorMap(): Map<Color> {
        return this.finalColorMap;
    }
}
