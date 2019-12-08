import { binToBool } from "./../utils/binUtils";
import Enabler from "./Enabler";
import Byte from "../circuit/Byte";
import Bus from "./Bus";
import binToString from "../utils/binUtils";

class Register {
  private byte = new Byte();
  private enableOutput: boolean = false;
  private enabler = new Enabler();
  private _output: boolean[] = new Array(8).fill(false);
  private setInput: boolean = false;
  constructor(
    private inputBus: Bus,
    private outputBus: Bus,
    public name?: string
  ) {}

  get output(): boolean[] {
    return this._output;
  }
  readByte = () => {
    return this.byte.output;
  };
  update = (input?: boolean[]) => {
    if (input) {
      this.byte.update(input, this.setInput);
    } else {
      this.byte.update([...this.inputBus.data], this.setInput);
    }
    this.enabler.update(this.byte.output, this.enableOutput);
    this.enabler.output.forEach((val, i) => (this.output[i] = val));
    if (this.enableOutput) {
      this.outputBus.data = this.output;
    }
  };

  setBus = () => {
    if (this.enableOutput) {
      this.outputBus.data = this.output;
    }
  };

  setByte = (byte: number) => {
    let data: string = binToString(byte);
    const dataBool = binToBool(data);
    this.enable();
    this.set();
    this.update([...dataBool]);
    this.disable();
    this.unSet();
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
