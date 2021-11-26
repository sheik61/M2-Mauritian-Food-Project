import {DARK_THEME, LIGHT_THEME} from '../../constants';

export const toggleDarkTheme = () => ({
  // type: DARK_THEME,
  type: LIGHT_THEME,
});
export const toggleLightTheme = () => ({
  type: LIGHT_THEME,
});

export const toggleTheme = (darkMode) => {
  return async (dispatch) => {
    if (darkMode) {
      dispatch(toggleDarkTheme());
    } else {
      dispatch(toggleLightTheme());
    }
  };
};
