import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b01100000);

cpu.cycle();

console.log(cpu.readFlags());
