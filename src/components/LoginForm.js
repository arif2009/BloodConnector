import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, FooterTab } from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';
import { twoLetterYear, version } from '../utills/we';
import { bgColor, borderBottom0, errorTextStyle, footerBg, selfAlignCenter, txtBlue } from './styles';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text){
		this.props.passwordChanged(text);
	}

	onButtonPress(){
		const {email, password} = this.props;
		this.props.loginUser({email, password});
	}

	renderButton() {
		if(this.props.loading){
			return <Spinner size="large" />
		}

		return(
			<Button onPress={this.onButtonPress.bind(this)}>
				LogIn
			</Button>
		);
	}

	render() {
		return (
			<Container style={bgColor}>
				<Content>
					<CardSection style={borderBottom0}>
						<Input
							label="Email"
							placeholder="email"
							keyboardType="email-address"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
						/>
					</CardSection>

					<CardSection style={borderBottom0}>
						<Input
							secureTextEntry
							label="Password"
							placeholder="password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/>
					</CardSection>

					<Text style={errorTextStyle}>
						{this.props.error}
					</Text>

					<CardSection style={borderBottom0}>
						{this.renderButton()}
					</CardSection>
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

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, isLogedIn, userInfo } = auth;

	return { email, password, error, loading, isLogedIn, userInfo };
};

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser 
})(LoginForm);