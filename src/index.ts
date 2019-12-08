import Cpu from "./cpu/Cpu";

const cpu = new Cpu();

for (let i = 0; i < 7; i++) {
  cpu.cycle();
}
