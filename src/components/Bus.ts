import Wire from '../circuit/Wire';
import ComponentInterface from './Component';

class Bus {
	private wires: Wire[] = [];
	constructor(public width: number) {
		for (let i = 0; i < width; i++) {
			this.wires.push(new Wire('b', false));
		}
	}

	connectOutput = (component: ComponentInterface) => {};
	setInputWire = (index: number, value: boolean) => {
		this.wires[index].set(value);
	};
	getOutputWire = (index: number) => {
		return this.wires[index].get();
	};
	setValue = (value: number) => {
		let x = 0;
		for (let i = this.width; i > 0; i--) {
			let r = value & (1 << x);
			if (r != 0) {
				this.setInputWire(i, true);
			} else {
				this.setInputWire(i, false);
			}
			x++;
		}
	};

	string = () => {
		let result = '';
		for (let i = 0; i < this.width; i++) {
			if (this.getOutputWire(i)) {
				result += '1';
			} else {
				result += '0';
			}
		}
		return result;
	};
}

export default Bus;
