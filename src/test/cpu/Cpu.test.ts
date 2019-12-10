import { binToBool } from "./../../utils/binUtils";
import Cpu from "../../cpu/Cpu";

describe("Cpu", () => {
  const cpu = new Cpu();

  const cycleCpu = () => {
    for (let i = 0; i < 1; i++) {
      cpu.cycle();
    }
  };

  it("ALU Add opcode should add RA and RB together and store the result in RB", () => {
    cpu.setRam([0, 0], 0b10000110);
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
    cpu.setRam([0, 1], 0b10010001);
    cpu.setGp(0, 0b10);
    cpu.setGp(1, 0b110);

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
  it("ALU NOT should correcly NOT contents of RA to left and place result in RB", () => {
    cpu.setRam([0, 3], 0b10111001);
    cpu.setGp(2, 0b00001111);
    cpu.setGp(1, 0b11);

    cycleCpu();

    expect(cpu.readGp(1)).toEqual([
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false
    ]);
  });

  it("ALU AND should correcly AND contents of RA to left and place result in RB", () => {
    cpu.setRam([0, 4], 0b11001001);
    cpu.setGp(2, 0b00001011);
    cpu.setGp(1, 0b00001101);

    cycleCpu();

    expect(cpu.readGp(1)).toEqual([
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true
    ]);
  });

  it("ALU OR should correcly OR contents of RA to left and place result in RB", () => {
    cpu.setRam([0, 5], 0b11011001);
    cpu.setGp(2, 0b00001011);
    cpu.setGp(1, 0b00001101);

    cycleCpu();

    expect(cpu.readGp(1)).toEqual([
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true
    ]);
  });

  it("ALU XOR should correcly XOR contents of RA to left and place result in RB", () => {
    cpu.setRam([0, 6], 0b11101001);
    cpu.setGp(2, 0b00001011);
    cpu.setGp(1, 0b00001101);

    cycleCpu();

    expect(cpu.readGp(1)).toEqual([
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false
    ]);
  });

  it("ALU XOR should correcly XOR contents of RA to left and place result in RB", () => {
    cpu.setRam([0, 6], 0b11111001);
    cpu.setGp(2, 0b11);
    cpu.setGp(1, 0b01);

    cycleCpu();
    console.log(cpu.readFlags());
    expect(cpu.readFlags()[1]).toEqual(true);
    expect(cpu.readFlags()[2]).toEqual(false);
  });
});
