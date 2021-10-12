import Biome from "./Biome";

export default class BiomeRegistry {
  private registry: { [key: string]: Biome } = {};
  private readonly _registryIdentifier: string;

  /**
   * @param registryIdentifier has to be in snake_case, identifies the registry in biome IDs
   */
  constructor(registryIdentifier: string) {
    this._registryIdentifier = registryIdentifier;
  }

  get registryIdentifier(): string {
    return this._registryIdentifier;
  }

  /**
   * @param biome the biome you want to register
   * @param key the key you look up biomes with, has to be in snake_case, example of a complete biome ID: ocean_biomes:deep_ocean
   */
  public register(biome: Biome, key: string) {
    this.registry[key] = biome;
  }

  public getRegistryObject(key: string): object {
    return this.registry[key];
  }
}