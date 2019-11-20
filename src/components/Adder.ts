import { And, Or, Xor } from "./../circuit/Gates";
import { thisExpression } from "@babel/types";

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

    this.and1.update(inputA, inputB);
    this.and2.update(this.xor1.get(), carryIn);
    this.or1.update(this.and1.get(), this.and2.get());
    this.sum = this.xor2.get();
    this.carryout = this.or1.get();
  };
}
export class Adder {}

export default Adder;
