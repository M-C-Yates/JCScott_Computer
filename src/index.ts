import Nand, { And, Not } from './gates/index';

// const gate1 = new Nand();

// const not1 = new Not();

const and1 = new And();
and1.update(true, false);

let out = and1.get();
console.log(out);
