import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './src/components/Home';
import UserList from './src/components/UserList';
import SideMenu from './src/components/SideMenu';
import {nabBg, txtBolder, txtColor, sceneTitle} from './src/components/styles';

const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const UserListStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: nabBg,
      headerTintColor: '#fff',
      headerTitleStyle: txtBolder,
    }}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Blood Connector',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#ff0000"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const UserListStackScreen = ({navigation}) => (
  <UserListStack.Navigator
    screenOptions={{
      headerStyle: nabBg,
      headerTintColor: '#fff',
      headerTitleStyle: txtBolder,
    }}>
    <UserListStack.Screen
      name="UserList"
      component={UserList}
      options={{
        title: 'Blood Connector',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#ff0000"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </UserListStack.Navigator>
);

const Router = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="UserList" component={UserListStackScreen} />
    </Drawer.Navigator>
  );
};

export default Router;
