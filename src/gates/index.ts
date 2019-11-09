import Wire from './Wire';

class Gate {
	input: Wire[] = [];
	output: Wire[] = [{ value: 0, name: 'output' }];

	constructor() {}
	print(): void {
		console.log(this.output);
	}

	addOutput = (value: number, name: string): void => {
		this.output.push({ value, name });
		return;
	};
}

class Nand extends Gate {
	constructor(inputs: any) {
		super();
		this.input = [...inputs];
		this.output.push({ value: 1, name: 'carry' });
	}
	run = (): Wire => {
		if (this.input[0].value === 1 && this.input[1].value === 1) {
			this.output[0].value = 0;
		} else {
			this.output[0].value = 1;
		}

		return this.output[0];
	};
}
export default Nand;
