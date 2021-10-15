import SimpleBiomeGenerator from "./simple/SimpleBiomeGenerator";
import Renderer from "./Renderer";
import p5 from "p5";
import SimpleBiomeMaps from "./simple/SimpleBiomeMaps";
import Registration from "./complex/Registration";
import GeneratorRegistry from "./complex/noiseMapGenerators/GeneratorRegistry";
import HeightMapGenerator from "./complex/noiseMapGenerators/HeightMapGenerator";
import BiomeGenerator from "./complex/biomeGeneration/BiomeGenerator";

class App {
    public readonly HEIGHT = 1080;
    public readonly WIDTH  = 1080;

    private instance: p5;

    constructor() {
        this.instance = new p5((p: p5) => {
            p.setup = () => this.setup(p);
            p.draw  = () => this.draw(p);
        });
    }

    public setup(p: p5): void {
        p.createCanvas(this.WIDTH, this.HEIGHT);
        p.background(255, 0, 0);
        p.noStroke();
    }

    public draw(p: p5): void {
        console.log(`Seed: ${GeneratorRegistry.BASE_SEED}`);
        console.time("Map generation and rendering");

        Registration.register();
        const biomeGen = new SimpleBiomeGenerator(SimpleBiomeMaps.gabrielBiomeMap);
        // const worldGen = new SimpleWorldGenerator(biomeGen, 100);

        const heightMapGen = Registration.NOISE_GENERATOR_REGISTRY.get("height_map_generator") as HeightMapGenerator;

        const renderer = new Renderer(heightMapGen.getColorMap(biomeGen));
        // const renderer = new Renderer(worldGen.getColorMap())
        renderer.render(p);

        console.timeEnd("Map generation and rendering");

        console.time("complex");
        const ComplexBiomeGen = new BiomeGenerator({
            groundHardnessMap: Registration.NOISE_GENERATOR_REGISTRY.get("ground_hardness_map_generator").map,
            heatMap:           Registration.NOISE_GENERATOR_REGISTRY.get("heat_map_generator").map,
            heightMap:         Registration.NOISE_GENERATOR_REGISTRY.get("height_map_generator").map,
            moistureMap:       Registration.NOISE_GENERATOR_REGISTRY.get("moisture_map_generator").map
        });
        console.timeEnd("complex");
        p.noLoop();
    }
}

export const app = new App();
