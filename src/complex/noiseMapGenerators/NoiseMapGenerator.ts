import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";
import FractalNoise from "../../util/FractalNoise";
import Map from "../../util/Map";

export default abstract class NoiseMapGenerator {
  private readonly _settings: NoiseGeneratorSettings;
  private _noiseGenerator: FractalNoise;
  private _map: Map<number>;

  protected constructor(settings: NoiseGeneratorSettings, width: number, height: number) {
    this._settings = settings;
    this._noiseGenerator = new FractalNoise(settings.seed, settings.detail);
    this._map = new Map<number>(width, height);
  }

  get settings(): NoiseGeneratorSettings {
    return this._settings;
  }

  get noiseGenerator(): FractalNoise {
    return this._noiseGenerator;
  }

  set noiseGenerator(value: FractalNoise) {
    this._noiseGenerator = value;
  }

  get map(): Map<number> {
    return this._map;
  }

  set map(value: Map<number>) {
    this._map = value;
  }

  protected abstract generateMap(): Map<number>
}
