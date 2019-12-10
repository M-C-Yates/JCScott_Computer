import binToString, { binToBool, boolToBinary } from "./../utils/binUtils";
import { Decoder3x8, InstrDecoder3x8 } from "./../components/Decoders";
import { And, And3, Not, Or, Or4, Or3, Or5, Or6 } from "./../circuit/Gates";
import Register from "../components/Register";
import Bus from "../components/Bus";
import Memory256B from "../memory/Memory";
import BusOne from "../components/BusOne";
import Alu from "../alu/Alu";
import Stepper from "../components/Stepper";
import Decoder2x4 from "../components/Decoders";
import { throwStatement } from "@babel/types";

class Cpu {
  private clockState: boolean = false;

  // busses
  private accBus = new Bus(8);
  private aluToFlagBus = new Bus(8);
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
  private stepper = new Stepper();
  private iRegister = new Register(this.mainBus, this.controlBus, "IR"); // Instruction Register
  private iARegister = new Register(this.mainBus, this.controlBus, "IAR"); // Instruction Address Register

  // decoders
  private instructionDecoderEnables2x4: Decoder2x4[] = [
    new Decoder2x4(),
    new Decoder2x4()
  ];
  private instructionDecoderSet2x4: Decoder2x4 = new Decoder2x4();
  private instructionDecoder3x8: InstrDecoder3x8 = new InstrDecoder3x8();
  // gates
  private step4Gates: And[] = new Array(8);
  private step4Gate3And = new And3();
  private step5Gates: And[] = new Array(6);
  private step5Gate3And = new And3();
  private step6Gates = [new And3(), new And3()];
  private step6Gates2And = new And();

  private carryTemp: boolean = false;

  constructor() {
    const initVal = new Array(8).fill(false);
    this.flagsReg.enable();
    this.tmpReg.enable();
    this.iRegister.enable();
    this.iARegister.disable();
    this.flagsReg.update(initVal);
    this.tmpReg.update(initVal);
    this.iARegister.setByte(0b0);
    for (let i = 0; i < 8; i++) {
      if (i < 6) {
        this.step5Gates[i] = new And();
      }
      this.step4Gates[i] = new And();
    }
  }
  cycle = () => {
    this.clockState = true;
    this.step();
    // this.clockState = false;
    // this.step();
  };
  private step = () => {
    this.stepper.update(this.clockState);
    // switch (this.stepper.getIndex()) {
    // case 0:
    this.alu.op = [false, false, false];
    this.runStepOne();
    // break;
    // case 1:
    this.runStepTwo();
    // break;
    // case 2:
    this.runStepThree();
    // break;
    // case 3:
    // break;
    // default:
    // break;
    // }
    this.handleInstruction();
    this.mainBus.clear();
  };

  private instructionDecode = () => {
    const instruction = this.iRegister.readByte();
    this.instructionDecoderEnables2x4[0].update(instruction[4], instruction[5]);
    this.instructionDecoderEnables2x4[1].update(instruction[6], instruction[7]);

    // const op = [instruction[1], instruction[2], instruction[3]];
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
    this.instructionDecoderSet2x4.update(false, true);
    this.memory.setMem(cell[0], cell[1], byte);
  };

  readFlags = () => {
    return this.flagBus.data;
  };

  readGp = (reg: number) => {
    return this.gpRegs[reg].readByte();
  };

