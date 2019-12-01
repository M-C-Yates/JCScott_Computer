import Register from "../components/Register";
import Bus from "../components/Bus";
import Memory256B from "../memory/Memory";
import BusOne from "../components/BusOne";
import Alu from "../alu/Alu";

class Cpu {
  private accBus = new Bus(8);
  private addressBus = new Bus(8);
  private aluBus = new Bus(8);
  private aluToFlagBus = new Bus(8);
  private controlBus = new Bus(8);
  private ioBus = new Bus(8);
  private flagBus = new Bus(8);
  private tmpBus = new Bus(8);

  // general purpose registers
  private register1 = new Register(this.mainBus, this.mainBus, "gp one");
  private register2 = new Register(this.mainBus, this.mainBus, "gp two");
  private register3 = new Register(this.mainBus, this.mainBus, "gp three");
  private register4 = new Register(this.mainBus, this.mainBus, "gp four");

  private busOne = new BusOne(this.tmpBus, this.tmpBus);
  private tmpReg = new Register(this.mainBus, this.tmpBus, "tmp");
  private accReg = new Register(this.accBus, this.mainBus, "acc");
  private flagsReg = new Register(this.aluToFlagBus, this.flagBus, "flags");

  // components
  private alu = new Alu(this.aluBus, this.tmpBus, this.accBus, this.flagBus);

  constructor(private mainBus: Bus) {
    const initVal = new Array(8).fill(false);
    this.flagsReg.enable();
    this.tmpReg.enable();
    this.flagsReg.update(initVal);
    this.tmpReg.update(initVal);
  }
}

export default Cpu;
