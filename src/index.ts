import { Decoder3x8 } from "./components/Decoders";

const decoder = new Decoder3x8();

decoder.update(false, false, true);

console.log(decoder.get());
