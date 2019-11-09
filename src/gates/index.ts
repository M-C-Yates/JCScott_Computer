class Nand {
	output: number[] = [];
	input: number[] = [];
	constructor(private a: number, private b: number) {
		this.input.push(a);
		this.input.push(b);
		if (this.input[0] === 1 && this.input[1] === 1) {
			this.output[0] = 0;
		} else {
			this.output[0] = 1;
		}
	}

	run = (): number[] => {
		return this.output;
	};

	print(): void {
		console.log(this.input);
	}
}

export default Nand;
