import Bit from '../../components/Bit';

describe('Bit testing', () => {
	it('truth 1', () => {
		const bit = new Bit();
		bit.update(false, true);
		expect(bit.get()).toEqual(false);
		bit.update(false, false);
		expect(bit.get()).toEqual(false);
		bit.update(true, true);
		expect(bit.get()).toEqual(true);
		bit.update(false, false);
		expect(bit.get()).toEqual(true);
	});
});
