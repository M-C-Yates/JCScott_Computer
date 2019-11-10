// interface Wire {
// 	value: number;
// 	name: string;
// }

class Wire {
	constructor(public name: string, public value: boolean) {}
	set = (value: boolean) => {
		this.value = value;
	};
	get = () => {
		return this.value;
	};
}
export default Wire;
