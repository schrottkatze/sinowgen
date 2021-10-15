import Color from "../util/Color";

export default class SimpleBiome {
    constructor(
        private minGenerationHeight: number,
        private biomeHeight: number,
        private lowColor: Color,
        private highColor: Color,
    ) {
    }

    public getColorForHeightPos(height: number): Color | void {
        const biomeMaxHeight = this.minGenerationHeight + this.biomeHeight;

        if (!(height >= this.minGenerationHeight && height <= biomeMaxHeight))
            return;

        const colorDifferences: Color = this.lowColor.calculateDifference(this.highColor);
        const relativeHeight = this.getRelativeHeight(height);
        return new Color(
            colorDifferences.getRed() * relativeHeight + this.lowColor.getRed(),
            colorDifferences.getGreen() * relativeHeight + this.lowColor.getGreen(),
            colorDifferences.getBlue() * relativeHeight + this.lowColor.getBlue(),
            colorDifferences.getAlpha() * relativeHeight + this.lowColor.getAlpha(),
        );
    }

    private getRelativeHeight(height: number): number {
        return Math.abs((height - this.minGenerationHeight) / this.biomeHeight);
    }
}
