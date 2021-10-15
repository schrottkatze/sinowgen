import Map from "../../util/Map";
import {app} from "../../App";
import Registration from "../Registration";
import {HeightLevels} from "./enums/HeightLevels";
import BiomeRegistry from "./BiomeRegistry";
import Position from "../../util/Position";
import {MapPointValues} from "../../interfaces/MapPointValues";

export default class BiomeGenerator {
    private maps: ValueMapSet;
    private biomeMap: Map<string> = new Map<string>(app.WIDTH, app.HEIGHT);

    constructor(maps: ValueMapSet) {
        this.maps = maps;

        this.makeBiomeMap();
    }

    private makeBiomeMap(): void {
        this.biomeMap = this.biomeMap.forEach<string>((value, position) => {
            const values = this.getPointValues(position);
            let scores: { [key: string]: number } = {};
            if (values.height <= HeightLevels.SEA_LEVEL) BiomeGenerator.getScores(values, Registration.OCEAN_BIOME_REGISTRY);
            else BiomeGenerator.getScores(values, Registration.LAND_BIOME_REGISTRY);
            return BiomeGenerator.findMostSuitableBiome(scores);
        });
    }

    private getPointValues(pos: Position): MapPointValues {
        return {
            heat:           this.maps.heatMap.getPosition(pos),
            moisture:       this.maps.moistureMap.getPosition(pos),
            groundHardness: this.maps.groundHardnessMap.getPosition(pos),
            height:         this.maps.heightMap.getPosition(pos)
        };
    }

    private static getScores(values: MapPointValues, registry: BiomeRegistry): { [key: string]: number } {
        let scores: { [key: string]: number } = {};
        for (let registryKey in registry.registry) {
            const registryObject = registry.getRegistryObject(registryKey);
            const id = `${registry.registryIdentifier}:${registryKey}`;
            if (registryObject.valuesAreInRange(values))
                scores[id] = registryObject.calculateMatchingScore(values);
        }
        return scores;
    }

    private static findMostSuitableBiome(scores: { [key: string]: number }): string {
        let mostSuitableBiome: string = "";
        let maxValue: number = 0;
        for (let scoresKey in scores) {
            if (scores[scoresKey] > maxValue) {
                maxValue = scores[scoresKey];
                mostSuitableBiome = scoresKey;
            }
        }
        return mostSuitableBiome;
    }


}

interface ValueMapSet {
    heatMap: Map<number>;
    moistureMap: Map<number>;
    groundHardnessMap: Map<number>;
    heightMap: Map<number>;
}