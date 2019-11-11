import Enabler from './components/Enabler';

const enabler = new Enabler();
const enabler2 = new Enabler();
enabler.connectOutput(enabler2);
enabler.setInputWire(0, true);
enabler.setInputWire(1, true);
enabler.setInputWire(2, true);
enabler.setInputWire(3, true);
enabler.update(true);
console.log(enabler);
