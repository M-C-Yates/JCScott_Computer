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
    this.register.
  };
}

class Memory {
  private decoderx = new Decoder4x16();
  private decodery = new Decoder4x16();
  private addressR = new Register(this.inputBus, this.outputBus);
  private memory: Cell[] = new Array(256);
  constructor(private inputBus: Bus, private outputBus: Bus) {
    for (let i = 0; i < 256; i++) {
      this.memory[i] = new Cell(this.inputBus, this.outputBus);
    }
  }
}

export default Memory;
