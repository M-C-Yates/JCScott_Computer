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

class Not {}
export default Nand;
