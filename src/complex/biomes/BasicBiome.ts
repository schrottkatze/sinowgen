import Biome from "../biomeGeneration/Biome";
import Color from "../../util/Color";
import {BiomeCategories} from "../biomeGeneration/enums/BiomeCategories";
import {BiomeColorSet} from "../../interfaces/BiomeColorSet";
import {BiomeValueRangeSet} from "../../interfaces/BiomeValueRangeSet";
import {BiomeValueScoringConfig} from "../../interfaces/BiomeValueScoringConfig";

export default class BasicBiome extends Biome {
    private lowestPointColors: BiomeColorSet;
    public highestPointColors: BiomeColorSet;

    constructor(
        valueRanges: BiomeValueRangeSet,
        category: BiomeCategories,
        highestPointColors: BiomeColorSet,
        lowestPointColors: BiomeColorSet,
        scoringConfig: BiomeValueScoringConfig
    ) {
        super(valueRanges, scoringConfig, category);
        this.highestPointColors = highestPointColors;
        this.lowestPointColors = lowestPointColors;
    }

    public getColorFromValues(): Color {
        return new Color(0, 0, 0, 0);
    }
}