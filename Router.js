import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from './src/components/SideMenu';
import {
  HomeStackScreen,
  UserListStackScreen,
  LoginStackScreen,
} from './src/components/StackScreen';

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="Login" component={LoginStackScreen} />
      <Drawer.Screen name="UserList" component={UserListStackScreen} />
    </Drawer.Navigator>
  );
};

export default Router;
