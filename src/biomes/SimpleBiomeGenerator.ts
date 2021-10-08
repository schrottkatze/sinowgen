import SimpleBiome from "./SimpleBiome";
import Color from "../util/Color";

export default class SimpleBiomeGenerator {
    constructor(private readonly biomeList: SimpleBiome[]) {
    }

    public getBiome(height: number): Color {
        for (let i = 0; i < this.biomeList.length; ++i) {
            let biomeColorValue = this.biomeList[i].getColorForHeightPos(height);
            if (biomeColorValue) return biomeColorValue;
        }

        console.error(`No biome found for height ${height}.`);
        return new Color(20, 0, 0, 20);
    }
}
