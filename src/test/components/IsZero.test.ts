import IsZero from "../../components/IsZero";
import Bus from "../../components/Bus";

describe("IsZero", () => {
  const busA = new Bus(8);
  const isZero = new IsZero(busA);
  const testByte1 = [false, false, false, false, false, false, false, false];
  const testByte2 = [false, false, false, false, false, false, false, true];

  it("should provide the correct output", () => {
    busA.data = testByte1;
    isZero.update();
    expect(isZero.get()).toEqual(true);
  });
  it("should provide the correct output", () => {
    busA.data = testByte2;
    isZero.update();
    expect(isZero.get()).toEqual(false);
  });
});
