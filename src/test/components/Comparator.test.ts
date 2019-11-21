import Comparator, { bitComparer } from "./../../components/Comparator";

describe("bitComparer", () => {
  const comparer = new bitComparer();
  it("should give correct output", () => {
    comparer.update(true, true, true, false);
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.get()).toBe(false);
    expect(comparer.getLarger()).toBe(false);

    comparer.update(false, false, true, false);
    expect(comparer.getEqual()).toBe(true);
    expect(comparer.get()).toBe(false);
    expect(comparer.getLarger()).toBe(false);

    comparer.update(true, false, true, false);
    expect(comparer.getEqual()).toBe(false);
    expect(comparer.get()).toBe(true);
    expect(comparer.getLarger()).toBe(true);
    comparer.update(false, true, true, false);
    expect(comparer.getEqual()).toBe(false);
    expect(comparer.get()).toBe(true);
    expect(comparer.getLarger()).toBe(false);
  });
});

// describe("Comparator", () => {
//   const comparer = new Comparator();
//   it("should give correct output", () => {});
// });
