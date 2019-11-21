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
  });
});

describe("Adder", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const busC = new Bus(8);

  const adder = new Adder();

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, false];
    adder.update(testByte1, testByte2, false);
    expect(adder.get()).toEqual(new Array(8).fill(false));
    expect(adder.getCarry()).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [true, false, false, false, false, false, false, false];
    const testByte2 = [false, true, true, true, true, true, true, true];
    adder.update(testByte1, testByte2, false);
    expect(adder.get()).toEqual(new Array(8).fill(true));
    expect(adder.getCarry()).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, false];
    adder.update(testByte1, testByte2, true);
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
    const testByte1 = new Array(8).fill(true);
    const testByte2 = new Array(8).fill(true);
    adder.update(testByte1, testByte2, false);
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
