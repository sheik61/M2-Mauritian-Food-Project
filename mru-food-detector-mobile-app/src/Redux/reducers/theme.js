import * as types from '../../constants';

const initialState = {
  darkMode: true,
  colors: {},
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case types.DARK_THEME:
      return {
        ...state,
        darkMode: true,
        colors: types.DARK_COLORS,
      };
    case types.LIGHT_THEME:
      return {
        ...state,
        darkMode: false,
        colors: types.LIGHT_COLORS,
      };
    default:
      return state;
  }
}
