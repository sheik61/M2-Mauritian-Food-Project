import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from '../src/Store';
import {SafeAreaView} from 'react-native';
import {ApplicationNavigator} from '../src/Navigators';
import {Layout} from '../src/Theme';
import './Translations';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

function App() {
  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate persistor={persistor}>
        <ActionSheetProvider>
          <SafeAreaView style={Layout.fill}>
            <ApplicationNavigator />
          </SafeAreaView>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
