import Wire from './Wire';
interface Connection {
	Connection: Wire;
}
class Gate {
	input: Connection[] = [];
	value: number = 0;
	output: Connection[] = [];

	constructor() {}
	print(): void {
		console.log(this.output);
	}

	addOutput = (value: number, name: string): void => {
		// this.output.push({ value, name });
		return;
	};
}

export class Nand extends Gate {
	constructor(inputs: any) {
		super();
		this.input = [...inputs];
		// this.output.push({ value: 1, name: 'carry' });
	}
	run = (): void => {
		// if (this.input[0].value === 1 && this.input[1].value === 1) {
		// 	this.output[0].value = 0;
		// } else {
		// 	this.output[0].value = 1;
		// }
	};
}

class Not {}
export default Nand;
