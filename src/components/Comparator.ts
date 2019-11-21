import { Xor, Not, And, And3, Or } from "./../circuit/Gates";
export class bitComparer {
  private xor1 = new Xor();
  private not1 = new Not();
  private and1 = new And();
  private andIn3 = new And3();
  private or1 = new Or();

  private output: boolean = false;
  private equalIn: boolean = false;
  private equalOut: boolean = false;
  private isLargerIn: boolean = false;
  private isLargerOut: boolean = false;

  get = () => {
    return this.output;
  };
  getEqual = () => {
    return this.equalOut;
  };
  getLarger = () => {
    return this.isLargerOut;
  };
  update = (
    inputA: boolean,
    inputB: boolean,
    equalIn: boolean,
    isLargerIn: boolean
  ) => {
    this.equalIn = equalIn;
    this.isLargerIn = isLargerIn;
    this.xor1.update(inputA, inputB);
    this.output = this.xor1.get();

    this.not1.update(this.xor1.get());
    this.and1.update(this.not1.get(), this.equalIn);
    this.equalOut = this.and1.get();

    this.andIn3.update(equalIn, inputA, this.xor1.get());
    this.or1.update(this.isLargerIn, this.andIn3.get());
    this.isLargerOut = this.or1.get();
  };
}

class Comparator {
  private comparers: bitComparer[] = [];
  constructor() {
    for (let i = 0; i < 8; i++) {
      this.comparers[i] = new bitComparer();
    }
  }
}

export default Comparator;
