import Enabler from "./Enabler";
import Byte from "../circuit/Byte";
import Bus from "./Bus";

class Register {
  private byte = new Byte();
  private enable: boolean = false;
  private enabler = new Enabler();
  private output: boolean[] = new Array(8).fill(false);
  private set: boolean = false;
  constructor(
    private inputBus: Bus,
    private outputBus: Bus,
    public name?: string
  ) {}
  get = () => {
    return this.output;
  };
  readByte = () => {
    return this.byte.get();
  };
  update = () => {
    this.byte.update(this.inputBus.get(), this.set);
    this.enabler.update(this.byte.get(), this.enable);
    this.enabler.get().forEach((val, i) => (this.output[i] = val));
    if (this.enable) {
      this.outputBus.update(this.output);
    }
  };
  updateEnable = (enable: boolean) => {
    this.enable = enable;
  };
  updateSet = (set: boolean) => {
    this.set = set;
  };
}

export default Register;
