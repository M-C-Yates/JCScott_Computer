interface ComponentInterface {
	connectOutput(component: ComponentInterface): void;
	getOutputWire(wire: number): boolean;
	setInputWire(wire: number, val: boolean): void;
}

export default ComponentInterface;
