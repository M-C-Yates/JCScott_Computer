import And from "../circuit/Gates";
import ComponentInterface from "./Component";
import Wire from "../circuit/Wire";

class Enabler /* implements ComponentInterface */ {
  private gates: And[] = new Array(8).fill(new And());
  private outputs: Wire[] = new Array(8).fill(new Wire("o", false));
  private next: ComponentInterface | null = null;

  update = (inputs: boolean[], enable: boolean) => {
    for (let i = 0; i < 8; i++) {
      this.gates[i].update(inputs[i], enable);
      this.outputs[i].set(this.gates[i].get());
    }
  };
}

export default Enabler;
