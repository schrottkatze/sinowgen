import SimpleBiome from "./SimpleBiome";

export default class BiomeMaps {
  public static gabrielBiomeMap: SimpleBiome[] = [
    new SimpleBiome(0, 35, [10, 28, 38, 255], [49, 87, 115, 255]), // ocean
    new SimpleBiome(35, 10, [129, 125, 120, 255], [164, 158, 140, 255]), // beach
    new SimpleBiome(45, 20, [50, 57, 18, 255], [91, 93, 46, 255]), // forest
    new SimpleBiome(65, 35, [105, 105, 105, 255], [205, 200, 200, 255]), // mountains
  ];

  public static robinBiomeMap: SimpleBiome[] = [
    new SimpleBiome(0, 35, [0, 0, 139, 255], [135, 206, 250, 255]), // ocean
    new SimpleBiome(35, 10, [189, 183, 107, 255], [238, 232, 170, 255]), // beach
    new SimpleBiome(45, 15, [34, 139, 34, 255], [144, 238, 144, 255]), // forest
    new SimpleBiome(60, 40, [105, 105, 105, 255], [255, 250, 250, 255]), // mountains
  ];
}
