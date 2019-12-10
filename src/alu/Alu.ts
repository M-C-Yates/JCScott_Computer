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
  private _op: boolean[] = new Array(3).fill(false);
  private index: number = 0;
  private enablers: Enabler[] = [];

  private _carryOut: boolean = false;
  private _carryIn: boolean = false;
  private _largerThanOut: boolean = false;
  private _equalOut: boolean = false;
  private _isZero: boolean = false;

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
  get isZero(): boolean {
    return this._isZero;
  }

  get carryOut(): boolean {
    return this._carryOut;
  }

  get largerThanOut(): boolean {
    return this._largerThanOut;
  }

  get equalOut(): boolean {
    return this._equalOut;
  }

  set carryIn(carryIn: boolean) {
    this._carryIn = carryIn;
  }

  set op(op: boolean[]) {
    this._op = op;
  }

  private updateOpDecoder = () => {
    this.opDecoder.update(this._op[0], this._op[1], this._op[2]);
  };

  private enableComparator = () => {
    this.outputBus.data = new Array(8).fill(false);
  };

  private updateComparator = () => {
    this.comparator.update();
    this._largerThanOut = this.comparator.getLarger();
    this._equalOut = this.comparator.getEqual();
  };

  private updateAdder = () => {
    this.adder.update(this._carryIn);
    this._carryOut = this.adder.carryOut;
    this.enablerBus.data = [...this.adder.sum];
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };

  private updateXorer = () => {
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };

  private updateOr = () => {
    this.orer.update();
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };
  private updateAnd = () => {
    this.ander.update();
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };

  private updateNot = () => {
    this.notter.update();
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };

  private updateLeftShifter = () => {
    this.leftShifter.update(this._carryIn);
    this._carryOut = this.leftShifter.getShiftOut();
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };

  private updateRightShifter = () => {
    // console.log(this.inputA.data, 1);
    this.rightShifter.update(this._carryIn);
    this._carryOut = this.rightShifter.getShiftOut();
    this.enablers[this.index].update(this.enablerBus.data, true);
    this.outputBus.data = this.enablers[this.index].output;
  };

  update = () => {
    this.updateOpDecoder();
    this.index = this.opDecoder.getIndex();
    this.updateComparator();
    this.isZeroer.update();

    switch (this.index) {
      case ADD:
        this.updateAdder();
        break;

      case SHR:
        this.updateRightShifter();
        break;

      case SHL:
        this.updateLeftShifter();
        break;

      case NOT:
        this.updateNot();
        break;

      case AND:
        this.updateAnd();
        break;

      case OR:
        this.updateOr();
        break;

      case XOR:
        this.updateXorer();
        break;

      case CMP:
        this.enableComparator();
        break;

      default:
        break;
    }
    // console.log(this.outputBus.data);

    this._isZero = this.isZeroer.get();
    this.flagBus.data = [
      this._carryOut,
      this._largerThanOut,
      this._equalOut,
      this._isZero,
      false,
      false,
      false,
      false
    ];
  };
}

export default Alu;
