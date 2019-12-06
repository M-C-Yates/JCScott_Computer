import { binToBool } from "./../utils/binUtils";
import Enabler from "./Enabler";
import Byte from "../circuit/Byte";
import Bus from "./Bus";
import binToString from "../utils/binUtils";

class Register {
  private byte = new Byte();
  private enableOutput: boolean = false;
  private enabler = new Enabler();
  private output: boolean[] = new Array(8).fill(false);
  private setInput: boolean = false;
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
  update = (input?: boolean[]) => {
    if (input) {
      this.byte.update(input, this.setInput);
    } else {
      this.byte.update([...this.inputBus.get()], this.setInput);
    }
    this.enabler.update(this.byte.get(), this.enableOutput);
    this.enabler.get().forEach((val, i) => (this.output[i] = val));
    if (this.enableOutput) {
      this.outputBus.set([...this.output]);
    }
  };

  setBus = () => {
    if (this.enableOutput) {
      this.outputBus.set([...this.output]);
    }
  };

  setByte = (byte: number) => {
    let data = binToBool(binToString(byte));

    this.byte.update([...data], true);
  };

  disable = () => {
    this.enableOutput = false;
  };
  enable = () => {
    this.enableOutput = true;
  };
  set = () => {
    this.setInput = true;
  };
  unSet = () => {
    this.setInput = false;
  };
}

export default Register;
