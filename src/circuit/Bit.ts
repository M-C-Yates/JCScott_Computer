import { Nand } from "./Gates";

class Bit {
  private nand1 = new Nand();
  private nand2 = new Nand();
  private nand3 = new Nand();
  private nand4 = new Nand();
  private _output: boolean = false;

  constructor() {}

  get output(): boolean {
    return this._output;
  }
  set output(data: boolean) {
    this._output = data;
  }
  update = (inputI: boolean, inputS: boolean) => {
    this.nand1.update(inputI, inputS);
    this.nand2.update(this.nand1.output, inputS);
    this.nand4.update(this.nand3.output, this.nand2.output);
    this.nand3.update(this.nand1.output, this.nand4.output);
    this.nand4.update(this.nand3.output, this.nand2.output);
    if (inputS) {
      this._output = this.nand3.output;
    }
  };
}

export default Bit;
