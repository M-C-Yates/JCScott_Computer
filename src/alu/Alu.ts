import Adder from "../components/Adder";
import Bus from "../components/Bus";
import leftShifter, { rightShifter } from "./../components/Shifters";
import Notter, { ORer, Ander } from "./../components/Components";
import Comparator from "../components/Comparator";

class Alu {
  private comparator = new Comparator(this.inputA, this.inputB, this.outputBus);
  private orer = new ORer(this.inputA, this.inputB, this.outputBus);
  private ander = new Ander(this.inputA, this.inputB, this.outputBus);
  private notter = new Notter(this.inputA, this.outputBus);
  private leftShift = new leftShifter(this.inputA, this.outputBus);
  private rightShifter = new rightShifter(this.inputA, this.outputBus);
  private adder = new Adder(this.inputA, this.inputB);

  constructor(
    private inputA: Bus,
    private inputB: Bus,
    private outputBus: Bus
  ) {}
}

export default Alu;
