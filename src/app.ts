import SimpleBiomeGenerator from "./simple/SimpleBiomeGenerator";
import Renderer from "./Renderer";
import p5 from "p5";
import SimpleBiomeMaps from "./simple/SimpleBiomeMaps";
import HeightMapGenerator from "./complex/noiseMapGenerators/HeightMapGenerator";
import HeatMapGenerator from "./complex/noiseMapGenerators/HeatMapGenerator";
import MoistureMapGenerator from "./complex/noiseMapGenerators/MoistureMapGenerator";
import GroundHardnessMapGenerator from "./complex/noiseMapGenerators/GroundHardnessMapGenerator";

class App {
  public readonly height = 4096;
  public readonly width = 4096;

  public readonly seed = 1633946866988;
  public readonly scale = 0.05;

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
    console.log(`Seed: ${this.seed}`);
    console.time("Map generation and rendering");
    console.time("Worldgen");

    const biomeGen = new SimpleBiomeGenerator(SimpleBiomeMaps.gabrielBiomeMap);
    // const worldGen = new SimpleWorldGenerator(biomeGen, 100);

    const heightMapGenerator = new HeightMapGenerator({
      seed: this.seed,
      detail: 8,
      scale: this.scale,
      relevance: 0.2,
    }, {
      seed: this.seed + 1,
      detail: 4,
      scale: this.scale * 0.075,
      relevance: 0.8,
    }, this.width, this.height);

    const heatMapGenerator = new HeatMapGenerator({
      detail: 2,
      scale: this.scale * 0.5,
      seed: this.seed + 2,
    }, this.width, this.height, heightMapGenerator.map);

    const moistureMapGenerator = new MoistureMapGenerator({
      detail: 6,
      scale: this.scale * 1.25,
      seed: this.seed + 3,
    }, this.width, this.height, heatMapGenerator.map);

    const groundHardnessMapGenerator = new GroundHardnessMapGenerator(
        {
          detail: 4,
          scale: this.scale * 1.5,
          seed: this.seed + 4,
        },
        this.width,
        this.height,
        heatMapGenerator.map,
        moistureMapGenerator.map,
        heightMapGenerator.map,
    );

    console.timeEnd("Worldgen");

    const renderer = new Renderer(heightMapGenerator.getColorMap(biomeGen));
    /// const renderer = new Renderer(worldGen.getColorMap())
    renderer.render(p);

    console.timeEnd("Map generation and rendering");

    p.noLoop();
  }
}

export const app = new App();
