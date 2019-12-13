import { Not, Or8 } from "./../circuit/Gates";
import Bus from "./Bus";
class IsZero {
  private _output: boolean = false;
  private or8 = new Or8();
  private notGate = new Not();
  constructor(private inputA: Bus) {}

  get output(): boolean {
    return this._output;
  }

  update = () => {
    this.or8.update([...this.inputA.data]);
    this.notGate.update(this.or8.output);
    this._output = this.notGate.output;
  };
}

export default IsZero;
