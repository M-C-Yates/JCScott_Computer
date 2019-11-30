import { Not, Or, And } from "./../circuit/Gates";
import Bus from "./Bus";
class BusOne {
  private notGate = new Not();
  private orGate = new Or();
  private andGates = new Array(7);
  private output = new Array(8).fill(false);
  constructor(public inputBus: Bus, public outputBus: Bus) {
    for (let i = 0; i < 7; i++) {
      this.andGates[i] = new And();
    }
  }
  get;
}

export default BusOne;
