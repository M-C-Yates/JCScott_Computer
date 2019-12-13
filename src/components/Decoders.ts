import { And, And3, And4, Not } from "../circuit/Gates";

class Decoder2x4 {
  private andGates: And[] = [new And(), new And(), new And(), new And()];
  private notGates: Not[] = [new Not(), new Not()];
  private _output: boolean[] = new Array(4).fill(false);
  private index: number = 0;
  get output(): boolean[] {
    return this._output;
  }
  getIndex = () => {
    return this.index;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);

    this.andGates[0].update(this.notGates[0].output, this.notGates[1].output);
    this._output[0] = this.andGates[0].output;

    this.andGates[1].update(this.notGates[0].output, inputB);
    this._output[1] = this.andGates[1].output;

    this.andGates[2].update(inputA, this.notGates[1].output);
    this._output[2] = this.andGates[2].output;

    this.andGates[3].update(inputA, inputB);
    this._output[3] = this.andGates[3].output;

    for (let i = 0; i < 4; i++) {
      if (this._output[i]) {
        this.index = i;
        break;
      }
    }
  };
}

export class Decoder3x8 {
  private andGates: And3[] = [
    new And3(),
    new And3(),
    new And3(),
    new And3(),
    new And3(),
    new And3(),
    new And3(),
    new And3()
  ];
  private notGates: Not[] = [new Not(), new Not(), new Not()];
  private _output: boolean[] = new Array(8).fill(false);
  private _index: number = 0;

  get output(): boolean[] {
    return this._output;
  }
  get index(): number {
    return this._index;
  }

  update = (inputA: boolean, inputB: boolean, inputC: boolean) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);
    this.notGates[2].update(inputC);

    this.andGates[0].update(
      this.notGates[0].output,
      this.notGates[1].output,
      this.notGates[2].output
    );
    this._output[0] = this.andGates[0].output;

    this.andGates[1].update(
      this.notGates[0].output,
      this.notGates[1].output,
      inputC
    );
    this._output[1] = this.andGates[1].output;

    this.andGates[2].update(
      this.notGates[0].output,
      inputB,
      this.notGates[2].output
    );
    this._output[2] = this.andGates[2].output;

    this.andGates[3].update(this.notGates[0].output, inputB, inputC);
    this._output[3] = this.andGates[3].output;

    this.andGates[4].update(
      inputA,
      this.notGates[1].output,
      this.notGates[2].output
    );
    this._output[4] = this.andGates[4].output;

    this.andGates[5].update(inputA, this.notGates[1].output, inputC);
    this._output[5] = this.andGates[5].output;

    this.andGates[6].update(inputA, inputB, this.notGates[2].output);
    this._output[6] = this.andGates[6].output;

    this.andGates[7].update(inputA, inputB, inputC);
    this._output[7] = this.andGates[7].output;

    for (let i = 0; i < 8; i++) {
      let val = this.andGates[i].output;
      if (val) {
        this._index = i;
      }
    }
  };
}

export class Decoder4x16 {
  private andGates: And4[] = new Array(16);
  private notGates: Not[] = new Array(4);
  private _output: boolean[] = new Array(16).fill(false);
  private _index: number = 0;

  constructor() {
    for (let i = 0; i < 4; i++) {
      this.notGates[i] = new Not();
    }
    for (let i = 0; i < 16; i++) {
      this.andGates[i] = new And4();
    }
  }

  get output(): boolean[] {
    return this._output;
  }

  get index(): number {
    return this._index;
  }

  update = (
    inputA: boolean,
    inputB: boolean,
    inputC: boolean,
    inputD: boolean
  ) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);
    this.notGates[2].update(inputC);
    this.notGates[3].update(inputD);

    this.andGates[0].update(
      this.notGates[0].output,
      this.notGates[1].output,
      this.notGates[2].output,
      this.notGates[3].output
    );
    this.andGates[1].update(
      this.notGates[0].output,
      this.notGates[1].output,
      this.notGates[2].output,
      inputD
    );
    this.andGates[2].update(
      this.notGates[0].output,
      this.notGates[1].output,
      inputC,
      this.notGates[3].output
    );
    this.andGates[3].update(
      this.notGates[0].output,
      this.notGates[1].output,
      inputC,
      inputD
    );

    this.andGates[4].update(
      this.notGates[0].output,
      inputB,
      this.notGates[2].output,
      this.notGates[3].output
    );
    this.andGates[5].update(
      this.notGates[0].output,
      inputB,
      this.notGates[2].output,
      inputD
    );
    this.andGates[6].update(
      this.notGates[0].output,
      inputB,
      inputC,
      this.notGates[3].output
    );
    this.andGates[7].update(this.notGates[0].output, inputB, inputC, inputD);

    this.andGates[8].update(
      inputA,
      this.notGates[1].output,
      this.notGates[2].output,
      this.notGates[3].output
    );
    this.andGates[9].update(
      inputA,
      this.notGates[1].output,
      this.notGates[2].output,
      inputD
    );
    this.andGates[10].update(
      inputA,
      this.notGates[1].output,
      inputC,
      this.notGates[3].output
    );
    this.andGates[11].update(inputA, this.notGates[1].output, inputC, inputD);

    this.andGates[12].update(
      inputA,
      inputB,
      this.notGates[2].output,
      this.notGates[3].output
    );
    this.andGates[13].update(inputA, inputB, this.notGates[2].output, inputD);
    this.andGates[14].update(inputA, inputB, inputC, this.notGates[3].output);
    this.andGates[15].update(inputA, inputB, inputC, inputD);

    for (let i = 0; i < 16; i++) {
      let val = this.andGates[i].output;
      if (val) {
        this._index = i;
      }
      this._output[i] = val;
    }
  };
}

export class Decoder8x256 {
  private decoders: Decoder4x16[] = new Array(16);
  private _index: number = 0;
  private _output: boolean[] = new Array(256).fill(false);
  private selector = new Decoder4x16();

  constructor() {
    for (let i = 0; i < 15; i++) {
      this.decoders[i] = new Decoder4x16();
    }
  }

  get output(): boolean[] {
    return this._output;
  }

  get index(): number {
    return this._index;
  }

  update = (input: boolean[]) => {
    this.selector.update(input[4], input[5], input[6], input[7]);
    const sIndex = this.selector.index;
    this.decoders[sIndex].update(input[0], input[1], input[2], input[3]);
    this._index = this.decoders[sIndex].index;
  };
}
export default Decoder2x4;
