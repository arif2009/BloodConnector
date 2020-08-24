/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import renders from './src/reducers';
import AppNavigator from './src/navigation/AppNavigation';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  renders,
  {},
  composeEnhancers(applyMiddleware(ReduxThunk)),
);
const persistor = persistStore(store);

LogBox.ignoreLogs([
  'Warning: Cannot update a component from inside',
  'Animated.event now requires a second argument',
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#ff8080"
          translucent={false}
        />
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
