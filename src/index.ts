import Memory256B from "./memory/Memory";
import Bus from "./components/Bus";

const bus = new Bus(8);
const addressBus = new Bus(8);
const memory = new Memory256B(bus, bus, addressBus);

const addressByte = [false, false, false, false, true, true, true, true];
const testVal = [false, false, false, false, false, false, true, true];

addressBus.set(addressByte);
bus.set(testVal);

memory.update(true, true);
console.log(memory.readMem(0, 15));
