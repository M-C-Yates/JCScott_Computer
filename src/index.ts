import Bit from './components/Bit';

const bit = new Bit();
bit.update(true, false);
bit.update(false, false);
bit.update(true, true);
bit.update(false, true);
bit.update(false, false);

console.log(bit.get());
