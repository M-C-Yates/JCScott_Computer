import { Decoder3x8 } from "./../../components/Decoders";
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
