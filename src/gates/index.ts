import Wire from './Wire';
export class Nand {
	output: Wire = new Wire('o', false);
	constructor() {}
	get = (): boolean => {
		return this.output.get();
	};
	update = (inputA: boolean, inputB: boolean) => {
		this.output.set(!(inputA && inputB));
	};
}

export class Not extends Nand {
	constructor() {
		super();
	}
	update = (inputA: boolean) => {
		this.output.set(!inputA);
	};
}
export default Nand;
