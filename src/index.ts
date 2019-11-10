import Nand, { Not } from './gates/index';

const gate1 = new Nand();

// gate1.update(true, true);
// console.log(gate1.get());

const not1 = new Not();
not1.update(false);
console.log(not1.get());
