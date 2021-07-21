
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
// import i18next from 'i18next';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'zh-HK',
        backend: {
            /* translation file path */
            loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'zh-HK',
        debug: false,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            useSuspense: true
        }
    }).then(function (t) { t('key'); });

export default i18n;