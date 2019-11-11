import Byte from './circuit/Byte';

const byte = new Byte();

const byteIn = [true, false, false, true, false, true, true, false];
const byteIn2 = [false, false, false, false, false, false, false, false];
const byteIn3 = [true, false, false, true, false, true, true, false];

byte.update(byteIn, true);
byte.update(byteIn2, false);
console.log(byte.get());
byte.update(byteIn2, true);
byte.update(byteIn3, false);
console.log(byte.get());
