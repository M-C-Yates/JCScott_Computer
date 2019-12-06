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
  private clockEnable: boolean = false;
  private clockSet: boolean = false;

  // busses
  private accBus = new Bus(8);
  private addressBus = new Bus(8);
  private aluBus = new Bus(8);
  private aluToFlagBus = new Bus(8);
  private controlBus = new Bus(8);
  private ioBus = new Bus(8);
  private flagBus = new Bus(8);
  private mainBus = new Bus(8);
  private tmpBus = new Bus(8);

  private memory = new Memory256B(this.mainBus, this.mainBus);
  private busOne = new BusOne(this.tmpBus, this.tmpBus);

  // general purpose registers
  private register1 = new Register(this.mainBus, this.mainBus, "gp one");
  private register2 = new Register(this.mainBus, this.mainBus, "gp two");
  private register3 = new Register(this.mainBus, this.mainBus, "gp three");
  private register4 = new Register(this.mainBus, this.mainBus, "gp four");

  private tmpReg = new Register(this.mainBus, this.tmpBus, "tmp");
  private accReg = new Register(this.accBus, this.mainBus, "acc");
  private flagsReg = new Register(this.aluToFlagBus, this.flagBus, "flags");

  // components
  private alu = new Alu(
    this.aluBus,
    this.tmpBus,
    this.accBus,
    this.aluToFlagBus
  );

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

  // flag gates

  private irInstructionAndGate = new And3();
  private irInstructionNotGate = new Not();
  private irBit4NotGate = new Not();
  private irSetAndGate = new And();

  private ioBusEnableGate = new And();
  private ioBusSetGate = new And();

  private registerAEnableOrGate = new Or3();
  private registerBEnableOrGate = new Or4();
  private registerBSetOrGate = new Or4();
  private registerAEnable = false;
  private registerBEnable = false;

  private accEnableOrGate = new Or4();
  private accEnableAndGate = new And();
  private accSetOrGate = new Or4();
  private accSetAndGate = new And();

  private busOneEnableOrGate = new Or4();

  private iarEnableOrGate = new Or4();
  private iarEnableAndGate = new And();
  private iarSetOrGate = new Or6();
  private iarSetAndGate = new And();

  private ramEnableOrGate = new Or5();
  private ramEnableAndGate = new And();
  private ramSetAndGate = new And();

  private gpRegEnableAndGates: And[] = new Array(8);
  private gpRegEnableOrGates: Or[] = [new Or(), new Or(), new Or(), new Or()];
  private gpRegSetAndGates: And3[] = [
    new And3(),
    new And3(),
    new And3(),
    new And3()
  ];

  private marSetOrGate = new Or6();
  private marSetAndGate = new And();

  private tmpSetAndGate = new And();

  private flagsSetOrGate = new Or();
  private flagsSetAndGate = new And();

  private registerBSet: boolean = false;

  private flagStateGates = [new And(), new And(), new And(), new And()];
  private flagStateOrGate = new Or();

  private aluopAndGates = [new And3(), new And3(), new And3()];

  private carryTemp: boolean = false;

  constructor() {
    const initVal = new Array(8).fill(false);
    this.flagsReg.enable();
    this.tmpReg.enable();
    this.iRegister.enable();
    this.iARegister.disable();
    this.flagsReg.update(initVal);
    this.tmpReg.update(initVal);

    for (let i = 0; i < 8; i++) {
      if (i < 6) {
        this.step5Gates[i] = new And();
      }
      this.step4Gates[i] = new And();
      this.gpRegEnableAndGates[i] = new And();
    }
  }
  cycle = () => {
    this.clockState = true;
    this.step();
    this.clockState = false;
    this.step();
  };
  step = () => {
    this.stepper.update(this.clockState);
    this.runStepOne();
    this.runStepTwo();
    this.runStepThree();

    // this.runStep4Gates();
    // this.runStep5Gates();
    // this.runStep6Gates();

    // this.runEnable(this.clockState);
    // this.updateStates();

    // if (this.clockState) {
    //   this.runEnable(false);
    //   this.updateStates();
    // }

    // this.runSet(this.clockState);
    // this.updateStates();

    // if (this.clockState) {
    //   this.runSet(false);
    //   this.updateStates();
    // }

    this.mainBus.clear();
  };

  updateInstructionDecoder3x8 = () => {};

  runStepOne = () => {
    const step = this.stepper.get()[0];
    this.busOne.update(step);

    this.clockEnable = true;
    this.iarEnableAndGate.update(this.clockEnable, step);
    this.iARegister.enable();

    this.clockSet = true;

    this.marSetAndGate.update(this.clockSet, step);

    this.accSetAndGate.update(this.clockSet, step);
    this.accReg.set();
    this.clockSet = false;
    this.accReg.disable();
    this.clockEnable = false;
    this.iARegister.disable();
  };

  runStepTwo = () => {
    const step = this.stepper.get()[1];
    this.clockEnable = true;

    this.clockSet = true;
    this.irSetAndGate.update(this.clockSet, step);
    this.iRegister.set();

    this.clockSet = false;
    this.iRegister.unSet();
    this.ramEnableAndGate.update(this.clockEnable, step);
    this.clockEnable = false;
  };

  runStepThree = () => {
    const step = this.stepper.get()[2];
    this.clockEnable = true;

    this.clockSet = true;
    this.iarSetAndGate.update(this.clockSet, step);
    this.accEnableAndGate.update(this.clockEnable, step);

    this.clockSet = false;

    this.clockEnable = false;
  };

  // runStep4Gates = () => {
  //   this.step4Gates[0].update(
  //     this.stepper.get()[3],
  //     this.iRegister.readByte()[4]
  //   );
  //   for (let i = 1; i < 8; i++) {
  //     this.step4Gates[i].update(
  //       this.stepper.get()[3],
  //       this.instructionDecoder3x8.selectorGates[i].get()
  //     );
  //   }
  //   this.step4Gate3And.update(
  //     this.stepper.get()[3],
  //     this.instructionDecoder3x8.selectorGates[7].get(),
  //     this.ir
  //   );
  // };
}

export default Cpu;
