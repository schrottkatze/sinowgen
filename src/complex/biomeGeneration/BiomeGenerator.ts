import Map from "../../util/Map";
import {app} from "../../App";
import Registration from "../Registration";
import {HeightLevels} from "./enums/HeightLevels";

export default class BiomeGenerator {
    private maps: ValueMapSet;
    private biomeMap: Map<string> = new Map<string>(app.WIDTH, app.HEIGHT);

    constructor(maps: ValueMapSet) {
        this.maps = maps;

        this.makeBiomeMap();
    }

    private makeBiomeMap(): void {
        this.biomeMap = this.biomeMap.forEach<string>((value, position) => {
            const heat           = this.maps.heatMap.getPosition(position),
                  moisture       = this.maps.moistureMap.getPosition(position),
                  groundHardness = this.maps.groundHardnessMap.getPosition(position),
                  height         = this.maps.heightMap.getPosition(position);

            if (typeof heat == "number" && typeof moisture == "number" && typeof groundHardness == "number" && typeof height == "number") {
                let scores: { [key: string]: number } = {};

                if (height <= HeightLevels.SEA_LEVEL) {
                    for (let registryKey in Registration.OCEAN_BIOME_REGISTRY.registry) {
                        scores[`ocean_biomes:${registryKey}`] = Registration.OCEAN_BIOME_REGISTRY
                            .getRegistryObject(registryKey)
                            .calculateMatchingScore({groundHardness, heat, height, moisture});
                    }
                } else {
                    for (let registryKey in Registration.LAND_BIOME_REGISTRY.registry) {
                        scores[`land_biomes:${registryKey}`] = Registration.LAND_BIOME_REGISTRY
                            .getRegistryObject(registryKey)
                            .calculateMatchingScore({groundHardness, heat, height, moisture});
                    }
                }

                let mostSuitableBiome: string = "";
                let maxValue: number          = 0;
                for (let scoresKey in scores) {
                    if (scores[scoresKey] > maxValue) {
                        maxValue          = scores[scoresKey];
                        mostSuitableBiome = scoresKey;
                    }
                }

                return mostSuitableBiome;
            } else throw new Error("Invalid value for heat, moisture, groundHardness or height.");
        });
    }
}

interface ValueMapSet {
    heatMap: Map<number>;
    moistureMap: Map<number>;
    groundHardnessMap: Map<number>;
    heightMap: Map<number>;
}