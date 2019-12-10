import Cpu from "./cpu/Cpu";

const cpu = new Cpu();
const SHL = 0b10101101;

cpu.setRam([0, 0], SHL);
cpu.setGp(3, 0b1);
cpu.setGp(1, 0b0);

cpu.cycle();

console.log(cpu.readGp(1));
