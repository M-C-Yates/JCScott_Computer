import leftShifter from "./components/Shifters";
import Bus from "./components/Bus";

const bus = new Bus(8);
const left = new leftShifter(bus, bus);

const testByte = [true, false, false, false, false, false, false, true];

// bus.set(testByte);
// left.update(false);
// console.log(bus.get());

bus.set(testByte);
left.update(true);
console.log(bus.get());
