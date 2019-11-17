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

class Memory256B {
  private addressRegister = new Register(this.inputBus, this.outputBus, "MAR");
  private decoderCol = new Decoder4x16();
  private decoderRow = new Decoder4x16();
  private enable: boolean = true;
  private memory: Cell[][] = new Array(16).fill([]);
  private set: boolean = true;
  constructor(private inputBus: Bus, private outputBus: Bus) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.memory[i][j] = new Cell(this.inputBus, this.outputBus);
      }
    }
  }
  update = () => {
    const byte = this.addressRegister.get();
    this.decoderRow.update(byte[0], byte[1], byte[2], byte[3]);
    this.decoderCol.update(byte[4], byte[5], byte[6], byte[7]);

    const row = this.decoderRow.getIndex();
    const col = this.decoderCol.getIndex();
    this.memory[row][col].update(this.enable, this.set);
  };
  updateEnable = (enable: boolean) => {
    this.enable = enable;
  };
  updateSet = (set: boolean) => {
    this.set = set;
  };
}

export default Memory256B;
