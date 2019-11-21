import { Not, Or8 } from "./../circuit/Gates";
import Bus from "./Bus";
class IsZero {
  private output: boolean = false;
  private or8 = new Or8();
  private notGate = new Not();
  constructor(private inputA: Bus) {}
  get = () => {
    return this.output;
  };

  update = () => {
    this.or8.update([...this.inputA.get()]);
    this.notGate.update(this.or8.get());
    this.output = this.notGate.get();
  };
}

export default IsZero;
