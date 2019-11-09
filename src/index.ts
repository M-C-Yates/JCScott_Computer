import Nand from './gates/index';

const wire1 = { value: 1, name: 'input' };
const wire2 = { value: 1, name: 'input' };

const gate1 = new Nand([wire1, wire2]);
console.log(gate1.run());
gate1.print();
