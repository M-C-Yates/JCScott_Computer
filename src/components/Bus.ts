class Bus {
  private data: boolean[] = new Array(this.width);

  constructor(public width: number) {
    for (let i = 0; i < this.width; i++) {
      this.data[i] = false;
    }
  }
  get = () => {
    return this.data;
  };
  set = (input: boolean[]) => {
    this.data = input;
  };
  clear = () => {
    this.data = [...new Array(8).fill(false)];
  };
}

export default Bus;
