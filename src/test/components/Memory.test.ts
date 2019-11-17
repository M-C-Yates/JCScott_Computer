import Bus from "../../components/Bus";
import Memory256B from "../../components/Memory";

describe("Memory", () => {
  const bus = new Bus(8);
  const addrBus = new Bus(8);
  const mem = new Memory256B(bus, bus, addrBus);
  const address = [false, false, false, false, true, true, true, true]; // [0][15]
  const testVal = [false, false, false, false, false, false, false, true];

  addrBus.set(address);
  bus.set(testVal);

  it("test write", () => {
    mem.update(true, true);

    expect(mem.readMem(0, 14)).toEqual(new Array(8).fill(false));
    expect(mem.readMem(0, 15)).toEqual(testVal);
  });

  it("does not update when set is false", () => {
    mem.update(false, true);

    expect(mem.readMem(0, 15)).toEqual(new Array(8).fill(false));
  });
});