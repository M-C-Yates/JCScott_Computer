const boolToBinary = (boolArr: boolean[]) => {
  return boolArr.reduce((res, x) => (res << 1) | x, 0);
};

export default boolToBinary;
