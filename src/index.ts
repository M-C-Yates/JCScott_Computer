import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

cpu.setRam([0, 0], 0b10010001);
cpu.setGp(0, 0b10);
cpu.setGp(1, 0b110);

for (let i = 0; i < 7; i++) {
  cpu.cycle();
}
