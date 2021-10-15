import Map from "../../util/Map";
import {app} from "../../App";
import Registration from "../Registration";
import {HeightLevels} from "./enums/HeightLevels";
import BiomeRegistry from "./BiomeRegistry";
import Position from "../../util/Position";
import MapPointValues from "../../interfaces/MapPointValues";

export default class BiomeGenerator {
    private readonly maps: ValueMapSet;
    private _biomeMap: Map<string> = new Map<string>(app.WIDTH, app.HEIGHT);

    constructor(maps: ValueMapSet) {
        this.maps = maps;
        this.makeBiomeMap();
        console.log(BiomeGenerator.scoresList);
    }

    private makeBiomeMap(): void {
        this._biomeMap = this._biomeMap.forEach<string>((value, position) => {
            const values = BiomeGenerator.getPointValues(position, this.maps);
            let scores: { [key: string]: number };
            if (values.height <= HeightLevels.SEA_LEVEL) scores = BiomeGenerator.getScores(values, Registration.OCEAN_BIOME_REGISTRY);
            else scores = BiomeGenerator.getScores(values, Registration.LAND_BIOME_REGISTRY);
            return BiomeGenerator.findMostSuitableBiome(scores);
        });
    }

    public static getPointValues(pos: Position, maps: ValueMapSet): MapPointValues {
        return {
            heat:           maps.heatMap.getPosition(pos),
            moisture:       maps.moistureMap.getPosition(pos),
            groundHardness: maps.groundHardnessMap.getPosition(pos),
            height:         maps.heightMap.getPosition(pos)
        };
    }

    private static getScores(values: MapPointValues, registry: BiomeRegistry): { [key: string]: number } {
        let scores: { [key: string]: number } = {};
        for (let registryKey in registry.registry) {
            const registryObject = registry.get(registryKey);
            const id = `${registry.registryIdentifier}:${registryKey}`;
            if (registryObject.valuesAreInRange(values))
                scores[id] = registryObject.calculateMatchingScore(values);
        }
        return scores;
    }

    private static scoresList: {}[] = [];

    private static findMostSuitableBiome(scores: { [key: string]: number }): string {
        let mostSuitableBiome: string = "";
        let maxValue: number = 0;
        this.scoresList.push(scores);
        for (let scoresKey in scores) {
            if (scores[scoresKey] > maxValue) {
                maxValue = scores[scoresKey];
                mostSuitableBiome = scoresKey;
            }
        }
        return mostSuitableBiome;
    }

    get biomeMap(): Map<string> {
        return this._biomeMap;
    }
}

export interface ValueMapSet {
    heatMap: Map<number>;
    moistureMap: Map<number>;
    groundHardnessMap: Map<number>;
    heightMap: Map<number>;
}