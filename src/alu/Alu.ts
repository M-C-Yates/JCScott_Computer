import { Decoder3x8 } from "./../components/Decoders";
import Adder from "../components/Adder";
import Bus from "../components/Bus";
import leftShifter, { rightShifter } from "./../components/Shifters";
import Notter, { ORer, Ander } from "./../components/Components";
import Comparator from "../components/Comparator";
import IsZero from "../components/IsZero";
import { And } from "../circuit/Gates";
import Enabler from "../components/Enabler";

// binary codes represent decoder input
const ADD = 0; // 000
const SHR = 1; // 001
const SHL = 2; // 010
const NOT = 3; // 011
const AND = 4; // 100
const OR = 5; // 101
const XOR = 6; // 110
const CMP = 7; // 111

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
  private leftShifter = new leftShifter(this.inputA, this.enablerBus);
  private rightShifter = new rightShifter(this.inputA, this.enablerBus);
  private adder = new Adder(this.inputA, this.inputB);
  private isZeroer = new IsZero(this.enablerBus);

  private opDecoder = new Decoder3x8();
  private op: boolean[] = new Array(3).fill(false);
  private index: number = 0;
  private enablers: Enabler[] = [];

  private carryOut: boolean = false;
  private carryIn: boolean = false;
  private largerThanOut: boolean = false;
  private equalOut: boolean = false;
  private isZero: boolean = false;

  constructor(
    private inputA: Bus,
    private inputB: Bus,
    private outputBus: Bus,
    private flagBus: Bus
  ) {
    for (let i = 0; i < 8; i++) {
      this.enablers[i] = new Enabler();
    }
  }

  getZero = () => {
    return this.isZero;
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

  setCarryIn = (carryIn: boolean) => {
    this.carryIn = carryIn;
  };

  setOp = (op: boolean[]) => {
    this.op = op;
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
    this.carryOut = this.adder.getCarry();
    this.enablerBus.set([...this.adder.get()]);
    this.enablers[this.index].update(this.enablerBus.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  updateXorer = () => {
    this.enablers[this.index].update(this.enablerBus.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  updateOr = () => {
    this.orer.update();
    this.enablers[this.index].update(this.enablerBus.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };
  updateAnd = () => {
    this.ander.update();
    this.enablers[this.index].update(this.enablerBus.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  updateNot = () => {
    this.notter.update();
    this.enablers[this.index].update(this.enablerBus.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  updateLeftShifter = () => {
    this.leftShifter.update(this.carryIn);
    this.carryOut = this.leftShifter.getShiftOut();
    this.enablers[this.index].update(this.enablerBus.get(), true);
    this.outputBus.set(this.enablers[this.index].get());
  };

  updateRightShifter = () => {
    this.rightShifter.update(this.carryIn);
    this.carryOut = this.rightShifter.getShiftOut();
    this.enablers[this.index].update(this.enablerBus.get(), true);
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
      case SHR:
        this.updateRightShifter();
      case SHL:
        this.updateLeftShifter();
      case NOT:
        this.updateNot();
      case AND:
        this.updateAnd();
      case OR:
        this.updateOr();
      case XOR:
        this.updateXorer();
      case CMP:
        this.isZeroer.update();
        this.isZero = this.isZeroer.get();
      default:
        break;
    }

    this.flagBus.set([
      this.carryOut,
      this.largerThanOut,
      this.equalOut,
      this.isZero,
      false,
      false,
      false,
      false
    ]);
  };
}

export default Alu;
