import Wire from "./Wire";
export class Nand {
  output: Wire = new Wire("o");
  constructor() {}
  get = (): boolean => {
    return this.output.get();
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.output.set(!(inputA && inputB));
  };
}

export class Not {
  private nand = new Nand();
  public output: Wire = new Wire("o");
  constructor() {}
  get = () => {
    return this.output.get();
  };
  update = (inputA: boolean) => {
    this.output.set(!inputA);
  };
}

export class And {
  private nand: Nand = new Nand();
  private not: Not = new Not();
  output: Wire = new Wire("o");
  get = (): boolean => {
    return this.output.get();
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.nand.update(inputA, inputB);
    this.not.update(this.nand.get());
    this.output.set(this.not.get());
  };
}
export default Nand;
