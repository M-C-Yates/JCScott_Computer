import Bus from "../../components/Bus";

describe("Bus", () => {
  const bus = new Bus(8);
  const data = [true, false, true, false, true, false, true, false];
  it("should have the correct width", () => {
    expect(bus.get().length).toBe(8);
  });
  it("should correctly update it's data", () => {
    bus.update(data);
    expect(bus.get()).toEqual(data);
  });
});
