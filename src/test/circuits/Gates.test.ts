import Nand, { And, Not } from "../../circuit/Gates";

describe("Nand Gate", () => {
  it("should give correct output", () => {
    const nand = new Nand();
    nand.update(false, false);
    expect(nand.get()).toEqual(true);
    nand.update(false, true);
    expect(nand.get()).toEqual(true);
    nand.update(true, false);
    expect(nand.get()).toEqual(true);
    nand.update(true, true);
    expect(nand.get()).toEqual(false);
  });
});

describe("Not Gate", () => {
  it("should give correct output", () => {
    const not = new Not();
    not.update(false);
    expect(not.get()).toEqual(true);
    not.update(true);
    expect(not.get()).toEqual(false);
  });
});
describe("And Gate", () => {
  it("should give correct output", () => {
    const and = new And();
    and.update(false, false);
    expect(and.get()).toEqual(false);
    and.update(false, true);
    expect(and.get()).toEqual(false);
    and.update(true, false);
    expect(and.get()).toEqual(false);
    and.update(true, true);
    expect(and.get()).toEqual(true);
  });
});
