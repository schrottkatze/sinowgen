import BiomeGenerator from "./BiomeGenerator";
import SimpleBiome from "./SimpleBiome";

export const biomeMaps = {
  gBiomeMap: new BiomeGenerator([
    new SimpleBiome(0, 35, [10, 28, 38, 255], [49, 87, 115, 255]),
    new SimpleBiome(35, 10, [129, 125, 120, 255], [164, 158, 140, 255]),
    new SimpleBiome(45, 20, [50, 57, 18, 255], [91, 93, 46, 255]),
    new SimpleBiome(65, 35, [105, 105, 105, 255], [205, 200, 200, 255]),
  ]),
  robinBiomeMap: new BiomeGenerator([
    new SimpleBiome(0, 35, [0, 0, 139, 255], [135, 206, 250, 255]),
    new SimpleBiome(35, 10, [189, 183, 107, 255], [238, 232, 170, 255]),
    new SimpleBiome(45, 15, [34, 139, 34, 255], [144, 238, 144, 255]),
    new SimpleBiome(60, 40, [105, 105, 105, 255], [255, 250, 250, 255]),
  ]),
};
