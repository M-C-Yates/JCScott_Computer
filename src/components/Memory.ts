import Bus from "./Bus";
import Byte from "../circuit/Byte";
import Register from "./Register";
import { Decoder4x16 } from "./Decoders";
import { And } from "../circuit/Gates";

class Cell {
  private register = new Register(this.inputBus, this.outputBus);
  private gates: And[] = [new And(), new And(), new And()];
  constructor(private inputBus: Bus, private outputBus: Bus) {}
  update = (enable: boolean, set: boolean) => {
    this.gates[0].update(true, true);
    this.gates[1].update(this.gates[0].get(), set);
    this.gates[2].update(this.gates[0].get(), enable);
    if (this.gates[1].get()) {
      this.register.updateSet(true);
    } else {
      this.register.updateSet(false);
    }
    if (this.gates[2].get()) {
      this.register.updateEnable(true);
    } else {
      this.register.updateEnable(false);
    }
    this.register.update();
  };
}

class Memory {
  private decoderRow = new Decoder4x16();
  private decoderCol = new Decoder4x16();
  private addressRegister = new Register(this.inputBus, this.outputBus, "MAR");
  private memory: Cell[][] = new Array(16).fill([]);
  constructor(private inputBus: Bus, private outputBus: Bus) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.memory[i][j] = new Cell(this.inputBus, this.outputBus);
      }
    }
  }
}

export default Memory;
