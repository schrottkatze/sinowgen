import SimpleBiomeGenerator from "./biomes/SimpleBiomeGenerator";
import WorldGenerator from "./WorldGenerator";
import Renderer from "./Renderer";
import p5 from "p5";
import BiomeMaps from "./biomes/BiomeMaps";

class App {
    public readonly scale = 0.005;
    public readonly noiseFactor = 100;

    public readonly height = window.innerHeight;
    public readonly width = window.innerWidth;

    public readonly seed = 0;
    public readonly detail = 8;

    private instance: p5;

    constructor() {
        this.instance = new p5((p: p5) => {
            p.setup = () => this.setup(p);
            p.draw = () => this.draw(p);
        });
    }

    public setup(p: p5): void {
        p.createCanvas(this.width, this.height);
        p.background(255, 0, 0);
        p.noStroke();
    }

    public draw(p: p5): void {
        console.time("Map generation");

        const biomeGen = new SimpleBiomeGenerator(BiomeMaps.gabrielBiomeMap);
        const worldGen = new WorldGenerator(biomeGen, 100);
        const renderer = new Renderer(worldGen.getColorMap());

        renderer.render(p);

        console.timeEnd("Map generation");

        p.noLoop();
    }
}

export const app = new App();
