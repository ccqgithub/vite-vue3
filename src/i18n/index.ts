import { nextTick, ref } from 'vue';
import { createI18n } from 'vue-i18n';
import { joinUrl } from '@/utils/url';
import { baseUrl } from '@/config';

const languageKey = 'language';

// 语言类型
export enum LangType {
  ZH = 'zh-Hans',
  EN = 'en-US'
}

// 支持的语言
export const languages = [LangType.ZH, LangType.EN];

// 语言映射
export const languagesMap: [RegExp, LangType][] = [
  [/^zh-hans-*/i, LangType.ZH],
  [/^zh-*/i, LangType.ZH]
];

// 选择语言
export const LangSelects: { value: LangType; text: string }[] = [
  {
    value: LangType.ZH,
    text: '中文'
  },
  {
    value: LangType.EN,
    text: 'English'
  }
];

export const getLangItem = (lang: LangType) => {
  return LangSelects.find((item) => item.value === lang);
};

// 默认语言
export const defaultLanguage: LangType = LangType.EN;

export const normalizeLang = (lang: string): string => {
  if (!lang) return '';
  const l = lang.toLowerCase();
  const find = languages.find((v) => v.toLowerCase() === l);
  if (find) return find;
  const findMap = languagesMap.find((v) => v[0].test(l));
  return findMap ? findMap[1] : '';
};

export const getLangFromBrowser = () => {
  return normalizeLang(navigator.language || navigator.languages[0] || '');
};

export const getLangFromStore = () => {
  return normalizeLang(localStorage.getItem(languageKey) || '');
};

export const getLangFromPath = () => {
  // '/en-US/'
  const start = joinUrl('/', baseUrl, '/');
  const path = joinUrl('/', location.pathname.substring(start.length), '/');
  const p = path.split('/')[1] || '';
  return normalizeLang(p);
};

export const getInitLanguage = (): [LangType, boolean] => {
  let lang = '';

  lang = getLangFromPath();
  if (lang) return [lang as LangType, true];

  // lang = getLangFromStore();
  // if (lang) return [lang as LangType, false];

  // lang = getLangFromBrowser();
  // if (lang) return [lang as LangType, false];

  return [defaultLanguage, false];
};

export const i18nMessages = {
  [LangType.ZH]: {},
  [LangType.EN]: {}
};

const lang = getInitLanguage();
export const isLangFromPath = ref<boolean>(lang[1]);

localStorage.setItem(languageKey, lang[0]);

export const i18n = createI18n({
  legacy: false,
  locale: lang[0],
  fallbackLocale: lang[0],
  messages: i18nMessages
});

export const setLanguage = (lang: LangType) => {
  const oldLang = i18n.global.locale.value;
  if (lang === oldLang) return;
  const url = new URL(location.href);
  const start = joinUrl('/', baseUrl, '/');
  const path = joinUrl('/', url.pathname.substring(start.length), '/');
  if (isLangFromPath.value) {
    const p = path.replace(new RegExp(`^/${oldLang}`), `/${lang}`);
    url.pathname = joinUrl(baseUrl, p);
  } else {
    url.pathname = joinUrl(baseUrl, lang, path);
  }
  location.replace(url.href);
};

const loadedLangs: LangType[] = [];
export const loadLocaleMessages = async () => {
  const locale = i18n.global.locale.value as LangType;
  if (loadedLangs.includes(locale)) return;
  // load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.json`);
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);
  loadedLangs.push(locale);

  await nextTick();
};
