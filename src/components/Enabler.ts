import And from '../circuit/Gates';
import ComponentInterface from './Component';
import Wire from '../circuit/Wire';

class Enabler implements ComponentInterface {
	private inputs: Wire[] = new Array(8).fill(new Wire('o', false));
	private gates: And[] = new Array(8).fill(new And());
	private outputs: Wire[] = new Array(8).fill(new Wire('o', false));
	private next: ComponentInterface | null = null;
	private value: boolean[] = new Array(8).fill(8);
	constructor() {}
	connectOutput = (component: ComponentInterface) => {
		this.next = component;
	};
	getOutputWire = (index: number): boolean => {
		return this.outputs[index].get();
	};
	getVal = () => {
		return this.outputs.map((wire) => {
			return wire.get();
		});
		// console.log(result);
	};
	setInputWire = (index: number, value: boolean): void => {
		this.inputs[index].set(value);
	};
	update = (enable: boolean) => {
		for (let i = 0; i < 8; i++) {
			this.gates[i].update(this.inputs[i].get(), enable);
			this.outputs[i].set(this.gates[i].get());
		}
		if (this.next != null) {
			for (let i = 0; i < 8; i++) {
				this.next.setInputWire(i, this.outputs[i].get());
			}
		}
	};
}

export default Enabler;
