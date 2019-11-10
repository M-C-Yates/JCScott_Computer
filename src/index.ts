import Nand from './gates/index';

const gate1 = new Nand();

gate1.update(true, true);
console.log(gate1.get());
