import { binToBool } from "./../../utils/binUtils";
import Cpu from "../../cpu/Cpu";

describe("Cpu alu", () => {
  const cpu = new Cpu();

  it("ALU Add opcode should add RA and RB together and store the result in RB", () => {
    cpu.setRam([0, 0], 0b10000110);
    cpu.setGp(1, 0b1);
    cpu.setGp(2, 0b1);

    cpu.cycle();

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

    cpu.cycle();

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

    cpu.cycle();

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

    cpu.cycle();

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

    cpu.cycle();

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

    cpu.cycle();

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

    cpu.cycle();

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
    cpu.cycle();

    expect(cpu.readFlags()[1]).toEqual(true);
    expect(cpu.readFlags()[2]).toEqual(false);
  });
});

describe("Cpu Instrs", () => {
  const cpu = new Cpu();
  it("LD should correcly store contents of the location indicated by the address in RA in RB", () => {
    cpu.setRam([0, 0], 0b00000001);
    cpu.setRam([0, 1], 0b00000101);
    cpu.setGp(0, 0b00000001);
    cpu.setGp(1, 0b00);
    cpu.cycle();

    expect(cpu.readGp(1)).toEqual([
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true
    ]);
  });

  it("ST should correctly store contents of RB to address in RA", () => {
    cpu.setIAR(0b10);
    cpu.setRam([0, 2], 0b00010001);
    cpu.setGp(0, 0b0000011);
    cpu.setGp(1, 0b10101);

    cpu.cycle();
    expect(cpu.readMem(0, 3)).toEqual([
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true
    ]);
  });

  it("DATA should correctly store contents from ram into RB", () => {
    cpu.setIAR(0b100);
    cpu.setRam([0, 4], 0b00100000);
    cpu.setRam([0, 5], 0b1111);

    cpu.cycle();
    expect(cpu.readGp(0)).toEqual([
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

  it("JMPR should move contents from RB into the IAR", () => {
    cpu.setIAR(0b110);
    cpu.setRam([0, 6], 0b00110000);
    cpu.setGp(0, 0b1000);

    cpu.cycle();
    expect(cpu.IAR).toEqual([
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ]);
  });
});
