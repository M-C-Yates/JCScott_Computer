import Comparator, { bitComparer } from "./../../components/Comparator";
import Bus from "../../components/Bus";

describe("bitComparer", () => {
  const comparer = new bitComparer();
  it("should give correct output", () => {
    comparer.update(true, true, true, false);
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.get()).toBe(false);
    expect(comparer.getLarger()).toBe(false);

    comparer.update(false, false, true, false);
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.get()).toBe(false);
    expect(comparer.getLarger()).toBe(false);

    comparer.update(true, false, true, false);
    expect(comparer.getEqual()).toBe(false);
    expect(comparer.get()).toBe(true);
    expect(comparer.getLarger()).toBe(true);
    comparer.update(false, true, true, false);
    expect(comparer.getEqual()).toBe(false);
    expect(comparer.get()).toBe(true);
    expect(comparer.getLarger()).toBe(false);
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

    busA.set(byte1);
    busB.set(byte2);
    comparer.update();
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.getLarger()).toBe(false);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, false, false, false, false, true];
    const byte2 = [false, false, false, false, false, false, false, false];

    busA.set(byte1);
    busB.set(byte2);
    comparer.update();
    expect(comparer.getEqual()).toBe(false);
    expect(comparer.getLarger()).toBe(true);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, false, false, false, false, false];
    const byte2 = [false, false, false, false, false, false, false, true];

    busA.set(byte1);
    busB.set(byte2);
    comparer.update();
    expect(comparer.getEqual()).toBe(false);
    expect(comparer.getLarger()).toBe(false);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, true, true, false, false, true];
    const byte2 = [false, false, false, true, true, false, false, true];

    busA.set(byte1);
    busB.set(byte2);
    comparer.update();
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.getLarger()).toBe(false);
  });

  it("should give correct output", () => {
    const byte1 = [false, false, false, true, true, false, false, true]; // 25
    const byte2 = [false, false, false, true, true, false, false, true]; // 25

    busA.set(byte1);
    busB.set(byte2);
    comparer.update();
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.getLarger()).toBe(false);
  });
});
