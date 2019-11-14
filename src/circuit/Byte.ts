import Bit from "./Bit";

class Byte {
  private bits: Bit[] = new Array(8).fill(new Bit());
  private output: boolean[] = new Array(8).fill(false);
  constructor() {}

  get = () => {
    return this.output;
  };
  update = (bitInputs: boolean[], inputS: boolean) => {
    if (inputS) {
      this.bits.forEach((bit, i) => {
        bit.update(bitInputs[i], inputS);
        this.output[i] = this.bits[i].get();
      });
    }
  };
}

export default Byte;
