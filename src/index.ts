import Register from "./components/Register";

const register = new Register("f");
const registerByte = [false, false, false, false, false, false, false, true];
register.update(registerByte, true, true);
console.log(register.get());
