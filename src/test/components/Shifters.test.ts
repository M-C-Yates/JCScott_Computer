import leftShifter, { rightShifter } from "../../components/Shifters";
import Bus from "../../components/Bus";

describe("left shifter", () => {
  const bus = new Bus(8);
  const testByte = [true, false, false, false, false, false, false, true];
  const lShift = new leftShifter(bus, bus);
  it("it should give correct output with wrapping disabled", () => {
    bus.data = testByte;
    lShift.update(false);
    expect(bus.data).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);
    bus.data = new Array(8).fill(false);
  });
  it("should give correct output with wrapping enabled", () => {
    bus.data = testByte;

    lShift.update(true);
    expect(bus.data).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true
    ]);
  });
});

describe("right Shifter", () => {
  const bus = new Bus(8);
  const rShift = new rightShifter(bus, bus);
  const testByte = [true, false, false, false, false, false, false, true];

  it("should give the correct output with wrapping disabled", () => {
    bus.data = testByte;
    rShift.update(false);
    expect(bus.data).toEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  });
  it("should give the correct output with wrapping enabled", () => {
    bus.data = testByte;
    rShift.update(true);
    expect(bus.data).toEqual([
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  });
});
