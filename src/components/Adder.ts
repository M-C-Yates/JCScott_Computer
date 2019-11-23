import { And, Or, Xor } from "./../circuit/Gates";
import { thisExpression } from "@babel/types";
import Bus from "./Bus";

export class Add {
  private and1 = new And();
  private and2 = new And();
  private or1 = new Or();
  private xor1 = new Xor();
  private xor2 = new Xor();

  private carryout: boolean = false;
  private sum: boolean = false;

  get = () => {
    return this.sum;
  };
  getCarryOut = () => {
    return this.carryout;
  };
  update = (inputA: boolean, inputB: boolean, carryIn: boolean) => {
    this.xor1.update(inputA, inputB);
    this.xor2.update(this.xor1.get(), carryIn);
    this.sum = this.xor2.get();

    this.and1.update(inputA, inputB);
    this.and2.update(carryIn, this.xor1.get());
    this.or1.update(this.and1.get(), this.and2.get());
    this.carryout = this.or1.get();
  };
}

export class Adder {
  private carryOut: boolean = false;
  private carryIn: boolean = false;
  private adds: Add[] = new Array(8);
  private sum: boolean[] = new Array(8);
  constructor(private inputA: Bus, private inputB: Bus) {
    for (let i = 0; i < 8; i++) {
      this.adds[i] = new Add();
    }
  }
  get = () => {
    return this.sum;
  };
  getCarry = () => {
    return this.carryOut;
  };

  update = (carryIn: boolean) => {
    const byte1 = [...this.inputA.get()];
    const byte2 = [...this.inputB.get()];
    this.carryIn = carryIn;
    for (let i = 7; i >= 0; i--) {
      this.adds[i].update(byte1[i], byte2[i], this.carryIn);
      this.sum[i] = this.adds[i].get();
      this.carryIn = this.adds[i].getCarryOut();
      this.carryOut = this.adds[i].getCarryOut();
    }
  };
}

export default Adder;
