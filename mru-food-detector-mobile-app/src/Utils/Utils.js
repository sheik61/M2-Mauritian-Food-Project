import { NativeModules, Platform } from 'react-native';

export const validateEmail = (email) => {
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email && regexEmail.test(email);
};

export const uudiv4 = () => {
  return Math.random().toString(36).substring(2);
};

export const validateUsername = (username) => {
  const regex = /^(?=[a-zA-Z0-9._\s]{3,25}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return username && regex.test(username);
};

export const validatePassword = (username) => {
  const regex = /(?=^.{8,}$)(?=.*\d)(?=.*[&~"#'\{(\-|`_\\^@)\[\]°=+\}¨€£$¤%µ*<>?,.;/:§!]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  return username && regex.test(username);
};

export const currentLocale = () => {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  return locale ? locale.substring(0, 2) : 'en';
};

export const isNumber = (n) => {
  return /^[0-9]{4}$/.test(n);
};

export const calculateHandicapIndex = (handicap, slope, sss, parSum) => {
  let hIndex = handicap * (slope / 113) + sss - parSum;
  hIndex = Math.round(hIndex, 1);
  return hIndex.toString();
}


