import { And, And3, And4, Not } from "./../circuit/Gates";

class Decoder2x4 {
  private andGates: And[] = [new And(), new And(), new And(), new And()];
  private notGates: Not[] = [new Not(), new Not()];
  private outputs: boolean[] = new Array(4).fill(false);
  get = () => {
    return this.outputs;
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

  get = () => {
    return this.outputs;
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
  };
}

export class Decoder4x16 {
  private andGates: And[] = [
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And()
  ];
  private notGates: Not[] = [new Not(), new Not(), new Not(), new Not()];
  private output: boolean[] = new Array(16).fill(false);
  private index: number = 0;

  getIndex = () => {
    return this.index;
  };
}
export default Decoder2x4;
