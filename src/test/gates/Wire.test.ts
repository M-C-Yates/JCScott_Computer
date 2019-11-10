import Wire from '../../gates/Wire';

describe('Wire', () => {
	it('should be initialized with correct values', () => {
		const val = true;
		const wire = new Wire('o', val);
		expect(wire.name).toEqual('o');
		expect(wire.value).toEqual(true);
	});
	it('should let you set the value', () => {
		const wire = new Wire('o', false);
		expect(wire.value).toEqual(false);
		wire.set(true);
		expect(wire.value).toEqual(true);
	});
});
