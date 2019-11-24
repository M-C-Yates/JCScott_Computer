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

export class Or8 {
  private ouput: boolean = false;
  private orGates: Or[] = [];
  constructor() {
    for (let i = 0; i < 7; i++) {
      this.orGates[i] = new Or();
    }
  }

  get = () => {
    return this.ouput;
  };

  update = (inputA: boolean[]) => {
    this.orGates[0].update(inputA[0], inputA[1]);
    this.orGates[1].update(inputA[2], inputA[3]);
    this.orGates[2].update(inputA[4], inputA[5]);
    this.orGates[3].update(inputA[6], inputA[7]);

    this.orGates[4].update(this.orGates[0].get(), this.orGates[1].get());
    this.orGates[5].update(this.orGates[2].get(), this.orGates[3].get());

    this.orGates[6].update(this.orGates[4].get(), this.orGates[5].get());

    this.ouput = this.orGates[6].get();
  };
}

export class Xor {
  private output: boolean = false;
  private nandGates = [new Nand(), new Nand(), new Nand(), new Nand()];
  constructor() {}
  get = () => {
    return this.output;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.nandGates[0].update(inputA, inputB);
    this.nandGates[1].update(inputA, this.nandGates[0].get());
    this.nandGates[2].update(this.nandGates[0].get(), inputB);
    this.nandGates[3].update(this.nandGates[1].get(), this.nandGates[2].get());

    this.output = this.nandGates[3].get();
  };
}

export default Nand;
