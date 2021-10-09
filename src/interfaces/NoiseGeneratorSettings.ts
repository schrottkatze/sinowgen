export default interface NoiseGeneratorSettings {
  seed: number;
  scale: number;
  detail: number;
  upperBound?: number;
  relevance?: number;
}
