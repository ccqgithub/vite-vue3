import * as dotenv from 'dotenv';
import * as path from 'path';

const appEnv = process.env.APP_ENV || 'dev';

export const getEnvs = () => {
  let res: Record<string, string> = {};

  const envs = [
    // 公用 .env
    path.resolve(__dirname, `../../envs/.env`),
    // 类型如：.env.staging
    path.resolve(__dirname, `../../envs/.env.${appEnv}`),
    // local 覆盖 .env.local
    path.resolve(__dirname, `../../envs/.env.local`)
  ];

  for (const env of envs) {
    const result = dotenv.config({
      path: env
    });
    if (!result.error) {
      res = { ...res, ...result.parsed };
    }
  }

  // merge process.env 中以 APP 开头的变量
  Object.keys(process.env).forEach((key) => {
    if (/(APP)|(NODE_ENV)/.test(key)) {
      res[key] = process.env[key]!;
    }
  });

  // stringify
  Object.keys(res).forEach((key) => {
    res[key] = JSON.stringify(res[key]);
  });

  return res;
};
