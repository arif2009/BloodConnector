import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Footer, FooterTab } from 'native-base';
import UserCreateForm from './UserForm/UserCreateForm';
import { twoLetterYear, version } from '../utills/we';
import { bgColor, footerBg, selfAlignCenter, txtBlue } from './styles';

export default class UserCreate extends Component {
  render() {
    return (
			<Container style={bgColor}>
				<Content>
          <UserCreateForm />
				</Content>
				<Footer>
					<FooterTab style={footerBg}>
						<View style={{justifyContent:'center'}}>
							<Text style={selfAlignCenter}>© 2017-{twoLetterYear} - BloodConnector {version}</Text>
							<Text>Website <Text style={txtBlue} onPress={() => Linking.openURL('http://www.bloodconnector.org')}>www.bloodconnector.org</Text></Text>
						</View>
					</FooterTab>
				</Footer>
			</Container>
    );
  }
}