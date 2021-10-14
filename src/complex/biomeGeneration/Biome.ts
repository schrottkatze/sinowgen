import Color from "../../util/Color";

type biomeValueRangeVariants = biomeValueRange<HeatLevels | MoistureLevels | GroundHardnessLevels | HeightLevels>;
export default abstract class Biome {
    protected biomeValueRanges: BiomeValueRangeSet;

    private category: BiomeCategories;

    protected constructor(
        valueRanges: BiomeValueRangeSet,
        category: BiomeCategories,
    ) {
        this.biomeValueRanges = valueRanges;
        this.category = category;
    }

    private static getValueScore(value: number, valueRange: biomeValueRangeVariants): number {
        if (value < valueRange.optimum) return (1 / Math.abs(valueRange.min)) * value + 1;
        else return -(1 / Math.abs(valueRange.max)) * value + 1;
    }

    private static valueIsInRange(value: number, {max, min}: biomeValueRangeVariants): boolean {
        return value >= min || value <= max;
    }

    public calculateMatchingScore({heat, moisture, groundHardness, height}: PointValues): number | undefined {
        const {heatRange, moistureRange, groundHardnessRange, heightRange} = this.biomeValueRanges;

        // noinspection OverlyComplexBooleanExpressionJS
        const valuesArentInRange = !(
            Biome.valueIsInRange(heat, heatRange)
            && Biome.valueIsInRange(moisture, moistureRange)
            && Biome.valueIsInRange(groundHardness, groundHardnessRange)
            && Biome.valueIsInRange(height, heightRange)
        );
        if (valuesArentInRange)
            return 0;

        Biome.getValueScore(heat, heatRange);
        Biome.getValueScore(moisture, moistureRange);
        Biome.getValueScore(groundHardness, groundHardnessRange);
        Biome.getValueScore(height, heightRange);
    }

    abstract getColorFromValues(): Color
}

export interface BiomeColorSet {
    optimalConditions: Color;
    tooCold: Color;
    tooHot: Color;
    tooDry: Color;
    tooMoist: Color;
}

export interface BiomeValueRangeSet {
    heatRange: biomeValueRange<HeatLevels>,
    moistureRange: biomeValueRange<MoistureLevels>,
    groundHardnessRange: biomeValueRange<GroundHardnessLevels>,
    heightRange: biomeValueRange<HeightLevels>,
}

export type biomeValueRange<T> = {
    min: T | number;
    max: T | number;
    optimum: T | number;
}

interface PointValues {
    heat: number;
    moisture: number;
    groundHardness: number;
    height: number;
}
