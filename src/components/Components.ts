import { And, Not, Or, Xor } from "./../circuit/Gates";
import Bus from "./Bus";
class Notter {
  private notGates = [
    new Not(),
    new Not(),
    new Not(),
    new Not(),
    new Not(),
    new Not(),
    new Not(),
    new Not()
  ];
  private output = new Array(8).fill(false);
  constructor(private inputBus: Bus, private outputBus: Bus) {}
  update = () => {
    this.output = [...this.inputBus.get()];

    for (let i = 0; i < 8; i++) {
      this.notGates[i].update(this.output[i]);
      this.output[i] = this.notGates[i].get();
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

    for (let i = 0; i < 8; i++) {
      this.andGates[i].update(this.data1[i], this.data2[i]);

      this.output[i] = this.andGates[i].get();
    }

    this.outputBus.set([...this.output]);
  };
}

export class ORer {
  private orGates = [
    new Or(),
    new Or(),
    new Or(),
    new Or(),
    new Or(),
    new Or(),
    new Or(),
    new Or()
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

    for (let i = 0; i < 8; i++) {
      this.orGates[i].update(this.data1[i], this.data2[i]);
      this.output[i] = this.orGates[i].get();
    }
    this.outputBus.set([...this.output]);
  };
}

export class XORer {
  private xorGates = [
    new Xor(),
    new Xor(),
    new Xor(),
    new Xor(),
    new Xor(),
    new Xor(),
    new Xor(),
    new Xor()
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

    for (let i = 0; i < 8; i++) {
      this.xorGates[i].update(this.data1[i], this.data2[i]);
      this.output[i] = this.xorGates[i].get();
    }
    this.outputBus.set([...this.output]);
  };
}

export default Notter;
