class Wire {
  private value: boolean = false;
  constructor(public name: string) {}
  set = (value: boolean) => {
    this.value = value;
  };
  get = () => {
    return this.value;
  };
}
export default Wire;
