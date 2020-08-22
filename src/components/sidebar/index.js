import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Button from 'react-native-button';
import {H1, H2, Icon} from 'native-base';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {logOut} from '../../actions/AuthActions';
import AsyncStorage from '@react-native-community/async-storage';
import {CardSection} from '../common';
import {
  txtBolder,
  selfAlignCenter,
  txtBlue,
  pXL,
} from '../../../src/components/styles';
import {SS} from './styles';
import {useSelector, useDispatch} from 'react-redux';

const SideBar = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.persistedStore);
  console.log('Arifur Rahman Sazal', userData.isLogedIn);
  const INITIAL_STATE = {
    isLogedIn: false,
    fullName: '',
    bloodGroup: '',
    similarBlood: 0,
  };

  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const getUserData = async () => {
      //const result = await AsyncStorage.getItem('@auth:userData');
      const userInfo = userData?.userInfo ?? INITIAL_STATE;

      setState((prevState) => ({
        ...prevState,
        isLogedIn: !!userInfo.access_token,
        fullName: userInfo.fullName,
        bloodGroup: userInfo.bloodGroup,
        similarBlood: userInfo.similarBlood,
      }));

      console.log('userData', state);
    };
    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <View style={[SS.drawerContainer]}>
      <DrawerContentScrollView>
        <View style={SS.drawerContent}>
          {!state.isLogedIn && (
            <CardSection style={pXL}>
              <Button onPress={() => {}}>
                Please SignUp to join with us !
              </Button>
            </CardSection>
          )}

          {state.isLogedIn && (
            <View style={SS.drawerHeader}>
              <Text style={[txtBolder, selfAlignCenter]}>{state.fullName}</Text>
              <H1 style={[selfAlignCenter, txtBlue]}>{state.bloodGroup}</H1>
              <Text style={[txtBolder, selfAlignCenter]}>
                Similar Blood : <H2 style={txtBlue}>{state.similarBlood}</H2>
              </Text>
            </View>
          )}
        </View>
        <View style={SS.drawerSection}>
          <DrawerItem
            icon={() => (
              <Icon style={SS.drawerIcon} type="FontAwesome" name="home" />
            )}
            label="Home"
            labelStyle={txtBolder}
            onPress={() => props.navigation.navigate('Home')}
          />

          {!state.isLogedIn && (
            <DrawerItem
              icon={() => (
                <Icon style={SS.drawerIcon} type="Entypo" name="add-user" />
              )}
              label="Sign Up"
              labelStyle={txtBolder}
              onPress={() => {}}
            />
          )}

          {state.isLogedIn && (
            <DrawerItem
              icon={() => (
                <Icon
                  style={SS.drawerIcon}
                  type="FontAwesome"
                  name="odnoklassniki"
                />
              )}
              label="Our Donors"
              labelStyle={txtBolder}
              onPress={() => {}}
            />
          )}

          {!state.isLogedIn && (
            <DrawerItem
              icon={() => (
                <Icon style={SS.drawerIcon} type="FontAwesome" name="sign-in" />
              )}
              label="Log In"
              labelStyle={txtBolder}
              onPress={() => props.navigation.navigate('Login')}
            />
          )}

          {state.isLogedIn && (
            <DrawerItem
              icon={() => (
                <Icon
                  style={SS.drawerIcon}
                  type="FontAwesome"
                  name="sign-out"
                />
              )}
              label="Log Out"
              labelStyle={txtBolder}
              onPress={() => logOut(dispatch, props.navigation)}
            />
          )}
        </View>
      </DrawerContentScrollView>
      <View style={SS.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Icon
              style={SS.drawerIcon}
              type="FontAwesome5"
              name="hands-helping"
            />
          )}
          label="Help"
          labelStyle={txtBolder}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SideBar;
