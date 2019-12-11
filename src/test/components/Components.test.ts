import { Ander, ORer, XORer } from "./../../components/Components";
import Notter from "../../components/Components";
import Bus from "../../components/Bus";

describe("Notter", () => {
  const bus = new Bus(8);
  const notter = new Notter(bus, bus);
  const testByte = new Array(8).fill(false);
  const testbyte2 = [true, false, true, false, true, false, true, false];
  it("should give correct output", () => {
    bus.data = testByte;
    notter.update();
    expect(bus.data).toEqual(new Array(8).fill(true));
  });
  it("should give the correct output2", () => {
    bus.data = testbyte2;
    notter.update();
    expect(bus.data).toEqual([
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
    busA.data = testByte1;
    busB.data = testByte2;
    ander.update();
    expect(busC.data).toEqual([
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
    busA.data = testByte1;
    busB.data = testByte2;
    orer.update();
    expect(busC.data).toEqual([
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
    busA.data = testByte1;
    busB.data = testByte2;
    xorer.update();
    expect(busC.data).toEqual([
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
