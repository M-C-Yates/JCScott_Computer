import Register from "../components/Register";

import { And } from "../circuit/Gates";

import Bus from "../components/Bus";

class Cell {
  private register = new Register(this.inputBus, this.outputBus);
  private gates: And[] = [new And(), new And()];

  constructor(private inputBus: Bus, private outputBus: Bus) {}

  read = () => {
    return [...this.register.readByte()];
  };

  setCell = (byte: number | string) => {
    this.register.setByte(byte);
  };

  update = (set: boolean, enable: boolean) => {
    if (set) {
      this.register.set();
    } else {
      this.register.unSet();
    }
    if (enable) {
      this.register.enable();
    } else {
      this.register.disable();
    }
    this.register.update();
  };
}

export default Cell;
