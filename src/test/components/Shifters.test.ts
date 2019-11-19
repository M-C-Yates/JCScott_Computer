import leftShifter, { rightShifter } from "../../components/Shifters";
import Bus from "../../components/Bus";

describe("left shifter", () => {
  const bus = new Bus(8);
  const lShift = new leftShifter(bus, bus);
  const testByte = [true, false, false, false, false, false, false, true];
  it("it should give correct output with wrapping disabled", () => {
    bus.set(testByte);
    lShift.update(false);
    expect(bus.get()).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);
  });
  it("should give correct output with wrapping enabled", () => {
    bus.set(testByte);
    lShift.update(true);
    expect(bus.get()).toEqual([
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

// describe("right Shifter", () => {
//   const bus = new Bus(8);
//   const rShift = new rightShifter(bus, bus);
//   const testByte = [true, false, false, false, false, false, false, true];

//   it("should give the correct output with wrapping disabled", () => {
//     bus.set(testByte);
//     rShift.update(false);
//     expect(bus.get()).toEqual([
//       false,
//       true,
//       false,
//       false,
//       false,
//       false,
//       false,
//       false
//     ]);
//   });
//   it("should give the correct output with wrapping enabled", () => {
//     bus.set(testByte);
//     rShift.update(true);
//     expect(bus.get()).toEqual([
//       true,
//       true,
//       false,
//       false,
//       false,
//       false,
//       false,
//       false
//     ]);
//   });
// });
