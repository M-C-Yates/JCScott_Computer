import Wire from "../circuit/Wire";

class Bus {
  private wires: Wire[] = new Array(8).fill(new Wire("b"));

  constructor(public width: number) {}
}

export default Bus;
