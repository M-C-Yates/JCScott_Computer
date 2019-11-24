import Bus from "./Bus";

class leftShifter {
  private output: boolean[] = new Array(8).fill(false);
  private shiftIn: boolean = false;
  private shiftOut: boolean = false;
  constructor(private inputBus: Bus, private outputBus: Bus) {}

  update = (shiftIn: boolean) => {
    this.output = [...this.inputBus.get()];
    this.shiftIn = shiftIn;
    this.shiftOut = this.output[0];

    this.output[0] = this.output[1];
    this.output[1] = this.output[2];
    this.output[2] = this.output[3];
    this.output[3] = this.output[4];
    this.output[4] = this.output[5];
    this.output[5] = this.output[6];
    this.output[6] = this.output[7];
    this.output[7] = this.shiftIn;

    this.outputBus.set([...this.output]);
  };
  getShiftOut = () => {
    return this.shiftOut;
  };
}

export class rightShifter {
  private output: boolean[] = new Array(8).fill(false);
  private shiftIn: boolean = false;
  private shiftOut: boolean = false;

  constructor(private inputBus: Bus, private outputBus: Bus) {}
  update = (shiftIn: boolean) => {
    this.output = [...this.inputBus.get()];
    this.shiftIn = shiftIn;
    this.shiftOut = this.output[7];

    this.output[7] = this.output[6];
    this.output[6] = this.output[5];
    this.output[5] = this.output[4];
    this.output[4] = this.output[3];
    this.output[3] = this.output[2];
    this.output[2] = this.output[1];
    this.output[1] = this.output[0];
    this.output[0] = this.shiftIn;
    this.outputBus.set([...this.output]);
  };
  getShiftOut = () => {
    return this.shiftOut;
  };
}

export default leftShifter;
