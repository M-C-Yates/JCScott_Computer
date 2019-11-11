import Bit from './Bit';
import Wire from './Wire';

class Byte {
	private bits: Bit[] = new Array(8).fill(new Bit());
	private value: boolean[] = new Array(8).fill(false);
	constructor() {}

	get = () => {
		return this.value;
	};
	update = (bitInputs: boolean[], inputS: boolean) => {
		if (inputS) {
			this.bits.forEach((bit, i) => {
				bit.update(bitInputs[i], inputS);
				this.value[i] = this.bits[i].get();
			});
		}
	};
}

export default Byte;
