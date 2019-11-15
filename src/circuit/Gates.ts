export class Nand {
  output: boolean = false;
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
    let gate1 = inputA && inputB;
    this.output = gate1 && inputC;
  };
}

export class And4 {
  private output: boolean = false;

  get = () => {
    return this.output;
  };
  update = (
    inputA: boolean,
    inputB: boolean,
    inputC: boolean,
    inputD: boolean
  ) => {
    let gate1 = inputA && inputB;
    let gate2 = inputC && inputD;
    this.output = gate1 && gate2;
  };
}

export default Nand;
