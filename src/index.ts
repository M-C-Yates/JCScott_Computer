import Enabler from "./components/Enabler";

const enabler = new Enabler();

const enabInput = [true, false, true, false, true, false, true, false];
console.log(enabler.get());
enabler.update(enabInput, false);
console.log("\n ================== \n");
console.log(enabler.get());
