import 'server-only';

const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  tr: () => import('./locales/fi.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'tr' | 'en') => {
  const supportedLocales = ['tr', 'en'];
  if (!supportedLocales.includes(locale)) {
    locale = 'tr';
  }
  return dictionaries[locale]();
};
