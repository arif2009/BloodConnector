import React from 'react';
import {Icon} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import UserList from './UserList';
import Login from './Login';
import {nabBg, txtBolder, txtColor, ml, mr, selfAlignCenter} from './styles';

const HomeStack = createStackNavigator();
const UserListStack = createStackNavigator();
const LoginStack = createStackNavigator();

const screenStyle = {
  headerStyle: nabBg,
  headerTintColor: '#fff',
  headerTitleStyle: [txtBolder, selfAlignCenter],
};

export const LoginStackScreen = ({navigation}) => (
  <LoginStack.Navigator screenOptions={screenStyle}>
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'User Login',
        headerLeft: () => (
          <Icon
            type="Entypo"
            name="menu"
            style={[txtColor, ml]}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => {
          return false ? (
            <Icon
              type="Entypo"
              name="add-user"
              style={[txtColor, mr]}
              onPress={() => navigation.openDrawer()}
            />
          ) : null;
        },
      }}
    />
  </LoginStack.Navigator>
);

export const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={screenStyle}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Blood Connector',
        headerLeft: () => (
          <Icon
            type="Entypo"
            name="menu"
            style={[txtColor, ml]}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => {
          return false ? (
            <Icon
              type="Entypo"
              name="add-user"
              style={[txtColor, mr]}
              onPress={() => navigation.openDrawer()}
            />
          ) : null;
        },
      }}
    />
  </HomeStack.Navigator>
);

export const UserListStackScreen = ({navigation}) => (
  <UserListStack.Navigator screenOptions={screenStyle}>
    <UserListStack.Screen
      name="UserList"
      component={UserList}
      options={{
        title: 'Blood Connector',
        headerLeft: () => (
          <Icon
            type="Entypo"
            name="menu"
            style={[txtColor, ml]}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </UserListStack.Navigator>
);
