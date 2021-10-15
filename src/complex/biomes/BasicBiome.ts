import Biome, {BiomeColorSet, BiomeValueRangeSet, ScoringConfig} from "../biomeGeneration/Biome";
import Color from "../../util/Color";
import {BiomeCategories} from "../biomeGeneration/enums/BiomeCategories";

export default class BasicBiome extends Biome {
    private lowestPointColors: BiomeColorSet;
    public highestPointColors: BiomeColorSet;

    constructor(
        valueRanges: BiomeValueRangeSet,
        category: BiomeCategories,
        highestPointColors: BiomeColorSet,
        lowestPointColors: BiomeColorSet,
        scoringConfig: ScoringConfig
    ) {
        super(valueRanges, scoringConfig, category);
        this.highestPointColors = highestPointColors;
        this.lowestPointColors  = lowestPointColors;
    }

    public getColorFromValues(): Color {
        return new Color(0, 0, 0, 0);
    }
}