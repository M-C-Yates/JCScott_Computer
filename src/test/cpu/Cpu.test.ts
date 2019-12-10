import { binToBool } from "./../../utils/binUtils";
import Cpu from "../../cpu/Cpu";

describe("Cpu", () => {
  const cpu = new Cpu();
  const ADD = 0b10000110;
  const SHR = 0b10010001;
  const SHL = 0b10101101;

  const cycleCpu = () => {
    for (let i = 0; i < 1; i++) {
      cpu.cycle();
    }
  };

  it("ALU Add opcode should add RA and RB together and store the result in RB", () => {
    cpu.setRam([0, 0], ADD);
    cpu.setGp(1, 0b1);
    cpu.setGp(2, 0b1);

    cycleCpu();

    expect(cpu.readGp(2)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);
  });

  it("ALU SHR should correctly shift contents of RA to right and place result in RB", () => {
    cpu.setRam([0, 1], SHR);
    cpu.setGp(0, 0b10);
    cpu.setGp(1, 0b110);
    // cpu.setIAR(0b0);

    cycleCpu();

    expect(cpu.readGp(1)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    ]);
  });
  it("ALU SHL should correcly shift contents of RA to left and place result in RB", () => {
    cpu.setRam([0, 2], 0b10101101);
    cpu.setGp(3, 0b1);
    cpu.setGp(1, 0b11);
    // cpu.setIAR(0b0);

    cycleCpu();

    expect(cpu.readGp(1)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);
  });
});