import Alu from "../../alu/Alu";
import Bus from "../../components/Bus";

/*
CODE | Instruction | Description
000 | ADD | Add
001 | SHR | shift right
010 | SHL | shift left
100 | NOT | not
101 | OR | or
110 | XOR | exclusive or
111 | CMP | Compare
*/

describe("Alu", () => {
  const busA = new Bus(8);
  const busB = new Bus(8);
  const outputBus = new Bus(8);
  const flagBus = new Bus(8);
  const alu = new Alu(busA, busB, outputBus, flagBus);

  const falseArr = [false, false, false, false, false, false, false, false];
  const trueArr = [true, true, true, true, true, true, true, true];

  const testOp = (
    op: boolean[],
    inputA: boolean[],
    inputB: boolean[],
    carryIn: boolean,
    output: boolean[],
    expectedEqual: boolean,
    expectedIsLarger: boolean,
    expectedCarry: boolean,
    expectedZero: boolean
  ) => {
    busA.set([...inputA]);
    busB.set([...inputB]);
    alu.setCarryIn(carryIn);
    alu.setOp(op);
    alu.update();

    expect(outputBus.get()).toEqual(output);
    expect(alu.getCarry()).toEqual(flagBus.get()[0]);
    expect(alu.getEqual()).toEqual(flagBus.get()[3]);
    expect(alu.getLarger()).toEqual(flagBus.get()[1]);
    expect(alu.getZero()).toEqual(flagBus.get()[3]);
  };
  it("Alu Add should have correct output", () => {
    const ADD = [false, false, false];

    testOp(ADD, falseArr, falseArr, false, falseArr, true, false, false, true);
    testOp(
      ADD,
      falseArr,
      [false, false, false, false, false, false, false, true],
      false,
      [false, false, false, false, false, false, false, true],
      false,
      false,
      false,
      false
    );
    testOp(
      ADD,
      [false, false, false, false, false, false, false, true],
      [false, false, false, false, false, false, true, false],
      false,
      [false, false, false, false, false, false, true, true],
      false,
      false,
      false,
      false
    );
    testOp(
      ADD,
      [false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, false, true],
      false,
      [false, false, false, false, false, false, true, true],
      false,
      true,
      false,
      false
    );

    testOp(
      ADD,
      [false, false, false, false, false, false, false, true],
      [true, true, true, true, true, true, true, false],
      false,
      [true, true, true, true, true, true, true, true],
      false,
      false,
      false,
      false
    );

    testOp(
      ADD,
      [true, true, true, true, true, true, true, false],
      [false, false, false, false, false, false, false, true],
      false,
      [true, true, true, true, true, true, true, true],
      false,
      true,
      true,
      false
    );

    testOp(
      ADD,
      falseArr,
      falseArr,
      true,
      [false, false, false, false, false, false, false, true],
      true,
      false,
      false,
      false
    );
  });

  it("Alu right shifter", () => {
    // const SHR = [true, false, false];
    const SHR = [false, false, true];
    testOp(SHR, falseArr, falseArr, false, falseArr, true, false, false, true);
    testOp(
      SHR,
      [false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, true, false],
      false,
      [false, false, false, false, false, false, false, true],
      true,
      false,
      false,
      false
    );
    // should have correct carry out
    testOp(
      SHR,
      [true, false, true, false, true, true, false, false],
      [false, false, false, false, false, false, false, true],
      false,
      [false, true, false, true, false, true, true, false],
      false,
      true,
      true,
      false
    );

    // carry out
    testOp(
      SHR,
      [true, true, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, true],
      true,
      [true, true, true, false, false, false, false, false],
      false,
      true,
      false,
      false
    );
  });

  it("alu left shifter", () => {
    const SHL = [false, true, false];
    testOp(SHL, falseArr, falseArr, false, falseArr, true, false, false, true);
    testOp(
      SHL,
      [false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, true, false],
      false,
      [false, false, false, false, false, true, false, false],
      true,
      false,
      false,
      false
    );

    testOp(
      SHL,
      [true, false, true, false, false, false, true, false],
      [false, false, false, false, false, false, true, false],
      false,
      [false, true, false, false, false, true, false, false],
      false,
      true,
      true,
      false
    );

    testOp(
      SHL,
      [false, true, false, false, true, false, true, false],
      [false, false, false, false, false, false, false, true],
      true,
      [true, false, false, true, false, true, false, true],
      false,
      true,
      false,
      false
    );
  });

  it("alu notter tests", () => {
    const NOT = [false, true, true];
    testOp(NOT, falseArr, falseArr, false, trueArr, true, false, false, true);
    testOp(
      NOT,
      [false, false, false, false, false, false, false, true],
      [false, false, false, false, false, false, false, false],
      false,
      [true, true, true, true, true, true, true, false],
      false,
      true,
      false,
      false
    );

    testOp(
      NOT,
      [false, true, false, true, false, true, false, true],
      [false, false, false, false, false, false, false, false],
      false,
      [true, false, true, false, true, false, true, false],
      false,
      true,
      false,
      false
    );

    testOp(
      NOT,
      [true, true, true, true, true, true, true, true],
      [false, false, false, false, false, false, false, false],
      false,
      [false, false, false, false, false, false, false, false],
      false,
      true,
      false,
      true
    );
  });

  it("alu ander tests", () => {
    const AND = [true, false, false];
    testOp(AND, falseArr, falseArr, false, falseArr, true, false, false, true);
    testOp(
      AND,
      [false, false, false, false, false, false, false, true],
      [false, false, false, false, false, false, false, false],
      false,
      [false, false, false, false, false, false, false, false],
      false,
      true,
      false,
      false
    );
    testOp(
      AND,
      [false, false, false, false, false, false, false, true],
      [false, false, false, false, false, false, false, true],
      false,
      [false, false, false, false, false, false, false, true],
      true,
      true,
      false,
      false
    );

    testOp(
      AND,
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      false,
      [true, true, true, true, true, true, true, true],
      true,
      true,
      false,
      false
    );
  });

  it("alu ORer tests", () => {
    const OR = [true, false, true];
    testOp(OR, falseArr, falseArr, false, falseArr, true, false, false, true);
  });

  it("alu XORer tests", () => {
    const XOR = [true, true, false];
    testOp(XOR, falseArr, falseArr, false, falseArr, true, false, false, true);
  });

  it("alu CMP tests", () => {
    const CMP = [true, true, true];
    testOp(CMP, falseArr, falseArr, false, falseArr, true, false, false, true);
  });
});
