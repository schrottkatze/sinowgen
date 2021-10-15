import Biome from "./Biome";
import BasicBiome from "../biomes/BasicBiome";
import {GroundHardnessLevels} from "./enums/GroundHardnessLevels";
import {HeatLevels} from "./enums/HeatLevels";
import {HeightLevels} from "./enums/HeightLevels";
import {MoistureLevels} from "./enums/MoistureLevels";
import {BiomeCategories} from "./enums/BiomeCategories";
import Color from "../../util/Color";
import Registration from "../Registration";

export default class BiomeRegistry {
    private readonly _registryIdentifier: string;

    /**
     * @param registryIdentifier has to be in snake_case, identifies the registry in biome IDs
     */
    constructor(registryIdentifier: string) {
        this._registryIdentifier = registryIdentifier;
    }

    private _registry: { [key: string]: Biome } = {};

    get registry(): { [p: string]: Biome } {
        return this._registry;
    }

    get registryIdentifier(): string {
        return this._registryIdentifier;
    }

    /**
     * @param biome the biome you want to register
     * @param key the key you look up biomes with, has to be in snake_case, example of a complete biome ID: ocean_biomes:deep_ocean
     */
    public register(biome: Biome, key: string) {
        this._registry[key] = biome;
    }

    public getRegistryObject(key: string): Biome {
        if (this._registry[key]) return this._registry[key];
        else throw new Error(`RegistryObject "${key}" doesn't exist.`);
    }

    public static registerOceanBiomes() {
        Registration.OCEAN_BIOME_REGISTRY.register(new BasicBiome(
            {
                groundHardnessRange: {
                    min:     GroundHardnessLevels.VERY_SOFT,
                    max:     GroundHardnessLevels.VERY_HARD,
                    optimum: GroundHardnessLevels.MEDIUM,
                },
                heatRange:           {
                    min:     HeatLevels.FREEZING,
                    max:     HeatLevels.HOT,
                    optimum: HeatLevels.MEDIUM
                },
                heightRange:         {
                    min:     HeightLevels.EXTREMELY_DEEP,
                    max:     HeightLevels.SEA_LEVEL,
                    optimum: HeightLevels.SLIGHTLY_BELOW_SEA_LEVEL,
                },
                moistureRange:       {
                    min:     MoistureLevels.HYPER_ARID,
                    max:     MoistureLevels.HYPER_HUMID,
                    optimum: MoistureLevels.NEUTRAL,
                }
            }, BiomeCategories.OCEAN, {
                optimalConditions: new Color(0, 0, 128, 255),
                tooCold:           new Color(0, 0, 128, 255),
                tooDry:            new Color(0, 0, 128, 255),
                tooHot:            new Color(0, 0, 128, 255),
                tooMoist:          new Color(0, 0, 128, 255)
            }, {
                optimalConditions: new Color(0, 0, 255, 255),
                tooCold:           new Color(0, 0, 255, 255),
                tooDry:            new Color(0, 0, 255, 255),
                tooHot:            new Color(0, 0, 255, 255),
                tooMoist:          new Color(0, 0, 255, 255)
            }, {
                groundHardnessScoringRelevance: 0,
                heatScoreRelevance:             0,
                heightScoreRelevance:           1,
                moistureScoreRelevance:         0
            }
        ), "default_ocean");
    }

    public static registerLandBiomes() {
        Registration.LAND_BIOME_REGISTRY.register(new BasicBiome(
            {
                groundHardnessRange: {
                    min:     GroundHardnessLevels.VERY_SOFT,
                    max:     GroundHardnessLevels.VERY_HARD,
                    optimum: GroundHardnessLevels.MEDIUM,
                },
                heatRange:           {
                    min:     HeatLevels.FREEZING,
                    max:     HeatLevels.HOT,
                    optimum: HeatLevels.MEDIUM
                },
                heightRange:         {
                    min:     HeightLevels.SEA_LEVEL,
                    max:     HeightLevels.EXTREME_MOUNTAIN,
                    optimum: HeightLevels.SLIGHTLY_ABOVE_SEA_LEVEL,
                },
                moistureRange:       {
                    min:     MoistureLevels.HYPER_ARID,
                    max:     MoistureLevels.HYPER_HUMID,
                    optimum: MoistureLevels.NEUTRAL,
                }
            }, BiomeCategories.OCEAN, {
                optimalConditions: new Color(0, 128, 0, 255),
                tooCold:           new Color(0, 128, 0, 255),
                tooDry:            new Color(0, 128, 0, 255),
                tooHot:            new Color(0, 128, 0, 255),
                tooMoist:          new Color(0, 128, 0, 255)
            }, {
                optimalConditions: new Color(0, 255, 0, 255),
                tooCold:           new Color(0, 255, 0, 255),
                tooDry:            new Color(0, 255, 0, 255),
                tooHot:            new Color(0, 255, 0, 255),
                tooMoist:          new Color(0, 255, 0, 255)
            }, {
                groundHardnessScoringRelevance: 0,
                heatScoreRelevance:             0,
                heightScoreRelevance:           1,
                moistureScoreRelevance:         0
            }
        ), "default_plains");
    }
}