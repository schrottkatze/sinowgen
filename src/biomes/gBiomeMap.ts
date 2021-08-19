import addBiome from "../functions/addBiome";

export default function gBiomeMap(h: number): number[] {
  let r: number[] | false = false;

  // Ocean
  r = addBiome(
    h,
    { min: 0, height: 35 },
    { low: { r: 10, g: 28, b: 38 }, high: { r: 49, g: 87, b: 115 } }
  );
  if (!!r) return r;

  // Desert/beach
  r = addBiome(
    h,
    { min: 35, height: 10 },
    { low: { r: 129, g: 125, b: 120 }, high: { r: 164, g: 158, b: 140 } }
  );
  if (!!r) return r;

  // Forest
  r = addBiome(
    h,
    { min: 45, height: 20 },
    { low: { r: 50, g: 57, b: 18 }, high: { r: 91, g: 93, b: 46 } }
  );
  if (!!r) return r;

  // Mountain
  r = addBiome(
    h,
    { min: 65, height: 35 },
    { low: { r: 105, g: 105, b: 105 }, high: { r: 205, g: 200, b: 200 } }
  );
  if (!!r) return r;

  // console.log(h);
  return [255, 0, 0, 255];
}
