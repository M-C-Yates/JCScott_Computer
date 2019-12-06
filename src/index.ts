import Cpu from "./cpu/Cpu";
import binToString, { binToBool, boolToBinary } from "./utils/binUtils";

const cpu = new Cpu();

cpu.cycle();
