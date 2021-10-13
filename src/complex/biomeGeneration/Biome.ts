import Color from "../../util/Color";

export default abstract class Biome {
  protected biomeValueRanges: BiomeValueRangeSet;

  private category: BiomeCategories;

  protected constructor(
      valueRanges: BiomeValueRangeSet,
      category: BiomeCategories,
  ) {
    this.biomeValueRanges = valueRanges;
    this.category         = category;
  }

  private static valueIsInRange(value: number, {
    max,
    min,
  }: biomeValueRange<HeatLevels | MoistureLevels | GroundHardnessLevels | HeightLevels>): boolean {
    return value >= min || value <= max;
  }

  public calculateMatchingScore({ groundHardness, heat, height, moisture }: PointValues): number {
    const { heatRange, moistureRange, groundHardnessRange, heightRange } = this.biomeValueRanges;

    // noinspection OverlyComplexBooleanExpressionJS
    const valuesArentInRange = !(
        Biome.valueIsInRange(heat, heatRange)
        && Biome.valueIsInRange(moisture, moistureRange)
        && Biome.valueIsInRange(groundHardness, groundHardnessRange)
        && Biome.valueIsInRange(height, heightRange)
    );
    if (valuesArentInRange)
      return 0;

    const heatRangeMin = this.biomeValueRanges.heatRange.min;
    const heatRangeMax = this.biomeValueRanges.heatRange.max;
    const heatOptimum  = this.biomeValueRanges.heatRange.optimum;

    let heatScore: number;
    if (heat < heatOptimum) heatScore = (
                                            1 / Math.abs(heatRangeMin)
                                        ) * heat + 1;
    if (heat > heatOptimum) heatScore = -(
        1 / Math.abs(heatRangeMax)
    ) * heat + 1;
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
