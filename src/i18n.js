import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';

const savedLanguage = localStorage.getItem('gt-selected-language');
const browserLocale = navigator.language.split('-')[0];

const defaultLocale = savedLanguage || (['en', 'ru'].includes(browserLocale) ? browserLocale : 'en');

const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: {
        en,
        ru
    }
});

export default i18n;
