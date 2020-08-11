/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, StatusBar, YellowBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import renders from './src/reducers';
import Router from './Router';

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
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
