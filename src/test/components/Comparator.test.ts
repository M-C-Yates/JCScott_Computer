import Comparator, { bitComparer } from "./../../components/Comparator";
import Bus from "../../components/Bus";

describe("bitComparer", () => {
  const comparer = new bitComparer();
  it("should give correct output", () => {
    comparer.update(true, true, true, false);
    expect(comparer.equalOut).toBe(true);
    expect(comparer.output).toBe(false);
    expect(comparer.isLargerOut).toBe(false);

    comparer.update(false, false, true, false);
    expect(comparer.equalOut).toBe(true);
    expect(comparer.output).toBe(false);
    expect(comparer.isLargerOut).toBe(false);

    comparer.update(true, false, true, false);
    expect(comparer.equalOut).toBe(false);
    expect(comparer.output).toBe(true);
    expect(comparer.isLargerOut).toBe(true);
    comparer.update(false, true, true, false);
    expect(comparer.equalOut).toBe(false);
    expect(comparer.output).toBe(true);
    expect(comparer.isLargerOut).toBe(false);
  });
});

describe("Comparator", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const busC = new Bus(8);

  const comparer = new Comparator(busA, busB, busC);

  it("should give correct output", () => {
    const byte1 = [false, false, false, false, false, false, false, false];
    const byte2 = [false, false, false, false, false, false, false, false];

    busA.data = byte1;
    busB.data = byte2;
    comparer.update();
    expect(comparer.equalOut).toBe(true);
    expect(comparer.isLargerOut).toBe(false);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, false, false, false, false, true];
    const byte2 = [false, false, false, false, false, false, false, false];

    busA.data = byte1;
    busB.data = byte2;
    comparer.update();
    expect(comparer.equalOut).toBe(false);
    expect(comparer.isLargerOut).toBe(true);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, false, false, false, false, false];
    const byte2 = [false, false, false, false, false, false, false, true];

    busA.data = byte1;
    busB.data = byte2;
    comparer.update();
    expect(comparer.equalOut).toBe(false);
    expect(comparer.isLargerOut).toBe(false);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, true, true, false, false, true];
    const byte2 = [false, false, false, true, true, false, false, true];

    busA.data = byte1;
    busB.data = byte2;
    comparer.update();
    expect(comparer.equalOut).toBe(true);
    expect(comparer.isLargerOut).toBe(false);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, true, true, false, false, true]; // 25
    const byte2 = [false, false, false, true, true, false, false, true]; // 25

    busA.data = byte1;
    busB.data = byte2;
    comparer.update();
    expect(comparer.equalOut).toBe(true);
    expect(comparer.isLargerOut).toBe(false);
  });
});
