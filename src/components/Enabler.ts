import { And } from "../circuit/Gates";

class Enabler /* implements ComponentInterface */ {
  private gates: And[] = new Array(8).fill(new And());
  private _output: boolean[] = new Array(8).fill(false);

  get output(): boolean[] {
    return this._output;
  }
  update = (inputs: boolean[], enable: boolean) => {
    for (let i = 0; i < 8; i++) {
      this.gates[i].update(inputs[i], enable);
      this.output[i] = this.gates[i].get();
    }
  };
}

export default Enabler;
