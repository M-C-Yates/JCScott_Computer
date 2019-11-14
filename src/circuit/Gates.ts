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
  private output: boolean = false;
  get = (): boolean => {
    return this.output;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.output = inputA && inputB;
  };
}

export class And3 {
  private output: boolean = false;

  get = () => {
    return this.output;
  };
  update = (inputA: boolean, inputB: boolean, inputC: boolean) => {
    this.output = inputA && inputB && inputC;
  };
}

export default Nand;
