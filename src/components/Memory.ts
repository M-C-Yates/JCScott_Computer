import Bus from "./Bus";
import Byte from "../circuit/Byte";
import Register from "./Register";
import { Decoder4x16 } from "./Decoders";
import { And } from "../circuit/Gates";

class Cell {
  private register = new Register(this.inputBus, this.outputBus);
  private gates: And[] = [new And(), new And()];

  constructor(private inputBus: Bus, private outputBus: Bus) {}

  get = () => {
    return this.register.get();
  };

  update = (enable: boolean, set: boolean) => {
    this.gates[0].update(true, set);
    this.gates[1].update(true, enable);

    if (this.gates[0].get()) {
      this.register.set();
    } else {
      this.register.unSet();
    }
    if (this.gates[1].get()) {
      this.register.enable();
    } else {
      this.register.disable();
    }
    this.register.update();
  };
}

class Memory256B {
  public addressRegister = new Register(
    this.addressBus,
    this.addressBus,
    "MAR"
  );
  private address = new Array(2).fill(0);
  private decoderCol = new Decoder4x16();
  private decoderRow = new Decoder4x16();
  private memory: Cell[][] = new Array(16).fill([]);

  constructor(
    private inputBus: Bus,
    private outputBus: Bus,
    private addressBus: Bus
  ) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.memory[i][j] = new Cell(this.inputBus, this.outputBus);
      }
    }
    this.addressRegister.set();
    this.addressRegister.enable();
  }
  update = (set: boolean, enable: boolean) => {
    this.addressRegister.update();
    const address = this.addressRegister.get();
    this.decoderRow.update(address[0], address[1], address[2], address[3]);
    this.decoderCol.update(address[4], address[5], address[6], address[7]);

    this.address[0] = this.decoderRow.getIndex();
    this.address[1] = this.decoderCol.getIndex();
    this.memory[this.address[0]][this.address[1]].update(set, enable);
  };

  readMem = (row: number, col: number) => {
    return this.memory[row][col].get();
  };
}

export default Memory256B;
