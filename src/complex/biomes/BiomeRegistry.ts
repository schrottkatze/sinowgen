export default abstract class BiomeRegistry {
  private registry: { [key: string]: object } = {};
  private readonly _registryIdentifier: string;

  constructor(registryIdentifier: string) {
    this._registryIdentifier = registryIdentifier;
  }

  get registryIdentifier(): string {
    return this._registryIdentifier;
  }

  public register(biome: object, key: string) {
    this.registry[key] = biome;
  }

  public getRegistryObject(key: string): object {
    return this.registry[key];
  }
}