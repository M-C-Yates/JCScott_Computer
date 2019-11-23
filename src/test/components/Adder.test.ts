import Adder, { Add } from "./../../components/Adder";
import Bus from "../../components/Bus";
describe("Add", () => {
  const add = new Add();
  it("should give correct output", () => {
    add.update(true, true, false);
    expect(add.get()).toBe(false);
    expect(add.getCarryOut()).toBe(true);

    add.update(true, false, false);
    expect(add.get()).toBe(true);
    expect(add.getCarryOut()).toBe(false);

    add.update(false, false, true);
    expect(add.get()).toBe(true);
    expect(add.getCarryOut()).toBe(false);

    add.update(true, true, true);
    expect(add.get()).toBe(true);
    expect(add.getCarryOut()).toBe(true);

    add.update(true, false, true);
    expect(add.get()).toBe(false);
    expect(add.getCarryOut()).toBe(true);

    add.update(false, true, true);
    expect(add.get()).toBe(false);
    expect(add.getCarryOut()).toBe(true);
  });
});

describe("Adder", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const busC = new Bus(8);

  const adder = new Adder(busA, busB);

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, false];
    busA.set(testByte1);
    busB.set(testByte2);

    adder.update(false);
    expect(adder.get()).toEqual(new Array(8).fill(false));
    expect(adder.getCarry()).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [true, false, false, false, false, false, false, false];
    const testByte2 = [false, true, true, true, true, true, true, true];
    busA.set(testByte1);
    busB.set(testByte2);
    adder.update(false);
    expect(adder.get()).toEqual(new Array(8).fill(true));
    expect(adder.getCarry()).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, false];
    busA.set(testByte1);
    busB.set(testByte2);

    adder.update(true);
    expect(adder.get()).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]);
    expect(adder.getCarry()).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, true];
    busA.set(testByte1);
    busB.set(testByte2);

    adder.update(true);
    expect(adder.get()).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);
    expect(adder.getCarry()).toEqual(false);
  });
  it("should return the correct input", () => {
    const testByte1 = new Array(8).fill(true);
    const testByte2 = new Array(8).fill(true);
    busA.set(testByte1);
    busB.set(testByte2);

    adder.update(false);
    expect(adder.get()).toEqual([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false
    ]);
    expect(adder.getCarry()).toEqual(true);
  });
});
