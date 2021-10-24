import SimpleBiomeGenerator from "./simple/SimpleBiomeGenerator";
import Renderer from "./Renderer";
import p5 from "p5";
import SimpleBiomeMaps from "./simple/SimpleBiomeMaps";
import Registration from "./complex/Registration";
import GeneratorRegistry from "./complex/noiseMapGenerators/GeneratorRegistry";
import HeightMapGenerator from "./complex/noiseMapGenerators/HeightMapGenerator";
import BiomeGenerator from "./complex/biomeGeneration/BiomeGenerator";
import WorldGenerator from "./complex/WorldGenerator";
import SimpleWorldGenerator from "./simple/SimpleWorldGenerator";

class App {
    public readonly MODE: Modes = Modes.BETTER_HEIGHTMAPS;

    public readonly HEIGHT = window.innerHeight;
    public readonly WIDTH = window.innerWidth;

    private instance: p5;

    constructor() {
        this.instance = new p5((p: p5) => {
            p.setup = () => this.setup(p);
            p.draw = () => this.draw(p);
        });
    }

    public setup(p: p5): void {
        p.createCanvas(this.WIDTH, this.HEIGHT);
        p.background(255, 0, 0);
        p.noStroke();
    }

    public draw(p: p5): void {
        console.log(`Seed: ${GeneratorRegistry.BASE_SEED}`);

        Registration.register();

        let renderer: Renderer | undefined;

        const simpleBiomeGen = new SimpleBiomeGenerator(SimpleBiomeMaps.gabrielBiomeMap);
        if (this.MODE === Modes.SIMPLE) {
            console.time("Simple WG");
            const worldGen = new SimpleWorldGenerator(simpleBiomeGen, 100);
            renderer = new Renderer(worldGen.getColorMap());
            console.timeEnd("Simple WG");
        } else if (this.MODE === Modes.BETTER_HEIGHTMAPS) {
            console.time("Better HeightMaps WG");
            const heightMapGen = Registration.NOISE_GENERATOR_REGISTRY.get("height_map_generator") as HeightMapGenerator;
            renderer = new Renderer(heightMapGen.getColorMap(simpleBiomeGen));
            console.timeEnd("Better HeightMaps WG");
        } else if (this.MODE === Modes.COMPLEX) {
            console.time("Complex WG");
            const complexBiomeGen = new BiomeGenerator(Registration.NOISE_GENERATOR_REGISTRY.getMapsFromAllGenerators());
            const worldGen = new WorldGenerator(complexBiomeGen.biomeMap, Registration.NOISE_GENERATOR_REGISTRY.getMapsFromAllGenerators());
            renderer = new Renderer(worldGen.makeColorMap());
            console.timeEnd("Complex WG");
        }
        if (renderer) renderer.render(p);

        console.time("seedTeller");
        let seedTeller: HTMLSpanElement;
        seedTeller = document.createElement("span");
        seedTeller.innerText = `Seed: ${GeneratorRegistry.BASE_SEED}`;
        console.timeEnd("seedTeller");

        document.body.append(seedTeller);
        p.noLoop();
    }
}

export enum Modes {
    SIMPLE,
    BETTER_HEIGHTMAPS,
    COMPLEX
}

export const app = new App();
