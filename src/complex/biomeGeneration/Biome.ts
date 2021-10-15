import Color from "../../util/Color";
import {HeightLevels} from "./enums/HeightLevels";
import {HeatLevels} from "./enums/HeatLevels";
import {MoistureLevels} from "./enums/MoistureLevels";
import {GroundHardnessLevels} from "./enums/GroundHardnessLevels";
import {BiomeCategories} from "./enums/BiomeCategories";
import BiomeValueRangeSet from "../../interfaces/BiomeValueRangeSet";
import MapPointValues from "../../interfaces/MapPointValues";
import BiomeValueScoringConfig from "../../interfaces/BiomeValueScoringConfig";
import BiomeValueRange from "../../interfaces/BiomeValueRange";
import {ValueMapSet} from "./BiomeGenerator";
import Position from "../../util/Position";

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
        const {heatRange, groundHardnessRange, heightRange, moistureRange} = this.biomeValueRanges;
        const {
                  groundHardnessScoringRelevance,
                  heatScoreRelevance,
                  heightScoreRelevance,
                  moistureScoreRelevance
              } = this.scoringConfig;

        const heatScore = Biome.getValueScore(heat, heatRange) * heatScoreRelevance;
        const moistureScore = Biome.getValueScore(moisture, moistureRange) * moistureScoreRelevance;
        const groundHardnessScore = Biome.getValueScore(groundHardness, groundHardnessRange) * groundHardnessScoringRelevance;
        const heightScore = Biome.getValueScore(height, heightRange) * heightScoreRelevance;
        return heatScore + moistureScore + groundHardnessScore + heightScore;
    }

    private static getValueScore(value: number, valueRange: biomeValueRangeVariants): number {
        this.validateBiomeValueRange(valueRange);
        if (value < valueRange.optimum) return (1 / Math.abs(valueRange.min)) * value + 1;
        else return -(1 / Math.abs(valueRange.max)) * value + 1;
    }

    private static validateBiomeValueRange(range: biomeValueRangeVariants): boolean {
        if(range.min && range.max && range.optimum) return true;
        else throw new Error("Invalid biome value range");
    }

    public valuesAreInRange({groundHardness, heat, height, moisture}: MapPointValues): boolean {
        const {heatRange, moistureRange, groundHardnessRange, heightRange} = this.biomeValueRanges;

        return Biome.valueIsInRange(heat, heatRange)
            && Biome.valueIsInRange(moisture, moistureRange)
            && Biome.valueIsInRange(groundHardness, groundHardnessRange)
            && Biome.valueIsInRange(height, heightRange);
    }

    private static valueIsInRange(value: number, {max, min}: biomeValueRangeVariants): boolean {
        return value >= min || value <= max;
    }

    abstract getColorFromValues(values: ValueMapSet, pos: Position): Color
}

