import p5 from "p5";

let sketch = (p5: p5) => {
  p5.noise;
  p5.draw = () => {
    console.log("test");
  };
};

let instance = new p5(sketch);

console.log("hi");
