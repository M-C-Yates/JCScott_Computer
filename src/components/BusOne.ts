import Bus from "./Bus";
class BusOne {
  private output = new Array(8).fill(false);
  constructor(private inputBus: Bus, private outputBus: Bus) {}
  get = () => {
    return this.output;
  };
  update = (bus1: boolean) => {
    if (bus1) {
      this.outputBus.set([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true
      ]);
    } else {
      this.outputBus.set([...this.inputBus.get()]);
    }
  };
}

export default BusOne;
