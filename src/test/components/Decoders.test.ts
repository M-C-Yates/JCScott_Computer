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
