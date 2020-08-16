/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import renders from './src/reducers';
import AppNavigator from './src/navigation/AppNavigation';

const App = () => {
  const store = createStore(renders, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#ff8080"
        translucent={false}
      />
      <AppNavigator />
    </Provider>
  );
};

export default App;
