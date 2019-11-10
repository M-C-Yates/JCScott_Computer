import { Nand } from './../gates/Gates';
import Wire from '../gates/Wire';

class Bit {
	private nand1 = new Nand();
	private nand2 = new Nand();
	private nand3 = new Nand();
	private nand4 = new Nand();
	private output: Wire = new Wire('o', false);
	constructor() {}
	get = (): boolean => {
		return this.output.get();
	};
	update = (inputI: boolean, inputS: boolean) => {
		this.nand1.update(inputI, inputS);
		this.nand2.update(this.nand1.get(), inputS);
		this.nand4.update(this.nand3.get(), this.nand2.get());
		this.nand3.update(this.nand1.get(), this.nand4.get());
		this.nand4.update(this.nand3.get(), this.nand2.get());
		if (inputS) {
			this.output.set(this.nand3.get());
		}
		return;
	};
}

export default Bit;
