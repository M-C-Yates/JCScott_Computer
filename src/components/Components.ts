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
    for (let i = 0; i < 8; i++) {
      this.output[i] = this.data1[i] && this.data2[i];
    }

    this.outputBus.set([...this.output]);
  };
}

export default Notter;
