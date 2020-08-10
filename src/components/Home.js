import React from 'react';
import {Button, View, Text} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('UserList')}
        title="Go to UserList"
      />
    </View>
  );
};

export default Home;
