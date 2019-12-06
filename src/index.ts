import Cpu from "./cpu/Cpu";
import binToString, { binToBool, boolToBinary } from "./utils/binUtils";

const cpu = new Cpu();

// cpu.cycle();
const testVal = binToString(0b00000001);

const testVal2 = binToString(0b11111101);

const testArr = [false, true, false, false, false, true, false, false];

const a = binToBool(testVal2);
// const a = boolToBinary(testArr);

console.log(a);
