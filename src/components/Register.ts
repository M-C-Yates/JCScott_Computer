import Enabler from "./Enabler";
import Bus from "./Bus";

class Register {
  private setWire: boolean = false;
  private enableWire: boolean = false;
  private enabler = new Enabler();
  private output = new Array(8).fill(false);
  private inputBus = this.bus;
  private outputBus = this.bus;
  constructor(public name: string, private bus: Bus) {}
}

export default Register;
