import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import renders from './src/reducers';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(renders)}>
        <LoginForm />
      </Provider>
    );
  }
}
