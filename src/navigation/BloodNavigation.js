import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../../src/components/sidebar';
import {Icon} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import Home, {HomeOptions} from '../components/screens/Home';
import UserList from '../../src/components/UserList';
import Login, {LoginOptions} from '../components/screens/Login';
import {
  nabBg,
  txtBolder,
  txtColor,
  ml,
  selfAlignCenter,
} from '../../src/components/styles';

const UserListStack = createStackNavigator();
const LoginStack = createStackNavigator();

const screenStyle = {
  headerStyle: nabBg,
  headerTintColor: '#fff',
  headerTitleStyle: [txtBolder, selfAlignCenter],
};

const LoginNavigator = ({navigation}) => (
  <LoginStack.Navigator screenOptions={screenStyle}>
    <LoginStack.Screen name="Login" component={Login} options={LoginOptions} />
  </LoginStack.Navigator>
);

const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={screenStyle}>
    <HomeStack.Screen name="Home" component={Home} options={HomeOptions} />
  </HomeStack.Navigator>
);

const UserListStackScreen = ({navigation}) => (
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

const BloodDrawerNavigation = createDrawerNavigator();

export const BloodNavigation = () => {
  return (
    <BloodDrawerNavigation.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideBar {...props} />}>
      <BloodDrawerNavigation.Screen name="Home" component={HomeNavigator} />
      <BloodDrawerNavigation.Screen name="Login" component={LoginNavigator} />
      <BloodDrawerNavigation.Screen
        name="UserList"
        component={UserListStackScreen}
      />
    </BloodDrawerNavigation.Navigator>
  );
};