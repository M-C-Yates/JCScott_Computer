import BusOne from "../../components/BusOne";
import Bus from "../../components/Bus";

describe("BusOne", () => {
  const inputBus = new Bus(8);
  const outputBus = new Bus(8);
  const busOne = new BusOne(inputBus, outputBus);
  const testArr1 = [false, false, true, false, true, false, true, true];
  const testOut = [false, false, false, false, false, false, false, true];

  it("should correctly set bus to one", () => {
    inputBus.set(testArr1);
    busOne.update(true);
    expect(outputBus.get()).toEqual(testOut);
  });
  it("should correctly keep input byte", () => {
    inputBus.set(testArr1);
    busOne.update(false);
    expect(outputBus.get()).toEqual(testArr1);
  });
});
