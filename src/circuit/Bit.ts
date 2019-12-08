import { Nand } from "./Gates";

class Bit {
  private nand1 = new Nand();
  private nand2 = new Nand();
  private nand3 = new Nand();
  private nand4 = new Nand();
  private _output: boolean = false;
  constructor() {}
  get = (): boolean => {
    return this.output;
  };

  get output(): boolean {
    return this._output;
  }
  set output(data: boolean) {
    this._output = data;
  }
  update = (inputI: boolean, inputS: boolean) => {
    this.nand1.update(inputI, inputS);
    this.nand2.update(this.nand1.get(), inputS);
    this.nand4.update(this.nand3.get(), this.nand2.get());
    this.nand3.update(this.nand1.get(), this.nand4.get());
    this.nand4.update(this.nand3.get(), this.nand2.get());
    if (inputS) {
      this.output = this.nand3.get();
    }
  };
}

export default Bit;
