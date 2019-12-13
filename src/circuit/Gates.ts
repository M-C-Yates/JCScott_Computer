interface IGate {
  output: boolean;
  update(inputA: boolean, ...args: boolean[]): void;
}

export class Nand implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }
  update = (inputA: boolean, inputB: boolean) => {
    this._output = !(inputA && inputB);
  };
}

export class Not implements IGate {
  private nand = new Nand();
  private _output: boolean = false;
  get output(): boolean {
    return this._output;
  }
  update = (inputA: boolean) => {
    this._output = !inputA;
  };
}

export class And implements IGate {
  private _output: boolean = false;
  get output(): boolean {
    return this._output;
  }
  update = (inputA: boolean, inputB: boolean) => {
    this._output = inputA && inputB;
  };
}

export class And3 implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }

  update = (inputA: boolean, inputB: boolean, inputC: boolean) => {
    let gate1 = inputA && inputB;
    this._output = gate1 && inputC;
  };
}

export class And4 implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }

  update = (
    inputA: boolean,
    inputB: boolean,
    inputC: boolean,
    inputD: boolean
  ) => {
    let gate1 = inputA && inputB;
    let gate2 = inputC && inputD;
    this._output = gate1 && gate2;
  };
}

export class Or implements IGate {
  private _output: boolean = false;
  private nand = new Nand();
  private notGates = [new Not(), new Not()];

  get output(): boolean {
    return this._output;
  }

  update = (inputA: boolean, inputB: boolean) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);
    this.nand.update(this.notGates[0].output, this.notGates[1].output);

    this._output = this.nand.output;
  };
}

export class Or3 implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }

  update = (inputA: boolean, inputB: boolean, inputC: boolean) => {
    this._output = inputA || inputB || inputC;
  };
}

export class Or4 implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }

  update = (
    inputA: boolean,
    inputB: boolean,
    inputC: boolean,
    inputD: boolean
  ) => {
    const or1 = inputA || inputB;
    const or2 = inputC || inputD;
    this._output = or1 || or2;
  };
}
export class Or5 implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }

  update = (
    inputA: boolean,
    inputB: boolean,
    inputC: boolean,
    inputD: boolean,
    inputE: boolean
  ) => {
    const or1 = inputA || inputB;
    const or2 = inputC || inputD;
    const or3 = or1 || or2;
    this._output = or3 || inputE;
  };
}

export class Or6 implements IGate {
  private _output: boolean = false;

  get output(): boolean {
    return this._output;
  }

  update = (
    inputA: boolean,
    inputB: boolean,
    inputC: boolean,
    inputD: boolean,
    inputE: boolean,
    inputF: boolean
  ) => {
    const or1 = inputA || inputB;
    const or2 = inputC || inputD;
    const or3 = inputE || inputF;
    this._output = or1 || or2 || or3;
  };
}

export class Or8 {
  private _output: boolean = false;
  private orGates: Or[] = [];
  constructor() {
    for (let i = 0; i < 7; i++) {
      this.orGates[i] = new Or();
    }
  }

  get output(): boolean {
    return this._output;
  }

  update = (inputA: boolean[]) => {
    this.orGates[0].update(inputA[0], inputA[1]);
    this.orGates[1].update(inputA[2], inputA[3]);
    this.orGates[2].update(inputA[4], inputA[5]);
    this.orGates[3].update(inputA[6], inputA[7]);

    this.orGates[4].update(this.orGates[0].output, this.orGates[1].output);
    this.orGates[5].update(this.orGates[2].output, this.orGates[3].output);

    this.orGates[6].update(this.orGates[4].output, this.orGates[5].output);

    this._output = this.orGates[6].output;
  };
}

export class Xor implements IGate {
  private _output: boolean = false;
  private nandGates = [new Nand(), new Nand(), new Nand(), new Nand()];
  constructor() {}

  get output(): boolean {
    return this._output;
  }

  update = (inputA: boolean, inputB: boolean) => {
    this.nandGates[0].update(inputA, inputB);
    this.nandGates[1].update(inputA, this.nandGates[0].output);
    this.nandGates[2].update(this.nandGates[0].output, inputB);
    this.nandGates[3].update(
      this.nandGates[1].output,
      this.nandGates[2].output
    );

    this._output = this.nandGates[3].output;
  };
}

export default Nand;
