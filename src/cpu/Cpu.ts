import binToString, { binToBool, boolToBinary } from "./../utils/binUtils";
import Register from "../components/Register";
import Bus from "../components/Bus";
import Memory256B from "../memory/Memory";
import BusOne from "../components/BusOne";
import Alu from "../alu/Alu";
import Decoder2x4 from "../components/Decoders";

class Cpu {
  private clockState: boolean = false;

  // busses
  private accBus = new Bus(8);
  private controlBus = new Bus(8);
  private flagBus = new Bus(8);
  private mainBus = new Bus(8);
  private tmpBus = new Bus(8);

  private memory = new Memory256B(this.mainBus, this.mainBus);
  private busOne = new BusOne(this.tmpBus, this.tmpBus);

  // general purpose registers
  private gpRegs = [
    new Register(this.mainBus, this.mainBus, "gp one"),
    new Register(this.mainBus, this.mainBus, "gp two"),
    new Register(this.mainBus, this.mainBus, "gp three"),
    new Register(this.mainBus, this.mainBus, "gp four")
  ];

  private tmpReg = new Register(this.mainBus, this.tmpBus, "tmp");
  private accReg = new Register(this.accBus, this.mainBus, "acc");
  private flagsReg = new Register(this.flagBus, this.flagBus, "flags");

  // components
  private alu = new Alu(this.mainBus, this.tmpBus, this.accBus, this.flagBus);

  // control section
  private iRegister = new Register(this.mainBus, this.controlBus, "IR"); // Instruction Register
  private iARegister = new Register(this.mainBus, this.controlBus, "IAR"); // Instruction Address Register

  // decoders
  private instructionDecoderEnables2x4: Decoder2x4[] = [
    new Decoder2x4(),
    new Decoder2x4()
  ];
  private instructionDecoderSet2x4: Decoder2x4 = new Decoder2x4();

  constructor() {
    const initVal = new Array(8).fill(false);
    this.flagsReg.enable();
    this.tmpReg.enable();
    this.iRegister.enable();
    this.iARegister.disable();
    this.flagsReg.update(initVal);
    this.tmpReg.update(initVal);
    this.iARegister.setByte(0b0);
  }
  cycle = () => {
    this.alu.op = [false, false, false];
    this.runStepOne();
    this.runStepTwo();
    this.runStepThree();

    this.handleInstruction();
    this.mainBus.clear();
  };

  private instructionDecode = () => {
    const instruction = this.iRegister.readByte();
    this.instructionDecoderEnables2x4[0].update(instruction[4], instruction[5]);
    this.instructionDecoderEnables2x4[1].update(instruction[6], instruction[7]);

    const registerA = this.instructionDecoderEnables2x4[0].getIndex();
    const registerB = this.instructionDecoderEnables2x4[1].getIndex();
    let decoded: [boolean, boolean[], number, number] = [
      instruction[0],
      instruction.slice(1, 4),
      registerA,
      registerB
    ];

    return decoded;
  };

  setIR = (instruction: number) => {
    this.iRegister.setByte(instruction);
  };

  setIAR = (address: number) => {
    this.iARegister.setByte(address);
  };

  setGp = (reg: number, byte: number) => {
    this.gpRegs[reg].setByte(byte);
  };

  setRam = (cell: number[], byte: number) => {
    this.memory.setMem(cell[0], cell[1], byte);
  };

  readFlags = () => {
    return this.flagBus.data;
  };

  readGp = (reg: number) => {
    return this.gpRegs[reg].readByte();
  };

  readMem = (row: number, col: number) => {
    return this.memory.readMem(row, col);
  };

  get IAR(): boolean[] {
    return this.iARegister.output;
  }

