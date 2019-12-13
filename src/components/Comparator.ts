import { Xor, Not, And, And3, Or } from "./../circuit/Gates";
import Bus from "./Bus";
export class bitComparer {
  private xor1 = new Xor();
  private not1 = new Not();
  private and1 = new And();
  private andIn3 = new And3();
  private or1 = new Or();

  private _output: boolean = false;
  private equalIn: boolean = false;
  private _equalOut: boolean = false;
  private isLargerIn: boolean = false;
  private _isLargerOut: boolean = false;

  get output(): boolean {
    return this._output;
  }
  get equalOut(): boolean {
    return this._equalOut;
  }
  get isLargerOut(): boolean {
    return this._isLargerOut;
  }
  update = (
    inputA: boolean,
    inputB: boolean,
    equalIn: boolean,
    isLargerIn: boolean
  ) => {
    this.equalIn = equalIn;
    this.isLargerIn = isLargerIn;
    this.xor1.update(inputA, inputB);
    this._output = this.xor1.output;

    this.not1.update(this.xor1.output);
    this.and1.update(this.not1.output, this.equalIn);
    this._equalOut = this.and1.output;

    this.andIn3.update(equalIn, inputA, this.xor1.output);
    this.or1.update(this.isLargerIn, this.andIn3.output);
    this._isLargerOut = this.or1.output;
  };
}

class Comparator {
  private comparers: bitComparer[] = [];
  private equalIn: boolean = false;
  private equalOut: boolean = false;
  private isLargerIn: boolean = false;
  private isLargerOut: boolean = false;
  private output: boolean[] = new Array(8).fill(false);
  constructor(
    private inputA: Bus,
    private inputB: Bus,
    private outputBus: Bus
  ) {
    for (let i = 0; i < 8; i++) {
      this.comparers[i] = new bitComparer();
    }
  }
  get = () => {
    return this.output;
  };
  getEqual = () => {
    return this.equalOut;
  };
  getLarger = () => {
    return this.isLargerOut;
  };
  update = () => {
    const byte1 = [...this.inputA.data];
    const byte2 = [...this.inputB.data];

    this.comparers[0].update(byte1[0], byte2[0], true, false);
    this.comparers[1].update(
      byte1[1],
      byte2[1],
      this.comparers[0].getEqual(),
      this.comparers[0].getLarger()
    );
    this.comparers[2].update(
      byte1[2],
      byte2[2],
      this.comparers[1].getEqual(),
      this.comparers[1].getLarger()
    );
    this.comparers[3].update(
      byte1[3],
      byte2[3],
      this.comparers[2].getEqual(),
      this.comparers[2].getLarger()
    );
    this.comparers[4].update(
      byte1[4],
      byte2[4],
      this.comparers[3].getEqual(),
      this.comparers[3].getLarger()
    );
    this.comparers[5].update(
      byte1[5],
      byte2[5],
      this.comparers[4].getEqual(),
      this.comparers[4].getLarger()
    );
    this.comparers[6].update(
      byte1[6],
      byte2[6],
      this.comparers[5].getEqual(),
      this.comparers[5].getLarger()
    );
    this.comparers[7].update(
      byte1[7],
      byte2[7],
      this.comparers[6].getEqual(),
      this.comparers[6].getLarger()
    );

    this.equalOut = this.comparers[7].getEqual();
    this.isLargerOut = this.comparers[7].getLarger();

    for (let i = 0; i < 8; i++) {
      this.output[i] = this.comparers[i].get();
    }

    this.outputBus.data = [...this.output];
  };
}

export default Comparator;
