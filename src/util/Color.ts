export type colorArr = [number, number, number, number];

export default class Color {
  constructor(
    private red: number,
    private green: number,
    private blue: number,
    private alpha: number
  ) {
    this.roundToInts();
    this.isValid();
  }

  public calculateDifference(other: Color): Color {
    return new Color(
      Math.abs(this.red - other.getRed()),
      Math.abs(this.green - other.getGreen()),
      Math.abs(this.blue - other.getBlue()),
      Math.abs(this.alpha - other.getAlpha())
    );
  }

  private isValid(): boolean {
    if (!this.isValidValue(this.red, 255))
      this.throwInvalidColorValueError("red");
    if (!this.isValidValue(this.green, 255))
      this.throwInvalidColorValueError("green");
    if (!this.isValidValue(this.blue, 255))
      this.throwInvalidColorValueError("blue");
    if (!this.isValidValue(this.alpha, 100))
      this.throwInvalidColorValueError("alpha");

    return true;
  }

  private roundToInts(): void {
    this.red = Math.round(this.red);
    this.green = Math.round(this.green);
    this.blue = Math.round(this.blue);
    this.alpha = Math.round(this.alpha);
  }

  private throwInvalidColorValueError(colorName: string): void {
    throw new Error(`Invalid color value for ${colorName}.`);
  }

  private isValidValue(value: number, max: number): boolean {
    return value <= max && value >= 0;
  }

  public getAsArray(): colorArr {
    return [this.red, this.green, this.blue, this.alpha];
  }

  public getRed(): number {
    return this.red;
  }

  public getGreen(): number {
    return this.green;
  }

  public getBlue(): number {
    return this.blue;
  }

  public getAlpha(): number {
    return this.alpha;
  }
}
