import { Decoder3x8 } from "./../components/Decoders";
import Adder from "../components/Adder";
import Bus from "../components/Bus";
import leftShifter, { rightShifter } from "./../components/Shifters";
import Notter, { ORer, Ander } from "./../components/Components";
import Comparator from "../components/Comparator";
import IsZero from "../components/IsZero";
import { And } from "../circuit/Gates";
import Enabler from "../components/Enabler";

const ADD = 0;
const XOR = 1;
const OR = 2;
const AND = 3;
const NOT = 4;
const SHL = 5;
const SHR = 6;

class Alu {
  private enablerBus: Bus = new Bus(8);
  private comparator = new Comparator(
    this.inputA,
    this.inputB,
    this.enablerBus
  );
  private orer = new ORer(this.inputA, this.inputB, this.enablerBus);
  private ander = new Ander(this.inputA, this.inputB, this.enablerBus);
  private notter = new Notter(this.inputA, this.enablerBus);
  private leftShift = new leftShifter(this.inputA, this.enablerBus);
  private rightShifter = new rightShifter(this.inputA, this.enablerBus);
  private adder = new Adder(this.inputA, this.inputB);
  private isZero = new IsZero(this.inputA);

  private opDecoder = new Decoder3x8();
  private op: boolean[] = new Array(3).fill(false);
  private index: number = 0;
  private enablers: Enabler[] = [];

  private carryOut: boolean = false;
  private carryIn: boolean = false;
  private largerThanOut: boolean = false;
  private equalOut: boolean = false;

  private andGates = [new And(), new And(), new And()];
  constructor(
    private inputA: Bus,
    private inputB: Bus,
    private outputBus: Bus
  ) {
    for (let i = 0; i < 8; i++) {
      this.enablers[i] = new Enabler();
    }
  }

  getZero = () => {
    return this.isZero.get();
  };

  getCarry = () => {
    return this.carryOut;
  };

  getLarger = () => {
    return this.largerThanOut;
  };

  getEqual = () => {
    return this.equalOut;
  };

  updateOpDecoder = () => {
    this.opDecoder.update(this.op[2], this.op[1], this.op[0]);
  };

  updateComparator = () => {
    this.comparator.update();
    this.largerThanOut = this.comparator.getLarger();
    this.equalOut = this.comparator.getEqual();
  };

  updateAdder = () => {
    this.adder.update(this.carryIn);
    this.enablers[this.index].update(this.adder.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  updateXorer = () => {
    this.enablers[this.index].update(this.comparator.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  update = () => {
    this.updateOpDecoder();
    this.index = this.opDecoder.getIndex();
    this.updateComparator();

    // switch statement to handle opcodes
    switch (this.index) {
      case ADD:
        this.updateAdder();
      case XOR:
        this.updateXorer();
      case OR:
        this.updateOr();
      case AND:
        this.updateAnd();
      case NOT:
        this.updateNot();
      case SHL:
        this.updateLeftShifter();
      case SHR:
        this.updateRightShifter();
    }
  };
}

export default Alu;
