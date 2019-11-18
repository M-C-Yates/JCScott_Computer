import Byte from "../../circuit/Byte";

describe("Byte", () => {
  it("should have correct output", () => {
    const byte = new Byte();

    const byteIn = [true, false, false, true, false, true, true, false];
    const byteIn2 = [false, false, false, false, false, false, false, false];
    const byteIn3 = [true, false, false, true, false, true, true, false];

    byte.update(byteIn, true);
    byte.update(byteIn2, false);
    expect(byte.get()).toEqual(byteIn);
    byte.update(byteIn2, true);
    byte.update(byteIn3, false);
    expect(byte.get()).toEqual(byteIn2);
  });
});
