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

export class Or {
  private output: boolean = false;
  private nand = new Nand();
  private notGates = [new Not(), new Not()];
  get = () => {
    return this.output;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);
    this.nand.update(this.notGates[0].get(), this.notGates[1].get());

    this.output = this.nand.get();
  };
}

export default Nand;
