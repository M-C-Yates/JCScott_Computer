import Register from "../components/Register";
import Bus from "../components/Bus";

class Cpu {
  private accBus = new Bus(8);
  private addressBus = new Bus(8);
  private aluBus = new Bus(8);
  private aluToFlagBus = new Bus(8);
  private busOne = new Bus(8);
  private controlBus = new Bus(8);
  private ioBus = new Bus(8);
  private flagBus = new Bus(8);
  private mainBus = new Bus(8);
  private tmpBus = new Bus(8);

  // general purpose registers
  private register1 = new Register(this.mainBus, this.mainBus, "gp one");
  private register2 = new Register(this.mainBus, this.mainBus, "gp two");
  private register3 = new Register(this.mainBus, this.mainBus, "gp three");
  private register4 = new Register(this.mainBus, this.mainBus, "gp four");

  private tmpReg = new Register(this.mainBus, this.tmpBus, "tmp");
  private accReg = new Register(this.accBus, this.mainBus, "acc");
  private flagsReg = new Register(this.aluToFlagBus, this.flagBus, "flags");
  private irReg = new Register(this.mainBus, this.controlBus, "ir");
  private iarREG = new Register(this.mainBus, this.mainBus, "iar");
  constructor() {
    const initVal = new Array(8).fill(false);
    this.irReg.disable();
    this.flagsReg.enable();
    this.tmpReg.enable();
    this.flagsReg.update(initVal);
    this.tmpReg.update(initVal);
  }
}

export default Cpu;
