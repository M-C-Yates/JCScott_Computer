import { And, Not } from "./../circuit/Gates";

class Decoder2x4 {
  private andGates: And[] = [new And(), new And(), new And(), new And()];
  private notGates: Not[] = [new Not(), new Not()];
  private outputs: boolean[] = new Array(4).fill(false);
  constructor() {}
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

export default Decoder2x4;
