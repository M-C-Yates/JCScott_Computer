import Enabler from "./Enabler";
import Wire from "../circuit/Wire";
import Bus from "./Bus";

class Register {
  private setWire: Wire = new Wire("s");
  private enableWire: Wire = new Wire("e");
  private enabler = new Enabler();
  private outputs: Wire[] = new Array(8).fill(new Wire("o"));
  private inputBus = this.bus;
  private outputBus = this.bus;
  constructor(public name: string, private bus: Bus) {}
}

export default Register;
