import Register from "../components/Register";
import Bus from "../components/Bus";

class Cpu {
  private aluBus = new Bus(8);
  private mainBus = new Bus(8);
  private tmpBus = new Bus(8);

  // general purpose registers
  private register1 = new Register(this.mainBus, this.mainBus, "gp one");
  private register2 = new Register(this.mainBus, this.mainBus, "gp two");
  private register3 = new Register(this.mainBus, this.mainBus, "gp three");
  private register4 = new Register(this.mainBus, this.mainBus, "gp four");

  private tmpReg = new Register(this.tmpBus, this.tmpBus, "tmp");
  private accReg = new Register(this.aluBus, this.aluBus, "acc");
}

export default Cpu;
