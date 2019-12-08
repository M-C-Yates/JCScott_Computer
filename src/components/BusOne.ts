import Bus from "./Bus";
class BusOne {
  private _output = new Array(8).fill(false);
  constructor(private inputBus: Bus, private outputBus: Bus) {}
  get output() {
    return this._output;
  }
  update = (bus1: boolean) => {
    if (bus1) {
      this.outputBus.data = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true
      ];
    } else {
      this.outputBus.data = this.inputBus.data;
    }
  };
}

export default BusOne;
