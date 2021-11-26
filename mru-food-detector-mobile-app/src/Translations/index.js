import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './resources';
import { NativeModules, Platform } from 'react-native';
import EN_COUNTRIES from "./countries/en/countries.json";
import FR_COUNTRIES from "./countries/fr/countries.json";

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
i18n.locale = locale;

i18n.use(initReactI18next).init({
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {},
    ),
  },
  lng: locale ? locale.substring(0, 2) : 'en',
  fallbackLng: 'en',
});

export const userLocale = i18n.locale;
export const COUNTRIES =  i18n.locale &&  i18n.locale.includes('fr') ? FR_COUNTRIES : EN_COUNTRIES;
export default i18n;
