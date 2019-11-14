import Register from "../../components/Register";

describe("Register", () => {
  const register = new Register("f");
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
    register.update(inputs, true, true);
    expect(register.get()).toEqual(inputs);
  });
  it("should set byte but not enable it", () => {
    register.update(inputs, true, false);
    expect(register.get()).toEqual(new Array(8).fill(false));
    expect(register.readByte()).toEqual(inputs);
  });
  it("should not set byte", () => {
    register.update(inputs, false, false);
    expect(register.get()).toEqual(new Array(8).fill(false));
  });
});
