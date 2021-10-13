import Color from "../../util/Color";

export default abstract class Biome {
  abstract lowestPointColors: BiomeColorSet;
  abstract highestPointColors: BiomeColorSet;

  private heatRange: biomeValueRange<HeatLevels>;
  private moistureRange: biomeValueRange<MoistureLevels>;
  private groundHardnessRange: biomeValueRange<GroundHardnessLevels>;
  private heightRange: biomeValueRange<HeightLevels>;

  private category: BiomeCategories;

  protected constructor(
      heatRange: biomeValueRange<HeatLevels>,
      moistureRange: biomeValueRange<MoistureLevels>,
      groundHardnessRange: biomeValueRange<GroundHardnessLevels>,
      heightRange: biomeValueRange<HeightLevels>,
      category: BiomeCategories,
  ) {
    this.heatRange = heatRange;
    this.moistureRange = moistureRange;
    this.groundHardnessRange = groundHardnessRange;
    this.heightRange = heightRange;
    this.category = category;
  }

  abstract calculateMatchingScore(): number

  abstract getColorFromValues(): Color
}

export interface BiomeColorSet {
  optimalConditions: Color;
  tooCold: Color;
  tooHot: Color;
  tooDry: Color;
  tooMoist: Color;
}

export type biomeValueRange<T> = {
  min: T | number;
  max: T | number;
  optimum: T | number;
}
