import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";
import FractalNoise from "../../util/FractalNoise";
import Map from "../../util/Map";

export default abstract class NoiseMapGenerator {
  private readonly _settings: NoiseGeneratorSettings;

  protected constructor(settings: NoiseGeneratorSettings, width: number, height: number) {
    this._settings = settings;
    this._noiseGenerator = new FractalNoise(settings.seed, settings.detail);
    this._map = new Map<number>(width, height);
  }

  private _noiseGenerator: FractalNoise;

  get noiseGenerator(): FractalNoise {
    return this._noiseGenerator;
  }

  private _map: Map<number>;

  get map(): Map<number> {
    return this._map;
  }

  set map(value: Map<number>) {
    this._map = value;
  }

  get settings(): NoiseGeneratorSettings {
    return this._settings;
  }

  protected abstract generateMap(): Map<number>
}
