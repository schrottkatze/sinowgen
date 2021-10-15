import Map from "../util/Map";
import {ValueMapSet} from "./biomeGeneration/BiomeGenerator";
import Color from "../util/Color";
import {app} from "../App";
import Registration from "./Registration";

export default class WorldGenerator {
    private biomeMap: Map<string>;
    private valueMaps: ValueMapSet;
    private colorMap: Map<Color>;

    constructor(biomeMap: Map<string>, valueMaps: ValueMapSet) {
        this.biomeMap = biomeMap;
        this.valueMaps = valueMaps;
        this.colorMap = new Map(app.WIDTH, app.HEIGHT);
    }

    public makeColorMap(): Map<Color> {
        this.colorMap = this.biomeMap.forEach<Color>((value, pos) => {
            if (value) {
                return Registration.getBiomeById(value).getColorFromValues(this.valueMaps, pos);
            } else throw new Error(`No value at position x: ${pos.x}, y: ${pos.y}`);
        });
        return this.colorMap;
    }
}