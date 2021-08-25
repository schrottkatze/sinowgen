import { Map } from "./Types";

export default class Util {
  public static map2d<T, U>(
    array: Map<T>,
    cb: (val: T, indices: [number, number]) => U
  ): Map<U> {
    let r: Map<U> = [];

    for (let i = 0; i < array.length; ++i) {
      r[i] = [];
      for (let j = 0; j < array[i].length; ++j) {
        r[i][j] = cb(array[i][j], [i, j]);
      }
    }

    return r;
  }
}
