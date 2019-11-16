import Register from "../../components/Register";
import Bus from "../../components/Bus";

describe("Register", () => {
  const bus = new Bus(8);
  const register = new Register(bus, bus);
  const inputs: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true
  ];
  it("should correctly set and enable byte", () => {
    bus.update(inputs);
    register.update(true, true);
    expect(register.get()).toEqual(inputs);
  });
  it("should set byte but not enable it", () => {
    bus.update(inputs);
    register.update(true, false);
    expect(register.get()).toEqual(new Array(8).fill(false));
    expect(register.readByte()).toEqual(inputs);
  });
  it("should not set byte", () => {
    bus.update(inputs);
    register.update(false, false);
    expect(register.get()).toEqual(new Array(8).fill(false));
  });
});
