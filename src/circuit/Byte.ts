import Bit from "./Bit";

class Byte {
  private bits: Bit[] = new Array(8).fill(new Bit());
  private output: boolean[] = new Array(8).fill(false);
  constructor() {}

  get = () => {
    return this.output;
  };
  update = (inputs: boolean[], inputS: boolean) => {
    if (inputS) {
      this.bits.forEach((bit, i) => {
        bit.update(inputs[i], inputS);
        this.output[i] = this.bits[i].get();
      });
    }
  };
}

export default Byte;
