import Cpu from "./cpu/Cpu";
import boolToBinary from "./utils/boolToBinary";

const cpu = new Cpu();

// cpu.cycle();
const testVal = 0b00000001;
const testVal2 = 0b11111101;

const binaryToBool = (binary: number) => {
  return binary
    .toString(2)
    .split("")
    .map(x => x === "1");
};
const a = binaryToBool(testVal);

console.log(a);
