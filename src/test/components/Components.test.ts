import Notter from "../../components/Components";
import Bus from "../../components/Bus";

describe("", () => {
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
