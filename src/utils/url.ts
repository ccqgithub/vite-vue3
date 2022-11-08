import qs from 'qs';

export const joinUrl = (...paths: string[]) => {
  const url = paths.join('/');
  return url.replace(/(^|\w)[\/]{2,}/g, '$1/');
};

export const joinUrlParams = (url: string, params: Record<string, string>) => {
  const base = url.split('?')[0];
  const search = url.replace(/^.+?\?/, '');
  const data = qs.parse(search);
  return `${base}?${qs.stringify({ ...data, ...params })}`;
};
