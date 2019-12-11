import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b01000000);
cpu.setRam([0, 1], 0b1000);

cpu.cycle();

console.log(cpu.IAR);
