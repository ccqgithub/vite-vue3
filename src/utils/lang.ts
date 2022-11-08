import { i18n } from '@/i18n';
import { joinUrlParams } from './url';

export const joinUrlLang = (url: string) => {
  return joinUrlParams(url, { lang: i18n.global.locale.value });
};
