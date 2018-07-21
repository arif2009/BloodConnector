import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Footer, FooterTab } from 'native-base';
import LoginForm from './forms/LoginForm';
import { bgColor, bgWhite, footerBg, selfAlignCenter, txtBlue } from './styles';
import { twoLetterYear, version } from '../utills/we';

class Login extends Component {

	render() {
		return (
			<Container style={bgWhite}>
				<Content>
					<LoginForm />
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

export default Login;