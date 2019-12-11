<h1 align="center">basic-computer</h1>

![](https://github.com/M-C-Yates/basic-computer/workflows/test/badge.svg)

> An implementation of John C. Scotts 8-bit computer written in typescript.

## Specs

- `Memory`: 256 bytes
- 4x geneRAl purpose registers

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Instructions

| instruction code | shorthand | description                                                                                                     |
| :--------------: | :-------: | --------------------------------------------------------------------------------------------------------------- |
|    1000 rarb     |    ADD    | Adds contents of ra and rb together,<br>then places result into rb.                                             |
|    1001 rarb     |    SHR    | Shifts contents of ra to the right by one bit,<br> then places result the into rb.                              |
|    1010 rarb     |    SHL    | shifts contents of ra to the left by one bit,<br> then places the result into rb.                               |
|    1011 rarb     |    NOT    | Performs a NOT operation between the bytes stored in ra and rb,<br> then places the result into rb.             |
|    1100 rarb     |    AND    | Performs a AND operation between the bytes stored in ra and rb,<br> then places the result into rb.             |
|    1101 rarb     |    OR     | Performs a OR operation between the bytes stored in ra and rb,<br> then places the result into rb.              |
|    1110 rarb     |    XOR    | Performs a XOR operation between the bytes stored in ra and rb,<br> then places the result into rb.             |
|    1111 rarb     |    CMP    | Compares the bytes stored in ra and rb,<br> discards output byte, places result of comparison in flag register. |
|    0000 rarb     |    LD     | Loads contents of ram address stored from ra into rb.                                                           |
|    0001 rarb     |    ST     | Stores contents of rb into ram address from ra.                                                                 |
|    0010 00rb     |   DATA    | Loads the byte following this instruction into rb.                                                              |
|    0011 00rb     |   JMPR    | Jump to the address stored in rb.                                                                               |
|    0100 0000     |    JMP    | Jump to the address indicated in the byte following this instruction.                                           |
|    0101 caez     |   JCAEZ   | Jump if any tested flag is on using JMP, else move IAR forward two bytes.                                       |
|    0110 0000     |    CLF    | Clears the flag register.                                                                                       |

## License

Copyright © 2019 [Matthew Yates](https://github.com/M-C-Yates).<br />
This project is [MIT](https://github.com/M-C-Yates/basic-computer/blob/master/LICENSE) licensed.
