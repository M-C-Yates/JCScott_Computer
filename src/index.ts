import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b00110000);
cpu.setGp(0, 0b1000);

cpu.cycle();

console.log(cpu.IAR);
