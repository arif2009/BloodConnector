import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import {Container, Content, Footer, FooterTab, Icon} from 'native-base';
import LoginForm from '../forms/LoginForm';
import {
  justifyCenter,
  bgWhite,
  footerBg,
  selfAlignCenter,
  txtBlue,
  txtColor,
  ml,
  mr,
} from '../styles';
import {twoLetterYear, version} from '../../utills/we';

class Login extends Component {
  render() {
    return (
      <Container style={bgWhite}>
        <Content>
          <LoginForm />
        </Content>
        <Footer>
          <FooterTab style={footerBg}>
            <View style={justifyCenter}>
              <Text style={selfAlignCenter}>
                © 2017-{twoLetterYear} - BloodConnector {version}
              </Text>
              <Text>
                Website{' '}
                <Text
                  style={txtBlue}
                  onPress={() =>
                    Linking.openURL('http://www.bloodconnector.org')
                  }>
                  www.bloodconnector.org
                </Text>
              </Text>
            </View>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Login;

export const LoginOptions = (nav) => {
  return {
    title: 'User Login',
    headerLeft: () => (
      <Icon
        type="Entypo"
        name="menu"
        style={[txtColor, ml]}
        onPress={() => nav.navigation.openDrawer()}
      />
    ),
    headerRight: () => {
      return false ? (
        <Icon
          type="Entypo"
          name="add-user"
          style={[txtColor, mr]}
          onPress={() => nav.navigation.openDrawer()}
        />
      ) : null;
    },
  };
};
