import Adder, { Add } from "./../../components/Adder";
import Bus from "../../components/Bus";
describe("Add", () => {
  const add = new Add();
  it("should give correct output", () => {
    add.update(true, true, false);
    expect(add.sum).toBe(false);
    expect(add.carryOut).toBe(true);

    add.update(true, false, false);
    expect(add.sum).toBe(true);
    expect(add.carryOut).toBe(false);

    add.update(false, false, true);
    expect(add.sum).toBe(true);
    expect(add.carryOut).toBe(false);

    add.update(true, true, true);
    expect(add.sum).toBe(true);
    expect(add.carryOut).toBe(true);

    add.update(true, false, true);
    expect(add.sum).toBe(false);
    expect(add.carryOut).toBe(true);

    add.update(false, true, true);
    expect(add.sum).toBe(false);
    expect(add.carryOut).toBe(true);
  });
});

describe("Adder", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);

  const adder = new Adder(busA, busB);

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, false];
    busA.data = testByte1;
    busB.data = testByte2;

    adder.update(false);
    expect(adder.sum).toEqual(new Array(8).fill(false));
    expect(adder.carryOut).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [true, false, false, false, false, false, false, false];
    const testByte2 = [false, true, true, true, true, true, true, true];
    busA.data = testByte1;
    busB.data = testByte2;
    adder.update(false);
    expect(adder.sum).toEqual(new Array(8).fill(true));
    expect(adder.carryOut).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, false];
    busA.data = testByte1;
    busB.data = testByte2;

    adder.update(true);
    expect(adder.sum).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]);
    expect(adder.carryOut).toEqual(false);
  });

  it("should return the correct input", () => {
    const testByte1 = [false, false, false, false, false, false, false, false];
    const testByte2 = [false, false, false, false, false, false, false, true];
    busA.data = testByte1;
    busB.data = testByte2;

    adder.update(true);
    expect(adder.sum).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);
    expect(adder.carryOut).toEqual(false);
  });
  it("should return the correct input", () => {
    const testByte1 = new Array(8).fill(true);
    const testByte2 = new Array(8).fill(true);
    busA.data = testByte1;
    busB.data = testByte2;

    adder.update(false);
    expect(adder.sum).toEqual([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false
    ]);
    expect(adder.carryOut).toEqual(true);
  });
});
