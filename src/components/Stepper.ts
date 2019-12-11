import Bit from "../circuit/Bit";
import { Not, Or, And } from "../circuit/Gates";

class Stepper {
  private bits: Bit[] = new Array(12);

  private clkIn: boolean = false;
  private clkInNotGate: Not = new Not();
  private inputOrGates: Or[] = new Array(new Or(), new Or());
  private reset: boolean = false;
  private resetNot: Not = new Not();

  private output: boolean[] = new Array(7).fill(false);
  private outputAndGates: And[] = new Array(5);
  private outputNotGates: Not[] = new Array(6);
  private outputOrGate: Or = new Or();
  private index: number = 0;


  constructor() {
    for (let i = 0; i < 12; i++) {
      if (i < 5) {
        this.outputAndGates[i] = new And();
      }
      if (i < 6) {
        this.outputNotGates[i] = new Not();
      }
      this.bits[i] = new Bit();
    }
  }

  get = () => {
    return this.output;
  };

  getIndex = () => {
    for (let i = 0; i < 8; i++) {
      if (this.output[i]) {
        this.index = i;
        break;
      }
    }
    return this.index;
  };

  update = (clockIn: boolean) => {
    this.clkIn = clockIn;
    this.reset = this.output[6];
    this.step();

    // reset should happen instantly
    if (this.output[6]) {
      this.reset = this.output[6];
      this.step();
    }
  };

  private step = () => {
    this.clkInNotGate.update(this.clkIn);
    this.resetNot.update(this.output[6]);

    this.inputOrGates[0].update(this.reset, this.clkInNotGate.get());

    this.inputOrGates[1].update(this.reset, this.clkIn);

    this.bits[0].update(this.resetNot.get(), this.inputOrGates[0].get());
    this.bits[1].update(this.bits[0].get(), this.inputOrGates[1].get());
    this.outputNotGates[0].update(this.bits[1].get());
    this.outputOrGate.update(this.outputNotGates[0].get(), this.reset);

    this.bits[2].update(this.bits[1].get(), this.inputOrGates[0].get());
    this.bits[3].update(this.bits[2].get(), this.inputOrGates[1].get());
    this.outputNotGates[1].update(this.bits[3].get());
    this.outputAndGates[0].update(
      this.outputNotGates[1].get(),
      this.bits[1].get()
    );

    this.bits[4].update(this.bits[3].get(), this.inputOrGates[0].get());
    this.bits[5].update(this.bits[4].get(), this.inputOrGates[1].get());
    this.outputNotGates[2].update(this.bits[5].get());
    this.outputAndGates[1].update(
      this.outputNotGates[2].get(),
      this.bits[3].get()
    );

    this.bits[6].update(this.bits[5].get(), this.inputOrGates[0].get());
    this.bits[7].update(this.bits[6].get(), this.inputOrGates[1].get());
    this.outputNotGates[3].update(this.bits[7].get());
    this.outputAndGates[2].update(
      this.outputNotGates[3].get(),
      this.bits[5].get()
    );

    this.bits[8].update(this.bits[7].get(), this.inputOrGates[0].get());
    this.bits[9].update(this.bits[8].get(), this.inputOrGates[1].get());
    this.outputNotGates[4].update(this.bits[9].get());
    this.outputAndGates[3].update(
      this.outputNotGates[4].get(),
      this.bits[7].get()
    );

    this.bits[10].update(this.bits[9].get(), this.inputOrGates[0].get());
    this.bits[11].update(this.bits[10].get(), this.inputOrGates[1].get());
    this.outputNotGates[5].update(this.bits[11].get());
    this.outputAndGates[4].update(
      this.outputNotGates[5].get(),
      this.bits[9].get()
    );

    this.output[0] = this.outputOrGate.get();
    this.output[1] = this.outputAndGates[0].get();
    this.output[2] = this.outputAndGates[1].get();
    this.output[3] = this.outputAndGates[2].get();
    this.output[4] = this.outputAndGates[3].get();
    this.output[5] = this.outputAndGates[4].get();
    this.output[6] = this.bits[11].get();
  };

  Reset = () => {
    this.output = [...new Array(8).fill(false)];
    this.reset = false;
    this.clkIn = false;
    this.bits = [...new Array(12)];
    for (let i = 0; i < 12; i++) {
      this.bits[i] = new Bit();
    }
  };
}

export default Stepper;
