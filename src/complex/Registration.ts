import GeneratorRegistry from "./noiseMapGenerators/GeneratorRegistry";
import BiomeRegistry from "./biomeGeneration/BiomeRegistry";

export default class Registration {
  public static readonly NOISE_GENERATOR_REGISTRY = new GeneratorRegistry("generator_registry");

  public static OCEAN_BIOME_REGISTRY: BiomeRegistry = new BiomeRegistry("ocean_biomes");
  public static LAND_BIOME_REGISTRY: BiomeRegistry = new BiomeRegistry("land_biomes");

  public static register(): void {
    console.time("Registration");

    Registration.NOISE_GENERATOR_REGISTRY.registerGenerators()
    Registration.registerBiomes();

    console.timeEnd("Registration");
  }

  private static registerBiomes() {
  }
}