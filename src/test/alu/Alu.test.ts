import Alu from "../../alu/Alu";
import Bus from "../../components/Bus";

describe("Alu", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const outputBus = new Bus(8);
  const flagBus = new Bus(8);

  const alu = new Alu(busA, busB, outputBus, flagBus);
  it("should have correct output", () => {});
});
