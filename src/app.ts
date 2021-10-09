import SimpleBiomeGenerator from "./simple/SimpleBiomeGenerator";
import Renderer from "./Renderer";
import p5 from "p5";
import SimpleBiomeMaps from "./simple/SimpleBiomeMaps";
import HeightMapGenerator from "./complex/noiseMapGenerators/HeightMapGenerator";

class App {
  public readonly scale = 0.05;

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
    console.time("Map generation and rendering");
    console.time("Worldgen");

    const biomeGen = new SimpleBiomeGenerator(SimpleBiomeMaps.gabrielBiomeMap);
    // const worldGen = new SimpleWorldGenerator(biomeGen, 100);

    const wg = new HeightMapGenerator({
      seed: this.seed,
      detail: this.detail,
      scale: this.scale,
      relevance: 0.2,
    }, {
      seed: this.seed + 1,
      detail: 2,
      scale: this.scale * 0.1,
      relevance: 0.8,
    }, this.width, this.height);

    console.timeEnd("Worldgen");

    const renderer = new Renderer(wg.getColorMap(biomeGen));
    // const renderer = new Renderer(worldGen.getColorMap())
    renderer.render(p);

    console.timeEnd("Map generation and rendering");

    p.noLoop();
  }
}

export const app = new App();
