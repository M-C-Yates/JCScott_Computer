import Enabler from "./Enabler";
import Byte from "../circuit/Byte";
import Bus from "./Bus";

class Register {
  private byte = new Byte();
  private enabler = new Enabler();
  private output: boolean[] = new Array(8).fill(false);
  constructor(private inputBus: Bus, private outputBus: Bus) {}
  get = () => {
    return this.output;
  };
  readByte = () => {
    return this.byte.get();
  };
  update = (inputS: boolean, inputE: boolean) => {
    this.byte.update(this.inputBus.get(), inputS);
    this.enabler.update(this.byte.get(), inputE);
    this.enabler.get().forEach((val, i) => (this.output[i] = val));
    if (inputE) {
      this.outputBus.update(this.output);
    }
  };
}

export default Register;
