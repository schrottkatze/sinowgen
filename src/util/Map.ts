import Position from "./Position";

export default class Map<T> {
  private readonly _map: (T | null)[][];

  constructor(private width: number, private height: number) {
    this._map = [];
    for (let x = 0; x < this.width; ++x) {
      this._map[x] = [];
      for (let y = 0; y < this.height; ++y) {
        this._map[x][y] = null;
      }
    }
  }

  public setPosition(value: T, position: Position) {
    this._map[position.x][position.y] = value;
  }

  public getPosition(position: Position): T | null {
    return this._map[position.x][position.y];
  }

  public forEach<U>(cb: (value: T | null, position: Position) => U): Map<U> {
    let result = new Map<U>(this.width, this.height);

    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        const pos = new Position(x, y);
        result.setPosition(cb(this.getPosition(pos), pos), pos);
      }
    }

    return result;
  }
}