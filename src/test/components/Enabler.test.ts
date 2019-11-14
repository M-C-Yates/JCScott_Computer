import Enabler from "../../components/Enabler";

describe("Enabler", () => {
  const enabler = new Enabler();
  const enabInput = [true, false, true, false, true, false, true, false];
  it("shouldn't change if enable is false", () => {
    enabler.update(enabInput, false);
    expect(enabler.get()).toEqual(new Array(8).fill(false));
  });
  it("should output correctly if enable is true", () => {
    enabler.update(enabInput, true);
    expect(enabler.get()).toEqual(enabInput);
  });
});
