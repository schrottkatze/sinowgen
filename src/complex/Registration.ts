import GeneratorRegistry from "./noiseMapGenerators/GeneratorRegistry";
import BiomeRegistry from "./biomeGeneration/BiomeRegistry";
import Biome from "./biomeGeneration/Biome";

export default class Registration {
    public static readonly NOISE_GENERATOR_REGISTRY = new GeneratorRegistry("generator_registry");

    public static OCEAN_BIOME_REGISTRY: BiomeRegistry = new BiomeRegistry("ocean_biomes");
    public static LAND_BIOME_REGISTRY: BiomeRegistry = new BiomeRegistry("land_biomes");

    public static register(): void {
        console.time("Registration");

        Registration.NOISE_GENERATOR_REGISTRY.registerGenerators();

        BiomeRegistry.registerOceanBiomes();
        BiomeRegistry.registerLandBiomes();

        console.timeEnd("Registration");
    }

    public static getBiomeById(biomeId: string): Biome {
        const [registry, id] = biomeId.split(":");
        if (registry === "ocean_biomes") return Registration.OCEAN_BIOME_REGISTRY.get(id);
        if (registry === "land_biomes") return Registration.LAND_BIOME_REGISTRY.get(id);
        else throw new Error(`Registry '${registry}' not found.`);
    }
}