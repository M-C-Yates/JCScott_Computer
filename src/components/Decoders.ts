import { And, And3, And4, Not } from "../circuit/Gates";

class Decoder2x4 {
  private andGates: And[] = [new And(), new And(), new And(), new And()];
  private notGates: Not[] = [new Not(), new Not()];
  private outputs: boolean[] = new Array(4).fill(false);
  private index: number = 0;
  get = () => {
    return this.outputs;
  };
  getIndex = () => {
    return this.index;
  };
  update = (inputA: boolean, inputB: boolean) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);

    this.andGates[0].update(this.notGates[0].get(), this.notGates[1].get());
    this.outputs[0] = this.andGates[0].get();

    this.andGates[1].update(this.notGates[0].get(), inputB);
    this.outputs[1] = this.andGates[1].get();

    this.andGates[2].update(inputA, this.notGates[1].get());
    this.outputs[2] = this.andGates[2].get();

    this.andGates[3].update(inputA, inputB);
    this.outputs[3] = this.andGates[3].get();

    for (let i = 0; i < 4; i++) {
      if (this.outputs[i]) {
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
  private outputs: boolean[] = new Array(8).fill(false);
  private index: number = 0;
  get = () => {
    return this.outputs;
  };
  getIndex = () => {
    return this.index;
  };
  update = (inputA: boolean, inputB: boolean, inputC: boolean) => {
    this.notGates[0].update(inputA);
    this.notGates[1].update(inputB);
    this.notGates[2].update(inputC);

    this.andGates[0].update(
      this.notGates[0].get(),
      this.notGates[1].get(),
      this.notGates[2].get()
    );
    this.outputs[0] = this.andGates[0].get();

    this.andGates[1].update(
      this.notGates[0].get(),
      this.notGates[1].get(),
      inputC
    );
    this.outputs[1] = this.andGates[1].get();

    this.andGates[2].update(
      this.notGates[0].get(),
      inputB,
      this.notGates[2].get()
    );
    this.outputs[2] = this.andGates[2].get();

    this.andGates[3].update(this.notGates[0].get(), inputB, inputC);
    this.outputs[3] = this.andGates[3].get();

    this.andGates[4].update(
      inputA,
      this.notGates[1].get(),
      this.notGates[2].get()
    );
    this.outputs[4] = this.andGates[4].get();

    this.andGates[5].update(inputA, this.notGates[1].get(), inputC);
    this.outputs[5] = this.andGates[5].get();

    this.andGates[6].update(inputA, inputB, this.notGates[2].get());
    this.outputs[6] = this.andGates[6].get();

    this.andGates[7].update(inputA, inputB, inputC);
    this.outputs[7] = this.andGates[7].get();

    for (let i = 0; i < 8; i++) {
      let val = this.andGates[i].get();
      if (val) {
        this.index = i;
      }
    }
  };
}

export class InstrDecoder3x8 {
  public decoder = new Decoder3x8();
  public selectorGates: And[] = new Array(8);
  public bit0NotGate: Not = new Not();

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.selectorGates[i] = new And();
    }
  }
}

export class Decoder4x16 {
  private andGates: And4[] = new Array(16);
  private notGates: Not[] = new Array(4);
  private output: boolean[] = new Array(16).fill(false);
  private index: number = 0;
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.notGates[i] = new Not();
    }
    for (let i = 0; i < 16; i++) {
      this.andGates[i] = new And4();
    }
  }
  getIndex = () => {
    return this.index;
  };
  get = () => {
    return this.output;
  };
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
      this.notGates[0].get(),
      this.notGates[1].get(),
      this.notGates[2].get(),
      this.notGates[3].get()
    );
    this.andGates[1].update(
      this.notGates[0].get(),
      this.notGates[1].get(),
      this.notGates[2].get(),
      inputD
    );
    this.andGates[2].update(
      this.notGates[0].get(),
      this.notGates[1].get(),
      inputC,
      this.notGates[3].get()
    );
    this.andGates[3].update(
      this.notGates[0].get(),
      this.notGates[1].get(),
      inputC,
      inputD
    );

    this.andGates[4].update(
      this.notGates[0].get(),
      inputB,
      this.notGates[2].get(),
      this.notGates[3].get()
    );
    this.andGates[5].update(
      this.notGates[0].get(),
      inputB,
      this.notGates[2].get(),
      inputD
    );
    this.andGates[6].update(
      this.notGates[0].get(),
      inputB,
      inputC,
      this.notGates[3].get()
    );
    this.andGates[7].update(this.notGates[0].get(), inputB, inputC, inputD);

    this.andGates[8].update(
      inputA,
      this.notGates[1].get(),
      this.notGates[2].get(),
      this.notGates[3].get()
    );
    this.andGates[9].update(
      inputA,
      this.notGates[1].get(),
      this.notGates[2].get(),
      inputD
    );
    this.andGates[10].update(
      inputA,
      this.notGates[1].get(),
      inputC,
      this.notGates[3].get()
    );
    this.andGates[11].update(inputA, this.notGates[1].get(), inputC, inputD);

    this.andGates[12].update(
      inputA,
      inputB,
      this.notGates[2].get(),
      this.notGates[3].get()
    );
    this.andGates[13].update(inputA, inputB, this.notGates[2].get(), inputD);
    this.andGates[14].update(inputA, inputB, inputC, this.notGates[3].get());
    this.andGates[15].update(inputA, inputB, inputC, inputD);

    for (let i = 0; i < 16; i++) {
      let val = this.andGates[i].get();
      if (val) {
        this.index = i;
        console.log(this.index);
      }
      this.output[i] = val;
    }
  };
}

export class Decoder8x256 {
  private decoders: Decoder4x16[] = new Array(16);
  private index: number = 0;
  private output: boolean[] = new Array(256).fill(false);
  private selector = new Decoder4x16();
  constructor() {
    for (let i = 0; i < 15; i++) {
      this.decoders[i] = new Decoder4x16();
    }
  }
  getIndex = () => {
    return this.index;
  };
  update = (input: boolean[]) => {
    this.selector.update(input[4], input[5], input[6], input[7]);
    const sIndex = this.selector.getIndex();
    this.decoders[sIndex].update(input[0], input[1], input[2], input[3]);
    this.index = this.decoders[sIndex].getIndex();
  };
}
export default Decoder2x4;
