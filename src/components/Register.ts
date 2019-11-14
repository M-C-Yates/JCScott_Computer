import Enabler from "./Enabler";
import Byte from "../circuit/Byte";

class Register {
  private byte = new Byte();
  private enabler = new Enabler();
  private output: boolean[] = new Array(8).fill(false);
  constructor(public name: string) {}
  get = () => {
    return this.output;
  };
  readByte = () => {
    return this.byte.get();
  };
  update = (inputs: boolean[], inputS: boolean, inputE: boolean) => {
    this.byte.update(inputs, inputS);
    this.enabler.update(this.byte.get(), inputE);
    this.enabler.get().forEach((val, i) => (this.output[i] = val));
  };
}

export default Register;
