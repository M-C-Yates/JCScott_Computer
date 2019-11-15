import { Decoder3x8, Decoder4x16 } from "./../../components/Decoders";
import Decoder2x4 from "../../components/Decoders";

describe("Decoder2x4", () => {
  const decoder = new Decoder2x4();
  it("should return correct outputs", () => {
    decoder.update(false, false);
    expect(decoder.get()).toEqual([true, false, false, false]);
    decoder.update(false, true);
    expect(decoder.get()).toEqual([false, true, false, false]);
    decoder.update(true, false);
    expect(decoder.get()).toEqual([false, false, true, false]);
    decoder.update(true, true);
    expect(decoder.get()).toEqual([false, false, false, true]);
  });
});

describe("Decoder3x8", () => {
  const decoder = new Decoder3x8();
  it("should return correct outputs", () => {
    decoder.update(false, false, false);
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual([
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
    expect(decoder.get()).toEqual((result[0] = true));
    result[0] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[1] = true));
    result[1] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[2] = true));
    result[2] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[3] = true));
    result[3] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[4] = true));
    result[4] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[5] = true));
    result[5] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[6] = true));
    result[6] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[7] = true));
    result[7] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[8] = true));
    result[8] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[9] = true));
    result[9] = false;

    decoder.update(false, false, false, false);
    expect(decoder.get()).toEqual((result[10] = true));
    result[10] = false;

    decoder.update(true, false, true, true);
    expect(decoder.get()).toEqual((result[11] = true));
    result[11] = false;

    decoder.update(true, true, false, false);
    expect(decoder.get()).toEqual((result[12] = true));
    result[12] = false;

    decoder.update(true, true, false, true);
    expect(decoder.get()).toEqual((result[13] = true));
    result[13] = false;

    decoder.update(true, true, true, false);
    expect(decoder.get()).toEqual((result[14] = true));
    result[14] = false;

    decoder.update(true, true, true, true);
    expect(decoder.get()).toEqual((result[15] = true));
    result[15] = false;
  });
});
