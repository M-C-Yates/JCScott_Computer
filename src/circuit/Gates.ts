export class Nand {
  output: boolean = false;
  constructor() {}
  get = (): boolean => {
    return this.output;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.output = !(inputA && inputB);
  };
}

export class Not {
  private nand = new Nand();
  public output: boolean = false;
  constructor() {}
  get = () => {
    return this.output;
  };
  update = (inputA: boolean) => {
    this.output = !inputA;
  };
}

export class And {
  private nand: Nand = new Nand();
  private not: Not = new Not();
  output: boolean = false;
  get = (): boolean => {
    return this.output;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.nand.update(inputA, inputB);
    this.not.update(this.nand.get());
    this.output = this.not.get();
  };
}
export default Nand;
