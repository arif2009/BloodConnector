import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BloodNavigation} from './BloodNavigation';

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <BloodNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
