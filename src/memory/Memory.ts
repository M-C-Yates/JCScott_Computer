import Bus from "../components/Bus";
import Register from "../components/Register";
import Cell from "./Cell";
import { Decoder4x16, Decoder8x256 } from "../components/Decoders";
import { And } from "../circuit/Gates";

// class Memory256B {
//   private addressRegister = new Register(
//     this.addressBus,
//     this.addressBus,
//     "MAR"
//   );
//   private address = new Array(2).fill(0);
//   private decoderCol = new Decoder4x16();
//   private decoderRow = new Decoder4x16();
//   private memory: Cell[][] = new Array(16).fill([]);

//   constructor(
//     private inputBus: Bus,
//     private outputBus: Bus,
//     private addressBus: Bus
//   ) {
//     for (let i = 0; i < 16; i++) {
//       for (let j = 0; j < 16; j++) {
//         this.memory[i][j] = new Cell(this.inputBus, this.outputBus);
//       }
//     }
//     this.addressRegister.enable();
//   }
//   update = (set: boolean, enable: boolean) => {
//     this.addressRegister.set();
//     this.addressRegister.update();
//     this.addressRegister.unSet();

//     const address = this.addressRegister.get();
//     this.decoderRow.update(address[0], address[1], address[2], address[3]);
//     this.decoderCol.update(address[4], address[5], address[6], address[7]);

//     this.address[0] = this.decoderRow.getIndex();
//     this.address[1] = this.decoderCol.getIndex();
//     this.memory[this.address[0]][this.address[1]].update(set, enable);
//   };

//   readMem = (row: number, col: number) => {
//     return this.memory[row][col].get();
//   };
// }

class Memory256B {
  private addressRegister = new Register(this.inputBus, this.outputBus, "MAR");
  private address = new Array(2).fill(0);
  private decoderCol = new Decoder4x16();
  private decoderRow = new Decoder4x16();
  private memory: Cell[][] = new Array(16).fill([]);

  constructor(private inputBus: Bus, private outputBus: Bus) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.memory[i][j] = new Cell(this.inputBus, this.outputBus);
      }
    }
    this.addressRegister.enable();
  }

  updateAddress = () => {
    this.addressRegister.set();
    this.addressRegister.update();
    this.addressRegister.unSet();
  };
  update = (set: boolean, enable: boolean) => {
    const address = this.addressRegister.get();
    this.decoderRow.update(address[0], address[1], address[2], address[3]);
    this.decoderCol.update(address[4], address[5], address[6], address[7]);

    this.address[0] = this.decoderRow.getIndex();
    this.address[1] = this.decoderCol.getIndex();
    this.memory[this.address[0]][this.address[1]].update(set, enable);
  };

  readMem = (row: number, col: number) => {
    return this.memory[row][col].get();
  };
}
export default Memory256B;
