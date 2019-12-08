import Bit from "./Bit";

class Byte {
  private bits: Bit[] = new Array(8);
  private _output: boolean[] = new Array(8).fill(false);
  constructor() {
    for (let i = 0; i < 8; i++) {
      this.bits[i] = new Bit();
    }
  }
  get output(): boolean[] {
    return this._output;
  }

  update = (input: boolean[], inputS: boolean) => {
    if (inputS) {
      this.bits.forEach((bit, i) => {
        bit.update(input[i], inputS);
        this._output[i] = this.bits[i].output;
      });
    }
  };
}

export default Byte;
