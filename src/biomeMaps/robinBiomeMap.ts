import addBiome from "../functions/addBiome";

export default function robinBiomeMap(h: number): number[] {
  let r: number[] | false = false;
  // Ocean
  r = addBiome(
    h,
    { min: 0, height: 35 },
    { low: { r: 0, g: 0, b: 139 }, high: { r: 135, g: 206, b: 250 } }
  );
  if (!!r) return r;

  // Desert/beach
  r = addBiome(
    h,
    { min: 35, height: 10 },
    { low: { r: 189, g: 183, b: 107 }, high: { r: 238, g: 232, b: 170 } }
  );
  if (!!r) return r;

  // Forest
  r = addBiome(
    h,
    { min: 45, height: 15 },
    { low: { r: 34, g: 139, b: 34 }, high: { r: 144, g: 238, b: 144 } }
  );
  if (!!r) return r;

  // Mountain
  r = addBiome(
    h,
    { min: 60, height: 40 },
    { low: { r: 105, g: 105, b: 105 }, high: { r: 255, g: 250, b: 250 } }
  );
  if (!!r) return r;

  // console.log(h);
  return [255, 0, 0, 255];
}
