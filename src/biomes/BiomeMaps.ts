import SimpleBiome from "./SimpleBiome";
import Color from "../util/Color";

export default class BiomeMaps {
  public static gabrielBiomeMap: SimpleBiome[] = [
    new SimpleBiome(
      0,
      35,
      new Color(10, 28, 38, 255),
      new Color(49, 87, 115, 255)
    ), // ocean
    new SimpleBiome(
      35,
      10,
      new Color(129, 125, 120, 255),
      new Color(164, 158, 140, 255)
    ), // beach
    new SimpleBiome(
      45,
      20,
      new Color(50, 57, 18, 255),
      new Color(91, 93, 46, 255)
    ), // forest
    new SimpleBiome(
      65,
      35,
      new Color(105, 105, 105, 255),
      new Color(205, 200, 200, 255)
    ), // mountains
  ];

  public static robinBiomeMap: SimpleBiome[] = [
    new SimpleBiome(
      0,
      35,
      new Color(0, 0, 139, 255),
      new Color(135, 206, 250, 255)
    ), // ocean
    new SimpleBiome(
      35,
      10,
      new Color(189, 183, 107, 255),
      new Color(238, 232, 170, 255)
    ), // beach
    new SimpleBiome(
      45,
      15,
      new Color(34, 139, 34, 255),
      new Color(144, 238, 144, 255)
    ), // forest
    new SimpleBiome(
      60,
      40,
      new Color(105, 105, 105, 255),
      new Color(255, 250, 250, 255)
    ), // mountains
  ];
}
