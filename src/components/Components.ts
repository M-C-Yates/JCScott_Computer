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

export default Notter;
