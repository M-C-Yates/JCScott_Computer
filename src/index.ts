import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b00100000);
cpu.setRam([0, 1], 0b1111);

cpu.cycle();

console.log(cpu.readGp(0));
