import { Add } from "./../../components/Adder";
describe("Add", () => {
  const add = new Add();
  it("should give correct output", () => {
    add.update(true, true, false);
    expect(add.get()).toBe(false);
    expect(add.getCarryOut()).toBe(true);

    add.update(true, false, false);
    expect(add.get()).toBe(true);
    expect(add.getCarryOut()).toBe(false);

    add.update(false, false, true);
    expect(add.get()).toBe(true);
    expect(add.getCarryOut()).toBe(false);

    add.update(true, true, true);
    expect(add.get()).toBe(true);
    expect(add.getCarryOut()).toBe(true);

    add.update(true, false, true);
    expect(add.get()).toBe(false);
    expect(add.getCarryOut()).toBe(true);
  });
});

// describe("Adder", () => {

// })
