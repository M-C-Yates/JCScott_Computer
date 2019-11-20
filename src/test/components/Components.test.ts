import { Ander, ORer, XORer } from "./../../components/Components";
import Notter from "../../components/Components";
import Bus from "../../components/Bus";

describe("Notter", () => {
  const bus = new Bus(8);
  const notter = new Notter(bus, bus);
  const testByte = new Array(8).fill(false);
  const testbyte2 = [true, false, true, false, true, false, true, false];
  it("should give correct output", () => {
    bus.set(testByte);
    notter.update();
    expect(bus.get()).toEqual(new Array(8).fill(true));
  });
  it("should give the correct output2", () => {
    bus.set(testbyte2);
    notter.update();
    expect(bus.get()).toEqual([
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true
    ]);
  });
});

describe("Ander", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const busC = new Bus(8);
  const ander = new Ander(busA, busB, busC);
  const testByte1 = [false, true, true, false, false, true, false, true];
  const testByte2 = [true, true, false, true, false, false, true, true];
  it("should give the correct output", () => {
    busA.set(testByte1);
    busB.set(testByte2);
    ander.update();
    expect(busC.get()).toEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true
    ]);
  });
});

describe("ORer", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const busC = new Bus(8);
  const orer = new ORer(busA, busB, busC);
  const testByte1 = [false, true, true, false, false, true, false, true];
  const testByte2 = [true, true, false, true, false, false, true, true];
  it("should give the correct output", () => {
    busA.set(testByte1);
    busB.set(testByte2);
    orer.update();
    expect(busC.get()).toEqual([
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true
    ]);
  });
});

describe("XORer", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const busC = new Bus(8);
  const xorer = new XORer(busA, busB, busC);
  const testByte1 = [false, true, true, false, false, true, false, true];
  const testByte2 = [true, true, false, true, false, false, true, true];
  it("should give the correct output", () => {
    busA.set(testByte1);
    busB.set(testByte2);
    xorer.update();
    expect(busC.get()).toEqual([
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      false
    ]);
  });
});
