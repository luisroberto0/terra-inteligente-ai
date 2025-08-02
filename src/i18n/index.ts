import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ptTranslations } from '../locales/pt';
import { enTranslations } from '../locales/en';

const resources = {
  pt: {
    translation: ptTranslations
  },
  en: {
    translation: enTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'agroinsight-language',
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;