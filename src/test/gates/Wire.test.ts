import Wire from '../../gates/Wire';

describe('Wire', () => {
	it('should be initialized with correct values', () => {
		const val = true;
		const wire = new Wire('o', val);
		expect(wire.name).toEqual('o');
		expect(wire.get()).toEqual(true);
	});
	it('should let you set the value', () => {
		const wire = new Wire('o', false);
		expect(wire.get()).toEqual(false);
		wire.set(true);
		expect(wire.get()).toEqual(true);
	});
});
