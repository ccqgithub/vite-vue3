import * as path from 'path';
import * as crypto from 'crypto';

const cacheNames: Record<string, string> = {};

export const getUniqueName = (content: string, p: string): string => {
  const hash = crypto.createHash('md5');
  hash.update(content);
  const hashText = hash.digest('hex').substring(0, 5);
  // new
  if (!cacheNames[hashText]) {
    cacheNames[hashText] = p;
    return hashText;
  }
  // self
  if (cacheNames[hashText] === p) return hashText;
  // repeated
  return getUniqueName(`${content}~1`, p);
};

export const createClassNamehash = (args: {
  root: string;
  name: string;
  css: string;
  filename: string;
  prefix: string;
}) => {
  const { root, name, filename, prefix } = args;
  const parsedFilename = filename.split('?')[0]!;
  const p = path.relative(root, parsedFilename).replace(/\\/g, '/');
  const basename = path
    .basename(parsedFilename)
    .replace(/\.(css|less)/, '')
    .replace(/\./g, '_');
  const content = `${prefix}-${basename}__${p}___${name}`;
  const hash = getUniqueName(content, p).substring(0, 5);
  const cls = `${basename}_${name}__${hash}`;

  return prefix ? `${prefix}-${cls}` : cls;
};
