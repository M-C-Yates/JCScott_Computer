class Bus {
  private _data: boolean[] = new Array(this.width);

  constructor(public width: number) {
    for (let i = 0; i < this.width; i++) {
      this._data[i] = false;
    }
  }
  get data(): boolean[] {
    return this._data;
  }
  set data(input: boolean[]) {
    this._data = [...input];
  }
  clear = () => {
    this._data = [...new Array(8).fill(false)];
  };
  clear = () => {
    this.data = [...new Array(8).fill(false)];
  };
}

export default Bus;
