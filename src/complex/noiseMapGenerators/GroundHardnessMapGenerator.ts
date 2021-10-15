import NoiseMapGenerator from "./NoiseMapGenerator";
import NoiseGeneratorSettings from "../../interfaces/NoiseGeneratorSettings";
import Map from "../../util/Map";

export default class GroundHardnessMapGenerator extends NoiseMapGenerator {
    private heatMap: Map<number>;
    private moistureMap: Map<number>;
    private heightMap: Map<number>;

    constructor(
        settings: NoiseGeneratorSettings,
        width: number,
        height: number,
        heatMap: Map<number>,
        moistureMap: Map<number>,
        heightMap: Map<number>,
    ) {
        super(settings, width, height);
        this.heatMap     = heatMap;
        this.moistureMap = moistureMap;
        this.heightMap   = heightMap;

        this.map = this.generateMap();
    }

    protected generateMap(): Map<number> {
        return this.map.forEach((value, position) => {
            // TODO: make the algorithm be dependent on the other maps
            return (this.noiseGenerator.makeNoise(position.getScaled(this.settings.scale)) + 1) / 2 * 255;
        });
    }
}