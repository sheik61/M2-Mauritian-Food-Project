import {combineReducers} from 'redux';
import user from './user';
import theme from './theme';

const reducers = combineReducers({
  user,
  theme,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
