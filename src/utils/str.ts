export const encryptPhone = (str: string) => {
  const len = str.length;

  let res = '';
  for (let i = 0; i < len; i++) {
    if (i <= 3 || i >= len - 2) {
      res += str[i];
    } else {
      res += '*';
    }
  }

  return res;
};
