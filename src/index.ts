import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b00010001);
cpu.setGp(0, 0b11);
cpu.setGp(1, 0b1101);

cpu.cycle();

// console.log(cpu.readMem(0, 2));
