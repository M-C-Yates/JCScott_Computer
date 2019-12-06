import Stepper from "../../components/Stepper";

describe("Stepper", () => {
  const stepper = new Stepper();

  const testStepper = (cycles: number, expectedOutput: number) => {
    for (let i = 0; i < cycles; i++) {
      stepper.update(true);
      stepper.update(false);
    }
    let output = 0;
    const stepperOut = stepper.get();
    const isTrue = (item: boolean) => {
      return item === true;
    };
    output = stepperOut.findIndex(isTrue);
    expect(output).toEqual(expectedOutput);
    stepper.Reset();
  };
  it("should output correctly at each step", () => {
    testStepper(1, 0);
    testStepper(2, 1);
    testStepper(3, 2);
    testStepper(4, 3);
    testStepper(5, 4);
    testStepper(6, 5);
  });
});
