import NoiseGeneratorSettings from "./NoiseGeneratorSettings";

export default interface WorldGenSettings {
  noiseSettings: {
    primaryHeightMap: NoiseGeneratorSettings;
    secondaryHeightMap: NoiseGeneratorSettings;
    groundHardness: NoiseGeneratorSettings;
    heatMap: NoiseGeneratorSettings;
    moisture: NoiseGeneratorSettings;
  };
}
