export default class Position {
  constructor(x: number, y: number) {
    this._y = y;
    this._x = x;
  }

  private _x: number;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  private _y: number;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  public getScaled(scale: number): Position {
    return new Position(this.x * scale, this.y * scale);
  }

  public toString() {
    return `x: ${this._x}, y: ${this._y}`;
  }
}