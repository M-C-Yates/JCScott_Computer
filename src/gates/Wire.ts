class Wire {
	constructor(public name: string, private value: boolean) {}
	set = (value: boolean) => {
		this.value = value;
	};
	get = () => {
		return this.value;
	};
}
export default Wire;
