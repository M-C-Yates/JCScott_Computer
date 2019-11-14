import Enabler from "./components/Enabler";

const enabler = new Enabler();

const enabInput = [true, false, true, false, true, false, true, false];
// enabler.get();
enabler.update(enabInput, true);
console.log("==================");

enabler.get();
