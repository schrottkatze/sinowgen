import { Color } from "../Types";

export default class SimpleBiome {
  constructor(
    private minGenerationHeight: number,
    private biomeHeight: number,
    private lowColor: Color,
    private highColor: Color
  ) {}

  public getColorCodeForHeightPos(height: number): Color | void {
    const biomeMaxHeight = this.minGenerationHeight + this.biomeHeight;

    if (!(height >= this.minGenerationHeight && height <= biomeMaxHeight))
      return;

    const relativeHeight =
      (height - this.minGenerationHeight) / this.biomeHeight;

    const colDiffs: Color = this.highColor.map(
      (value, index) => value - this.lowColor[index]
    ) as Color;

    const r: Color = colDiffs.map((value, index) =>
      Math.floor(value * relativeHeight + this.lowColor[index])
    ) as Color;

    return r;
  }
}
