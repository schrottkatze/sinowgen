import BiomeGenerator from "./biomes/BiomeGenerator";
import WorldGenerator from "./WorldGenerator";
import Renderer from "./Renderer";
import p5 from "p5";
import BiomeMaps from "./biomes/BiomeMaps";

class App {
  public readonly scale = 0.005;
  public readonly noiseFactor = 100;

  public readonly height = 1080;
  public readonly width = 1080;

  // public readonly seed = Math.floor(Math.random() * 100000 + 1);
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
    p.background(0, 0, 0);
    p.noStroke();
  }

  public draw(p: p5): void {
    const timeStart = Date.now();

    const biomeGen = new BiomeGenerator(BiomeMaps.gabrielBiomeMap);
    const worldGen = new WorldGenerator(biomeGen, 100);
    const renderer = new Renderer(worldGen.getColorMap());

    const timeEnd = Date.now();
    const processingTime = timeEnd - timeStart;

    renderer.render(p);

    console.log(`Rendering complete in ${processingTime / 1000}s!`);
    p.noLoop();
  }
}

export const app = new App();
