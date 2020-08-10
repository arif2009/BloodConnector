/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#ff8080"
        translucent={false}
      />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </>
  );
};

export default App;
