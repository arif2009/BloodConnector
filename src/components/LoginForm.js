import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, FooterTab } from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import We from '../utills/we';
var styles = require('./styles');

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
			<Container style={styles.bgColor}>
				<Content>
					<CardSection style={styles.borderBottom0}>
						<Input
							label="Email"
							placeholder="email"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
						/>
					</CardSection>

					<CardSection style={styles.borderBottom0}>
						<Input
							secureTextEntry
							label="Password"
							placeholder="password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/>
					</CardSection>

					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>

					<CardSection style={styles.borderBottom0}>
						{this.renderButton()}
					</CardSection>
				</Content>
				<Footer>
					<FooterTab style={styles.footerBg}>
					<Text style={styles.selfAlignCenter}>© 2017-{We.twoLetterYear} - BloodConnector {We.version}</Text>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;

	return { email, password, error, loading };
};

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser 
})(LoginForm);