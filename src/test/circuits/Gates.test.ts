import Nand, { And, Not, Or, Xor } from "../../circuit/Gates";

describe("Nand Gate", () => {
  it("should give correct output", () => {
    const nand = new Nand();
    nand.update(false, false);
    expect(nand.output).toEqual(true);
    nand.update(false, true);
    expect(nand.output).toEqual(true);
    nand.update(true, false);
    expect(nand.output).toEqual(true);
    nand.update(true, true);
    expect(nand.output).toEqual(false);
  });
});

describe("Not Gate", () => {
  it("should give correct output", () => {
    const not = new Not();
    not.update(false);
    expect(not.output).toEqual(true);
    not.update(true);
    expect(not.output).toEqual(false);
  });
});
describe("And Gate", () => {
  it("should give correct output", () => {
    const and = new And();
    and.update(false, false);
    expect(and.output).toEqual(false);
    and.update(false, true);
    expect(and.output).toEqual(false);
    and.update(true, false);
    expect(and.output).toEqual(false);
    and.update(true, true);
    expect(and.output).toEqual(true);
  });
});

describe("Or Gate", () => {
  const or = new Or();
  it("should give correct output", () => {
    or.update(false, false);
    expect(or.output).toEqual(false);

    or.update(false, true);
    expect(or.output).toEqual(true);

    or.update(true, false);
    expect(or.output).toEqual(true);

    or.update(true, true);
    expect(or.output).toEqual(true);
  });
});

describe("Xor Gate", () => {
  const xor = new Xor();
  it("it should give correct output", () => {
    xor.update(false, false);
    expect(xor.output).toEqual(false);

    xor.update(false, true);
    expect(xor.output).toEqual(true);

    xor.update(true, false);
    expect(xor.output).toEqual(true);

    xor.update(true, true);
    expect(xor.output).toEqual(false);
  });
});
