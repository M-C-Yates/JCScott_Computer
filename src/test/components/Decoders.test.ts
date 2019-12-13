import { Decoder3x8, Decoder4x16 } from "./../../components/Decoders";
import Decoder2x4 from "../../components/Decoders";

describe("Decoder2x4", () => {
  const decoder = new Decoder2x4();
  it("should return correct outputs", () => {
    decoder.update(false, false);
    expect(decoder.output).toEqual([true, false, false, false]);
    decoder.update(false, true);
    expect(decoder.output).toEqual([false, true, false, false]);
    decoder.update(true, false);
    expect(decoder.output).toEqual([false, false, true, false]);
    decoder.update(true, true);
    expect(decoder.output).toEqual([false, false, false, true]);
  });
});

describe("Decoder3x8", () => {
  const decoder = new Decoder3x8();
  it("should return correct outputs", () => {
    decoder.update(false, false, false);
    expect(decoder.output).toEqual([
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);

    decoder.update(false, false, true);
    expect(decoder.output).toEqual([
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ]);

    decoder.update(false, true, false);
    expect(decoder.output).toEqual([
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false
    ]);

    decoder.update(false, true, true);
    expect(decoder.output).toEqual([
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false
    ]);

    decoder.update(true, false, false);
    expect(decoder.output).toEqual([
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ]);

    decoder.update(true, false, true);
    expect(decoder.output).toEqual([
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false
    ]);

    decoder.update(true, true, false);
    expect(decoder.output).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    ]);

    decoder.update(true, true, true);
    expect(decoder.output).toEqual([
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
});

describe("Decoder4x16", () => {
  const decoder = new Decoder4x16();
  const result = new Array(16).fill(false);
  it("should return correct outputs", () => {
    decoder.update(false, false, false, false);
    result[0] = true;
    expect(decoder.output).toEqual(result);
    result[0] = false;

    decoder.update(false, false, false, true);
    result[1] = true;
    expect(decoder.output).toEqual(result);
    result[1] = false;

    decoder.update(false, false, true, false);
    result[2] = true;
    expect(decoder.output).toEqual(result);
    result[2] = false;

    decoder.update(false, false, true, true);
    result[3] = true;
    expect(decoder.output).toEqual(result);
    result[3] = false;

    decoder.update(false, true, false, false);
    result[4] = true;
    expect(decoder.output).toEqual(result);
    result[4] = false;

    decoder.update(false, true, false, true);
    result[5] = true;
    expect(decoder.output).toEqual(result);
    result[5] = false;

    decoder.update(false, true, true, false);
    result[6] = true;
    expect(decoder.output).toEqual(result);
    result[6] = false;

    decoder.update(false, true, true, true);
    result[7] = true;
    expect(decoder.output).toEqual(result);
    result[7] = false;

    decoder.update(true, false, false, false);
    result[8] = true;
    expect(decoder.output).toEqual(result);
    result[8] = false;

    decoder.update(true, false, false, true);
    result[9] = true;
    expect(decoder.output).toEqual(result);
    result[9] = false;

    decoder.update(true, false, true, false);
    result[10] = true;
    expect(decoder.output).toEqual(result);
    result[10] = false;

    decoder.update(true, false, true, true);
    result[11] = true;
    expect(decoder.output).toEqual(result);
    result[11] = false;

    decoder.update(true, true, false, false);
    result[12] = true;
    expect(decoder.output).toEqual(result);
    result[12] = false;

    decoder.update(true, true, false, true);
    result[13] = true;
    expect(decoder.output).toEqual(result);
    result[13] = false;

    decoder.update(true, true, true, false);
    result[14] = true;
    expect(decoder.output).toEqual(result);
    result[14] = false;

    decoder.update(true, true, true, true);
    result[15] = true;
    expect(decoder.output).toEqual(result);
    result[15] = false;
  });
});
