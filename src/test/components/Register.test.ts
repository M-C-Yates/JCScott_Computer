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
    bus.data = inputs;
    register.set();
    register.enable();
    register.update();
    expect(register.output).toEqual(inputs);
  });
  it("should set byte but not enable it", () => {
    bus.data = inputs;
    register.set();
    register.disable();
    register.update();
    expect(register.output).toEqual(new Array(8).fill(false));
    expect(register.readByte()).toEqual(inputs);
  });
  it("should not set byte", () => {
    bus.data = inputs;
    register.unSet();
    register.disable();
    register.update();
    expect(register.output).toEqual(new Array(8).fill(false));
  });
});
