import Register from "../components/Register";

import { And } from "../circuit/Gates";

import Bus from "../components/Bus";

class Cell {
  private register = new Register(this.inputBus, this.outputBus);
  private gates: And[] = [new And(), new And()];

  constructor(private inputBus: Bus, private outputBus: Bus) {}

  get = () => {
    return this.register.get();
  };

  update = (set: boolean, enable: boolean) => {
    // this.gates[0].update(true, set);
    // this.gates[1].update(true, enable);

    // if (this.gates[0].get()) {
    //   this.register.set();
    // } else {
    //   this.register.unSet();
    // }
    // if (this.gates[1].get()) {
    //   this.register.enable();
    // } else {
    //   this.register.disable();
    // }

    // console.log(set, enable);
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
