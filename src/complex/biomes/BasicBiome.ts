import Biome, { BiomeColorSet, biomeValueRange } from "../biomeGeneration/Biome";
import Color from "../../util/Color";

export default class BasicBiome extends Biome {

  constructor(
      heatRange: biomeValueRange<HeatLevels>,
      moistureRange: biomeValueRange<MoistureLevels>,
      groundHardnessRange: biomeValueRange<GroundHardnessLevels>,
      heightRange: biomeValueRange<HeightLevels>,
      category: BiomeCategories,
  ) {
    super(heatRange, moistureRange, groundHardnessRange, heightRange, category);

  }

  calculateMatchingScore(): number {
    return 0;
  }

  getColorFromValues(): Color {
    return new Color(0,0,0,0);
  }

  private highestPointColors: BiomeColorSet;
  private lowestPointColors: BiomeColorSet;

}