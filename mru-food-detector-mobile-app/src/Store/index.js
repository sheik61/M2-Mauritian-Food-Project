import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';

import {createStore} from 'redux';
import rootReducer from '../Redux/reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
