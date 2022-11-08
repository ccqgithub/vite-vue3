export const joinPath = (...args: string[]) => {
  const str = args.reduce((res, cur) => {
    return `${res}/${cur}`;
  }, '');
  return str.replace(/\/{2}/g, '/');
};

export const trimPath = (p: string) => {
  return p.replace(/^\/+/g, '').replace(/\/+$/g, '');
};
