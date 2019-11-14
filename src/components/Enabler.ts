import { And } from "./../circuit/Gates";
import Wire from "../circuit/Wire";

class Enabler /* implements ComponentInterface */ {
  private gates: And[] = new Array(8).fill(new And());
  private outputs: Wire[] = new Array(8).fill(new Wire("o"));
  get = () => {
    let value: boolean[] = [];
    for (let i = 0; i < 8; i++) {
      console.log(this.outputs[i]);
    }
  };
  update = (inputs: boolean[], enable: boolean) => {
    for (let i = 0; i < 8; i++) {
      this.gates[i].update(inputs[i], enable);
      this.outputs[i].set(this.gates[i].get());
      // console.log(this.outputs[i].get());
    }
  };
}

export default Enabler;
