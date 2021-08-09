import p5, { Color } from "p5";

let instance = new p5((p: p5) => {
  let height = window.innerHeight;
  let width = window.innerWidth;

  p.setup = () => {
    p.createCanvas(width, height);
    p.background(20, 0, 0);
    p.noStroke();
  };

  let iter = 0;

  let size = 1;

  p.draw = () => {
    let s = 100;
    for (let x = 0; x < width / size; ++x) {
      for (let y = 0; y < height / size; ++y) {
        let heightPos = Math.floor(p.noise(x / s, y / s) * 100);
        if (heightPos > 15) p.fill(10, 15, 150);
        if (heightPos > 35) p.fill(20, 30, 200);
        if (heightPos > 45) p.fill(240, 220, 20);
        if (heightPos > 55) p.fill(25, 180, 35);
        p.rect(x * size, y * size, size, size);
      }
    }
    p.noLoop();
  };
});
