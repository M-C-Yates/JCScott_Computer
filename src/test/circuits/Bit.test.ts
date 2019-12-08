import Bit from "../../circuit/Bit";

describe("Bit testing", () => {
  it("truth 1", () => {
    const bit = new Bit();
    bit.update(false, true);
    expect(bit.output).toEqual(false);
    bit.update(false, false);
    expect(bit.output).toEqual(false);
    bit.update(true, true);
    expect(bit.output).toEqual(true);
    bit.update(false, false);
    expect(bit.output).toEqual(true);
  });
});
