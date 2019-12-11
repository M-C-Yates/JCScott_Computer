import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b10000110);
cpu.setGp(1, 0b1);
cpu.setGp(2, 0b1);
// cpu.setIAR(0b1000);
cpu.cycle();

cpu.setRam([0, 1], 0b01010010);
cpu.setRam([0, 2], 0b00001110);

cpu.cycle();

console.log(cpu.IAR);
