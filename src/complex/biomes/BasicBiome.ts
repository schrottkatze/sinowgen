import Biome, { BiomeColorSet, BiomeValueRangeSet } from "../biomeGeneration/Biome";
import Color from "../../util/Color";

export default class BasicBiome extends Biome {
  private lowestPointColors: BiomeColorSet;
  public highestPointColors: BiomeColorSet;

  constructor(
      valueRanges: BiomeValueRangeSet,
      category: BiomeCategories,
      highestPointColors: BiomeColorSet,
      lowestPointColors: BiomeColorSet,
  ) {
    super(valueRanges, category);
    this.highestPointColors = highestPointColors;
    this.lowestPointColors = lowestPointColors;
  }

  public getColorFromValues(): Color {
    return new Color(0, 0, 0, 0);
  }
}