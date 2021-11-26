/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */

export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  white: '#ffffff',
  darkGrey: '#b4bab9',
  text: '#212529',
  primary: '#7FF2AA',
  textColor: 'white',
  success: '#28a745',
  error: '#dc3545',
  icons: '#00C56B',
  disabledButton: '#b5b5b5',
  // icons: '#4FD798',
  // background: '#fff',
  background: '#E8E8E8',
  backgroundColor: '#53CD95',
  secondaryTextColor: 'black',
  //greyText: '#7B7878',
  greyText: '#7B7878',
  lightGrey: '#ececec',
  headerTintColor: '#fff',
  disabledColor: '#B2B2B2',
  disabledButtonColor: '#696666',
  mruFoodGreen: '#46CE8F',
  mruFoodDisabled: '#d9dbd9',
  cancelColor: '#919E93',
  mruFoodDisabledText: '#b3b5b3',
  backIcon: '#000',
  profileGreen: '#4FD798',
  gold: '#d4af37',
  red: 'red'
};

export const LightMode = {
  dark: false,
  colors: {
    primary: 'black',
    background: '#FFF',
    card: 'white',
    text: '#7AFFC2',
    border: '#999999',
    notification: '#7AFFC2',
  },
};

export const DarkMode = {
  dark: true,
  colors: {
    primary: '#00C56B',
    background: '#171717',
    card: '#171717',
    text: '#00C56B',
    border: '#999999',
    notification: '#00C56B',
  },
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: 10,
  small: 12,
  regular: 14,
  large: 18,
  extraLarge: 22,
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30
const extraLarge = regular * 4; // 60

export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  extraLarge,
};
