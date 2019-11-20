import { And } from "./../circuit/Gates";
import Bus from "./Bus";
class Notter {
  private output = new Array(8).fill(false);
  constructor(private inputBus: Bus, private outputBus: Bus) {}
  update = () => {
    this.output = [...this.inputBus.get()];
    for (let i = 0; i < 8; i++) {
      this.output[i] = !this.output[i];
    }

    this.outputBus.set([...this.output]);
  };
}

export class Ander {
  private andGates = [
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And(),
    new And()
  ];
  private data1 = new Array(8).fill(false);
  private data2 = new Array(8).fill(false);
  private output = new Array(8).fill(false);

  constructor(
    private inputA: Bus,
    private inputB: Bus,
    private outputBus: Bus
  ) {}

  update = () => {
    this.data1 = [...this.inputA.get()];
    this.data2 = [...this.inputB.get()];

    this.andGates[0].update(this.data1[0], this.data2[0]);
    this.andGates[1].update(this.data1[1], this.data2[1]);
    this.andGates[2].update(this.data1[2], this.data2[2]);
    this.andGates[3].update(this.data1[3], this.data2[3]);
    this.andGates[4].update(this.data1[4], this.data2[4]);
    this.andGates[5].update(this.data1[5], this.data2[5]);
    this.andGates[6].update(this.data1[6], this.data2[6]);
    this.andGates[7].update(this.data1[7], this.data2[7]);

    for (let i = 0; i < 8; i++) {
      this.output[i] = this.andGates[i].get();
    }

    this.outputBus.set([...this.output]);
  };
}

export default Notter;
