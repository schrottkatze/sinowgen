import Color from "../../util/Color";

export default abstract class Biome {
  private optimalHeat: HeatLevels;
  private optimalMoisture: MoistureLevels;
  private optimalGroundHardness: GroundHardnessLevels;
  private heightArea: HeightLevels;

  abstract lowestPointColors: BiomeColorSet;
  abstract highestPointColors: BiomeColorSet;

  private category: BiomeCategories;

  protected constructor(
      optimalHeat: HeatLevels,
      optimalMoisture: MoistureLevels,
      optimalGroundHardness: GroundHardnessLevels,
      heightArea: HeightLevels,
      category: BiomeCategories,
  ) {
    this.optimalHeat = optimalHeat;
    this.optimalMoisture = optimalMoisture;
    this.optimalGroundHardness = optimalGroundHardness;
    this.heightArea = heightArea;
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