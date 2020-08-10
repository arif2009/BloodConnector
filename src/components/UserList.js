import React from 'react';
import {Button, View, Text} from 'react-native';

const UserList = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

export default UserList;
