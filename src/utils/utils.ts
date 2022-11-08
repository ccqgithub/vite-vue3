export const trimParams = (
  params: Record<string, any>,
  trim: any[] = ['', null, undefined]
) => {
  const res: Record<string, any> = {};

  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (!trim.includes(val)) {
      res[key] = val;
    }
  });

  return res;
};
