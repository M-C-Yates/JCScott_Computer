import { Decoder4x16 } from "./components/Decoders";

const decoder = new Decoder4x16();
decoder.update(true, true, false, true);
console.log(decoder.get());
