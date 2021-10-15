import Color from "../../util/Color";
import {HeightLevels} from "./enums/HeightLevels";
import {HeatLevels} from "./enums/HeatLevels";
import {MoistureLevels} from "./enums/MoistureLevels";
import {GroundHardnessLevels} from "./enums/GroundHardnessLevels";
import {BiomeCategories} from "./enums/BiomeCategories";
import {BiomeValueRangeSet} from "../../interfaces/BiomeValueRangeSet";
import {MapPointValues} from "../../interfaces/MapPointValues";
import {BiomeValueScoringConfig} from "../../interfaces/BiomeValueScoringConfig";
import {BiomeValueRange} from "../../interfaces/BiomeValueRange";

type biomeValueRangeVariants = BiomeValueRange<HeatLevels | MoistureLevels | GroundHardnessLevels | HeightLevels>;
export default abstract class Biome {
    protected biomeValueRanges: BiomeValueRangeSet;

    private category: BiomeCategories;
    private scoringConfig: BiomeValueScoringConfig;

    protected constructor(
        valueRanges: BiomeValueRangeSet,
        scoringConfig: BiomeValueScoringConfig,
        category: BiomeCategories,
    ) {
        this.biomeValueRanges = valueRanges;
        this.category = category;
        this.scoringConfig = scoringConfig;
    }

    public calculateMatchingScore({groundHardness, heat, height, moisture}: MapPointValues): number {
        const heatScore = Biome.getValueScore(heat, this.biomeValueRanges.heatRange) * this.scoringConfig.heatScoreRelevance;
        const moistureScore = Biome.getValueScore(moisture, this.biomeValueRanges.moistureRange) * this.scoringConfig.moistureScoreRelevance;
        const groundHardnessScore = Biome.getValueScore(groundHardness, this.biomeValueRanges.groundHardnessRange) * this.scoringConfig.groundHardnessScoringRelevance;
        const heightScore = Biome.getValueScore(height, this.biomeValueRanges.heightRange) * this.scoringConfig.heightScoreRelevance;
        return heatScore + moistureScore + groundHardnessScore + heightScore;
    }

    private static getValueScore(value: number, valueRange: biomeValueRangeVariants): number {
        if (value < valueRange.optimum) return (1 / Math.abs(valueRange.min)) * value + 1;
        else return -(1 / Math.abs(valueRange.max)) * value + 1;
    }

    public valuesAreInRange({groundHardness, heat, height, moisture}: MapPointValues) {
        const {heatRange, moistureRange, groundHardnessRange, heightRange} = this.biomeValueRanges;
        const valuesArentInRange = !(
            Biome.valueIsInRange(heat, heatRange)
            && Biome.valueIsInRange(moisture, moistureRange)
            && Biome.valueIsInRange(groundHardness, groundHardnessRange)
            && Biome.valueIsInRange(height, heightRange)
        );
        if (valuesArentInRange)
            return -1;
    }

    private static valueIsInRange(value: number, {max, min}: biomeValueRangeVariants): boolean {
        return value >= min || value <= max;
    }

    abstract getColorFromValues(): Color
}