  private handleInstruction = () => {
    const instruction = this.instructionDecode();
    const RA = instruction[2];
    const RB = instruction[3];
    const op = boolToBinary(instruction[1]);

    // instruction breakdown
    // alu | op | RA | RB
    switch (instruction[0]) {
      case true:
        this.alu.op = [...instruction[1]];
        const ADD = "00000000";
        const SHR = "00000001";
        const SHL = "00000010";
        const NOT = "00000011";
        const AND = "00000100";
        const OR = "00000101";
        const XOR = "00000110";
        const CMP = "00000111";

        switch (op) {
          case ADD:
            // 1000 RARB | ADD RA,RB | add
            this.aluTwoInputInstr(RA, RB);
            break;
          case SHR:
            // 1001 RARB | SHR RA,RB | shift right
            this.aluOneInputInstr(RA, RB);
            break;
          case SHL:
            // 1010 RARB | SHL RA,RB | shift left
            this.aluOneInputInstr(RA, RB);
            break;
          case NOT:
            // 1011 RARB | NOT RA,RB | Not
            this.aluOneInputInstr(RA, RB);
            break;
          case AND:
            // 1100 RARB | AND RA,RB | AND
            this.aluTwoInputInstr(RA, RB);
            break;
          case OR:
            // 1101 RARB | OR RA,RB | OR
            this.aluTwoInputInstr(RA, RB);
            break;
          case XOR:
            // 1110 RARB | XOR RA,RB | XOR
            this.aluTwoInputInstr(RA, RB);
            break;
          case CMP:
            // 1111 RARB | CMP RA,RB | Compare
            this.cmpInstr(RA, RB);
            break;
          default:
            break;
        }
        break;
      case false:
        const LD = "00000000";
        const ST = "00000001";
        const DATA = "00000010";
        const JMPR = "00000011";
        const JMP = "00000100";
        const JCAEZ = "00000101";
        const CLF = "00000110";
        switch (op) {
          case LD:
            // 0000 RARB | LD RA,RB | load RB from ram addr in RA
            this.loadInstr(RA, RB);
            break;
          case ST:
            // 0001 RARB | ST RA,RB | store RB to ram addr in RA
            this.storeInstr(RA, RB);
            break;
          case DATA:
            // 0010 00RB | DATA RB,addr | load these 8 bits into RB;
            this.dataInstr(RB);
            break;
          case JMPR:
            // 0011 00RB | JMPR RB | jump to the addr in RB
            this.jmprInstr(RB);
            break;
          case JMP:
            // 0100 0000 | JMP addr | jump to the address in the next byte
            this.jmpInstr(RB);
            break;
          case JCAEZ:
            // 0101 caez | JCAEZ addr | jump if any tested Flag is on
            break;
          case CLF:
            // 0110 0000 | CLF | clear all flags
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  private runStepOne = () => {
    this.iARegister.enable();
    this.iARegister.set();
    this.iARegister.update;
    this.iARegister.disable();

    this.mainBus.data = this.iARegister.output;
    this.busOne.update(true);

    this.memory.updateAddress();
    this.alu.update();

    this.accReg.enable();
    this.accReg.set();
    this.accReg.update();
    this.accReg.unSet();
    this.accReg.disable();

    this.mainBus.clear();
  };

  private runStepTwo = () => {
    this.mainBus.clear();

    this.memory.setBus();

    this.iRegister.set();
    this.iRegister.update();
    this.iRegister.unSet();

    this.mainBus.clear();
  };

  private runStepThree = () => {
    this.accReg.enable();
    this.accReg.setBus();
    this.accReg.disable();

    this.iARegister.enable();
    this.iARegister.set();

    this.iARegister.update();

    this.iARegister.unSet();
    this.iARegister.disable();

    this.mainBus.clear();
  };

  private aluTwoInputInstr = (RA: number, RB: number) => {
    this.gpRegs[RB].enable();
    this.gpRegs[RB].update();

    this.tmpReg.set();
    this.tmpReg.update();
    this.tmpReg.unSet();

    this.gpRegs[RB].disable();

    this.mainBus.clear();
    // step 5

    this.gpRegs[RA].enable();
    this.gpRegs[RA].update();

    this.alu.update();

    this.flagsReg.enable();
    this.flagsReg.set();
    this.flagsReg.update();
    this.flagsReg.disable();
    this.flagsReg.unSet();

    this.accReg.set();
    this.accReg.enable();
    this.accReg.update();
    this.accReg.disable();
    this.accReg.unSet();

    this.gpRegs[RA].disable();

    this.mainBus.clear();
    // step6

    this.accReg.enable();
    this.accReg.setBus();
    this.accReg.disable();

    this.gpRegs[RB].enable();
    this.gpRegs[RB].set();
    this.gpRegs[RB].update();
    this.gpRegs[RB].unSet();
    this.gpRegs[RB].disable();

    this.mainBus.clear();
  };

  private aluOneInputInstr = (RA: number, RB: number) => {
    this.mainBus.clear();
    // step5

    this.gpRegs[RA].enable();
    this.gpRegs[RA].update();

    this.alu.update();

    this.accReg.enable();
    this.accReg.set();
    this.accReg.update();
    this.accReg.unSet();
    this.accReg.disable();

    this.gpRegs[RA].disable();

    this.mainBus.clear();
    // step6
    this.gpRegs[RB].enable();
    this.gpRegs[RB].set();

    this.accReg.enable();
    this.accReg.update();
    this.accReg.disable();

    this.gpRegs[RB].update();
    this.gpRegs[RB].unSet();
    this.gpRegs[RB].disable();

    this.mainBus.clear();
  };

  private cmpInstr = (RA: number, RB: number) => {
    // step 5
    this.gpRegs[RB].enable();
    this.gpRegs[RB].update();

    this.tmpReg.set();
    this.tmpReg.update();
    this.tmpReg.unSet();

    this.gpRegs[RB].disable();

    this.mainBus.clear();
    // step 6

    this.gpRegs[RA].enable();
    this.gpRegs[RA].update();

    this.alu.update();

    this.accReg.set();
    this.accReg.enable();
    this.accReg.update();
    this.accReg.disable();
    this.accReg.unSet();

    this.gpRegs[RA].disable();

    this.mainBus.clear();
  };

  private loadInstr = (RA: number, RB: number) => {
    this.mainBus.clear();

    this.gpRegs[RA].enable();
    this.mainBus.data = this.gpRegs[RA].output;

    this.memory.updateAddress();

    this.gpRegs[RA].disable();

    // step6
    this.gpRegs[RB].enable();
    this.gpRegs[RB].set();

    this.memory.update(false, true);
    this.gpRegs[RB].update();

    this.memory.updateSet(false);
    this.gpRegs[RB].unSet();

    this.memory.updateEnable(false);
    this.gpRegs[RB].disable();

    this.mainBus.clear();
  };

  private storeInstr = (RA: number, RB: number) => {
    this.mainBus.clear();

    this.gpRegs[RA].enable();
    this.mainBus.data = this.gpRegs[RA].output;
    this.memory.updateAddress();

    this.gpRegs[RA].disable();
    this.mainBus.clear();

    this.gpRegs[RB].enable();
    this.gpRegs[RB].update();

    this.memory.update(true, false);
    this.memory.updateSet(false);
    this.memory.updateEnable(false);

    this.gpRegs[RB].disable();

    this.mainBus.clear();
  };

  private dataInstr = (RB: number) => {
    this.mainBus.clear();

    this.iARegister.enable();
    this.mainBus.data = this.iARegister.output;
    this.busOne.update(true);

    this.memory.updateAddress();

    this.alu.op = [false, false, false];
    this.alu.update();

    this.accReg.set();
    this.accReg.update();
    this.accReg.unSet();

    this.iARegister.disable();

    this.mainBus.clear();

    this.gpRegs[RB].set();
    this.memory.update(false, true);

    this.gpRegs[RB].update();
    this.gpRegs[RB].unSet();

    this.memory.updateEnable(false);

    this.mainBus.clear();

    this.accReg.enable();
    this.accReg.update();
    this.accReg.disable();

    this.iARegister.enable();
    this.iARegister.set();
    this.iARegister.update();
    this.iARegister.unSet();
    this.iARegister.disable();

    this.mainBus.clear();
  };

  private jmprInstr = (RB: number) => {
    this.mainBus.clear();

    this.gpRegs[RB].enable();
    this.gpRegs[RB].update();
    this.gpRegs[RB].disable();

    this.iARegister.enable();
    this.iARegister.set();
    this.iARegister.update();
    this.iARegister.unSet();
    this.iARegister.disable();

    this.mainBus.clear();
  };

  private jmpInstr = (RB: number) => {
    this.mainBus.clear();

    this.mainBus.data = this.iARegister.output;

    this.memory.updateAddress();

    this.mainBus.clear();

    this.memory.update(false, true);

    this.iARegister.enable();
    this.iARegister.set();
    this.iARegister.update();
    this.iARegister.unSet();
    this.iARegister.disable();

    this.mainBus.clear();
  };
}

export default Cpu;
