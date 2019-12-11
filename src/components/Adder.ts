import { And, Or, Xor } from "./../circuit/Gates";
import Bus from "./Bus";

export class Add {
  private and1 = new And();
  private and2 = new And();
  private or1 = new Or();
  private xor1 = new Xor();
  private xor2 = new Xor();

  private _carryOut: boolean = false;
  private _sum: boolean = false;

  get sum(): boolean {
    return this._sum;
  }

  get carryOut(): boolean {
    return this._carryOut;
  }
  update = (inputA: boolean, inputB: boolean, carryIn: boolean) => {
    this.xor1.update(inputA, inputB);
    this.xor2.update(this.xor1.get(), carryIn);
    this._sum = this.xor2.get();

    this.and1.update(carryIn, this.xor1.get());
    this.and2.update(inputA, inputB);
    this.or1.update(this.and1.get(), this.and2.get());
    this._carryOut = this.or1.get();
  };
}

export class Adder {
  private _carryOut: boolean = false;
  private carryIn: boolean = false;
  private adds: Add[] = new Array(8);
  private _sum: boolean[] = new Array(8);
  constructor(private inputA: Bus, private inputB: Bus) {
    for (let i = 0; i < 8; i++) {
      this.adds[i] = new Add();
      this.sum[i] = false;
    }
  }
  get sum(): boolean[] {
    return this._sum;
  }

  getCarry = () => {
    return this.carryOut;
  };

  get carryOut(): boolean {
    return this._carryOut;
  }

  update = (carryIn: boolean) => {
    const byte1 = [...this.inputA.data];
    const byte2 = [...this.inputB.data];
    this.carryIn = carryIn;
    for (let i = 7; i >= 0; i--) {
      this.adds[i].update(byte1[i], byte2[i], this.carryIn);
      this.sum[i] = this.adds[i].sum;
      this.carryIn = this.adds[i].carryOut;
      this._carryOut = this.adds[i].carryOut;
    }
  };
}

export default Adder;