  private handleInstruction = () => {
    const instruction = this.instructionDecode();
    const RA = instruction[2];
    const RB = instruction[3];
    const op = boolToBinary(instruction[1]);

    if (this.clockState) {
      // instruction breakdown
      // alu | op | RA | RB
      switch (instruction[0]) {
        case true:
          this.alu.op = [...instruction[1]];
          const ADD = "00000000";

          // const SHR = boolToBinary([false, false, true]);
          const SHR = "00000001";

          // const SHL = boolToBinary([false, true, false]);
          const SHL = "00000010";

          // const NOT = boolToBinary([false, true, true]);
          const NOT = "00000011";

          // const AND = boolToBinary([true, false, false]);
          const AND = "00000100";

          // const OR = boolToBinary([true, false, true]);
          const OR = "00000101";

          // const XOR = boolToBinary([true, true, false]);
          const XOR = "00000110";

          // const CMP = boolToBinary([true, true, true]);
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
          switch (instruction[1]) {
            case [false, false, false]:
              // 0000 RARB | LD RA,RB | load RB from ram addr in RA
              break;
            case [false, false, true]:
              // 0001 RARB | ST RA,RB | store RB to ram addr in RA
              break;
            case [false, true, false]:
              // 0010 00RB | DATA RB,addr | load these 8 bits into RB;
              break;
            case [false, true, true]:
              // 0011 00RB | JMPR RB | jump to the addr in RB
              break;
            case [true, false, false]:
              // 0100 0000 | JMP addr | jump to the address in the next byte
              break;
            case [true, false, true]:
              // 0101 caez | JCAEZ addr | jump if any tested Flag is on
              break;
            case [true, true, false]:
              // 0110 0000 | CLF | clear all flags
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  };

  private runStepOne = () => {
    this.accReg.enable();

    this.iARegister.enable();
    this.iARegister.set();
    this.iARegister.update;
    this.mainBus.data = this.iARegister.output;
    this.accReg.set();
    this.busOne.update(true);

    this.memory.updateAddress();
    this.alu.update();
    this.accReg.update();

    this.accReg.unSet();

    this.accReg.disable();
    this.iARegister.disable();
    this.mainBus.clear();
  };

  private runStepTwo = () => {
    this.memory.setBus();

    this.iRegister.set();
    this.iRegister.update();

    this.iRegister.unSet();

    this.mainBus.clear();
  };

  private runStepThree = () => {
    this.accReg.enable();
    this.accReg.setBus();

    this.iARegister.enable();
    this.iARegister.set();

    this.iARegister.update();

    this.iARegister.unSet();
    this.iARegister.disable();

    this.accReg.disable();
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
    this.stepper.update(this.clockState);
    // step 5

    this.flagsReg.enable();

    this.gpRegs[RA].enable();
    this.gpRegs[RA].update();

    this.flagsReg.set();
    this.alu.update();
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
    this.stepper.update(this.clockState);
    // step6

    this.gpRegs[RB].enable();
    this.gpRegs[RB].set();
    this.accReg.enable();

    this.accReg.setBus();

    this.gpRegs[RB].update();
    this.gpRegs[RB].unSet();

    this.accReg.disable();
    this.gpRegs[RB].disable();

    this.mainBus.clear();
    this.stepper.update(this.clockState);
  };

  private aluOneInputInstr = (RA: number, RB: number) => {
    this.stepper.update(this.clockState);
    // step5

    this.gpRegs[RA].enable();
    this.gpRegs[RA].update();

    this.accReg.enable();
    this.accReg.set();

    this.alu.update();

    this.accReg.update();

    this.accReg.unSet();
    this.accReg.disable();

    this.gpRegs[RA].disable();

    this.mainBus.clear();
    this.stepper.update(this.clockState);

    // step6
    this.gpRegs[RB].enable();
    this.gpRegs[RB].set();

    this.accReg.enable();
    this.accReg.update();

    this.gpRegs[RB].update();

    this.accReg.disable();

    this.gpRegs[RB].unSet();
    this.gpRegs[RB].disable();

    this.mainBus.clear();
    this.stepper.update(this.clockState);
  };

  private cmpInstr = (RA: number, RB: number) => {
    this.gpRegs[RB].enable();
    this.gpRegs[RB].update();

    this.tmpReg.set();
    this.tmpReg.update();
    this.tmpReg.unSet();

    this.gpRegs[RB].disable();

    this.mainBus.clear();
    this.stepper.update(this.clockState);
    // step 5

    this.gpRegs[RA].enable();
    this.gpRegs[RA].update();

    this.alu.update();
    console.log(this.flagBus.data);

    this.accReg.set();
    this.accReg.enable();
    this.accReg.update();
    this.accReg.disable();
    this.accReg.unSet();

    this.gpRegs[RA].disable();

    this.mainBus.clear();
    this.stepper.update(this.clockState);
  };
}

export default Cpu;
