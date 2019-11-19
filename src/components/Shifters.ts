import Bus from "./Bus";

class leftShifter {
  private output: boolean[] = new Array(8).fill(false);
  private shiftIn: boolean = false;
  private shiftOut: boolean = false;
  constructor(private inputBus: Bus, private outputBus: Bus) {}

  update = (shiftIn: boolean) => {
    this.shiftIn = shiftIn;
  };
  shiftOut = () => {
    return this.shiftOut;
  };
}

export class rightShifter {
  private output: boolean[] = new Array(8).fill(false);
  constructor(private inputBus: Bus, private outputBus: Bus) {}
}

export default leftShifter;
