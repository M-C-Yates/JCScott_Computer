import Wire from '../../circuit/Wire';
import ComponentInterface from '../../components/Component';

class DummyComponent implements ComponentInterface {
	private wires: Wire[] = new Array(8).fill(new Wire('o', false));
	private next: ComponentInterface | null = null;

	connectOutput = (component: ComponentInterface) => {
		this.next = component;
	};
	getOutputWire = (index: number) => {
		return this.wires[index].get();
	};
	setInputWire = (index: number, value: boolean) => {
		this.wires[index].set(value);
	};
	update = () => {
		if (this.next)
			for (let i = 0; i < 8; i++) {
				this.next.setInputWire(i, this.wires[i].get());
			}
	};
}
export default DummyComponent;
