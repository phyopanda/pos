import i18n from 'i18next';
import enTranslation from '../assets/i18n/en.json';
import unicodeTranslation   from '../assets/i18n/unicode.json';
import zawgyiTranslation from '../assets/i18n/zawgyi.json';
import { env } from '../environment';
import { LANG_VALUE } from '../redux/actionTypes';

export const zawgyi = (lng) => {
    const language = lng === 'zawgyi' ? 'zawgyi' : '';
    return language;
}

export const t = (value) => {
    return i18n.t(value);
};

const getLng = localStorage.getItem(LANG_VALUE) ? localStorage.getItem(LANG_VALUE) : 'unicode';

i18n.init({
    resources : {
        en: { translation: enTranslation },
        unicode: { translation: unicodeTranslation },
        zawgyi: { translation: zawgyiTranslation }
    },
    lng: getLng,
    fallbackLng: getLng,
    debug: env === 0 ? true : false,
    debug: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;