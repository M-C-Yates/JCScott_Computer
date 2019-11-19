import Bit from "./Bit";

class Byte {
  private bits: Bit[] = new Array(8);
  private output: boolean[] = new Array(8).fill(false);
  constructor() {
    for (let i = 0; i < 8; i++) {
      this.bits[i] = new Bit();
    }
  }

  get = () => {
    return this.output;
  };
  update = (input: boolean[], inputS: boolean) => {
    if (inputS) {
      this.bits.forEach((bit, i) => {
        bit.update(input[i], inputS);
        this.output[i] = this.bits[i].get();
      });
    }
  };
}

export default Byte;
