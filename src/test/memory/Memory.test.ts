import Bus from "../../components/Bus";
import Memory256B from "../../memory/Memory";

describe("Memory", () => {
  const bus = new Bus(8);
  const mem = new Memory256B(bus, bus);
  const address = [false, false, false, false, true, true, true, true]; // [0][15]
  const testVal = [false, false, false, false, false, false, false, true];
  const testVal2 = [false, false, false, false, false, false, true, true];

  const falseArr = new Array(8).fill(false);

  bus.data = address;

  it("test write", () => {
    mem.updateAddress();
    bus.data = testVal;

    // mem.update(true, true);
    mem.updateEnable(true);
    mem.updateSet(true);
    mem.update();
    expect(mem.readMem(0, 14)).toEqual(falseArr);
    expect(mem.readMem(0, 15)).toEqual(testVal);
    expect(bus.data).toEqual(testVal);

    bus.data = testVal2;
    mem.update(true, true);

    expect(mem.readMem(0, 14)).toEqual(falseArr);
    expect(mem.readMem(0, 15)).toEqual(testVal2);
    expect(bus.data).toEqual(testVal2);
    bus.data = falseArr;
    mem.update(true, true);
  });

  it("does not update when set is false", () => {
    mem.updateAddress();
    bus.data = testVal;
    mem.update(false, true);

    expect(mem.readMem(0, 15)).toEqual(falseArr);
    expect(bus.data).toEqual(falseArr);

    bus.data = testVal2;
    mem.update(false, true);

    expect(mem.readMem(0, 15)).toEqual(falseArr);
    expect(bus.data).toEqual(falseArr);
  });
});
