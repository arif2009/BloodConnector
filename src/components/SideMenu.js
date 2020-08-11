import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Button from 'react-native-button';
import {H1, H2, Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import {CardSection} from './common';
import {
  drawerContainer,
  drawerHeader,
  txtBolder,
  selfAlignCenter,
  txtBlue,
  drawerBtnContainer,
  drawerBtnTxt,
  txtColor,
  drawerIcon,
} from './styles';

const SideMenu = (props) => {
  const INITIAL_STATE = {
    isLogedIn: false,
    fullName: '',
    bloodGroup: '',
    similarBlood: 0,
  };

  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const getUserData = async () => {
      const result = await AsyncStorage.getItem('@auth:userData');
      const userInfo = result != null ? JSON.parse(result) : null;

      setState((prevState) => ({
        ...prevState,
        isLogedIn: !!userInfo?.access_token,
        fullName: userInfo?.fullName,
        bloodGroup: userInfo?.bloodGroup,
        similarBlood: userInfo?.similarBlood,
      }));

      console.log('userData', state);
    };
    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[drawerContainer]}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          {!state.isLogedIn && (
            <CardSection style={{padding: 25}}>
              <Button onPress={() => {}}>
                Please SignUp to join with us !
              </Button>
            </CardSection>
          )}

          {state.isLogedIn && (
            <View style={drawerHeader}>
              <Text style={[txtBolder, selfAlignCenter]}>{state.fullName}</Text>
              <H1 style={[selfAlignCenter, txtBlue]}>{state.bloodGroup}</H1>
              <Text style={[txtBolder, selfAlignCenter]}>
                Similar Blood : <H2 style={txtBlue}>{state.similarBlood}</H2>
              </Text>
            </View>
          )}

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Icon style={drawerIcon} type="FontAwesome" name="home" />
              )}
              label="Home"
              labelStyle={txtBolder}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />

            {!state.isLogedIn && (
              <DrawerItem
                icon={() => (
                  <Icon style={drawerIcon} type="Entypo" name="add-user" />
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
                    style={drawerIcon}
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
                  <Icon style={drawerIcon} type="FontAwesome" name="sign-in" />
                )}
                label="Log In"
                labelStyle={txtBolder}
                onPress={() => {}}
              />
            )}

            {state.isLogedIn && (
              <DrawerItem
                icon={() => (
                  <Icon style={drawerIcon} type="FontAwesome" name="sign-out" />
                )}
                label="Log Out"
                labelStyle={txtBolder}
                onPress={() => {}}
              />
            )}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Icon style={drawerIcon} type="FontAwesome5" name="hands-helping" />
          )}
          label="Help"
          labelStyle={txtBolder}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
